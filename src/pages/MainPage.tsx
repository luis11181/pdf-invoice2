import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { changeAuthState } from "../app/mainStateSlice";
import { Box, Button } from "@mui/material";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function MainPage() {
  const dispatch = useAppDispatch();
  const authed: boolean | null = useAppSelector(
    (state) => state.main.autenticado
  );
  let navigate = useNavigate();

  let location: any = useLocation();

  let from = location.state?.from?.pathname || "/";

  if (!authed) {
    return <p>You are not logged in.</p>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {"wellcome auth.user"}
      <Button
        onClick={() => {
          signOut(auth);
          navigate("/");
        }}
      >
        Sign out
      </Button>
    </Box>
  );
}
