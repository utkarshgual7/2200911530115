# 2200911530115 - URL Shortener Application

## Project Overview

A  URL shortening service built with Node.js and React, featuring real-time analytics, click tracking, and a web interface. The application consists of three main components: a logging middleware, a URL shortener microservice backend, and a responsive frontend.

## Architecture & Components

###  **LOGGING MIDDLEWARE**
- Centralized logging system for all application components
- Structured logging with timestamps and service identification
- Error tracking and request monitoring

###  **URL SHORTENER MICROSERVICE (BACKEND)**
- RESTful API for URL shortening operations
- In-memory storage with expiration handling
- Click tracking with source and location data
- Comprehensive statistics and analytics

###  **URL SHORTENER WEB (FRONTEND)**
- Modern React-based user interface
- Real-time statistics dashboard
- Responsive design with gradient styling
- Copy-to-clipboard functionality


## Key Features

### URL Shortening
- **Custom Short Codes**: Optional user-defined short codes
- **Expiration Control**: Configurable validity periods (default: 30 days)
- **Automatic Cleanup**: Expired URLs are automatically removed
- **Collision Handling**: Unique short code generation

### Analytics & Tracking
- **Click Tracking**: Real-time click counting with detailed metadata
- **Source Detection**: Referrer and direct access tracking
- **Location Data**: IP-based location tracking
- **Timestamp Logging**: Precise click timing information

### User Interface
- **Dual Navigation**: Home and Statistics pages
- **Real-time Updates**: Live statistics refresh
- **Responsive Design**: Mobile-friendly interface
- **Modern Styling**: Gradient backgrounds and glassmorphism effects

## API Endpoints

### Core URL Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/shorturls` | Create a new shortened URL |
| `GET` | `/:shortcode` | Redirect to original URL (with tracking) |

### Statistics & Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/shorturls/stats` | Get all shortened URLs with statistics |
| `GET` | `/api/shorturls/stats/:shortcode` | Get statistics for specific URL |

### Request/Response Examples

#### Create Short URL
```json
// POST /api/shorturls
{
  "url": "https://very-very-very-long.com/very-long-url",
  "shortcode": "custom123",  // Optional
  "validity": 30             // Days, optional
}

// Response
{
  "shortlink": "http://localhost:3000/custom123",
  "expiry": "2024-02-15T10:30:00.000Z"
}
```

#### Get Statistics
```json
// GET /api/shorturls/stats
[
  {
    "shortcode": "abc123",
    "url": "https://example.com",
    "created": "2024-01-15T10:30:00.000Z",
    "expiry": "2024-02-15T10:30:00.000Z",
    "clicks": 5,
    "click_data": [
      {
        "timestamp": "2024-01-16T14:22:00.000Z",
        "source": "direct",
        "location": "192.168.1.1"
      }
    ],
    "shortlink": "http://localhost:3000/abc123"
  }
]
```

## Technology Stack

- **Backend**: Node.js with native HTTP module
- **Frontend**: React (CDN-based) with Babel transpilation
- **Storage**: In-memory Map for development
- **Styling**: CSS3 with modern features (gradients, backdrop-filter)
- **Logging**: Custom middleware with structured logging

## Getting Started

### Prerequisites
- Node.js 
- npm or yarn package manager

### Installation & Running
```bash
# Install dependencies
npm install

# Start the application
npm start

# Access the application
# Frontend: http://localhost:3000
# API: http://localhost:3000/api/
```

### Project Structure
```
├── backend/              # URL shortener microservice
├── frontend/             # React web application
├── logging_middleware/   # Centralized logging system
├── server.js            # Unified server (production)
└── package.json         # Main project configuration
```

## Screenshots

### Application Interface
<img width="1015" height="958" alt="Screenshot 2025-09-10 152554" src="https://github.com/user-attachments/assets/8d712d11-c6bc-47f1-9d43-83f714a8b870" />

### Postman API Testing

#### Create Short URL Test




#### Individual URL Stats Test

#### Redirect Test

