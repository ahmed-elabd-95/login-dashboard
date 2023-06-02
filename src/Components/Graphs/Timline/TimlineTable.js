import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, day, sale) {
  return { name, day, sale };
}

const rows = [
  createData(1, "june", 60),
  createData(2, "june", 50),
  createData(3, "june", 90),
  createData(4, "june", 70),
  createData(5, "june", 75),
  createData(6, "june", 74),
  createData(7, "june", 60),
  createData(8, "june", 60),
  createData(9, "june", 60),
  createData(10, "june", 60),
  createData(11, "june", 60),
  createData(12, "june", 40),
  createData(13, "june", 70),
  createData(14, "june", 74),
  createData(15, "june", 20),
  createData(16, "june", 66),
  createData(17, "june", 60),
  createData(18, "june", 71),
  createData(19, "june", 85),
  createData(20, "june", 41),
  createData(21, "june", 35),
  createData(22, "june", 15),
  createData(23, "june", 90),
  createData(24, "june", 48),
  createData(25, "june", 75),
  createData(26, "june", 15),
  createData(27, "june", 89),
  createData(28, "june", 78),
  createData(29, "june", 64),
  createData(30, "june", 26),
];

export const TimlineTable = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Days</TableCell>
            <TableCell align="right">Sale Day</TableCell>
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
              <TableCell align="right">{row.sale}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
