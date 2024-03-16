import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DigitalClock from "./DigitalClock";

const codeData = [
  {
    code: "IN",
    name: "India",
  },
  {
    code: "SA",
    name: "Saudi Arbia",
  },
  {
    code: "AF",
    name: "Afghanistan",
  },
  {
    code: "PA",
    name: "Portugal",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
  },
  {
    code: "US",
    name: " United States of America",
  },
  {
    code: "KW",
    name: "Kuwait",
  },
  {
    code: "GB",
    name: "United Kindom",
  },
];

const list = {
  display: "flex",
  justifyContent: "space-between",
  borderRadius: "4px",
  // border: "2px solid",
  color: "white",
  backgroundImage:
    " linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%)",
  height: "30px",
  width: "90%",
  padding: "5px 10px",
  marginTop: "4px",
};

function SalahTime() {
  const [state, setState] = useState({
    city: "",
    countryCode: "",
    state: "",
  });
  const [timing, setTiming] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  console.log(state);

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://api.aladhan.com/v1/timingsByCity",
      {
        params: {
          city: state.city,
          country: state.countryCode,
          state: state.state,
          method: "1",
        },
      }
    );
    setTiming(response.data.data.timings);
    setLoading(false);
  };

  const handleClick = () => {
    if (!state?.city || !state?.countryCode) {
      toast.error("Country & City  can't be empty", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      fetchData();
    }
  };

  return (
    <Box>
      <Card sx={{ width: "90%" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Typography
                textAlign="center"
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  padding: "15px",
                  backgroundImage:
                    " linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%)",
                  color: "white",
                }}
              >
                Salah Timing & Tracker
              </Typography>
              <DigitalClock />
            </Grid>
            <Grid item sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Country
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="countryCode"
                  value={state.countryCode}
                  label="Select Country"
                  onChange={handleChange}
                >
                  {codeData?.map((i, index) => (
                    <MenuItem value={i.name} key={index}>
                      {i?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Enter City Name"
                variant="outlined"
                value={state.city}
                name="city"
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Enter State Name"
                variant="outlined"
                value={state.state}
                name="state"
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12}>
              {!loading ? (
                <button
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #5C258D 0%, #4389A2  51%, #5C258D  100%)",
                    padding: "8px 15px",
                    textAlign: "center",
                    textTransform: "uppercase",
                    backgroundSize: "200% auto",
                    color: "white",
                    boxShadow: "0 0 20px #eee",
                    borderRadius: "3px",
                    display: "block",
                    border: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                >
                  Search
                </button>
              ) : (
                <button
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #5C258D 0%, #4389A2  51%, #5C258D  100%)",
                    width: "70px",
                    height: "30px",
                    backgroundSize: "200% auto",
                    borderRadius: "3px",
                    display: "block",
                    border: "none",
                    fontWeight: 600,
                  }}
                >
                  <CircularProgress size={20} sx={{ color: "white" }} />
                </button>
              )}
            </Grid>
          </Grid>

          {timing && (
            <Grid container spacing={1} sx={{ mt: "10px" }}>
              <Grid item sm={12} xs={12}>
                <Typography>Today Salah Time</Typography>
              </Grid>

              <Grid item sm={12} xs={12} sx={{ gap: "2px" }}>
                <li style={list}>
                  <span>Fajr</span>
                  <span>{timing?.Fajr}</span>
                </li>

                <li style={list}>
                  <span>Dhuhr</span>
                  <span>{timing?.Dhuhr}</span>
                </li>

                <li style={list}>
                  <span>Asr</span>
                  <span>{timing?.Asr}</span>
                </li>

                <li style={list}>
                  <span>Maghrib</span>
                  <span>{timing?.Maghrib}</span>
                </li>

                <li style={list}>
                  <span>Isha</span>
                  <span>{timing?.Isha}</span>
                </li>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
      <ToastContainer />
    </Box>
  );
}

export default SalahTime;
