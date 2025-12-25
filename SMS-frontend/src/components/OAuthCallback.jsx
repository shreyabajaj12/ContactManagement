import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        // Cookie is sent automatically
        await api.get("/auth/me");
        navigate("/home", { replace: true });
      } catch (e) {
        navigate("/login");
      }
    };

    verifyLogin();
  }, []);

  return <div>Signing you in...</div>;
};

export default OAuthCallback;
