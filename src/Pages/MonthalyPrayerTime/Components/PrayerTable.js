import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

function PrayerTimesTable({ prayerData }) {
  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  function removeBrackets(value) {
    return value.replace(/\s*\(.*?\)/, "");
  }

  const downloadPDF = (data) => {
    const doc = new jsPDF();
    // Title of the PDF
    doc.text("Prayer Times", 14, 10);

    // Define table data
    const tableColumn = ["Date", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    const tableRows = data.map((item) => [
      item?.date?.readable,
      removeBrackets(item?.timings?.Fajr),
      removeBrackets(item?.timings?.Dhuhr),
      removeBrackets(item?.timings?.Asr),
      removeBrackets(item?.timings?.Maghrib),
      removeBrackets(item?.timings?.Isha),
    ]);
    // Add table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    // Save the PDF
    doc.save("prayer_times.pdf");
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 600, margin: "auto", mt: 2 }}
    >
      <Grid item sm={12}>
        <Button
          variant="contained"
          color="success"
          sx={{ mb: 2 }}
          onClick={() => downloadPDF(prayerData)}
        >
          Download PDF
        </Button>
      </Grid>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundImage:
                "linear-gradient(to right, #77A1D3 0%, #79CBCA 51%, #77A1D3 100%)",
            }}
          >
            <TableCell>
              <strong>Date</strong>
            </TableCell>
            <TableCell>
              <strong>Fajr</strong>
            </TableCell>
            <TableCell>
              <strong>Dhuhr</strong>
            </TableCell>
            <TableCell>
              <strong>Asr</strong>
            </TableCell>
            <TableCell>
              <strong>Maghrib</strong>
            </TableCell>
            <TableCell>
              <strong>Isha</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prayerData?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item?.date?.readable}</TableCell>
              <TableCell>
                {convertTo12HourFormat(removeBrackets(item?.timings.Fajr))}
              </TableCell>
              <TableCell>
                {convertTo12HourFormat(removeBrackets(item?.timings.Dhuhr))}
              </TableCell>
              <TableCell>
                {convertTo12HourFormat(removeBrackets(item?.timings.Asr))}
              </TableCell>
              <TableCell>
                {convertTo12HourFormat(removeBrackets(item?.timings.Maghrib))}
              </TableCell>
              <TableCell>
                {convertTo12HourFormat(removeBrackets(item?.timings.Isha))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PrayerTimesTable;
