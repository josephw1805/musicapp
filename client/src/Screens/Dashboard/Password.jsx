import { Input } from "../../Components/UsedInput";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../../Components/Notifications/Error";
import { PasswordValidation } from "../../Components/Validation/UserValidation";
import { changePasswordAction } from "../../Redux/Actions/userActions";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Password = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.userChangePassword
  );

  // validate user
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PasswordValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(changePasswordAction(data));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (message) {
      toast.success(message);
      reset();
    }
  }, [isSuccess, message, isError, reset, dispatch]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Change Password</h2>
        <div className="w-full ">
          <Input
            label="Old Password"
            placeholder="Enter your old password"
            type="password"
            name="oldPassword"
            register={register("oldPassword")}
            bg
          />
          {errors.oldPassword && (
            <InlineError text={errors.oldPassword.message} />
          )}
        </div>
        <div className="w-full ">
          <Input
            label="New Password"
            placeholder="Enter your new password"
            type="password"
            bg
            name="newPassword"
            register={register("newPassword")}
          />
          {errors.newPassword && (
            <InlineError text={errors.newPassword.message} />
          )}
        </div>
        <div className="w-full ">
          <Input
            label="Confirm Password"
            placeholder="Enter your new password again"
            type="password"
            bg
            name="confirmPassword"
            register={register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <InlineError text={errors.confirmPassword.message} />
          )}
        </div>
        <div className="flex justify-end items-center my-4">
          <button
            disabled={isLoading}
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </SideBar>
  );
};

export default Password;
