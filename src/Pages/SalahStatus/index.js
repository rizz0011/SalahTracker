import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Grid, Typography, Tooltip, Box } from "@mui/material";

const listItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "4px",
  color: "white",
  backgroundImage: "linear-gradient(to right, #77A1D3 0%, #79CBCA 51%, #77A1D3 100%)",
  height: "40px",
  padding: "5px 10px",
  marginTop: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const inputStyle = {
  width: "18px",
  height: "18px",
  cursor: "pointer",
};

function SalahStatus() {
  const [date, setDate] = React.useState(new Date());
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    const savedData = localStorage.getItem("setSalah");
    if (savedData) {
      setState(JSON.parse(savedData));
    }
  }, []);

  const onChange = (date) => {
    setDate(date);
  };

  const handleChange = (item) => {
    const currentDate = date.toISOString().slice(0, 10);
    const currentStatus = state[currentDate] || {};
    const newState = {
      ...state,
      [currentDate]: {
        ...currentStatus,
        [item]: !currentStatus[item],
      },
    };
    setState(newState);
    localStorage.setItem("setSalah", JSON.stringify(newState));
  };

  const countSalah = (date) => {
    const currentDate = date.toISOString().slice(0, 10);
    const currentStatus = state[currentDate] || {};
    return Object.values(currentStatus).filter((prayed) => prayed).length;
  };

  const tileContent = ({ date }) => {
    const prayedCount = countSalah(date);
    return (
      <Tooltip title={`You Prayed ${prayedCount} Salah`} arrow>
        <div
          style={{
            height: "20px",
            borderRadius: "3px",
            color: "white",
            backgroundColor: "#a0b895",
            textAlign: "center",
          }}
        >
          {prayedCount}
        </div>
      </Tooltip>
    );
  };

  return (
    <Box >
          <Grid container spacing={2}>
            {/* Calendar Section */}
            <Grid item xs={12}>
              <Calendar
                value={date}
                onChange={onChange}
                tileContent={tileContent}
                className="react-calendar"
                style={{ width: "100%" , maxWidth:'575'}}
              />
            </Grid>

            {/* Salah Check Section */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography textAlign="center" sx={{ mb: 2, fontWeight: 500 }}>
                Please check which Salah you have completed:
              </Typography>
              <Grid container spacing={2}>
                {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((salah, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Box style={listItemStyle}>
                      <span>{salah}</span>
                      <input
                        style={inputStyle}
                        type="checkbox"
                        checked={
                          state[date.toISOString().slice(0, 10)]?.[salah] || false
                        }
                        onChange={() => handleChange(salah)}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
    </Box>
  );
}

export default SalahStatus;
