require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI || "mongodb://auth-db:27017/auth_db",
  jwtSecret: process.env.JWT_SECRET || "default_secret_key",
};

