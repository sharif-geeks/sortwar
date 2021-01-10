import { Typography } from "@material-ui/core";
import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  algoAtom,
  authorAtom,
  countAtom,
  langAtom,
  modeAtom,
  typeAtom,
} from "../../recoil/atoms";

function GraphTab({ data: allData }) {
  const [mode] = useRecoilState(modeAtom);
  const [author] = useRecoilState(authorAtom);
  const [type] = useRecoilState(typeAtom);
  const [lang] = useRecoilState(langAtom);
  const [algo] = useRecoilState(algoAtom);

  const [showAxis, setShowAxis] = useState(false);

  const data = useMemo(
    () =>
      allData
        .filter(
          (datum) =>
            datum.type === type && datum.lang === lang && datum.algo === algo
        )
        .sort((a, b) => a.time < b.time),
    [algo, allData, lang, type]
  );

  return (
    <Container
      onMouseEnter={() => setShowAxis(true)}
      onMouseLeave={() => setShowAxis(false)}
    >
      <Typography variant="h5">
        <span>{author}</span>&nbsp;<span>{lang}</span>&nbsp;<span>{algo}</span>
        &nbsp;<span>{type}</span>
      </Typography>
      <LineChart width={800} height={300} data={data}>
        <Line type="monotone" dataKey="time" stroke="#8884d8" />
        {showAxis && <CartesianGrid stroke="#ccc2" />}
        <XAxis dataKey="count" />
        <YAxis />
      </LineChart>
    </Container>
  );
}

export default GraphTab;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  flex: 1;
  height: 100%;

  span {
    text-transform: capitalize;
  }
`;
