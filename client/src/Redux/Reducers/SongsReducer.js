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
