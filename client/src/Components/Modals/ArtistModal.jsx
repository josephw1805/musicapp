import { Input } from "../UsedInput";
import Uploader from "../../Components/Uploader";
import MainModal from "./MainModal";

function ArtistModal({ modalOpen, setModalOpen, artist }) {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">
          {artist ? "Update Artist" : "Create Artist"}
        </h2>
        <form className="flex flex-col gap-6 text-left mt-6">
          <Input
            label="Artist Name"
            placeholder={artist?.fullName ?? "Enter artist full name"}
            type="text"
            bg={false}
          />
          <div className="flex flex-col gap-2">
            <label className="text-bolder font-semibold text-sm">
              Artist Image
            </label>
            <Uploader />
            <div className="w-32 h-32 p-2 bg-main border border-border rounded">
              <img
                src={artist?.image ?? "/assets/artist.png"}
                alt={artist?.fullName ?? "artistName"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <button
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 font-lg hover:bg-dry transitions border-2 border-subMain rounded bg-subMain text-white"
          >
            {artist ? "Update" : "Create"}
          </button>
          <button
            className="w-full flex-rows gap-4 py-3 font-lg hover:bg-subMain transitions border-2 border-subMain rounded bg-dry text-white"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default ArtistModal;
