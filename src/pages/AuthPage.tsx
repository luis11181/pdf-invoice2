import AuthFormSignIn from "../components/auth/AuthSingInForm";
import AuthFormSignUp from "../components/auth/AuthSingUpForm";
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { auth } from "../firebase";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const dispatch = useAppDispatch();

  // const authed: boolean | null = useAppSelector(
  //   (state) => state.main.autenticado
  // );

  //let navigate = useNavigate();

  let location: any = useLocation();

  //si hubo una ruta anterio la pone en la variable, en caso contrario lleva a la pronmcipal
  let from = location.state?.from?.pathname || "/";

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
