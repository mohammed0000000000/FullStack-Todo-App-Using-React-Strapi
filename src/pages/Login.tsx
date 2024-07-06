import { LOGIN_FORM } from "../data";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import InputErrorMessage from "../components/ui/InputErrorMessage";
const LoginPage = () => {
  const renderLoginForm = LOGIN_FORM.map(
    ({ name, placeholder, type, validation }, idx) => {
      return (
        <div key={idx}>
          <Input type={type} placeholder={placeholder} />
          {<InputErrorMessage />}
        </div>
      );
    }
  );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!!
      </h2>
      <form className="space-y-6">
        {renderLoginForm}
        <Button className="mx-auto min-w-full hover:text-white hover:bg-black">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
