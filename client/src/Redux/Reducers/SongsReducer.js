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
