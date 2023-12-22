import { useEffect, useState } from "react";
import AlbumModal from "../../../Components/Modals/AlbumModal";
import Table from "../../../Components/Table2";
import { AlbumsData } from "../../../Data/AlbumsData";
import SideBar from "../SideBar";
import { HiPlusCircle } from "react-icons/hi";

function Albums() {
  const [modalOpen, setModalOpen] = useState(false);
  const [album, setAlbum] = useState();

  const OnEditFunction = (id) => {
    setAlbum(id);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (!modalOpen) {
      setAlbum(null);
    }
  }, [modalOpen]);

  return (
    <SideBar>
      <AlbumModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        album={album}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className=" text-xl font-bold">Albums</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
          >
            <HiPlusCircle /> Create
          </button>
        </div>

        <Table
          data={AlbumsData}
          users={false}
          OnEditFunction={OnEditFunction}
        />
      </div>
    </SideBar>
  );
}

export default Albums;
