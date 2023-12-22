import asyncHandler from "express-async-handler";
import Album from "../Models/AlbumsModel.js";

// ***************  PUBLIC CONTROLLERS  ***************
// @desc      get all albums
// @route     GET /api/albums
// @access    Public

const getAlbums = asyncHandler(async (req, res) => {
  try {
    // find all albums in database
    const albums = await Album.find({});
    // send all albums to the client
    res.json(albums);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ***************  ADMIN CONTROLLERS  ***************

// @desc create new album
// @route POST /api/albums
// @access Private/Admin

const createAlbum = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const { title, releaseDate, genre } = req.body;
    // create new album
    const album = await Album.create({
      title,
      releaseDate,
      genre,
    });
    // save the album in database
    await album.save();
    // send the new album to the client
    res.status(201).json(album);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc update album
// @route PUT /api/albums/:id
// @access Private/Admin

const updateAlbum = asyncHandler(async (req, res) => {
  try {
    // get album id from request params
    const album = await Album.findById(req.params.id);

    if (album) {
      album.title = req.body.title || album.title;
      album.releaseDate = req.body.releaseDate || album.releaseDate;
      album.genre = req.body.genre || album.genre;
      // save the updated album in database
      const updatedAlbum = await album.save();
      // send the updated album to the client
      res.json(updatedAlbum);
    } else {
      res.status(404).json({ message: "Album not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc delete album
// @route DELETE /api/albums/:id
// @access Private/Admin

const deleteAlbum = asyncHandler(async (req, res) => {
  try {
    // get album id from request params
    const album = await Album.findById(req.params.id);
    if (album) {
      // delete the album from database
      await album.deleteOne({ _id: album._id });
      // send success message to the client
      res.json({ message: "Album removed" });
    } else {
      res.status(404).json({ message: "Album not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getAlbums, createAlbum, updateAlbum, deleteAlbum };
