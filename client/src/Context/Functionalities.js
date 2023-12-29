import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { likeSongAction } from "../Redux/Actions/userActions";

// check if song is added to favorites
const SongLiked = (song) => {
  const { likedSongs } = useSelector((state) => state.userGetFavoriteSongs);
  return likedSongs?.find((likedSong) => likedSong?._id === song?._id);
};

// like song functionality
const LikeSong = (song, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Please login to like songs")
    : dispatch(
        likeSongAction({
          songId: song?._id,
        })
      );
};

export { SongLiked, LikeSong };
