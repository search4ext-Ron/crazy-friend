import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Crazy Friend</h1>
        
        <section>
          <h2>Our Mission</h2>
          <p>
            Crazy Friend was created because let's face it - sometimes you need advice from someone 
            who has absolutely no idea what they're talking about, but says it with such confidence 
            you can't help but laugh. We believe that the best advice is the kind that makes you 
            question everything, including your life choices. Our diverse cast of unhinged AI characters 
            ensures there's someone equally chaotic for everyone.
          </p>
        </section>

        <section>
          <h2>How It Works</h2>
          <p>
            Our platform uses advanced language models to generate hilariously unhinged, 
            and absolutely ridiculous responses. Each character has a distinct personality, voice, 
            accent, and special brand of chaos that makes every conversation a wild ride. 
            Think of it as therapy, but with more emojis and questionable life advice.
          </p>
        </section>

        <section>
          <h2>Safety First</h2>
          <p>
            Your safety is our priority. We have built-in protocols to detect and respond 
            appropriately to self-harm concerns, directing users to professional crisis 
            resources when needed. All advice provided is clearly marked as entertainment-only.
          </p>
        </section>

        <section>
          <h2>Privacy & Security</h2>
          <p>
            We take your privacy seriously. All data is encrypted, and we comply with GDPR 
            and CCPA principles. Your conversations are private, and we never share your 
            personal information with third parties.
          </p>
        </section>

        <section className="disclaimer-section">
          <h2>⚠️ Important Disclaimer</h2>
          <p>
            <strong>The advice provided by this chatbot is for Entertainment Purposes Only 
            and is not a substitute for professional counsel.</strong> If you are experiencing 
            a mental health crisis, please contact a professional or call the crisis hotline 
            at 988.
          </p>
        </section>
      </div>
    </div>
  );
}

