import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { REGISTER_FORM } from "../data/index";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    /*
    status of request
    >> pending => loading...
    >> Fulfilled => success => optional
    >> Rejected => Field => optional
    */
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
          <Button className="min-w-full">Register</Button>
          {/* <Button> Cancel</Button> */}
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
