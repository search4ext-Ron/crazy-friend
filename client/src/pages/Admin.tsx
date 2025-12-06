import { useState, useEffect } from 'react';
import api from '../api/client';
import './Admin.css';

export default function Admin() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'analytics' | 'characters' | 'search'>('analytics');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [analyticsRes, charactersRes] = await Promise.all([
        api.get('/admin/analytics'),
        api.get('/admin/characters'),
      ]);
      setAnalytics(analyticsRes.data);
      setCharacters(charactersRes.data.characters);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="admin-container">Loading...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-tabs">
          <button
            className={activeTab === 'analytics' ? 'active' : ''}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button
            className={activeTab === 'characters' ? 'active' : ''}
            onClick={() => setActiveTab('characters')}
          >
            Characters
          </button>
          <button
            className={activeTab === 'search' ? 'active' : ''}
            onClick={() => setActiveTab('search')}
          >
            Search
          </button>
        </div>
      </div>

      {activeTab === 'analytics' && analytics && (
        <div className="admin-content">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-value">{analytics.users.total}</p>
            </div>
            <div className="stat-card">
              <h3>Premium Users</h3>
              <p className="stat-value">{analytics.users.premium}</p>
            </div>
            <div className="stat-card">
              <h3>Active (7 days)</h3>
              <p className="stat-value">{analytics.users.activeLast7Days}</p>
            </div>
            <div className="stat-card">
              <h3>Safety Alerts (30 days)</h3>
              <p className="stat-value">{analytics.safety.alertsLast30Days}</p>
            </div>
          </div>

          <div className="analytics-section">
            <h2>Character Popularity</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Character</th>
                    <th>Persona</th>
                    <th>Sessions</th>
                    <th>Messages</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.characters.map((char: any) => (
                    <tr key={char.id}>
                      <td>{char.name} ({char.gender})</td>
                      <td>{char.persona_type}</td>
                      <td>{char.session_count}</td>
                      <td>{char.message_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="analytics-section">
            <h2>Comedy Style Usage</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Style</th>
                    <th>Usage Count</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.comedyStyles.map((style: any) => (
                    <tr key={style.style}>
                      <td>{style.style}</td>
                      <td>{style.usage_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'characters' && (
        <div className="admin-content">
          <h2>Manage Characters</h2>
          <div className="characters-list">
            {characters.map((char) => (
              <div key={char.id} className="character-admin-card">
                <div>
                  <h3>{char.name} ({char.gender})</h3>
                  <p><strong>Persona:</strong> {char.persona_type}</p>
                  <p><strong>Status:</strong> {char.is_active ? 'Active' : 'Inactive'}</p>
                </div>
                <button className="edit-btn">Edit</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'search' && (
        <div className="admin-content">
          <h2>Search Interactions</h2>
          <p>Search functionality coming soon...</p>
        </div>
      )}
    </div>
  );
}

