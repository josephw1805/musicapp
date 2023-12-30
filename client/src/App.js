import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import AboutUs from "./Screens/AboutUs";
import NotFound from "./Screens/NotFound";
import ContactUs from "./Screens/ContactUs";
import SongsPage from "./Screens/Songs";
import SingleSong from "./Screens/SingleSong";
import WatchPage from "./Screens/WatchPage";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Profile from "./Screens/Dashboard/Profile";
import Aos from "aos";
import Password from "./Screens/Dashboard/Password";
import FavoritesSongs from "./Screens/Dashboard/FavoritesSongs";
import SongList from "./Screens/Dashboard/Admin/SongList";
import Dashboard from "./Screens/Dashboard/Admin/Dashboard";
import Albums from "./Screens/Dashboard/Admin/Albums";
import Users from "./Screens/Dashboard/Admin/Users";
import AddSong from "./Screens/Dashboard/Admin/AddSong";

import ScrollToTop from "./util/ScrollToTop";
import DrawerContext from "./Context/DrawerContext";
import ToastContainer from "./Components/Notifications/ToastContainer";
import { ProtectedRouter, AdminProtectedRouter } from "./ProtectedRouter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAlbumsAction } from "./Redux/Actions/AlbumsActions";
import { getAllSongsAction } from "./Redux/Actions/SongsActions";
import { getFavoriteSongsAction } from "./Redux/Actions/userActions";
import toast from "react-hot-toast";

function App() {
  Aos.init();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isError, isSuccess } = useSelector((state) => state.userLikeSong);
  const { isError: albumError } = useSelector((state) => state.albumGetAll);

  useEffect(() => {
    dispatch(getAlbumsAction());
    dispatch(getAllSongsAction({}));
    if (userInfo) {
      dispatch(getFavoriteSongsAction());
    }
    if (isError || albumError) {
      toast.error(isError || albumError);
      dispatch({ type: "LIKE_SONG_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "LIKE_SONG_RESET" });
    }
  }, [dispatch, userInfo, isError, albumError, isSuccess]);

  return (
    <>
      <ToastContainer />
      <DrawerContext>
        <ScrollToTop>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/songs" element={<SongsPage />} />
            <Route path="/songs/:search" element={<SongsPage />} />
            <Route path="/song/:id" element={<SingleSong />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<NotFound />} />
            {/* PRIVATE ROUTES */}
            <Route element={<ProtectedRouter />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/password" element={<Password />} />
              <Route path="/favorites" element={<FavoritesSongs />} />
              <Route element={<AdminProtectedRouter />}>
                {/* ADMIN ROUTES */}
                <Route path="/songslist" element={<SongList />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/users" element={<Users />} />
                <Route path="/addsong" element={<AddSong />} />
              </Route>
            </Route>
          </Routes>
        </ScrollToTop>
      </DrawerContext>
    </>
  );
}

export default App;
