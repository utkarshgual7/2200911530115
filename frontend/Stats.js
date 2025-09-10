const { useState, useEffect } = React;

function Stats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/shorturls/stats');
      
      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }
      
      const data = await response.json();
      setStats(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-alert">{error}</div>
        <button className="submit-button" onClick={fetchStats}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="stats-header">
        <h1>URL Shortener Statistics</h1>
        <button className="refresh-button" onClick={fetchStats}>Refresh</button>
      </div>
      
      {stats.length === 0 ? (
        <div className="no-data">
          <p>No shortened URLs found.</p>
        </div>
      ) : (
        <div className="stats-container">
          {stats.map((item, index) => (
            <div key={item.shortcode} className="stats-card">
              <div className="stats-card-header">
                <h3>Short URL #{index + 1}</h3>
                <span className="shortcode">{item.shortcode}</span>
              </div>
              
              <div className="stats-info">
                <div className="info-row">
                  <strong>Original URL:</strong>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="original-url">
                    {item.url}
                  </a>
                </div>
                
                <div className="info-row">
                  <strong>Short Link:</strong>
                  <div className="shortlink-container">
                    <a href={item.shortlink} target="_blank" rel="noopener noreferrer" className="short-link">
                      {item.shortlink}
                    </a>
                    <button 
                      className="copy-button"
                      onClick={() => copyToClipboard(item.shortlink)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
                
                <div className="info-row">
                  <strong>Created:</strong>
                  <span>{formatDate(item.created)}</span>
                </div>
                
                <div className="info-row">
                  <strong>Expires:</strong>
                  <span>{formatDate(item.expiry)}</span>
                </div>
                
                <div className="info-row">
                  <strong>Total Clicks:</strong>
                  <span className="click-count">{item.clicks}</span>
                </div>
              </div>
              
              {item.click_data && item.click_data.length > 0 && (
                <div className="click-details">
                  <h4>Click Details:</h4>
                  <div className="click-list">
                    {item.click_data.map((click, clickIndex) => (
                      <div key={clickIndex} className="click-item">
                        <div className="click-timestamp">
                          {formatDate(click.timestamp)}
                        </div>
                        <div className="click-source">
                          Source: {click.source}
                        </div>
                        <div className="click-location">
                          Location: {click.location}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

