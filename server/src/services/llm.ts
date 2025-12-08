import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatPromptTemplate } from 'langchain/prompts';
import { db } from '../database/init';
import { detectSelfHarm, getCrisisResponse } from '../utils/safety';
import { env } from '../utils/env';
import { logger } from '../utils/logger';

const COMEDY_STYLES = {
  observational: 'Observational humor - commenting on everyday life and human behavior',
  anecdotal: 'Anecdotal humor - sharing funny stories and personal experiences',
  satirical: 'Satirical humor - using irony and exaggeration to critique society',
  dark: 'Dark humor - finding humor in serious, morbid, or taboo subjects',
  deadpan: 'Deadpan humor - delivering jokes with a serious, expressionless demeanor',
  prop: 'Prop humor - using physical objects or visual elements for comedy',
  character: 'Character humor - embodying a specific persona with distinct traits',
  physical: 'Physical humor - slapstick, exaggerated movements, visual gags',
  surreal: 'Surreal humor - absurd, illogical, dreamlike comedy',
  blue: 'Blue humor - risqué, adult-oriented, sexual or vulgar comedy',
  yogi_ism: 'Yogi-ism - spiritual, philosophical humor with a zen twist',
};

export class LLMService {
  private llm: ChatGoogleGenerativeAI;

  constructor() {
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your-gemini-api-key-here') {
      logger.warn('GEMINI_API_KEY not properly configured - LLM service will use mock responses');
    }
    
    this.llm = new ChatGoogleGenerativeAI({
      modelName: 'gemini-pro',
      temperature: 0.9,
      maxOutputTokens: 500,
      apiKey: apiKey,
    });
  }

  async generateResponse(
    userMessage: string,
    characterId: number,
    userId: number,
    sessionId: number
  ): Promise<string> {
    // Safety check
    if (detectSelfHarm(userMessage)) {
      // Log the incident
      const { logger } = require('../utils/logger');
      logger.error('Self-harm detected', {
        userId,
        sessionId,
        messagePreview: userMessage.substring(0, 100),
      });

      db.prepare(`
        INSERT INTO admin_logs (admin_user_id, action, details)
        VALUES (?, ?, ?)
      `).run(userId, 'SAFETY_ALERT', JSON.stringify({
        type: 'self_harm_detected',
        message: userMessage.substring(0, 100),
        timestamp: new Date().toISOString(),
      }));

      return getCrisisResponse();
    }

    // Get character details
    const character = db.prepare('SELECT * FROM characters WHERE id = ?').get(characterId) as any;
    if (!character) {
      throw new Error('Character not found');
    }

    // Get user profile for personalization
    const profile = db.prepare('SELECT * FROM user_profiles WHERE user_id = ?').get(userId) as any;
    
    // Get comedy styles
    const session = db.prepare('SELECT * FROM chat_sessions WHERE id = ?').get(sessionId) as any;
    const comedyStyles = session?.comedy_styles 
      ? JSON.parse(session.comedy_styles)
      : JSON.parse(character.comedy_styles);

    // Build style descriptions
    const styleDescriptions = comedyStyles
      .map((style: string) => COMEDY_STYLES[style as keyof typeof COMEDY_STYLES] || style)
      .join(', ');

    // Build persona prompt
    const personaPrompt = `
You are ${character.name}, a ${character.gender} ${character.persona_type.replace('_', ' ')} character.

Voice and Speech:
- ${character.voice_description}
- Accent: ${character.accent_description}
- Use these words/phrases naturally: ${character.vernacular}
- Worldview: ${character.worldview}

Comedy Styles (use ${comedyStyles.length > 1 ? 'a combination of' : ''}):
${styleDescriptions}

${profile ? `
User Context:
- Age: ${profile.age}
- Location: ${profile.location || 'Unknown'}
- Use this context to make your humor more relatable and personalized.
` : ''}

Instructions:
1. Respond in character with the specified voice, accent, and vernacular
2. Be hilariously unhinged, funny, and engaging
3. Provide advice that is humorous but clearly for entertainment only
4. Keep responses concise (2-3 sentences max)
5. Use the comedy styles naturally - don't force them
6. If the user asks for serious advice, redirect with humor
7. Always maintain your character's personality and worldview

User's message: ${userMessage}
`;

    try {
      const prompt = ChatPromptTemplate.fromMessages([
        ['system', personaPrompt],
        ['human', '{input}'],
      ]);

      const chain = prompt.pipe(this.llm);
      const response = await chain.invoke({ input: userMessage });
      
      return response.content as string;
    } catch (error: any) {
      logger.error('LLM generation error', {
        error: error.message,
        characterId,
        sessionId,
      });
      
      // Fallback mock response if API fails
      if (!env.GEMINI_API_KEY || env.GEMINI_API_KEY === 'your-gemini-api-key-here' || error.message?.includes('mock')) {
        return this.getMockResponse(character, userMessage);
      }
      
      throw error;
    }
  }

  private getMockResponse(character: any, userMessage: string): string {
    const responses = [
      `Well, ${character.vernacular.split(',')[0]}, that's a real doozy. Let me tell ya, ${userMessage.toLowerCase().includes('advice') ? 'the best advice I got is to not take advice from a chatbot, but here we are!' : 'I reckon you\'re overthinkin\' this whole situation.'}`,
      `${character.vernacular.split(',')[0]}! You know what? ${userMessage.length > 20 ? 'That\'s a whole lot of words for someone who just wants a quick answer.' : 'I\'ve heard it all before, and let me tell ya...'} The real question is: are you ready for some hilariously unhinged wisdom?`,
      `Alright, ${character.vernacular.split(',')[0]}, here's the thing - ${character.worldview.toLowerCase()}, and from that perspective, I'd say you're probably making this way more complicated than it needs to be. But hey, that's just my ${character.persona_type.replace('_', ' ')} opinion!`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  async suggestComedyStyles(userProfile: any): Promise<string[]> {
    // AI-powered style suggestion based on user profile
    // This is a simplified version - you could use the LLM for this too
    const suggestions: string[] = [];
    
    if (userProfile.age && userProfile.age < 25) {
      suggestions.push('surreal', 'character');
    } else if (userProfile.age && userProfile.age > 40) {
      suggestions.push('observational', 'anecdotal');
    } else {
      suggestions.push('satirical', 'deadpan');
    }

    if (userProfile.location) {
      const location = userProfile.location.toLowerCase();
      if (location.includes('new york') || location.includes('nyc')) {
        suggestions.push('observational', 'satirical');
      } else if (location.includes('california') || location.includes('la')) {
        suggestions.push('character', 'surreal');
      }
    }

    // Return unique styles, max 3
    return [...new Set(suggestions)].slice(0, 3);
  }
}

export const llmService = new LLMService();

