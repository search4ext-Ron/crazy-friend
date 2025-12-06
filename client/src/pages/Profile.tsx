import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client';
import './Profile.css';

interface ProfileData {
  age: number | null;
  sex: string | null;
  ethnicity: string | null;
  sexual_orientation: string | null;
  location: string | null;
  preferred_comedy_styles: string[] | null;
}

export default function Profile() {
  const [searchParams] = useSearchParams();
  const isSetup = searchParams.get('setup') === 'true';
  const [profile, setProfile] = useState<ProfileData>({
    age: null,
    sex: null,
    ethnicity: null,
    sexual_orientation: null,
    location: null,
    preferred_comedy_styles: null,
  });
  const [subscription, setSubscription] = useState<any>(null);
  const [suggestedStyles, setSuggestedStyles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProfile();
    loadSubscription();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get('/user/profile');
      if (res.data.profile) {
        setProfile({
          ...res.data.profile,
          preferred_comedy_styles: res.data.profile.preferred_comedy_styles
            ? JSON.parse(res.data.profile.preferred_comedy_styles)
            : null,
        });
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const loadSubscription = async () => {
    try {
      const res = await api.get('/user/subscription');
      setSubscription(res.data);
    } catch (error) {
      console.error('Failed to load subscription:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await api.post('/user/profile', profile);
      setMessage('Profile updated successfully!');
      if (res.data.suggestedComedyStyles) {
        setSuggestedStyles(res.data.suggestedComedyStyles);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ProfileData, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>{isSetup ? 'Complete Your Profile' : 'Your Profile'}</h1>
        
        {isSetup && (
          <div className="setup-notice">
            <p>Help us personalize your experience by sharing some information (optional but recommended).</p>
          </div>
        )}

        {message && (
          <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                min="13"
                max="120"
                value={profile.age || ''}
                onChange={(e) => handleChange('age', e.target.value ? parseInt(e.target.value) : null)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="sex">Sex</label>
              <select
                id="sex"
                value={profile.sex || ''}
                onChange={(e) => handleChange('sex', e.target.value || null)}
                disabled={loading}
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ethnicity">Ethnicity</label>
            <input
              id="ethnicity"
              type="text"
              value={profile.ethnicity || ''}
              onChange={(e) => handleChange('ethnicity', e.target.value || null)}
              placeholder="Optional"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="sexual_orientation">Sexual Orientation</label>
            <select
              id="sexual_orientation"
              value={profile.sexual_orientation || ''}
              onChange={(e) => handleChange('sexual_orientation', e.target.value || null)}
              disabled={loading}
            >
              <option value="">Prefer not to say</option>
              <option value="heterosexual">Heterosexual</option>
              <option value="homosexual">Homosexual</option>
              <option value="bisexual">Bisexual</option>
              <option value="pansexual">Pansexual</option>
              <option value="asexual">Asexual</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              value={profile.location || ''}
              onChange={(e) => handleChange('location', e.target.value || null)}
              placeholder="City, State or Country"
              disabled={loading}
            />
          </div>

          {suggestedStyles.length > 0 && (
            <div className="suggested-styles">
              <h3>Suggested Comedy Styles</h3>
              <p>Based on your profile, we recommend: {suggestedStyles.join(', ')}</p>
            </div>
          )}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>

        <div className="subscription-section">
          <h2>Subscription</h2>
          <div className="subscription-info">
            <p><strong>Current Plan:</strong> {subscription?.tier || 'Free'}</p>
            {subscription?.expiresAt && (
              <p><strong>Expires:</strong> {new Date(subscription.expiresAt).toLocaleDateString()}</p>
            )}
            {subscription?.tier === 'free' && (
              <button className="upgrade-btn">Upgrade to Premium</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

