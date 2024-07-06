import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProp {
  isAllowed: boolean;
  redirectPath: string;
  children: ReactNode;
  data?: unknown;
}

const ProtectedRoute = ({ isAllowed, redirectPath, children, data }: IProp) => {
  if (!isAllowed)
    return <Navigate to={redirectPath} replace={true} state={data}></Navigate>;
  return children;
};

export default ProtectedRoute;
