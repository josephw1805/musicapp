import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import bc from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";

// @desc Register user
// @route POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;
  try {
    const userExists = await User.findOne({ email });
    // check if user exists
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // hash password
    const salt = await bc.genSalt();
    const hashedPassword = await bc.hash(password, salt);

    // create user in DB
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      image,
    });

    // if user created successfully send user data and token to client
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // find user in DB
    const user = await User.findOne({ email });
    // if user exists compare password with hashed password then send user data and token to client
    if (user && (await bc.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      // if user not found or password not match send error message
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ******** PRIVATE CONTROLLER ********

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, image } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists update user date and save it in DB
    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.image = image || user.image;

      const updateUser = await user.save();
      // send updated user data and token to client
      res.json({
        _id: updateUser._id,
        fullName: updateUser.fullName,
        email: updateUser.email,
        image: updateUser.image,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
      });
    } else {
      // else send error message
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete user profile
// @route DELETE /api/users
// @access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists delete user from DB
    if (user) {
      // if user is admin throw error message
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't delete admin user");
      }
      // else delete user from DB
      await user.deleteOne({ _id: user._id });
      res.json({ message: "User deleted successfully" });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Change user password
// @route PUT /api/users/password
// @access Private
const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists compare old password with hashed password then update user password and save it in DB
    if (user && (await bc.compare(oldPassword, user.password))) {
      // hash new password
      const salt = await bc.genSalt();
      const hashedPassword = await bc.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: "Password changed!!" });
    }
    // else send error message
    else {
      res.status(401);
      throw new Error("Invalid old password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get all liked songs
// @route GET /api/users/favorites
// @access Private
const getLikedSongs = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id).populate("likedSongs");
    // if user exists send liked songs to client
    if (user) {
      res.json(user.likedSongs);
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Add song to liked songs
// @route PUT /api/users/favorites
// @access Private
const addLikedSong = asyncHandler(async (req, res) => {
  const { songId } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists add song to liked songs and save it in DB
    if (user) {
      // check if song is already liked
      // if song already liked send error message
      if (user.likedSongs.includes(songId)) {
        res.status(400);
        throw new Error("Song already liked");
      }
      // else add song to liked songs and save it in DB
      user.likedSongs.push(songId);
      await user.save();
      res.json(user.likedSongs);
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Song not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete all liked songs
// @route DELETE /api/users/favorites
// @access Private
const deleteLikedSongs = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists delete all liked songs and save it in DB
    if (user) {
      user.likedSongs = [];
      await user.save();
      res.json({ message: "Your favorites songs deleted successfully" });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ******** ADMIN CONTROLLER ********

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    // find all users in DB
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.params.id);
    // if user exists delete user from DB
    if (user) {
      // if user is admin throw error message
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't delete admin user");
      }
      // else delete user from DB
      await user.deleteOne({ _id: user._id });
      res.json({ message: "User deleted successfully" });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getLikedSongs,
  addLikedSong,
  deleteLikedSongs,
  getUsers,
  deleteUser,
};
