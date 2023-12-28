import * as AlbumsConstants from "../Constants/albumConstants";
import * as AlbumsAPIs from "../APIs/AlbumsService";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// Get all albums action
export const getAlbumsAction = () => async (dispatch) => {
  try {
    dispatch({ type: AlbumsConstants.GET_ALL_ALBUMS_REQUEST });
    const data = await AlbumsAPIs.getAlbumsService();
    dispatch({
      type: AlbumsConstants.GET_ALL_ALBUMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, AlbumsConstants.GET_ALL_ALBUMS_FAIL);
  }
};

// Create album action
export const createAlbumAction =
  (title, genre, releaseDate) => async (dispatch, getState) => {
    try {
      dispatch({ type: AlbumsConstants.CREATE_ALBUM_REQUEST });
      await AlbumsAPIs.createAlbumService(
        title,
        genre,
        releaseDate,
        tokenProtection(getState)
      );

      dispatch({
        type: AlbumsConstants.CREATE_ALBUM_SUCCESS,
      });
      toast.success("Album created successfully");
      dispatch(getAlbumsAction());
    } catch (error) {
      ErrorsAction(error, dispatch, AlbumsConstants.CREATE_ALBUM_FAIL);
    }
  };

// Update album action
export const updateAlbumAction =
  (id, title, genre, releaseDate) => async (dispatch, getState) => {
    try {
      dispatch({ type: AlbumsConstants.UPDATE_ALBUM_REQUEST });
      await AlbumsAPIs.updateAlbumService(
        id,
        title,
        genre,
        releaseDate,
        tokenProtection(getState)
      );
      dispatch({
        type: AlbumsConstants.UPDATE_ALBUM_SUCCESS,
      });
      toast.success("Album updated successfully");
      dispatch(getAlbumsAction());
    } catch (error) {
      ErrorsAction(error, dispatch, AlbumsConstants.UPDATE_ALBUM_FAIL);
    }
  };

// Delete album action
export const deleteAlbumAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: AlbumsConstants.DELETE_ALBUM_REQUEST });
    await AlbumsAPIs.deleteAlbumService(id, tokenProtection(getState));
    dispatch({
      type: AlbumsConstants.DELETE_ALBUM_SUCCESS,
    });
    toast.success("Album deleted successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, AlbumsConstants.DELETE_ALBUM_FAIL);
  }
};
