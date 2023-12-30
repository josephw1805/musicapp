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

// review song action
export const reviewSongAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SongsConstants.CREATE_REVIEW_REQUEST });
      const response = await SongsAPIs.reviewSongService(
        tokenProtection(getState),
        id,
        review
      );
      dispatch({
        type: SongsConstants.CREATE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Review added successfully");
      dispatch({ type: SongsConstants.CREATE_REVIEW_RESET });
      dispatch(getSongByIdAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, SongsConstants.CREATE_REVIEW_FAIL);
    }
  };

// delete song action
export const deleteSongAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SongsConstants.DELETE_SONG_REQUEST });
    const response = await SongsAPIs.deleteSongService(
      tokenProtection(getState),
      id
    );
    dispatch({
      type: SongsConstants.DELETE_SONG_SUCCESS,
      payload: response,
    });
    toast.success("Song deleted successfully");
    dispatch(getAllSongsAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, SongsConstants.DELETE_SONG_FAIL);
  }
};

// delete all songs action
export const deleteAllSongsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SongsConstants.DELETE_ALL_SONGS_REQUEST });
    const response = await SongsAPIs.deleteAllSongsService(
      tokenProtection(getState)
    );
    dispatch({
      type: SongsConstants.DELETE_ALL_SONGS_SUCCESS,
      payload: response,
    });
    toast.success("All songs deleted successfully");
    dispatch(getAllSongsAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, SongsConstants.DELETE_ALL_SONGS_FAIL);
  }
};

// create song action
export const createSongAction = (song) => async (dispatch, getState) => {
  try {
    dispatch({ type: SongsConstants.CREATE_SONG_REQUEST });
    const response = await SongsAPIs.createSongService(
      tokenProtection(getState),
      song
    );
    dispatch({
      type: SongsConstants.CREATE_SONG_SUCCESS,
      payload: response,
    });
    toast.success("Song created successfully");
    dispatch(deleteAllArtistAction());
  } catch (error) {
    ErrorsAction(error, dispatch, SongsConstants.CREATE_SONG_FAIL);
  }
};

// update song action
export const updateSongAction = (id, song) => async (dispatch, getState) => {
  try {
    dispatch({ type: SongsConstants.UPDATE_SONG_REQUEST });
    const response = await SongsAPIs.updateSongService(
      tokenProtection(getState),
      id,
      song
    );
    dispatch({
      type: SongsConstants.UPDATE_SONG_SUCCESS,
      payload: response,
    });
    toast.success("Song updated successfully");
    dispatch(getSongByIdAction(id));
    dispatch(deleteAllArtistAction());
  } catch (error) {
    ErrorsAction(error, dispatch, SongsConstants.UPDATE_SONG_FAIL);
  }
};

// ********ARTIST********

// add artist
export const addArtistAction = (artist) => async (dispatch, getState) => {
  dispatch({
    type: SongsConstants.ADD_ARTIST,
    payload: artist,
  });
  localStorage.setItem("artists", JSON.stringify(getState().artists.artists));
};

// remove artist
export const removeArtistAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: SongsConstants.DELETE_ARTIST,
    payload: id,
  });
  localStorage.setItem("artists", JSON.stringify(getState().artists.artists));
};

// update artist
export const updateArtistAction = (artist) => async (dispatch, getState) => {
  dispatch({
    type: SongsConstants.EDIT_ARTIST,
    payload: artist,
  });
  localStorage.setItem("artists", JSON.stringify(getState().artists.artists));
};

// delete artist
export const deleteAllArtistAction = () => async (dispatch) => {
  dispatch({ type: SongsConstants.RESET_ARTIST });
  localStorage.removeItem("artists");
};
