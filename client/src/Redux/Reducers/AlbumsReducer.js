import * as AlbumsConstants from "../Constants/albumConstants";

// GET ALL ALBUMS
export const getAllAlbumsReducer = (state = { albums: [] }, action) => {
  switch (action.type) {
    case AlbumsConstants.GET_ALL_ALBUMS_REQUEST:
      return { isLoading: true };
    case AlbumsConstants.GET_ALL_ALBUMS_SUCCESS:
      return { isLoading: false, albums: action.payload };
    case AlbumsConstants.GET_ALL_ALBUMS_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE ALBUM
export const createAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case AlbumsConstants.CREATE_ALBUM_REQUEST:
      return { isLoading: true };
    case AlbumsConstants.CREATE_ALBUM_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case AlbumsConstants.CREATE_ALBUM_FAIL:
      return { isLoading: false, isError: action.payload };
    case AlbumsConstants.CREATE_ALBUM_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE ALBUM
export const updateAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case AlbumsConstants.UPDATE_ALBUM_REQUEST:
      return { isLoading: true };
    case AlbumsConstants.UPDATE_ALBUM_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case AlbumsConstants.UPDATE_ALBUM_FAIL:
      return { isLoading: false, isError: action.payload };
    case AlbumsConstants.UPDATE_ALBUM_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE ALBUM
export const deleteAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case AlbumsConstants.DELETE_ALBUM_REQUEST:
      return { isLoading: true };
    case AlbumsConstants.DELETE_ALBUM_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case AlbumsConstants.DELETE_ALBUM_FAIL:
      return { isLoading: false, isError: action.payload };
    case AlbumsConstants.DELETE_ALBUM_RESET:
      return {};
    default:
      return state;
  }
};
