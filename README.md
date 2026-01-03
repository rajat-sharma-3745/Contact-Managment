# Contact Management Web App (MERN)
A modern Contact Management Web Application that allows users to create, view, sort, and delete contacts through a clean and responsive interface. The app is built using the MERN stack, focusing on smooth user interactions and efficient data handling.

## Features

- Add new contacts with client-side validation
- View contacts in a responsive table (no page reload)
- Sort contacts by name, email, phone, or created date
- Delete contacts with confirmation modal
- Clean and responsive UI using Tailwind CSS
- Backend API with Node.js, Express, MongoDB

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **CORS**: cors middleware

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/rajat-sharma-3745/Contact-Managment.git
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/contactdb
```

For MongoDB Atlas:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/contactdb
```

4. **Start MongoDB** (if using local MongoDB)
```bash
mongod
```

5. **Run the server**
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:5000/api/contacts
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contacts` | Create a new contact |
| GET | `/api/contacts` | Get all contacts |
| GET | `/api/contacts/:id` | Get contact by ID |
| DELETE | `/api/contacts/:id` | Delete contact by ID |

### Request/Response Examples

#### 1. Create Contact
**POST** `/api/contacts`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Hello, I'd like to connect!"
}
```

Response (201):
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "_id": "648a5c1f9e1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "Hello, I'd like to connect!",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 2. Get All Contacts
**GET** `/api/contacts?sort=-createdAt&limit=10`

Response (200):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "648a5c1f9e1234567890abcd",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "message": "Hello!",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 3. Get Single Contact
**GET** `/api/contacts/:id`

Response (200):
```json
{
  "success": true,
  "data": {
    "_id": "648a5c1f9e1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "Hello!",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 4. Delete Contact
**DELETE** `/api/contacts/:id`

Response (200):
```json
{
  "success": true,
  "message": "Contact deleted successfully",
  "data": {}
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Please provide name, email, and phone number"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Contact not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details..."
}
```

## Validation Rules

- **Name**: Required, 2-100 characters
- **Email**: Required, valid email format, lowercase
- **Phone**: Required, minimum 10 digits, allows digits, spaces, +, -, (, )
- **Message**: Optional, maximum 1000 characters


## Testing with cURL

```bash
# Create contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"1234567890","message":"Test message"}'

# Get all contacts
curl http://localhost:5000/api/contacts

# Get single contact
curl http://localhost:5000/api/contacts/648a5c1f9e1234567890abcd

# Delete contact
curl -X DELETE http://localhost:5000/api/contacts/648a5c1f9e1234567890abcd
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── models/
│   │   └── Contact.js         # Contact schema
│   ├── routes/
│   │   └── contactRoutes.js   # API routes
│   ├── controllers/
│   │   └── contactController.js # Business logic
│   ├── middleware/
│   │   └── errorHandler.js    # Error handling
│   └── server.js              # Entry point
├── .env
├── .gitignore
├── package.json
└── README.md
```


## Contact Management Frontend

A modern, responsive React application for managing contacts with a beautiful green-themed UI.

### Features

✅ **Contact Management**
- Add new contacts with validation
- View all contacts in a professional table layout
- Delete contacts with confirmation modal
- Real-time search and filtering

✅ **User Experience**
- Form validation with error messages
- Submit button disabled when form is invalid
- Toast notifications for success/error messages (Sonner)
- Smooth animations and transitions
- Responsive design for all devices

✅ **Search & Sort**
- Search by name, email, or phone
- Sort by name, email, phone, or date created
- Toggle ascending/descending order

✅ **Modern UI/UX**
- Fresh green color scheme
- Clean, professional table layout
- Icon integration with Lucide React
- Loading states and empty states
- Hover effects and smooth transitions

## Tech Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: Sonner
- **HTTP Client**: Axios
- **State Management**: React useState


## Installation

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the root:
```env
VITE_BACKEND_URL=http://localhost:3000/api
```

4. **Start the development server**
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ContactForm.jsx       # Form component with validation
│   │   ├── ContactTable.jsx      # Table with sorting & delete
│   │   ├── SearchBar.jsx         # Search/filter component
│   │   └── DeleteModal.jsx       # Confirmation modal
│   ├── services/
│   │   └── api.js                # API service functions
│   ├── App.jsx                   # Main application
│   ├── App.css                   # Custom animations
│   ├── index.js                  # React entry point
│   └── index.css                 # Tailwind imports
├── .env
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Features Implementation

### Form Validation
```javascript
// Name: Required, 2-100 characters
// Email: Required, valid email format
// Phone: Required, minimum 10 digits
// Message: Optional, max 1000 characters
```

### Search Functionality
Searches across multiple fields:
- Name (case-insensitive)
- Email (case-insensitive)
- Phone number

### Sorting
Click column headers to sort:
- Toggle between ascending/descending
- Visual indicators (up/down arrows)
- Supports name, email, phone, and date

### Toast Notifications
- Success: Green toast with checkmark
- Error: Red toast with error icon
- Info: Blue toast for refresh
- Auto-dismiss after 3 seconds







