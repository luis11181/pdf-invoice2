import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { Box, Button } from "@mui/material";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function MainPage() {
  const authed: boolean | null = useAppSelector(
    (state) => state.main.autenticado
  );
  let navigate = useNavigate();

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
