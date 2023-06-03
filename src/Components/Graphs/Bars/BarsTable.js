import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { itemsSelector, getItems } from "../../../store/user/userSlice";

export const BarsTable = (props) => {
  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, items } = useSelector(itemsSelector);

  // hook to fetch items
  useEffect(() => {
    dispatch(getItems());
  }, []);

  const rows = items.data.dataTableBars;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Material</TableCell>
            <TableCell align="right">Day 1</TableCell>
            <TableCell align="right">Day 2</TableCell>
            <TableCell align="right">Day 3</TableCell>
            <TableCell align="right">Day 4</TableCell>
            <TableCell align="right">Day 5</TableCell>
            <TableCell align="right">Day 6</TableCell>
            <TableCell align="right">Day 7</TableCell>
            <TableCell align="right">Day 8</TableCell>
            <TableCell align="right">Day 9</TableCell>
            <TableCell align="right">Day 10</TableCell>
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
              <TableCell align="right">{row.day1}</TableCell>
              <TableCell align="right">{row.day2}</TableCell>
              <TableCell align="right">{row.day3}</TableCell>
              <TableCell align="right">{row.day4}</TableCell>
              <TableCell align="right">{row.day5}</TableCell>
              <TableCell align="right">{row.day6}</TableCell>
              <TableCell align="right">{row.day7}</TableCell>
              <TableCell align="right">{row.day8}</TableCell>
              <TableCell align="right">{row.day9}</TableCell>
              <TableCell align="right">{row.day10}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
