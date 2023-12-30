import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import SongInfo from "../Components/Single/SongInfo";
import SongArtist from "../Components/Single/SongArtist";
import SongRates from "../Components/Single/SongRates";
import Titles from "../Components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import Song from "../Components/Song";
import ShareSongModal from "../Components/Modals/ShareModal";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongByIdAction } from "../Redux/Actions/SongsActions";
import Loader from "../Components/Notifications/Loader";
import NotFound from "../Screens/NotFound";
import { SidebarContext } from "../Context/DrawerContext";
import { DownloadVideo } from "../Context/Functionalities";
import FileSaver from "file-saver";

function SingleSong() {
  const [modalOpen, setModalOpen] = useState(false);
  const { progress, setProgress } = useContext(SidebarContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, song } = useSelector(
    (state) => state.getSongById
  );
  const { songs } = useSelector((state) => state.getAllSongs);

  // related songs
  const RelatedSongs = songs
    ?.filter((relatedSong) => relatedSong.album === song?.album)
    .filter((relatedSong) => relatedSong._id !== song?._id);

  // download song video
  const DownloadSongVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

  useEffect(() => {
    // song id
    dispatch(getSongByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className="w-full gap-6 flex-colo min-h-screen">
          <Loader />
        </div>
      ) : isError ? (
        <NotFound />
      ) : (
        <>
          <ShareSongModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            song={song}
          />
          <SongInfo
            song={song}
            setModalOpen={setModalOpen}
            DownloadSongVideo={DownloadSongVideo}
            progress={progress}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <SongArtist song={song} />
            {/* rates */}
            <SongRates song={song} />
            {/* related */}
            {RelatedSongs?.length > 0 && (
              <div className="my-16">
                <Titles title="Related Songs" Icon={BsCollectionFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {RelatedSongs?.map((song) => (
                    <Song key={song?._id} song={song} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleSong;
