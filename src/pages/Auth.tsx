import { Box, ImageListItem, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import {
  auth,
  isAuth,
  signIn,
  signOut,
  signUp,
  signWithGoogle,
} from "../auth/fb-auth";
import { CardContainer } from "../components";
import { useAuthorize } from "../hooks/useAuthorize";

export default () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { isLogged } = useAuthorize();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(auth);

  return (
    <CardContainer title="Página de autenticación">
      <Box display="flex" justifyContent="center" mt={5}>
        {isLogged ? (
          <Box display="flex">
            <Typography pt={1.5}>
              {auth.currentUser?.displayName || auth.currentUser?.email}
            </Typography>
            {auth.currentUser?.photoURL && (
              <ImageListItem>
                <img
                  style={{ width: "50px", height: "50px" }}
                  srcSet={auth.currentUser?.photoURL}
                  src={auth.currentUser?.photoURL}
                  alt={auth.currentUser?.displayName || ""}
                  loading="lazy"
                />
              </ImageListItem>
            )}
          </Box>
        ) : (
          <Typography>Debe loguearse</Typography>
        )}
      </Box>

      <Box m="auto">
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          style={{
            display: "flex",
            flexDirection: "column",
            width: "200px",
          }}
        >
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <Box mt={4}></Box>
          <input
            type="password"
            placeholder="******"
            name="password"
            onChange={handleChange}
          />
          <Box mt={4}></Box>
          <button onClick={() => signIn(user.email, user.password)}>
            ingresar
          </button>
          <Box mt={4}></Box>
          <button onClick={signWithGoogle}>Google</button>
          <Box mt={2}></Box>
          <button onClick={() => signUp(user.email, user.password)}>
            Registrarse
          </button>
          <Box mt={2}></Box>
          {/* <button onClick={isAuth}>¿Esta logueado?</button> */}
          <Box mt={2}></Box>
          <button onClick={signOut}>Cerrar sesión</button>
        </form>
      </Box>
    </CardContainer>
  );
};