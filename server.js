const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const mysql = require("mysql2/promise");
const config = require("./app/config/db.config.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
  })
);

const db = require("./app/models");
const Role = db.role;

// Function to check if database exists, and create it if it doesn't
async function createDatabaseIfNotExists() {
  // Connect to MySQL without specifying the database
  const connection = await mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
  });

  // Check if database exists, create it if not
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${config.DB}`);
  await connection.end();
}

createDatabaseIfNotExists().then(() => {
  // Connect to the database after ensuring it exists
  db.sequelize
    .sync({ force: false })
    .then(() => {
      // Use force: false to prevent data loss
      console.log("Database synchronized successfully.");
      initial(); // Call initial function to set up initial data, if needed
    })
    .catch((err) => {
      console.error("Failed to sync database:", err);
    });
});

// Function to seed initial data
async function initial() {
    try {
      // Check if roles already exist in the table
      const count = await Role.count();
      
      if (count === 0) {
        // Only insert roles if they don't exist yet
        await Role.create({ id: 1, name: "user" });
        await Role.create({ id: 2, name: "admin" });
        console.log("Initial roles added to the database.");
      } else {
        console.log("Roles already exist in the database, skipping initialization.");
      }
    } catch (error) {
      console.error("Error initializing roles:", error);
    }
  }

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
