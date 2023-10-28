import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginForm from "./LoginForm";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh", backgroundImage : 'url(./assets/loginPage.png)', backgroundSize: 'cover' }} >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
        //   sx={{
        //     backgroundImage : 'url(./assets/loginPage.png)',
        //     backgroundRepeat: "no-repeat",
        //     backgroundColor: (t) =>
        //       t.palette.mode === "light"
        //         ? t.palette.grey[50]
        //         : t.palette.grey[900],
        //     backgroundSize: "cover",
        //     backgroundPosition: "center",
        //   }}
        />
        <LoginForm />
      </Grid>
    </ThemeProvider>
  );
}
