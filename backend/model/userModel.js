const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name"],
      maxLength: [30, "name cannot exceed 30 character"],
      minLength: [4, "name shoud have at least 4 character"],
    },

    email: {
      type: String,
      required: [true, "please enter email"],
      unique: true,
      validate: [validator.isEmail, " plese enter valid email"],
    },

    password: {
      type: String,
      required: [true, "please enter password"],
      minLength: [8, "password shoud have more than  8 character"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },

    role: {
      type: String,
      default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

// COMPARE PASSWORD

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// PASSWORD RESET TOKEN

userSchema.methods.getResetPasswordToken = function () {
  // GENERATING TOKEN
  const resetToken = crypto.randomBytes(20).toString("hex");

  // HASHING AND ADDING RESETPASSWORDTOKEN TO USERSCHEMA
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
