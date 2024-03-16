// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB database
mongoose.connect('mongodb+srv://<credentials>@cluster0.syv0urn.mongodb.net/', {
    
});

// Define MongoDB Schema for User
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create User model
const User = mongoose.model('User', UserSchema);

// Define routes

// Route to register a new user
app.post('/register', async (req, res) => {
    try {
        // Create a new user based on request body
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to authenticate user
app.post('/login', async (req, res) => {
    try {
        // Find user by email and password
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Route to get all parking spots
app.get('/parking-spots', async (req, res) => {
  try {
      const parkingSpots = await ParkingSpot.find();
      res.status(200).json(parkingSpots);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to add a new parking spot
app.post('/parking-spots', async (req, res) => {
  try {
      const newParkingSpot = new ParkingSpot(req.body);
      await newParkingSpot.save();
      res.status(201).json({ message: 'Parking spot added successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update an existing parking spot
app.put('/parking-spots/:id', async (req, res) => {
  try {
      const { id } = req.params;
      await ParkingSpot.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'Parking spot updated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to delete a parking spot
app.delete('/parking-spots/:id', async (req, res) => {
  try {
      const { id } = req.params;
      await ParkingSpot.findByIdAndDelete(id);
      res.status(200).json({ message: 'Parking spot deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all reservations
app.get('/reservations', async (req, res) => {
  try {
      // Retrieve all reservations from the database
      const reservations = await Reservation.find();
      res.status(200).json(reservations);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
