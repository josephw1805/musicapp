import Axios from "./Axios";

// **** PUBLIC APIs ****

// get all songs API function
const getAllSongsService = async ({
  album,
  genre,
  language,
  rate,
  year,
  search,
  pageNumber,
}) => {
  const { data } = await Axios.get(
    `/songs?album=${album}&genre=${genre}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
  );
  return data;
};

// get random song API function
const getRandomSongService = async () => {
  const { data } = await Axios.get("/songs/random/all");
  return data;
};

// get song by id API function
const getSongByIdService = async (id) => {
  const { data } = await Axios.get(`/songs/${id}`);
  return data;
};

// get top rated songs API function
const getTopRatedSongsService = async () => {
  const { data } = await Axios.get("/songs/rated/top");
  return data;
};

export {
  getAllSongsService,
  getRandomSongService,
  getSongByIdService,
  getTopRatedSongsService,
};
