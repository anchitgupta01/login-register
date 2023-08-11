const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser'); 
const fs = require('fs'); 


const app = express();
const port = 3000;

// Parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));



// Serve the register.html file directly
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
  });

// Serve the login.html page
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
  });

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username and password are valid
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        console.error('Error querying database: ' + err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const user = results[0];
  
      // Compare the provided password with the hashed password in the database
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // If login is successful, create a cookie if "Remember Me" is checked
      if (req.body.remember === 'true') {
        res.cookie('remember', 'true', { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Expires in 30 days
      }
  
      // Redirect the user to their profile or dashboard
      res.redirect('profile.html'); // Change to the appropriate route
    });
  });
  




// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password',
  database: 'subscribers'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + db.threadId);
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Route for user registration
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
  
    const user = {
      username: username,
      email: email,
      password: password
    };
  
    db.query('INSERT INTO users SET ?', user, (err, result) => {
      if (err) {
        console.error('Error registering user: ' + err);
        res.status(500).json({ message: 'Error registering user' });
        return;
      }
  
      console.log('User registered with ID: ' + result.insertId);
      
      //run after adding user in db
      app.post('/register', (req, res) => {
        // Assuming you have username and password validation logic here
        
        // If login is successful, create a cookie if "Remember Me" is checked
        if (req.body.remember === 'true') {
            res.cookie('remember', 'true', { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Expires in 30 days
        }
        
        // Redirect the user to their profile or dashboard
        res.redirect('profile.html'); // Change to the appropriate route
    });
    
      res.json({ message: 'User registered successfully' });
    });
  });

//profile

app.get('/profile.html', (req, res) => {
  const userId = req.cookies.userId; 

  // Query the user's subscription details from the database
  db.query('SELECT subscriptionPlan FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const subscriptionPlan = results[0].subscriptionPlan;

    // Read the contents of 'profile.html' file
    fs.readFile(path.join(__dirname, 'public', 'profile.html'), 'utf8', (err, htmlContent) => {
      if (err) {
        console.error('Error reading HTML file: ' + err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Replace placeholders in HTML with actual data
      const modifiedHtml = htmlContent.replace('{{subscriptionPlan}}', subscriptionPlan);

      // Send the modified HTML to the user's browser
      res.send(modifiedHtml);
    });
  });
});

app.get('/subscription-plans', (req, res) => {
    db.query('SELECT * FROM subscription_plans', (err, results) => {
      if (err) {
        console.error('Error querying database: ' + err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      const subscriptionPlans = results;
  
      // Send the subscription plans data to the client
      res.json({ subscriptionPlans });
    });
  });
  
  