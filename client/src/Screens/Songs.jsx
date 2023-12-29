import Filters from "../Components/Filters";
import Layout from "../Layout/Layout";
import Song from "../Components/Song";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../Components/Notifications/Loader";
import { RiMusic2Line } from "react-icons/ri";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { getAllSongsAction } from "../Redux/Actions/SongsActions";
import { GenreData, RatesData, YearData } from "../Data/Filter";
import { useParams } from "react-router-dom";

function SongsPage() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const [album, setAlbum] = useState({ title: "All Albums" });
  const [year, setYear] = useState(YearData[0]);
  const [genre, setGenre] = useState(GenreData[0]);
  const [rate, setRate] = useState(RatesData[0]);

  // all songs
  const { isLoading, isError, songs, pages, page } = useSelector(
    (state) => state.getAllSongs
  );

  // get all albums
  const { albums } = useSelector((state) => state.albumGetAll);

  // queries
  const queries = useMemo(() => {
    const query = {
      album: album?.title === "All Albums" ? "" : album?.title,
      genre: genre?.title === "Sort By Genre" ? "" : genre?.title,
      year: year?.title.replace(/\D/g, ""),
      rate: rate?.title.replace(/\D/g, ""),
      search: search ?? "",
    };
    return query;
  }, [album, genre, rate, year, search]);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    // get all songs
    dispatch(getAllSongsAction(queries));
  }, [dispatch, isError, queries]);

  // pagination next and pev pages
  const nextPage = () => {
    dispatch(
      getAllSongsAction({
        ...queries,
        pageNumber: page + 1,
      })
    );
  };

  const prevPage = () => {
    dispatch(
      getAllSongsAction({
        ...queries,
        pageNumber: page - 1,
      })
    );
  };

  const datas = {
    albums,
    album,
    setAlbum,
    year,
    setYear,
    genre,
    setGenre,
    rate,
    setRate,
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters data={datas} />
        {isLoading ? (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <Loader />
          </div>
        ) : songs?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {songs.map((song, index) => (
                <Song key={index} song={song} />
              ))}
            </div>
            {/* Loading more */}
            <div className="w-full flex-rows gap-6 md:my-20 my-10">
              <button
                disabled={page === 1}
                onClick={prevPage}
                className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain"
              >
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button
                disabled={page === pages}
                onClick={nextPage}
                className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain"
              >
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
              <RiMusic2Line />
            </div>
            <p className="text-border text-sm">
              It seem's like we don't have any songs
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SongsPage;
