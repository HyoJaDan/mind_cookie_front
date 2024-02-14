import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../uitl/auth";

function SignupScreen() {
  const [isAuthentication, setIsAuthentication] = useState(false);

  const authCtx = useContext(AuthContent);

  async function signupHandler({ email, password }) {
    setIsAuthentication(true);

    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("유효하지 않은 아이디 입니다.");
      setIsAuthentication(false);
    }
  }

  if (isAuthentication) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
