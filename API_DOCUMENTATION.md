# Crazy Friend API Documentation

Base URL: `http://localhost:3001/api` (development)

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Authentication Endpoints

### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "userId": 1,
  "disclaimerAccepted": false
}
```

### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "twoFactorCode": "123456" // Optional, required if 2FA enabled
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "userId": 1,
  "twoFactorEnabled": false
}
```

### POST /auth/2fa/setup
Set up 2FA (requires authentication).

**Response:**
```json
{
  "secret": "base32_secret",
  "qrCode": "data:image/png;base64,..."
}
```

### POST /auth/2fa/verify
Verify and enable 2FA (requires authentication).

**Request Body:**
```json
{
  "code": "123456"
}
```

### POST /auth/2fa/disable
Disable 2FA (requires authentication).

### POST /auth/disclaimer/accept
Accept the disclaimer (requires authentication).

## Character Endpoints

### GET /characters
Get all active characters.

**Response:**
```json
{
  "characters": [
    {
      "id": 1,
      "name": "Brooklyn",
      "gender": "male",
      "persona_type": "new_yorker",
      "voice_description": "Fast-talking, nasal Brooklyn accent",
      "accent_description": "Brooklyn, New York",
      "vernacular": "Yo, fuggedaboutit, cawfee, dawg",
      "worldview": "Street-smart, no-nonsense, direct",
      "comedy_styles": ["observational", "anecdotal", "satirical"]
    }
  ]
}
```

### GET /characters/:id
Get a specific character by ID.

## Chat Endpoints

### POST /chat/session
Create a new chat session (requires authentication).

**Request Body:**
```json
{
  "characterId": 1,
  "comedyStyles": ["observational", "satirical"] // Optional
}
```

**Response:**
```json
{
  "sessionId": 1,
  "character": { /* character object */ },
  "comedyStyles": ["observational", "satirical"]
}
```

### POST /chat/message
Send a message in a chat session (requires authentication).

**Request Body:**
```json
{
  "sessionId": 1,
  "message": "What should I do about my job?",
  "isVoice": false
}
```

**Response:**
```json
{
  "response": "Well, yo, here's the thing...",
  "messageId": 123,
  "sessionEnded": false
}
```

**If self-harm detected:**
```json
{
  "response": "I'm really concerned... [crisis message]",
  "sessionEnded": true,
  "crisisHotline": "988"
}
```

### GET /chat/session/:sessionId
Get session history (requires authentication).

**Response:**
```json
{
  "session": { /* session object */ },
  "messages": [
    {
      "id": 1,
      "role": "user",
      "content": "Hello",
      "is_voice": 0,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET /chat/sessions
Get all user's chat sessions (requires authentication).

### POST /chat/feedback
Submit feedback on a message (requires authentication).

**Request Body:**
```json
{
  "messageId": 123,
  "sessionId": 1,
  "feedbackType": "funny"
}
```

## User Endpoints

### GET /user/profile
Get user profile (requires authentication).

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "subscription_tier": "free",
    "subscription_expires_at": null
  },
  "profile": {
    "age": 25,
    "sex": "male",
    "ethnicity": "Caucasian",
    "sexual_orientation": "heterosexual",
    "location": "New York, NY",
    "preferred_comedy_styles": ["observational", "satirical"]
  }
}
```

### POST /user/profile
Create or update user profile (requires authentication).

**Request Body:**
```json
{
  "age": 25,
  "sex": "male",
  "ethnicity": "Caucasian",
  "sexual_orientation": "heterosexual",
  "location": "New York, NY",
  "preferred_comedy_styles": ["observational", "satirical"]
}
```

**Response:**
```json
{
  "message": "Profile updated",
  "suggestedComedyStyles": ["observational", "satirical", "deadpan"]
}
```

### GET /user/subscription
Get subscription status (requires authentication).

**Response:**
```json
{
  "tier": "free",
  "expiresAt": null,
  "isActive": false
}
```

### POST /user/subscription
Update subscription (requires authentication, admin only in production).

**Request Body:**
```json
{
  "tier": "premium",
  "expiresAt": "2024-12-31T23:59:59Z"
}
```

## Admin Endpoints

All admin endpoints require authentication and admin role.

### GET /admin/analytics
Get analytics dashboard data.

**Response:**
```json
{
  "users": {
    "total": 100,
    "premium": 10,
    "activeLast7Days": 50
  },
  "characters": [ /* character stats */ ],
  "comedyStyles": [ /* style usage stats */ ],
  "demographics": [ /* demographic stats */ ],
  "feedback": [ /* feedback stats */ ],
  "safety": {
    "alertsLast30Days": 2
  }
}
```

### GET /admin/characters
Get all characters (including inactive).

### POST /admin/characters
Create a new character.

**Request Body:**
```json
{
  "name": "New Character",
  "gender": "male",
  "persona_type": "custom",
  "voice_description": "Description",
  "accent_description": "Accent",
  "vernacular": "Words",
  "worldview": "Worldview",
  "comedy_styles": ["observational"]
}
```

### PUT /admin/characters/:id
Update a character.

### DELETE /admin/characters/:id
Soft delete a character (sets is_active to 0).

### GET /admin/search
Search interactions and users.

**Query Parameters:**
- `query`: Search term (required)
- `type`: "messages" or "users" (optional)

### GET /admin/logs
Get admin action logs.

**Query Parameters:**
- `limit`: Number of logs to return (default: 100)

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message here"
}
```

**Status Codes:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

All endpoints are rate-limited:
- Window: 15 minutes
- Max requests: 100 per window
- Response when exceeded: `429 Too Many Requests`

## Safety Features

The `/chat/message` endpoint automatically:
1. Scans messages for self-harm keywords
2. Returns crisis response if detected
3. Ends the session
4. Logs the incident for admin review

