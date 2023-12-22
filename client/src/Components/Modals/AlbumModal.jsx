import { Input } from "../UsedInput";
import MainModal from "./MainModal";

function AlbumModal({ modalOpen, setModalOpen, album }) {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">{album ? "Update" : "Create"}</h2>
        <form className="flex flex-col gap-6 text-left mt-6">
          <Input
            label="Title"
            placeholder={album ? album.title : "Enter album title"}
            type="text"
            bg={false}
          />
          <Input
            label="Genre"
            placeholder={album ? album.genre : "Enter album genre"}
            type="text"
            bg={false}
          />
          <Input
            label="Release Date"
            placeholder={album ? album.releaseDate : "DD MM YYYY"}
            type="text"
            bg={false}
          />
          <button
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 font-lg hover:bg-dry transitions border-2 border-subMain rounded bg-subMain text-white"
          >
            {album ? "Update" : "Create"}
          </button>
          <button className='w-full flex-rows gap-4 py-3 font-lg hover:bg-subMain transitions border-2 border-subMain rounded bg-dry text-white' onClick={() => setModalOpen(false)}>Cancel</button>
        </form>
      </div>
    </MainModal>
  );
}

export default AlbumModal;
