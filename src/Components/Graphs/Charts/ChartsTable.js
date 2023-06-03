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

export const ChartsTable = (props) => {
  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, items } = useSelector(itemsSelector);

  // hook to fetch items
  useEffect(() => {
    dispatch(getItems());
  }, []);

  const rows = items.data?.dataTableChart;

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
