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

export { getAllSongsService };
