import NavBar from "./Navbar/NavBar";
import Footer from "./Footer/Footer";
import MobileFooter from "./Footer/MobileFooter";

function Layout({ children }) {
  return (
    <>
      <main className="bg-main text-white select-none min-h-screen">
        <NavBar />
        <div className="flex-grow flex-1">{children}</div>
        <Footer />
        {/* mobile footer */}
        <MobileFooter />
      </main>
    </>
  );
}

export default Layout;
