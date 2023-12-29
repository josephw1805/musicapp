import asyncHandler from "express-async-handler";
import Song from "../Models/SongsModel.js";

// @desc      get all songs
// @route     GET /api/songs
// @access    Public

const getSongs = asyncHandler(async (req, res) => {
  try {
    // filter songs by album. genre , language, rate, year and search
    const { album, genre, language, rate, year, search } = req.query;
    let query = {
      ...(album && { album }),
      ...(genre && { genre }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && {
        name: { $regex: search, $options: "i" },
      }),
    };

    // load more songs functionality
    const page = Number(req.query.pageNumber) || 1; // if pageNumber is not provided in query, set it to 1
    const limit = 5; // 5 songs per page
    const skip = (page - 1) * limit; // skip 5 songs per page

    // find songs by query, skip and limit
    const songs = await Song.find(query)
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);

    // get total number of songs
    const count = await Song.countDocuments(query);

    // send response with songs and total number of songs
    res.json({
      songs,
      page,
      pages: Math.ceil(count / limit), // total number of pages
      totalSongs: count, // total number of songs
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc      get song by id
// @route     GET /api/songs/:id
// @access    public

const getSongById = asyncHandler(async (req, res) => {
  try {
    // find song by id in database
    const song = await Song.findById(req.params.id);
    // if the song is found, send it to the client
    if (song) {
      res.json(song);
    }
    // if the song is not found send 404 error
    else {
      res.status(404);
      throw new Error("Song not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc      get top rated songs
// @route     GET /api/songs/rated/top
// @access    public

const getTopRatedSongs = asyncHandler(async (req, res) => {
  try {
    // find top rated songs
    const songs = await Song.find({}).sort({ rate: -1 });
    // send top rated songs to the client
    res.json(songs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc      get random songs
// @route     GET /api/songs/random/all
// @access    public

const getRandomSongs = asyncHandler(async (req, res) => {
  try {
    // find random songs
    const songs = await Song.aggregate([{ $sample: { size: 8 } }]);
    // send random songs to the client
    res.json(songs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ***************  PRIVATE CONTROLLERS  ***************
// @desc      Create song review
// @route     POST /api/songs/:id/reviews
// @access    Private

const createSongReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  try {
    // find song by id in database
    const song = await Song.findById(req.params.id);

    if (song) {
      // check if the user already reviewed this song
      const alreadyReviewed = song.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      // if the user already reviewed this song, send 400 error
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You already reviewed this song");
      }
      // else create a new reiview
      const review = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
      };
      // push the new review to the reviews array
      song.reviews.push(review);
      // increment the number of reviews
      song.numberOfReviews = song.reviews.length;

      // calculate the new rate
      song.rate =
        song.reviews.reduce((acc, item) => item.rating + acc, 0) /
        song.reviews.length;

      // save the song in database
      await song.save();
      // send the new song to the client
      res.status(201).json({
        message: "Review added",
      });
    } else {
      res.status(404);
      throw new Error("Song not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ***************  ADMIN CONTROLLERS  ***************

// @desc      Update song
// @route     PUT /api/songs/:id
// @access    Private/Admin

const updateSong = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      desc,
      year,
      rate,
      language,
      album,
      genre,
      image,
      titleImage,
      video,
    } = req.body;

    // find song by id in database
    const song = await Song.findById(req.params.id);

    if (song) {
      // update the song
      song.name = name || song.name;
      song.desc = desc || song.desc;
      song.year = year || song.year;
      song.rate = rate || song.rate;
      song.language = language || song.language;
      song.album = album || song.album;
      song.genre = genre || song.genre;
      song.image = image || song.image;
      song.titleImage = titleImage || song.titleImage;
      song.video = video || song.video;

      // save the song in database

      const updatedSong = await song.save();
      // send the updated song to the client
      res.status(201).json(updatedSong);
    } else {
      res.status(404);
      throw new Error("Song not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc      Delete song
// @route     DELETE /api/songs/:id
// @access    Private/Admin

const deleteSong = asyncHandler(async (req, res) => {
  try {
    // find song by id in database
    const song = await Song.findById(req.params.id);
    // if the song is found, delete it
    if (song) {
      await song.deleteOne({ _id: song._id });
      res.json({ message: "Song removed" });
    }
    // if the song is not found, send 404 error
    else {
      res.status(404);
      throw new Error("Song not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc      Delete all songs
// @route     DELETE /api/songs
// @access    Private/Admin

const deleteAllSongs = asyncHandler(async (req, res) => {
  try {
    // delete all songs
    await Song.deleteMany({});
    res.json({ message: "All songs removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc      Create Song
// @route     POST /api/songs
// @access    Private/Admin

const createSong = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      desc,
      year,
      rate,
      numberOfReviews,
      language,
      album,
      genre,
      image,
      titleImage,
      video,
      artists,
    } = req.body;

    // create a new song
    const song = new Song({
      name,
      desc,
      year,
      rate,
      numberOfReviews,
      language,
      album,
      genre,
      image,
      titleImage,
      video,
      artists,
      userId: req.user._id,
    });

    // save the song in database
    if (song) {
      const createdSong = await song.save();
      res.status(201).json(createdSong);
    } else {
      res.status(400);
      throw new Error("Invalid song data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  getSongs,
  getSongById,
  getTopRatedSongs,
  getRandomSongs,
  createSongReview,
  updateSong,
  deleteSong,
  deleteAllSongs,
  createSong,
};
