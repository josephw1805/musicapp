import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as Album from "./Reducers/AlbumsReducer";
import * as Song from "./Reducers/SongsReducer";

const rootReducer = combineReducers({
  // user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  userChangePassword: User.userChangePasswordReducer,
  userGetFavoriteSongs: User.userGetFavoriteSongsReducer,
  userDeleteFavoriteSongs: User.userDeleteFavoriteSongsReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUserReducer,

  // album reducers
  albumGetAll: Album.getAllAlbumsReducer,
  albumCreate: Album.createAlbumReducer,
  albumUpdate: Album.updateAlbumReducer,
  albumDelete: Album.deleteAlbumReducer,

  // song reducers
  getAllSongs: Song.songsListReducer,
  getRandomSongs: Song.songsRandomReducer,
  getSongById: Song.songDetailsReducer,
  getTopRatedSongs: Song.songTopRatedReducer,
});

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// initialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
