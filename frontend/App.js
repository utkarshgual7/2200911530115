// Using global React from CDN
const { useState } = React;

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateUrl = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    // Validate input
    if (!longUrl) {
      setError('Please enter a URL');
      return;
    }
    
    if (!validateUrl(longUrl)) {
      setError('Please enter a valid URL');
      return;
    }
    
    if (validity <= 0) {
      setError('Validity must be greater than 0');
      return;
    }
    
    try {
      const response = await fetch('/api/shorturls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: longUrl,
          validity: validity,
          shortcode: shortcode || undefined
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setShortenedUrl(data.shortlink);
        setSuccess(true);
      } else {
        setError(data.error || 'Failed to shorten URL');
      }
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="app-container">
      <div className="url-form">
        <h1 className="title">URL Shortener</h1>
        <p className="subtitle">Shorten long URLs easily</p>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="error-alert">
                {error}
              </div>
            )}
            
            {success && (
              <div className="success-alert">
                URL successfully shortened!
              </div>
            )}
            
            <div className="form-field">
              <label htmlFor="longUrl">Long URL</label>
              <input
                id="longUrl"
                type="url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://very-very-very-long.com/very/long/url"
                required
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="validity">Validity (days)</label>
              <input
                id="validity"
                type="number"
                value={validity}
                onChange={(e) => setValidity(e.target.value)}
                min="1"
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="shortcode">Short Code (optional)</label>
              <input
                id="shortcode"
                type="text"
                value={shortcode}
                onChange={(e) => setShortcode(e.target.value)}
                placeholder="Custom short code"
              />
            </div>
            
            <button type="submit" className="submit-button">
              Shorten URL
            </button>
          </form>
          
          {success && shortenedUrl && (
            <div className="result-card">
              <h3>Your shortened URL:</h3>
              <div className="shortened-url">
                {shortenedUrl}
              </div>
              <button
                onClick={handleCopy}
                className="copy-button"
              >
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
        
        <div className="footer-text">
          Enter a long URL to generate a shortened link
        </div>
      </div>
    </div>
  );
}

// App component is now available globally