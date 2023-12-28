import Axios from "./Axios";

// **** PUBLIC APIs ****

// Get all albums API function
const getAlbumsService = async () => {
  const { data } = await Axios.get("/albums");
  return data;
};

// **** ADMIN APIs ****

// create new album API function
const createAlbumService = async (title, genre, releaseDate, token) => {
  const { data } = await Axios.post(
    "/albums",
    { title, genre, releaseDate },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// update album API function
const updateAlbumService = async (id, title, genre, releaseDate, token) => {
  const { data } = await Axios.put(
    `/albums/${id}`,
    { title, genre, releaseDate },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// delete album API function
const deleteAlbumService = async (id, token) => {
  const { data } = await Axios.delete(`/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  getAlbumsService,
  createAlbumService,
  updateAlbumService,
  deleteAlbumService,
};
