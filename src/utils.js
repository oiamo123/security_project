import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "./db";
import { createLogger, format, transports } from "winston";
import CryptoJS from "crypto-js";

const encryptMessage = function (message) {
  const encrypted = CryptoJS.AES.encrypt(
    message,
    process.env.LOG_ENCRYPTION_KEY
  );
  return encrypted.toString();
};

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      const encryptedMessage = encryptMessage(
        `${timestamp} ${level}: ${message}`
      );
      return encryptedMessage;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "server.log" }),
  ],
});

// Verify access token
const verifyToken = async function (cookie) {
  if (!cookie) {
    return { valid: false }; // Return false
  }

  try {
    const decoded = jwt.verify(cookie.value, process.env.PRIVATE_TOKEN); // Verify access token
    const user = await User.findOne({
      where: { UserEmail: decoded.UserEmail },
    });

    if (!user) {
      return { valid: false };
    }

    let obj = { valid: true };
    if (Date.now() > decoded.exp * 1000) {
      // Use exp for expiration check
      const { valid, accessToken } = await checkRefreshToken(user); // Check refresh token
      obj.valid = valid;
      obj.accessToken = accessToken;
    } else {
      const accessToken = signAccessToken(user); // Sign a new access token
      obj.accessToken = accessToken;
    }

    return obj; // Return structured response
  } catch (err) {
    logger.error(err); // Log the error
    return { valid: false }; // Return structured data
  }
};

// Sign access token
const signAccessToken = (user) => {
  return jwt.sign(
    { UserEmail: user.UserEmail, exp: Math.floor(Date.now() / 1000) + 60 * 15 }, // 15 min expiry
    process.env.PRIVATE_TOKEN
  );
};

// Sign refresh token
const signRefreshToken = (user) => {
  const newRefreshToken = jwt.sign(
    {
      UserEmail: user.UserEmail,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days expiry
    },
    process.env.PRIVATE_TOKEN
  );

  user.RefreshToken = newRefreshToken;
  return newRefreshToken; // Return the new token
};

// Check refresh token and issue a new access token
const checkRefreshToken = async function (user) {
  try {
    const decoded = jwt.verify(user.RefreshToken, process.env.PRIVATE_TOKEN);
    if (!decoded) {
      return { valid: false };
    }

    if (Date.now() > decoded.exp * 1000) {
      // Check expiration using exp
      user.RefreshToken = signRefreshToken(user);
      await user.save(); // Save user with new RefreshToken
    }

    const accessToken = signAccessToken(user); // Sign a new access token
    return { valid: true, accessToken };
  } catch (err) {
    logger.error(err); // Log the error
    return { valid: false }; // Return structured data
  }
};

export {
  verifyToken,
  signAccessToken,
  checkRefreshToken,
  signRefreshToken,
  logger,
};
