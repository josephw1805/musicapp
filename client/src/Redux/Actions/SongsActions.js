import * as SongsConstants from "../Constants/SongConstants";
import * as SongsAPIs from "../APIs/SongsService";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// get all songs action
export const getAllSongsAction =
  ({
    album = "",
    genre = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: SongsConstants.SONGS_LIST_REQUEST });
      const response = await SongsAPIs.getAllSongsService({
        album,
        genre,
        language,
        rate,
        year,
        search,
        pageNumber,
      });
      dispatch({ type: SongsConstants.SONGS_LIST_SUCCESS, payload: response });
    } catch (error) {
      ErrorsAction(error, dispatch, SongsConstants.SONGS_LIST_FAIL);
    }
  };

// get random song action
export const getRandomSongsAction = () => async (dispatch) => {
  try {
    dispatch({ type: SongsConstants.SONGS_RANDOM_REQUEST });
    const response = await SongsAPIs.getRandomSongService();
    dispatch({ type: SongsConstants.SONGS_RANDOM_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, SongsConstants.SONGS_RANDOM_FAIL);
  }
};

// get song by id action
export const getSongByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SongsConstants.SONGS_DETAILS_REQUEST });
    const response = await SongsAPIs.getSongByIdService(id);
    dispatch({ type: SongsConstants.SONGS_DETAILS_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, SongsConstants.SONGS_DETAILS_FAIL);
  }
};

// get top rated song action
export const getTopRatedSongAction = () => async (dispatch) => {
  try {
    dispatch({ type: SongsConstants.SONGS_TOP_RATED_REQUEST });
    const response = await SongsAPIs.getTopRatedSongsService();
    dispatch({
      type: SongsConstants.SONGS_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, SongsConstants.SONGS_TOP_RATED_FAIL);
  }
};
