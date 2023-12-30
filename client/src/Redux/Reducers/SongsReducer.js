import * as SongsConstants from "../Constants/SongConstants";

// Get all songs
export const songsListReducer = (state = { songs: [] }, action) => {
  switch (action.type) {
    case SongsConstants.SONGS_LIST_REQUEST:
      return { isLoading: true };
    case SongsConstants.SONGS_LIST_SUCCESS:
      return {
        isLoading: false,
        songs: action.payload.songs,
        pages: action.payload.pages,
        page: action.payload.page,
        totalSongs: action.payload.totalSongs,
      };
    case SongsConstants.SONGS_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET RANDOM SONG
export const songsRandomReducer = (state = { songs: [] }, action) => {
  switch (action.type) {
    case SongsConstants.SONGS_RANDOM_REQUEST:
      return { isLoading: true };
    case SongsConstants.SONGS_RANDOM_SUCCESS:
      return { isLoading: false, songs: action.payload };
    case SongsConstants.SONGS_RANDOM_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET SONG BY ID
export const songDetailsReducer = (state = { song: {} }, action) => {
  switch (action.type) {
    case SongsConstants.SONGS_DETAILS_REQUEST:
      return { isLoading: true };
    case SongsConstants.SONGS_DETAILS_SUCCESS:
      return { isLoading: false, song: action.payload };
    case SongsConstants.SONGS_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case SongsConstants.SONGS_DETAILS_RESET:
      return { song: {} };
    default:
      return state;
  }
};

// GET TOP RATED SONGS
export const songTopRatedReducer = (state = { songs: [] }, action) => {
  switch (action.type) {
    case SongsConstants.SONGS_TOP_RATED_REQUEST:
      return { isLoading: true };
    case SongsConstants.SONGS_TOP_RATED_SUCCESS:
      return { isLoading: false, songs: action.payload };
    case SongsConstants.SONGS_TOP_RATED_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE REVIEW
export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case SongsConstants.CREATE_REVIEW_REQUEST:
      return { isLoading: true };
    case SongsConstants.CREATE_REVIEW_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case SongsConstants.CREATE_REVIEW_FAIL:
      return { isLoading: false, isError: action.payload };
    case SongsConstants.CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE SONG
export const deleteSongReducer = (state = {}, action) => {
  switch (action.type) {
    case SongsConstants.DELETE_SONG_REQUEST:
      return { isLoading: true };
    case SongsConstants.DELETE_SONG_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case SongsConstants.DELETE_SONG_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// DELETE ALL SONGS
export const deleteAllSongsReducer = (state = {}, action) => {
  switch (action.type) {
    case SongsConstants.DELETE_ALL_SONGS_REQUEST:
      return { isLoading: true };
    case SongsConstants.DELETE_ALL_SONGS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case SongsConstants.DELETE_ALL_SONGS_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE SONG
export const createSongReducer = (state = {}, action) => {
  switch (action.type) {
    case SongsConstants.CREATE_SONG_REQUEST:
      return { isLoading: true };
    case SongsConstants.CREATE_SONG_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case SongsConstants.CREATE_SONG_FAIL:
      return { isLoading: false, isError: action.payload };
    case SongsConstants.CREATE_SONG_RESET:
      return {};
    default:
      return state;
  }
};

// ARTISTS
export const ArtistsReducer = (state = { artists: [] }, action) => {
  switch (action.type) {
    case SongsConstants.ADD_ARTIST:
      return { artists: [...state.artists, action.payload] };
    case SongsConstants.EDIT_ARTIST:
      const updatedArtists = state.artists.map((artist) =>
        artist.id === action.payload.id ? action.payload : artist
      );
      return { artists: updatedArtists };
    case SongsConstants.DELETE_ARTIST:
      return {
        ...state,
        artists: state.artists.filter((artist) => artist.id !== action.payload),
      };
    case SongsConstants.RESET_ARTIST:
      return { artists: [] };
    default:
      return state;
  }
};

// UPDATE SONG
export const updateSongReducer = (state = {}, action) => {
  switch (action.type) {
    case SongsConstants.UPDATE_SONG_REQUEST:
      return { isLoading: true };
    case SongsConstants.UPDATE_SONG_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case SongsConstants.UPDATE_SONG_FAIL:
      return { isLoading: false, isError: action.payload };
    case SongsConstants.UPDATE_SONG_RESET:
      return {};
    default:
      return state;
  }
};
