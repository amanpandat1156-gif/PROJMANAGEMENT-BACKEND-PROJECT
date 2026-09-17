import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        role: {
            type: String,
            default: "user"
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String
        },
        emailVerificationToken: {
            type: String
        },
        emailVerificationExpiry: {
            type: Date
        },
        forgotPasswordToken: {
            type: String
        },
        forgotPasswordExpiry: {
            type: Date
        }
    },
    { timestamps: true }
);

// Password hashing before save
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password, 10);
    
});

// Password check method
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Access token generator
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET || "access_secret_placeholder",
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d"
        }
    );
};

// Refresh token generator
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET || "refresh_secret_placeholder",
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d"
        }
    );
};

// Temporary token generator for email verification
userSchema.methods.generateTemporaryToken = function () {
    const unhashedToken = crypto.randomBytes(20).toString("hex");
    const hashToken = crypto
        .createHash("sha256")
        .update(unhashedToken)
        .digest("hex");
    const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes

    return {
        unhashedToken,
        unHashedToken: unhashedToken,
        hashToken,
        hashedToken: hashToken,
        tokenExpiry
    };
};

export const User = mongoose.model("User", userSchema);