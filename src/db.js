import { DataTypes, Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Authenticate the database connection
async function authenticateDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}
authenticateDatabase();

// Initialize User model
const User = sequelize.define(
  "User",
  {
    UserEmail: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    UserPassword: {
      type: DataTypes.STRING,
      allowNull: false, // It's good practice to set this
    },
    RefreshToken: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: false,
  }
);

// Initialize Product model
const Product = sequelize.define(
  "Product",
  {
    ProductId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ProductPrice: {
      type: DataTypes.DECIMAL(19, 2),
      allowNull: false,
    },
    ProductName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ProductDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Export models and sequelize instance
export { User, Product };
