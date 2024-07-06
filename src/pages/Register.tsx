import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { REGISTER_FORM } from "../data/index";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [isloading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    setIsLoading(true);
    /*
    status of request
    >> pending => loading...
    >> Fulfilled => success => optional
    >> Rejected => Field => optional
    */
    try {
      // On Success
      const { status } = await axiosInstance.post("/auth/local/register", data);
      console.log(status);
      if (status === 200) {
        console.log("Successfully Register");
        toast.success("Successfully Register", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "#000",
            color: "#fff",
            width: "fit-content",
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // ---------------- Handler ------------------------\\

  console.log(errors);
  // ---------------- Render ------------------------\\
  const renderRegisterForm = REGISTER_FORM.map(
    ({ name, placeholder, validation, type }, index) => {
      return (
        <div key={index}>
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name, { ...validation })}
          />
          {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
        </div>
      );
    }
  );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        {renderRegisterForm}
        <div className="flex flex-row space-x-0">
          <Button className="min-w-full">
            {isloading ? "Loading..." : "Register"}
          </Button>
          {/* <Button> Cancel</Button> */}
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
