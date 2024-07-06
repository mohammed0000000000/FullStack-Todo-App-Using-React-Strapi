import { LOGIN_FORM } from "../data";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/index";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { Link } from "react-router-dom";

interface IFormInput {
  identifier: string;
  password: string;
}
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // console.log(data);
    setIsLoading(true);
    try {
      const { data: userData } = await axiosInstance.post("/auth/local", data);
      toast.success("Successfully Logged in!", {
        duration: 1500,
        position: "bottom-center",
        style: {
          background: "black",
          color: "white",
        },
      });
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      setTimeout(() => {
        console.log("Navigate to Home page...");
        location.replace("/");
      }, 2000);
    } catch (error) {
      // console.log(error);
      const errorObj = error as AxiosError<IErrorResponse>;
      const msg = errorObj?.response?.data?.error?.message;
      toast.error(`${msg}`, {
        duration: 4000,
        position: "bottom-center",
        style: {
          background: "black",
          color: "white",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };
  const renderLoginForm = LOGIN_FORM.map(
    ({ name, placeholder, type, validation }, idx) => {
      return (
        <div key={idx}>
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name, { ...validation })}
          />
          {errors[name] && <InputErrorMessage />}
        </div>
      );
    }
  );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!!
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}
        <Button
          className="mx-auto min-w-full hover:text-white hover:bg-black"
          isLoading={isLoading}
        >
          Login
        </Button>
      </form>
      <p className="mt-3 text-center text-xl text-gray-400">
        Don't Have Account Yet ?{" "}
        <Link
          to="/register"
          className="text-indigo-500 hover:cursor-pointer font-semibold underline"
        >
          register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
