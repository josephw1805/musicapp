import { FaEdit } from "react-icons/fa";
import Uploader from "../../../Components/Uploader";
import { Input, Message, Select } from "../../../Components/UsedInput";
import SideBar from "../SideBar";
import { MdDelete } from "react-icons/md";
import { ImUpload } from "react-icons/im";
import ArtistModal from "../../../Components/Modals/ArtistModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { songValidation } from "../../../Components/Validation/SongValidation";
import { InlineError } from "../../../Components/Notifications/Error";
import toast from "react-hot-toast";
import {
  createSongAction,
  removeArtistAction,
} from "../../../Redux/Actions/SongsActions";
import { Imagepreview } from "../../../Components/Imagepreview";

function AddSong() {
  const [modalOpen, setModalOpen] = useState(false);
  const [artist, setArtist] = useState(null);
  const [imageWithoutTitle, setImageWithoutTitle] = useState();
  const [imageTitle, setImageTitle] = useState();
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { albums } = useSelector((state) => state.albumGetAll);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createSong
  );
  const { artists } = useSelector((state) => state.artists);

  // validate song
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(songValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(
      createSongAction({
        ...data,
        image: imageWithoutTitle,
        titleImage: imageTitle,
        video: videoUrl,
        artists,
      })
    );
  };

  const deleteArtistHandler = (id) => {
    dispatch(removeArtistAction(id));
    toast.success("Artist deleted successfully");
  };

  useEffect(() => {
    // if modal is closed, reset artist
    if (!modalOpen) {
      setArtist();
    }
    // if its success then reset form and navigate to addSong
    if (isSuccess) {
      reset({
        name: "",
        genre: "",
        language: "",
        year: "",
        album: "",
        desc: "",
      });
      setImageTitle();
      setImageWithoutTitle();
      setVideoUrl("");
      dispatch({ type: "CREATE_SONG_RESET" });
      navigate("/addSong");
    }
    // if error then show error
    if (isError) {
      toast.error("Something went wrong");
      dispatch({ type: "CREATE_SONG_RESET" });
    }
  }, [modalOpen, isSuccess, isError, dispatch, navigate, reset]);

  return (
    <SideBar>
      <ArtistModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        artist={artist}
      />
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Create Song</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full ">
            <Input
              label="Song Title"
              placeholder="Enter song title here"
              type="text"
              name="name"
              register={register("name")}
              bg
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="w-full ">
            <Input
              label="Song Genre"
              placeholder="Enter song genre here"
              type="text"
              name="genre"
              register={register("genre")}
              bg
            />
            {errors.genre && <InlineError text={errors.genre.message} />}
          </div>
        </div>

        <div className="wfull grid md:grid-cols-2 gap-6">
          <div className="w-full ">
            <Input
              label="Song Language"
              placeholder="Enter language here"
              type="text"
              bg
              name="language"
              register={register("language")}
            />
            {errors.language && <InlineError text={errors.language.message} />}
          </div>
          <div className="w-full ">
            <Input
              label="Year of Release"
              placeholder="Enter song released year here"
              type="text"
              bg
              name="year"
              register={register("year")}
            />
            {errors.year && <InlineError text={errors.year.message} />}
          </div>
        </div>

        {/* IMAGES */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-bolder font-semibold text-sm">
              Background Image
            </label>
            <Uploader setImageUrl={setImageWithoutTitle} />
            <Imagepreview image={imageWithoutTitle} name="imageWithoutTitle" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-bolder font-semibold text-sm">
              Title Image
            </label>
            <Uploader setImageUrl={setImageTitle} />
            <Imagepreview image={imageTitle} name="imageTitle" />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="w-full ">
          <Message
            label="Description"
            placeholder="Make it short and sweet"
            bg
            name="desc"
            register={{ ...register("desc") }}
          />
          {errors.desc && <InlineError text={errors.desc.message} />}
        </div>

        {/* ALBUM */}
        <div className="text-sm w-full">
          <Select
            label="Album"
            options={albums?.length > 0 ? albums : []}
            name="album"
            register={{ ...register("album") }}
          />
        </div>

        {/* Song Video */}
        <div className="flex flex-col gap-2 ">
          <label className="text-bolder font-semibold text-sm">
            Song Video
          </label>
          <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}>
            {videoUrl && (
              <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo">
                Video Uploaded
              </div>
            )}
          </div>
          <Uploader setImageUrl={setVideoUrl} />
        </div>

        {/* Artist */}
        <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-4 bg-main border border-dashed border-subMain text-white rounded"
          >
            Add Artist
          </button>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
            {artists?.length > 0 &&
              artists?.map((user) => (
                <div
                  key={user.id}
                  className=" p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
                >
                  <img
                    src={user?.image ?? "/assets/user.png"}
                    alt={user.name}
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  <p>{user.name}</p>
                  <div className="flex-rows mt-2 w-full gap-2">
                    <button
                      onClick={() => deleteArtistHandler(user?.id)}
                      className="w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => {
                        setModalOpen(true);
                        setArtist(user);
                      }}
                      className="w-6 h-6 flex-colo bg-dry border border-border text-green-600 rounded"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* SUBMIT */}

        <button
          disabled={isLoading || !imageWithoutTitle || !imageTitle || !videoUrl}
          onClick={handleSubmit(onSubmit)}
          className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded"
        >
          {isLoading ? (
            "Please wait..."
          ) : (
            <>
              <ImUpload /> Publish Song
            </>
          )}
        </button>
      </div>
    </SideBar>
  );
}

export default AddSong;
