import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Songs } from "../Data/SongData";
import SongInfo from "../Components/Single/SongInfo";
import SongArtist from "../Components/Single/SongArtist";
import SongRates from "../Components/Single/SongRates";
import Titles from "../Components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import Song from "../Components/Song";
import ShareSongModal from "../Components/Modals/ShareModal";
import { useState } from "react";

function SingleSong() {
  const [modalOpen, setModalOpen] = useState(false);

  const { id } = useParams();
  const song = Songs.find((song) => song.id === id);
  const RelatedSongs = Songs.filter(
    (relatedSong) => relatedSong.album === song.album
  ).filter((uniqueSong) => uniqueSong.id !== song.id);

  return (
    <Layout>
      <ShareSongModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        song={song}
      />
      <SongInfo song={song} setModalOpen={setModalOpen} />
      <div className="container mx-auto min-h-screen px-2 my-6">
        <SongArtist />
        {/* rates */}
        <SongRates song={song} />
        {/* related */}
        <div className="my-16">
          <Titles title="Related Songs" Icon={BsCollectionFill} />
          <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
            {RelatedSongs.map((song, index) => (
              <Song key={index} song={song} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SingleSong;
