import TextField from "@mui/material/TextField";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import app, { auth } from "../../firebase";

//to auth woth ggog;e
const provider = new GoogleAuthProvider();
const googleRegister = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
};

const AuthSignInForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));

    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <h1>Signin</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First name</label>
          <input
            type="text"
            {...register("firstName", { required: true, maxLength: 80 })}
          />
        </div>
        <div>
          <label>Last name</label>
          <input
            type="text"
            {...register("lastName", { required: true, maxLength: 100 })}
          />
        </div>
        <div>
          <TextField
            {...register("password", { required: true, maxLength: 10 })}
            error={errors.password ? true : false}
            helperText={errors.password ? "Required" : ""}
            label="Password"
            variant="standard"
            color="secondary"
            {...(errors.password && "error")}
          />
          {errors.password && "Last name is required"}
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
        </div>

        <div>
          <label>Are you a developer?</label>
          <input
            type="radio"
            value="Yes"
            {...register("developer", { required: true })}
          />
          <input
            type="radio"
            value="No"
            {...register("developer", { required: true })}
          />
        </div>

        <div>
          <input type="text" {...register("asdasd")} />
        </div>

        <input type="submit" />
      </form>
      <button onClick={googleRegister}>google</button>
    </div>
  );
};

export default AuthSignInForm;
