import Layout from "../Layout/Layout";
import Banner from "../Components/Home/Banner";
import PopularSongs from "../Components/Home/PopularSongs";
import Promos from "../Components/Home/Promos";
import TopRated from "../Components/Home/TopRated";

function HomeScreen() {
  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner />
        <PopularSongs />
        <Promos />
        <TopRated />
      </div>
    </Layout>
  );
}

export default HomeScreen;
