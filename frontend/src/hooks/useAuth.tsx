import { useContext } from "react";
import { AuthContext } from "../context/UserContex";

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
