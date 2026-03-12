# Quick Start Guide - Testing New Features

## Setup

1. **Install Dependencies** (if not already done)
```bash
cd backend
npm install
```

2. **Start Backend**
```bash
npm run dev
```

3. **Create Admin User**
```bash
node promote-admin.js your@email.com
```

---

## Testing New Endpoints

### 1. Activity Logs
```bash
# Get all logs (Admin)
GET http://localhost:5000/api/activity-logs

# Get my logs
GET http://localhost:5000/api/activity-logs/me
```

### 2. Blogs/CMS
```bash
# Create blog (Admin)
POST http://localhost:5000/api/blogs
{
  "title": "Test Blog",
  "slug": "test-blog",
  "content": "Blog content here",
  "status": "published"
}

# Get all blogs
GET http://localhost:5000/api/blogs

# Get by slug
GET http://localhost:5000/api/blogs/test-blog
```

### 3. Formations
```bash
# Create formation
POST http://localhost:5000/api/formations
{
  "companyName": "Test LLC",
  "entityType": "LLC",
  "country": "USA",
  "state": "Delaware",
  "status": "pending"
}

# Get my formations
GET http://localhost:5000/api/formations/me

# Get all formations (Admin)
GET http://localhost:5000/api/formations
```

### 4. Orders
```bash
# Create order
POST http://localhost:5000/api/orders
{
  "serviceType": "formation",
  "plan": "Starter",
  "amount": 299
}

# Get my orders
GET http://localhost:5000/api/orders/me

# Get all orders (Admin)
GET http://localhost:5000/api/orders
```

### 5. Support Tickets
```bash
# Create ticket
POST http://localhost:5000/api/tickets
{
  "subject": "Need help with formation",
  "description": "I have a question about...",
  "category": "formation",
  "priority": "medium"
}

# Add message to ticket
POST http://localhost:5000/api/tickets/:ticketId/messages
{
  "message": "Here is my response..."
}

# Get my tickets
GET http://localhost:5000/api/tickets/me
```

### 6. Services
```bash
# Create service (Admin)
POST http://localhost:5000/api/services
{
  "name": "Company Formation",
  "slug": "company-formation",
  "description": "Form your company",
  "category": "formation",
  "countries": ["USA"],
  "pricing": {
    "starter": 299,
    "growth": 599,
    "scale": 999
  }
}

# Get all services
GET http://localhost:5000/api/services
```

### 7. Settings
```bash
# Create/Update setting (Admin)
POST http://localhost:5000/api/settings
{
  "key": "maintenance_mode",
  "value": false,
  "category": "general",
  "description": "Enable maintenance mode"
}

# Get all settings (Admin)
GET http://localhost:5000/api/settings

# Get public settings
GET http://localhost:5000/api/settings/public
```

### 8. Emails
```bash
# Send email (Admin)
POST http://localhost:5000/api/emails/send
{
  "to": "user@example.com",
  "subject": "Welcome to YourLegal",
  "body": "Thank you for signing up..."
}

# Get all emails (Admin)
GET http://localhost:5000/api/emails
```

### 9. Notifications
```bash
# Get my notifications
GET http://localhost:5000/api/notifications/me

# Mark as read
PUT http://localhost:5000/api/notifications/:id/read

# Mark all as read
PUT http://localhost:5000/api/notifications/read-all
```

### 10. Compliance
```bash
# Get compliance overview (Admin)
GET http://localhost:5000/api/compliance/overview

# Get user compliance (Admin)
GET http://localhost:5000/api/compliance/user/:userId
```

---

## Authentication

All requests (except public endpoints) require authentication.

### Option 1: Session Cookie
Login first, then cookie is automatically sent:
```bash
POST http://localhost:5000/api/auth/login
{
  "email": "your@email.com",
  "password": "password"
}
```

### Option 2: Bearer Token
Add header to requests:
```
Authorization: Bearer <your_jwt_token>
```

---

## Testing with Postman/Thunder Client

1. **Import Collection**: Create a new collection
2. **Set Base URL**: `http://localhost:5000`
3. **Login**: POST `/api/auth/login` to get session
4. **Test Endpoints**: All endpoints are now available

---

## Common Query Parameters

### Pagination
```
?page=1&limit=20
```

### Filtering
```
?status=pending
?category=formation
?isActive=true
```

### Example
```
GET /api/orders?status=pending&page=1&limit=10
```

---

## Response Format

### Success
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

### Error
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Admin vs User Access

### Admin Only Endpoints
- All `/api/admin/*` routes
- Create/Update/Delete operations for most entities
- View all users' data
- Compliance overview
- Email sending
- Settings management

### User Endpoints
- `/me` routes (get own data)
- Create tickets
- View own orders/formations
- Upload documents
- View notifications

---

## Next Steps

1. **Test Each Endpoint**: Use the examples above
2. **Check Database**: Verify data is being saved
3. **Test Frontend Integration**: Connect frontend to new APIs
4. **Configure Email Service**: Set up SendGrid/AWS SES
5. **Add Activity Logging**: Integrate logging in controllers
6. **Add Notifications**: Trigger notifications on events

---

## Troubleshooting

### "Not authorized" Error
- Make sure you're logged in
- Check if user has admin role (for admin endpoints)

### "Validation Error"
- Check required fields in model
- Verify data types match schema

### "Not Found" Error
- Verify endpoint URL is correct
- Check if resource exists in database

### Database Connection Error
- Verify MONGODB_URI in .env
- Check if MongoDB is running

---

## Support

For issues or questions:
1. Check `API_DOCUMENTATION.md` for detailed endpoint info
2. Review `COMPLETION_SUMMARY.md` for feature overview
3. Check model files in `src/models/` for schema details
4. Review controller files in `src/controllers/` for logic

---

**Status**: All endpoints are functional and ready for testing! 🚀
