import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Files from "./Files";
const FileManager = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar/>
        <Container  maxWidth ='lg' sx={{mt :4, mb :4}}>
            <Grid item xs={12} >

        <Files />
            </Grid>


        </Container>


      </Box>
    </>
  );
};

export default FileManager;
