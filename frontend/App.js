import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, Box, Alert } from '@mui/material';
import './App.css';

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
 
      const response = await fetch('api/shorturls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          longUrl: longUrl,
          validity: validity
          shortcode: shortcode
        }
        
      }
      
      setShortenedUrl(response.shortUrl);
      setSuccess(true);
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
  };

  return (
    <Container maxWidth="sm" className="App">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          URL Shortener
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
          Shorten long URLs easily
        </Typography>
      </Box>

      <Card variant="outlined">
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                URL successfully shortened!
              </Alert>
            )}
            
            <TextField
              fullWidth
              label="Long URL"
              variant="outlined"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://very-very-very-long.com/very/long/url"
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Validity (days)"
              variant="outlined"
              type="number"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              margin="normal"
              InputProps={{ inputProps: { min: 1 } }}
            />
            
            <TextField
              fullWidth
              label="Short Code (optional)"
              variant="outlined"
              value={shortcode}
              onChange={(e) => setShortcode(e.target.value)}
              placeholder="Custom short code"
              margin="normal"
            />
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2, py: 1.5 }}
            >
              Shorten URL
            </Button>
          </form>
          
          {success && shortenedUrl && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Your shortened URL:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  value={shortenedUrl}
                  readOnly
                  variant="outlined"
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCopy}
                  sx={{ ml: 1, height: '56px' }}
                >
                  Copy
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          Enter a long URL to generate a shortened link
        </Typography>
      </Box>
    </Container>
  );
}

export default App;