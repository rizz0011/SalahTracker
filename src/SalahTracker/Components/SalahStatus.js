import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Tooltip,
} from "@mui/material";



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

const input = {
  width: "16px",
  height: "25px",
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

  console.log(date.toISOString().slice(0, 10));

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
          }}
        >
          {prayedCount}
        </div>
      </Tooltip>
    );
  };




  return (
    <div>
      <Card sx={{ width: "90%" }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item sm={12} xs={12}>
              <Calendar
                style={{ width: "90%" }}
                value={date}
                onChange={onChange}
                tileContent={tileContent}
              />
            </Grid>

            <Grid item sm={12} xs={12} sx={{ mt: 4 }}>
              <Typography textAlign='center' sx={{ mb:"15px"}}>Please check which one you have completed</Typography>

              <li style={list}>
                <span>Fajr</span>
                <input
                  style={input}
                  type="checkbox"
                  checked={
                    state[date.toISOString().slice(0, 10)]?.Fajr || false
                  }
                  onChange={() => handleChange("Fajr")}
                />
              </li>
              <li style={list}>
                <span>Dhuhr</span>
                <input
                  style={input}
                  type="checkbox"
                  checked={
                    state[date.toISOString().slice(0, 10)]?.Dhuhr || false
                  }
                  onChange={() => handleChange("Dhuhr")}
                />
              </li>
              <li style={list}>
                <span>Asr</span>
                <input
                  style={input}
                  type="checkbox"
                  checked={state[date.toISOString().slice(0, 10)]?.Asr || false}
                  onChange={() => handleChange("Asr")}
                />
              </li>
              <li style={list}>
                <span>Maghrib</span>
                <input
                  style={input}
                  type="checkbox"
                  checked={
                    state[date.toISOString().slice(0, 10)]?.Maghrib || false
                  }
                  onChange={() => handleChange("Maghrib")}
                />
              </li>
              <li style={list}>
                <span>Isha</span>
                <input
                  style={input}
                  type="checkbox"
                  checked={
                    state[date.toISOString().slice(0, 10)]?.Isha || false
                  }
                  onChange={() => handleChange("Isha")}
                />
              </li>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default SalahStatus;
