import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Box,
  Card,

} from "@mui/material";
import SalahTime from "../SalahTime";
import SalahStatus from "../SalahStatus";
import MonthalyPrayerTime from "../MonthalyPrayerTime";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabBar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ px: { xs: 0, sm: 0 }, py: { xs: 0, sm: 0 } }}>
      <Card sx={{ width: "100%", maxWidth: 600, mx: "auto", }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Salah" {...a11yProps(0)} />
              <Tab label="Status" {...a11yProps(1)} />
              <Tab label="Month" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <SalahTime />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SalahStatus />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <MonthalyPrayerTime />
          </CustomTabPanel>
      </Card>
    </Box>
  );
}
