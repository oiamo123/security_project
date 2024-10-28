import { Product } from "./db.js";
import { User } from "./db.js";
import argon2 from "argon2";
import { signRefreshToken, signAccessToken } from "./utils.js";
import { logger } from "./utils.js";

const loginUser = async function (user) {
  try {
    const { email, password } = user; // destructure
    const foundUser = await User.findOne({ where: { UserEmail: email } }); // find user

    // check user's password and email
    if (!foundUser) {
      logger.info(`Email not found on login ${email}`);
      return { message: "Invalid email or password" };
    }

    const validPassword = await argon2.verify(foundUser.UserPassword, password);
    if (!validPassword) {
      logger.info(`Password not correct for user ${email}`);
      return { message: "Invalid email or password" };
    }

    logger.info(`User ${foundUser.UserEmail} logged in successfully`);

    // Set the access token in cookies
    return {
      message: "success",
      accessToken: signAccessToken({ UserEmail: email }),
    }; // sign access token and return success message
  } catch (err) {
    logger.error(`Error logging in user ${email}: ${err}`);
    return err.message;
  }
};

const registerUser = async function (data) {
  try {
    const { email, password } = data;

    const existingUser = await User.findOne({ where: { UserEmail: email } });
    if (existingUser) {
      return "Email already in use";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address";
    }

    if (password.trim().length < 8) {
      return "Password must be at least 8 characters";
    }

    const hashedPass = await argon2.hash(password);

    const newUser = User.build({
      UserEmail: email,
      UserPassword: hashedPass,
      RefreshToken: signRefreshToken({ UserEmail: email }),
    });

    logger.info(`User ${email} registered successfully`);
    await newUser.save();
    return "Success";
  } catch (err) {
    logger.error(`Error registering user ${email}: ${err}`);
    return err;
  }
};

const getProducts = async function () {
  try {
    const products = await Product.findAll();
    return products;
  } catch (err) {
    logger.error(`Error getting products: ${err}`);
    return null;
  }
};

const getProduct = async function (id) {
  try {
    const product = await Product.findOne({ where: { ProductId: id } });
    if (product) {
      return product;
    }
  } catch (err) {
    logger.error(`Error getting product ${id}: ${err}`);
    return null;
  }
};

export { getProduct, getProducts, loginUser, logoutUser, registerUser };
