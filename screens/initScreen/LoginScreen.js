import { useContext, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../../data/auth-context";
import AuthContent from "../../uitll/Auth/AuthContent";
import { login } from "../../uitll/auth";
import LoadingOverlay from "../../uitll/ui/LoadingOverlay";

function LoginScreen() {
  const [isAuthentication, setIsAuthentication] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthentication(true);

    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("유효하지 않은 아이디입니다.");
      setIsAuthentication(false);
    }
  }

  if (isAuthentication) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
