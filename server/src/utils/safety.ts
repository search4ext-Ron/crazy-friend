// Self-harm detection keywords
const SELF_HARM_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'want to die', 'not worth living',
  'hurt myself', 'self harm', 'cutting', 'overdose', 'jump off', 'hang myself',
  'no reason to live', 'better off dead', 'no point', 'give up'
];

export function detectSelfHarm(text: string): boolean {
  const lowerText = text.toLowerCase();
  return SELF_HARM_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

export function getCrisisResponse(): string {
  const { env } = require('./env');
  const hotline = env.CRISIS_HOTLINE;
  return `I'm really concerned about what you've shared. I can't provide advice in this situation, but I want to make sure you get the help you need.

Please reach out to the National Suicide Prevention Lifeline at ${hotline} or text HOME to 741741 for the Crisis Text Line. These services are available 24/7 and have trained professionals who can help.

Your life has value, and there are people who want to help you through this. Please reach out to them.`;
}

