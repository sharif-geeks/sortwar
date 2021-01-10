import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useMemo } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { wdir } from "../../config/vars";
import { authorAtom } from "../../recoil/atoms";

function createData(lang, algo, count, type, time) {
  return { lang, algo, count, type, time };
}

function Overview() {
  const _execTimes = useRef({});
  const [author] = useRecoilState(authorAtom);

  useEffect(() => {
    const execTimesInit = window.fs?.readFileSync(
      `${wdir}\\outputs\\${author}\\exec-times.json`
    );
    _execTimes.current = JSON.parse(execTimesInit);
  }, [author]);

  const execTimes = _execTimes.current;
  const rows = useMemo(
    () =>
      Object.keys(execTimes).map((key) =>
        createData(...key.split("-"), execTimes[key])
      ),
    [execTimes]
  );

  const classes = useStyles();

  return (
    <Container>
      <Paper className={classes.paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Language</TableCell>
              <TableCell align="right">Algorithm</TableCell>
              <TableCell align="right">Count&nbsp;(normal)</TableCell>
              <TableCell align="right">Data Type</TableCell>
              <TableCell align="right">Execution Time&nbsp;(ms)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
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
      </Paper>
    </Container>
  );
}

export default Overview;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    overflowX: "auto"
  },
}));

const Container = styled.div`
  padding: 12px;
  box-sizing: border-box;
  position: relative;

  td,
  th {
    text-transform: capitalize;
  }
`;
