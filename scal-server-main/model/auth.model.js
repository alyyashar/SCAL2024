const mongoose = require('mongoose');
const crypto = require('crypto');

// User schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    bio: {
      type: String,
      default: 'I am a SCAL User',
    },
    scan: [
      {
        analysisName: String,
        noOfVulns: String,
        output: { type: Array, default: [] },
        scanPeriod: String,
        fileType: String,
        toolUsed: [String],
      },
    ],
    profilePicture: {
      type: String,
      default: 'https://www.ommel.fi/content/uploads/2019/03/dummy-profile-image-male.jpg',
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: 'Admin',
    },
    resetPasswordLink: {
      data: String,
      default: '',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: '',
    },
    emailVerificationTokenExpiry: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual field for password
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// Methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
};

module.exports = mongoose.model('User', userSchema);
