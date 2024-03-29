# iNotesBook Project

Welcome to iNotesBook, a full-stack web application for managing notes, contacts, and news. This project is built using React for the frontend and Node.js with Express for the backend.

## Project Structure

```
- src
  - components
    - Alertx.js
    - Home.js
    - About.js
    - Login.js
    - SignUp.js
    - News.js
    - Contact.js
    - User.js
    - NavBar.js
  - context
    - notes
      - NoteState.js
  - App.js
  - App.css
- backend
  - db.js
  - routes
    - auth.js
    - notes.js
    - contacts.js
  - index.js
```

- **src**: Frontend React application.
  - **components**: React components for different pages and UI elements.
  - **context/notes**: Context for managing notes state.
  - **App.js**: Main React application component.

- **server**: Backend Node.js application.
  - **db.js**: MongoDB connection setup.
  - **routes**: Express routes for authentication, notes, and contacts.
  - **index.js**: Backend server setup.

## Screenshots

![Home Page](public/home.png)
*The home page showcasing CRUD operations and authentication.*

## Features

- **CRUD Operations for Notes:**
  - The home page allows users to perform CRUD operations on notes.
  - **Add Task:** Users can add new tasks to the list.
  - **Delete:** Users can delete tasks.
  - **Update and Edit:** Users can update and edit existing tasks.

- **Authentication:**
  - Users can authenticate by logging in.
  - Logout functionality is available.
  - If the user logs out, they need to log in again to revisit the application.

- **Signup and MongoDB Integration:**
  - New users can sign up, and their information is securely stored in MongoDB.
  - MongoDB is used to store user data and notes information.

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/iNotesBook.git
   cd iNotesBook
   ```

2. **Install Dependencies:**
   ```bash
   # Install frontend dependencies
   cd src
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the `backend` directory and set your MongoDB connection string.

4. **Run the Application:**
   - Start the frontend and backend separately.
     ```bash
     # Start frontend (from the src directory)
     npm start

     # Start backend (from the backend directory)
     node index.js
     ```

5. **Open in Browser:**
   - Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the application.

## Additional Information

- **API Key for News:**
  - You need to obtain a News API key and update it in `App.js` where `apikey` is defined.

- **Pagination:**
  - The variable `pageSize` in `App.js` controls the number of items per page in the News component.

- **Country for News:**
  - The variable `country` in `App.js` is set to 'in' (India) by default. Update it based on your preference.

## Contact Information

For any issues or inquiries, feel free to contact us at [kaushallokhande3@gmail.com].
