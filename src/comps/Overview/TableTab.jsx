import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useState } from "react";

function TableTab({ data: rows }) {
  const [key, setKey] = useState("count");

  const classes = useStyles();

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className={classes.hcell} onClick={() => setKey("lang")}>
            Language
          </TableCell>
          <TableCell
            className={classes.hcell}
            onClick={() => setKey("algo")}
            align="right"
          >
            Algorithm
          </TableCell>
          <TableCell
            className={classes.hcell}
            onClick={() => setKey("count")}
            align="right"
          >
            Count&nbsp;(normal)
          </TableCell>
          <TableCell
            className={classes.hcell}
            onClick={() => setKey("type")}
            align="right"
          >
            Data Type
          </TableCell>
          <TableCell
            className={classes.hcell}
            onClick={() => setKey("time")}
            align="right"
          >
            Execution Time&nbsp;(ms)
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows
          .sort((row1, row2) => row1[key] > row2[key])
          .map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.lang}
              </TableCell>
              <TableCell align="right">{row.algo}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default TableTab;

const useStyles = makeStyles((theme) => ({
  hcell: {
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
}));
