

URL shortening service built with Node.js.


## API Endpoints

### Create a Short URL

```
POST /shorturls
```

**Request Body:**
```json
{
  "url": "https://jssaten.azure.website.com/login/pay/id/cse/core",
  "validaty": 30,
  "shortcode": "abcd1"
}
```

**Response:**
```json
{
  "shortlink": "http://jss.com/76hjsmk",
  "expiry": "2025-09-08T00:00:00.000Z"
}
```

### Redirect to Original URL


Redirects to the original URL associated with the provided short ID.


# used a map to store the shortcode and url
# const store = new Map();
