import React from "react";
import SalahTime from "./Components/SalahTime";
import {  Grid } from "@mui/material";
import SalahStatus from "./Components/SalahStatus";

function Salah() {
  return (
    <Grid container spacing={2} sx={{ m: 0, p: 0, pb:3, height:'100%', }}>
      <Grid item sm={4}>
        <SalahTime />
      </Grid>
      <Grid item sm={4}>
        <SalahStatus />
      </Grid>
    </Grid>
  );
}

export default Salah;
