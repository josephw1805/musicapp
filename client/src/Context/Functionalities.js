import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { likeSongAction } from "../Redux/Actions/userActions";
import Axios from "../Redux/APIs/Axios";
import { IoMdCloudDownload } from "react-icons/io";

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

// download video url functionality
const DownloadVideo = async (videoUrl, setProgress) => {
  const { data } = await Axios({
    url: videoUrl,
    method: "GET",
    responseType: "blob",
    onDownloadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setProgress(percent);
      if (percent > 0 && percent < 100) {
        toast.loading(`Downloading... ${percent}%`, {
          id: "download",
          duration: 10000,
          position: "bottom-center",
          style: {
            background: "#0B0F29",
            color: "#fff",
            borderRadius: "10px",
            border: ".5px solid #F20000",
            padding: "16px",
          },
          icon: <IoMdCloudDownload className="text-2xl mr-2 text-subMain" />,
        });
      } else {
        toast.dismiss("download");
      }
    },
  });
  return data;
};

export { SongLiked, LikeSong, DownloadVideo };
