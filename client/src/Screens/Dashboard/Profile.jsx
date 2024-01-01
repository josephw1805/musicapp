import { Input } from "../../Components/UsedInput";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { InlineError } from "../../Components/Notifications/Error";
import { ProfileValidation } from "../../Components/Validation/UserValidation";
import { Imagepreview } from "../../Components/Imagepreview";
import {
  deleteProfileAction,
  updateProfileAction,
} from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";

function Profile() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo?.image ?? null);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );

  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.userDeleteProfile
  );

  // validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });

  // update profile
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));
  };

  // delete profile
  const deleteProfile = () => {
    window.confirm("Are you sure you want to delete your profile?") &&
      dispatch(deleteProfileAction());
  };

  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
    if (isSuccess) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
      dispatch({ type: "USER_DELETE_PROFILE_RESET" });
    }
  }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Input
              label="Profile Image"
              placeholder="Paste your image url"
              type="text"
              name="imageUrl"
              onChange={(e) => setImageUrl(e.target.value)}
              bg
            />
          </div>
          {/* image preview */}
          <div className="col-span-2">
            <Imagepreview
              name={userInfo?.fullName ?? "user"}
              image={imageUrl}
            />
          </div>
        </div>

        <div className="w-full ">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
            name="fullName"
            register={register("fullName")}
            bg
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>
        <div className="w-full ">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            name="email"
            register={register("email")}
            bg
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={deleteProfile}
            disabled={deleteLoading || isLoading}
            className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </button>
          <button
            disabled={deleteLoading || isLoading}
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;
