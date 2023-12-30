import { Input } from "../UsedInput";
import Uploader from "../../Components/Uploader";
import MainModal from "./MainModal";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addArtistAction,
  updateArtistAction,
} from "../../Redux/Actions/SongsActions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Imagepreview } from "../Imagepreview";
import { InlineError } from "../Notifications/Error";

function ArtistModal({ modalOpen, setModalOpen, artist }) {
  const dispatch = useDispatch();
  const [artistImage, setArtistImage] = useState();
  const generateId = Math.floor(Math.random() * 10000);
  const image = artistImage ?? artist?.image;

  // validate artist
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Artist Name is required"),
      })
    ),
  });

  // on submit
  const onSubmit = (data) => {
    if (artist) {
      // if artist is not null then update artist
      dispatch(
        updateArtistAction({
          ...data,
          image,
          id: artist.id,
        })
      );
      toast.success("Artist updated successfully");
    } else {
      // else create artist
      dispatch(
        addArtistAction({
          ...data,
          image,
          id: generateId,
        })
      );
      toast.success("Artist created successfully");
    }
    reset();
    setArtistImage();
    setModalOpen(false);
  };

  useEffect(() => {
    if (artist) {
      setValue("name", artist?.name);
    }
  }, [artist, setValue]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">
          {artist ? "Update Artist" : "Create Artist"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <div className="w-full ">
            <Input
              label="Artist name"
              placeholder="Enter artist name"
              type="text"
              bg
              name="name"
              register={register("name")}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-bolder font-semibold text-sm">
              Artist Image
            </label>
            <Uploader setImageUrl={setArtistImage} />
            <Imagepreview image={image} />
          </div>
          <button
            type="submit"
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 font-lg hover:bg-dry transitions border-2 border-subMain rounded bg-subMain text-white"
          >
            {artist ? "Update" : "Add"}
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
