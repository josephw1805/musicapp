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
