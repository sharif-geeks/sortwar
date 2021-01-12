import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { wdir } from "../../config/vars";
import { authorAtom, execTimesAtom } from "../../recoil/atoms";
import GraphTab from "./GraphTab";
import SourceTab from "./SourceTab";
import TableTab from "./TableTab";

const tabPanels = [TableTab, GraphTab, SourceTab];

function createData(lang, algo, count, type, time) {
  return { lang, algo, count, type, time };
}

function Overview() {
  const [value, setValue] = useState(0);
  const [execTimes, setExecTimes] = useRecoilState(execTimesAtom);
  const [author] = useRecoilState(authorAtom);

  useEffect(() => {
    const execTimesInit = window.fs.readFileSync(
      `${wdir}\\outputs\\${author}\\exec-times.json`
    );
    setExecTimes(JSON.parse(execTimesInit));
  }, [author, setExecTimes]);

  const data = useMemo(
    () =>
      Object.keys(execTimes).map((key) =>
        createData(...key.split("-"), execTimes[key])
      ),
    [execTimes]
  );

  const classes = useStyles();
  const TabPanel = tabPanels[value];

  const handleChange = (e, v) => {
    setValue(v);
  };

  return (
    <Container>
      <Paper className={classes.paper}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          className={classes.tabs}
        >
          <Tab label="Table" />
          <Tab label="Graph" />
          <Tab label="Source" />
        </Tabs>
        <Panel>
          <TabPanel data={data} />
        </Panel>
      </Paper>
    </Container>
  );
}

export default Overview;

const useStyles = makeStyles((theme) => ({
  tabs: { backgroundColor: "#121212" },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "100%",
  },
}));

const Panel = styled.div`
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  padding: 12px;
  box-sizing: border-box;
  position: relative;
`;

const Container = styled.div`
  flex: 1;
  padding: 12px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  td,
  th {
    text-transform: capitalize;
  }
`;
