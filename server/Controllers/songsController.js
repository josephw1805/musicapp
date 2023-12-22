import asyncHandler from "express-async-handler";
import Song from "../Models/SongsModel.js";
import { Songs } from "../Data/SongData.js";

// ***************  PUBLIC CONTROLLERS  ***************
// @desc      import songs
// @route     POST /api/songs/import
// @access    Public

const importSongs = asyncHandler(async (req, res) => {
  // make sure Songs table is empty by deleting all documents
  await Song.deleteMany({});
  // then insert all songs from SongsData
  const songs = await Song.insertMany(Songs);
  res.status(201).json(songs);
});

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
    const page = Number(req.query.pageNumber) || 1;
    const limit = 2;
    const skip = (page - 1) * limit;

    // find songs by query, skip and limit
    const songs = await Song.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // get total number of songs
    const count = await Song.countDocuments(query);

    // send response with songs and total number of songs
    res.json({
      songs,
      page,
      pages: Math.ceil(count / limit),
      totalSongs: count,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { importSongs, getSongs };
