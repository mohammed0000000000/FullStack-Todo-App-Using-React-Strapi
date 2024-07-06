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
    console.log(data);
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/local", data);
      toast.success("Successfully Logged in!", {
        duration: 4000,
        position: "bottom-center",
        style: {
          background: "black",
          color: "white",
        },
      });
    } catch (error) {
      console.log(error);
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
    </div>
  );
};

export default LoginPage;
