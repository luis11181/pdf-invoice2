import AuthFormSignIn from "../components/auth/AuthSingInForm";
import AuthFormSignUp from "../components/auth/AuthSingUpForm";
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { changeAuthState } from "../app/mainStateSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const dispatch = useAppDispatch();

  const authed: boolean | null = useAppSelector(
    (state) => state.main.autenticado
  );
  let navigate = useNavigate();

  let location: any = useLocation();

  //si hubo una ruta anterio la pone en la variable, en caso contrario lleva a la pronmcipal
  let from = location.state?.from?.pathname || "/";

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      console.log(displayName, email);
      dispatch(changeAuthState(true));

      // const photoURL = user.photoURL;
      // const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
      // ...
      //!there are maybe problems if user sign with a provider, data is extracted like this
      user.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
      });
      //user.providerData.profile.uid
    } else {
      dispatch(changeAuthState(false));
      // User is signed out
      // ...
    }
  });

  const handleSignForm = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isSignIn ? <AuthFormSignIn from={from} /> : <AuthFormSignUp />}
      <Button variant="outlined" onClick={handleSignForm}>
        {isSignIn ? "Sign Up" : "Sign In"}
      </Button>
    </Box>
  );
}
