import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, order, rate, reviewText) {
  return { name,order, rate, reviewText };
}

const rows = [
  createData("Positive", 501.9, 49.9,"Positive: 49.9%"),
  createData("Negative", 301.9, 30, "Negative: 30.0%"),
  createData("Neutral",  201.1, 20,"Neutral: 20.0%"),
  
];

export const ChartsTable = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reviews</TableCell>
            <TableCell align="right">Order</TableCell>
            <TableCell align="right">Rate/ Score</TableCell>
            <TableCell align="right">Review Text</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.order}</TableCell>
              <TableCell align="right">{row.rate}</TableCell>
              <TableCell align="right">{row.reviewText}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
