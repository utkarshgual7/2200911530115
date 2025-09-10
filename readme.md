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

<img width="1285" height="789" alt="image" src="https://github.com/user-attachments/assets/439d618c-9621-4968-bff7-dc5cbf884454" />


## Key Features

### URL Shortening
- **Custom Short Codes**: Optional user-defined short codes
- **Expiration Control**: Configurable validity periods (default: 30 days)
- **Automatic Cleanup**: Expired URLs are automatically removed
- **Collision Handling**: Unique short code generation

### Analytics & Tracking
- **Click Tracking**: Real-time click counting with detailed metadata
- **Source Detection**: Referrer and direct access tracking
- **Timestamp Logging**: Precise click timing information

### User Interface
- **Dual Navigation**: Home and Statistics pages
- **Real-time Updates**: Live statistics refresh
- **Responsive Design**: Mobile-friendly interface

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

<img width="1918" height="958" alt="Screenshot 2025-09-10 140848" src="https://github.com/user-attachments/assets/fef2203c-2926-4321-ba70-fcca309d09c4" />

### Log API TESTING POSTMAN

<img width="1275" height="1075" alt="Screenshot 2025-09-10 140942" src="https://github.com/user-attachments/assets/49994d92-123c-45f4-b5c5-82389d178b3a" />

#### Create Short URL Test
<img width="1918" height="1078" alt="Screenshot 2025-09-10 142054" src="https://github.com/user-attachments/assets/018c3801-1dac-4e8e-85a2-40602f73166b" />


### ROUTE NOT FOUND 
<img width="1422" height="830" alt="Screenshot 2025-09-10 142724" src="https://github.com/user-attachments/assets/18944d27-26d3-4d25-9812-b955c2a7c49c" />


#### Individual URL Stats Test
<img width="1267" height="927" alt="Screenshot 2025-09-10 145513" src="https://github.com/user-attachments/assets/067a9b37-a893-41ad-b610-e5ff5ecf9360" />


#### Redirect Test
<img width="1357" height="642" alt="Screenshot 2025-09-10 142551" src="https://github.com/user-attachments/assets/b4975074-3fe3-4d14-a044-2786894b2188" />


