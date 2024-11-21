import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DigitalClock from "../DigitalClock";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // General icon
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // Icon for Sunrise
import NightlightRoundIcon from "@mui/icons-material/NightlightRound"; // Icon for Sunset

const codeData = [
  { code: "IN", name: "India" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AF", name: "Afghanistan" },
  { code: "PA", name: "Portugal" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "US", name: "United States of America" },
  { code: "KW", name: "Kuwait" },
  { code: "GB", name: "United Kingdom" },
];

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
    setState({ ...state, [name]: value });
  };

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
      toast.error("Country & City can't be empty", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      fetchData();
    }
  };



  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const handleClear = () => {
    setState({
      city: "",
      countryCode: "",
      state: "",
    });
  };

  return (
    <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                textAlign="center"
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  py: 2,
                  backgroundImage:
                    "linear-gradient(to right, #77A1D3 0%, #79CBCA 51%, #77A1D3 100%)",
                  color: "white",
                  borderRadius: 1,
                }}
              >
                Salah Timing & Tracker
              </Typography>
              <DigitalClock />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="select-country-label">
                  Select Country
                </InputLabel>
                <Select
                  size="small"
                  labelId="select-country-label"
                  id="select-country"
                  name="countryCode"
                  value={state.countryCode}
                  label="Select Country"
                  onChange={handleChange}
                >
                  {codeData.map((item, index) => (
                    <MenuItem value={item.name} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                size="small"
                label="Enter City Name"
                variant="outlined"
                value={state.city}
                name="city"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
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

            <Grid item xs={12}>
              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleClick}
                  disabled={loading}
                  sx={{
                    backgroundImage:
                      "linear-gradient(to right, #5C258D 0%, #4389A2 51%, #5C258D 100%)",
                    color: "white",
                    py: 1,
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {loading ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Search"
                  )}
                </Button>

                <Button
                  onClick={handleClear}
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundImage:
                      "linear-gradient(to right, #ff7e5f 0%, #feb47b 51%, #ff7e5f 100%)",
                    color: "white",
                    py: 1,
                    textTransform: "uppercase",
                    fontWeight: 600,
                    border: "none",
                  }}
                >
                  Clear
                </Button>
              </Stack>
            </Grid>
          </Grid>

          {timing && (
            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography textAlign="center" variant="h6" sx={{ mb: 1 }}>
                  Today's Salah Times
                </Typography>
              </Grid>

              {Object.keys(timing)
                .filter(
                  (key) =>
                    !["Imsak", "Midnight", "Firstthird", "Lastthird"].includes(
                      key
                    )
                )
                .map((key, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        height: 100,
                        width: 100,
                        backgroundColor: "#79CBCA",
                        color: "white",
                        borderRadius: 2,
                        boxShadow: 2,
                        mx: "auto",
                      }}
                    >
                      {/* Conditional Icon Rendering */}
                      {key === "Sunrise" ? (
                        <WbSunnyIcon sx={{ fontSize: 32, mb: 1 }} />
                      ) : key === "Sunset" ? (
                        <NightlightRoundIcon sx={{ fontSize: 32, mb: 1 }} />
                      ) : (
                        <AccessTimeIcon sx={{ fontSize: 32, mb: 1 }} />
                      )}

                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {key}
                      </Typography>
                      <Typography variant="body2">
                        {convertTo12HourFormat(timing[key])}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          )}
      <ToastContainer />
    </Box>
  );
}

export default SalahTime;
