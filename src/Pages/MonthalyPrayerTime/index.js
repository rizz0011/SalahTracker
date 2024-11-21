import React, { useState } from "react";
import { Box, Grid, Typography, TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DigitalClock from "../DigitalClock";
import PrayerTimesTable from "./Components/PrayerTable";

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

const currentYear = new Date().getFullYear();
const yearRange = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

const months = [
  { name: "January", code: 1 },
  { name: "February", code: 2 },
  { name: "March", code: 3 },
  { name: "April", code: 4 },
  { name: "May", code: 5 },
  { name: "June", code: 6 },
  { name: "July", code: 7 },
  { name: "August", code: 8 },
  { name: "September", code: 9 },
  { name: "October", code: 10 },
  { name: "November", code: 11 },
  { name: "December", code: 12 },
];









function MonthalyPrayerTime() {
  const [state, setState] = useState({
    city: "",
    countryCode: "",
    month: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);
  const [prayerData, setPrayerData] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(
      "http://api.aladhan.com/v1/calendarByCity",
      {
        params: {
          city: state.city,
          country: state.countryCode,
          month: state?.month,
          year: state?.year,
          method: "1",
        },
      }
    );
    console.log(response, "yeegve----");
    setPrayerData(response?.data?.data);
    setLoading(false);
  };

  const handleClick = () => {
    if (!state?.city || !state?.countryCode || !state.month || !state.year) {
      toast.error("Country, City, Month & Year  can't be empty", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      fetchData();
    }
  };

  const handleClear = () => {
    setState({
      city: "",
      countryCode: "",
      month: "",
      year: "",
    });
  };

  return (
    <Box sx={{ maxWidth: "600px", overflow: "auto" }}>
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
            Month Salah Timing
          </Typography>
          <DigitalClock />
        </Grid>

     

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel id="select-country-label">Select Country</InputLabel>
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

        <Grid item xs={12} sm={6}>
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
        <Grid item  xs={12} sm={6}>
         
            <FormControl fullWidth required>
              <InputLabel>Month</InputLabel>
              <Select
                size="small"
                value={state.month}
                onChange={handleChange}
                label="Month"
                name="month"
              >
                {months.map((month) => (
                  <MenuItem key={month.code} value={month.code}>
                    {month.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Grid>
            <Grid item  xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Year</InputLabel>
              <Select
                size="small"
                value={state.year}
                onChange={handleChange}
                label="Year"
                name="year"
              >
                {yearRange.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                "Display"
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
        <Grid item sm={12}>
          {prayerData?.length !== 0 && (
            <PrayerTimesTable prayerData={prayerData} />
          )}
        </Grid>
      </Grid>
      <ToastContainer />
    </Box>
  );
}

export default MonthalyPrayerTime;
