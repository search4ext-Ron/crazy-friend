import { useState } from 'react';
import './FAQ.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Is Crazy Friend free to use?',
    answer: 'Yes! We offer a free tier with limited daily messages. Premium subscribers get unlimited chats and access to all features.',
  },
  {
    question: 'How do I choose a character?',
    answer: 'After logging in, go to the Chat page and you\'ll see a selection of characters. Each has a unique personality and comedic style. You can also customize comedy styles for each conversation.',
  },
  {
    question: 'Can I use voice input?',
    answer: 'Yes! Click the microphone button in the chat interface to record your message. Make sure to grant microphone permissions when prompted.',
  },
  {
    question: 'Is my data safe?',
    answer: 'Absolutely. We use encryption for all data transmission and storage. We comply with GDPR and CCPA privacy regulations. Your conversations are private and never shared.',
  },
  {
    question: 'What if I need serious help?',
    answer: 'Crazy Friend is for entertainment only. If you\'re experiencing a mental health crisis, please contact a professional or call the crisis hotline at 988. Our system will automatically detect self-harm concerns and provide crisis resources.',
  },
  {
    question: 'How does the AI personalize responses?',
    answer: 'Based on your profile (age, location, etc.) and your feedback (clicking "This is funny"), the AI learns your preferences and adjusts its humor style to keep you engaged.',
  },
  {
    question: 'Can I change characters mid-conversation?',
    answer: 'Yes! Click "Change Character" in the chat header to switch to a different persona. This will start a new conversation session.',
  },
  {
    question: 'What comedy styles are available?',
    answer: 'We offer 11 styles: Observational, Anecdotal, Satirical, Dark, Deadpan, Prop, Character, Physical, Surreal, Blue, and Yogi-ism. You can combine up to 3 styles per conversation.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-content">
        <h1>Frequently Asked Questions</h1>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

