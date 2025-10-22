# 🔐 CipherStudio Authentication Guide

## Complete Login & Signup System

CipherStudio now has a full authentication system with secure user registration, login, and session management!

---

## 🎯 Features Implemented

### ✅ **User Authentication**
- **Secure Registration** - Create new accounts with username, email, and password
- **User Login** - Sign in with email and password
- **Session Management** - JWT token-based authentication
- **Protected Routes** - Editor only accessible to logged-in users
- **Password Hashing** - Bcrypt encryption for security
- **Auto Login** - Stay logged in with token persistence

### ✅ **Beautiful UI**
- **Modern Design** - Gradient backgrounds with animated shapes
- **Responsive** - Works on all devices
- **Form Validation** - Real-time error messages
- **Loading States** - Spinner animations during processing
- **Smooth Animations** - Slide-up and float effects

---

## 🚀 How to Use

### **1. Start the Application**

The servers are already running:
- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:3001

### **2. First Time User - Sign Up**

1. **Open the app** - Navigate to http://localhost:3001
2. **You'll see the Login page** - Click "Sign Up" at the bottom
3. **Fill in the form:**
   - **Username:** Your display name (min 3 characters)
   - **Email:** Your email address
   - **Password:** Min 6 characters
   - **Confirm Password:** Must match password
4. **Click "Sign Up"** button
5. **Automatically redirected** to the code editor!

### **3. Returning User - Login**

1. **Go to Login page** (default page)
2. **Enter credentials:**
   - **Email:** Your registered email
   - **Password:** Your password
3. **Click "Sign In"**
4. **Access the editor!**

### **4. Using the Editor**

Once logged in:
- Your **username** appears in the top-right corner
- All editor features are available
- Click **"Logout"** button to sign out

---

## 📋 Page Previews

### **Login Page**
```
┌─────────────────────────────────────────┐
│         🔷 CipherStudio                 │
│                                         │
│         Welcome Back!                   │
│    Sign in to continue coding          │
│                                         │
│  📧 Email                               │
│  ┌─────────────────────────────────┐   │
│  │ Enter your email               │   │
│  └─────────────────────────────────┘   │
│                                         │
│  🔒 Password                            │
│  ┌─────────────────────────────────┐   │
│  │ Enter your password            │   │
│  └─────────────────────────────────┘   │
│                                         │
│      [   Sign In   ]                    │
│                                         │
│  Don't have an account? Sign Up         │
└─────────────────────────────────────────┘
```

### **Signup Page**
```
┌─────────────────────────────────────────┐
│         🔷 CipherStudio                 │
│                                         │
│        Create Account                   │
│   Start your coding journey today       │
│                                         │
│  👤 Username                            │
│  📧 Email                               │
│  🔒 Password                            │
│  🔒 Confirm Password                    │
│                                         │
│      [   Sign Up   ]                    │
│                                         │
│  Already have an account? Sign In       │
└─────────────────────────────────────────┘
```

---

## 🔒 Security Features

### **Password Security**
- ✅ Passwords hashed with bcrypt
- ✅ Minimum 6 characters required
- ✅ Salted hashing (10 rounds)
- ✅ Never stored in plain text

### **Token-Based Auth**
- ✅ JWT (JSON Web Tokens)
- ✅ 24-hour expiration
- ✅ Stored in localStorage
- ✅ Verified on every request

### **Input Validation**
- ✅ Email format validation
- ✅ Username minimum length (3 chars)
- ✅ Password strength check
- ✅ Duplicate email/username prevention

---

## 🎨 UI Features

### **Animated Background**
- Gradient purple/blue background
- Floating animated shapes
- Glassmorphism effect on form
- Smooth transitions

### **Form Elements**
- Clean, modern input fields
- Icon labels for each field
- Focus states with blue glow
- Error messages with alerts
- Loading spinners

### **Responsive Design**
- Works on desktop, tablet, mobile
- Touch-friendly buttons
- Adaptive layout

---

## 🛠️ Technical Stack

### **Backend**
- **Express.js** - Server framework
- **MongoDB** - User database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT tokens
- **express-session** - Session management

### **Frontend**
- **React** - UI framework
- **React Router** - Navigation
- **Context API** - State management
- **Axios** - HTTP requests
- **React Icons** - UI icons

---

## 📁 File Structure

```
vscode-clone/
├── models/
│   └── User.js                 # User model
├── server.js                   # Auth routes added
└── client/
    └── src/
        ├── context/
        │   └── AuthContext.jsx # Auth state management
        ├── components/
        │   ├── Login.jsx       # Login page
        │   ├── Signup.jsx      # Signup page
        │   ├── Auth.css        # Auth styling
        │   ├── ProtectedRoute.jsx # Route guard
        │   └── Navbar.jsx      # Updated with logout
        └── main.jsx            # Router setup
```

---

## 🔄 User Flow

```
1. Visit App (http://localhost:3001)
   ↓
2. Redirected to /login
   ↓
3. New User? → Click "Sign Up"
   ├─ Fill form
   ├─ Submit
   ├─ Account created
   └─ Token saved
   ↓
4. Redirected to /editor
   ↓
5. Use Code Editor
   ↓
6. Click "Logout" when done
   ↓
7. Redirected to /login
```

---

## ⚡ API Endpoints

### **POST /api/auth/register**
Register a new user
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### **POST /api/auth/login**
Login existing user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### **GET /api/auth/verify**
Verify token (requires Authorization header)
```
Authorization: Bearer <token>
```

---

## 🎯 Test Accounts

Create your own account or test with:

**Example:**
- Username: `testuser`
- Email: `test@example.com`
- Password: `test123`

---

## 💡 Tips

### **Stay Logged In**
- Your session persists in localStorage
- Refresh page without losing login
- Token valid for 24 hours

### **Security**
- Never share your password
- Logout when using public computers
- Unique passwords recommended

### **Troubleshooting**
- **Can't login?** Check email/password
- **Account exists?** Use different email
- **Forgot password?** (Feature coming soon!)

---

## 🎨 Customization

### **Change Colors**
Edit `Auth.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### **Token Expiration**
Edit `server.js`:
```javascript
expiresIn: '24h'  // Change to your preference
```

### **Password Requirements**
Edit validation in signup component

---

## 🚀 Next Steps

**Planned Features:**
- [ ] Forgot Password
- [ ] Email Verification
- [ ] Profile Settings
- [ ] OAuth (Google, GitHub)
- [ ] Two-Factor Authentication

---

**Enjoy your secure coding environment!** 🎊

**Need help? The authentication is fully functional and ready to use!**
