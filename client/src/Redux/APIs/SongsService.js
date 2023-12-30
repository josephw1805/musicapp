import Axios from "./Axios";

// **** PUBLIC APIs ****

// get all songs API
export const getAllSongsService = async ({
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
export const getRandomSongService = async () => {
  const { data } = await Axios.get("/songs/random/all");
  return data;
};

// get song by id API
export const getSongByIdService = async (id) => {
  const { data } = await Axios.get(`/songs/${id}`);
  return data;
};

// get top rated songs API
export const getTopRatedSongsService = async () => {
  const { data } = await Axios.get("/songs/rated/top");
  return data;
};

// review song API
export const reviewSongService = async (token, id, review) => {
  const { data } = await Axios.post(`/songs/${id}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete song API
export const deleteSongService = async (token, id) => {
  const { data } = await Axios.delete(`/songs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete all songs API
export const deleteAllSongsService = async (token) => {
  const { data } = await Axios.delete("/songs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// create song API
export const createSongService = async (token, song) => {
  const { data } = await Axios.post("/songs", song, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update song API
export const updateSongService = async (token, id, song) => {
  const { data } = await Axios.put(`/songs/${id}`, song, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
