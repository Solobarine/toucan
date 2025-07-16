import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth_token", token);
      navigate("/feed");
    } else {
      navigate("/login?error='Unable to authenticate user'");
    }
  }, [navigate, token]);

  return (
    <div className="flex items-center justify-center h-screen text-lg">
      Authenticating...
    </div>
  );
};

export default AuthCallback;
