import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import Banner from "../Components/Home/Banner";
import PopularSongs from "../Components/Home/PopularSongs";
import Promos from "../Components/Home/Promos";
import TopRated from "../Components/Home/TopRated";
import {
  getRandomSongsAction,
  getAllSongsAction,
  getTopRatedSongAction,
} from "../Redux/Actions/SongsActions";
import toast from "react-hot-toast";

function HomeScreen() {
  const dispatch = useDispatch();

  const { isLoading, isError, songs } = useSelector(
    (state) => state.getAllSongs
  );
  const {
    isLoading: randomLoading,
    isError: randomError,
    songs: randomSongs,
  } = useSelector((state) => state.getRandomSongs);
  const {
    isLoading: topLoading,
    isError: topError,
    songs: topSongs,
  } = useSelector((state) => state.getTopRatedSongs);

  useEffect(() => {
    // get random songs
    dispatch(getRandomSongsAction());
    // get all songs
    dispatch(getAllSongsAction({}));
    // get top rated songs
    dispatch(getTopRatedSongAction());
    // errors
    if (isError || randomError || topError) {
      toast.error("Something went wrong");
    }
  }, [dispatch, isError, randomError, topError]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner songs={songs} isLoading={isLoading} />
        <PopularSongs songs={randomSongs} isLoading={randomLoading} />
        <Promos />
        <TopRated songs={topSongs} isLoading={topLoading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
