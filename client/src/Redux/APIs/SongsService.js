import Axios from "./Axios";

// **** PUBLIC APIs ****

// get all songs API
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

// get random song API
const getRandomSongService = async () => {
  const { data } = await Axios.get("/songs/random/all");
  return data;
};

// get song by id API
const getSongByIdService = async (id) => {
  const { data } = await Axios.get(`/songs/${id}`);
  return data;
};

// get top rated songs API
const getTopRatedSongsService = async () => {
  const { data } = await Axios.get("/songs/rated/top");
  return data;
};

// review song API
const reviewSongService = async (token, id, review) => {
  const { data } = await Axios.post(`/songs/${id}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete song API
const deleteSongService = async (token, id) => {
  const { data } = await Axios.delete(`/songs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete all songs API
const deleteAllSongsService = async (token) => {
  const { data } = await Axios.delete("/songs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// create song API
const createSongService = async (token, song) => {
  const { data } = await Axios.post("/songs", song, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  getAllSongsService,
  getRandomSongService,
  getSongByIdService,
  getTopRatedSongsService,
  reviewSongService,
  deleteSongService,
  deleteAllSongsService,
  createSongService,
};
