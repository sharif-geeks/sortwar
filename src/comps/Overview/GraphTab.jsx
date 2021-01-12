import { Typography } from "@material-ui/core";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { colors } from "../../config/vars";
import {
  algoAtom,
  authorAtom,
  langAtom,
  statsAtom,
  typeAtom,
} from "../../recoil/atoms";

function GraphTab({ data: allData }) {
  //const [mode] = useRecoilState(modeAtom);

  const [stats] = useRecoilState(statsAtom);
  const statsData = useMemo(
    () =>
      stats.map(({ ctime, ...stat } = { ctime: 0 }) => ({
        ...stat,
        name: ctime,
      })),
    [stats]
  );

  const [author] = useRecoilState(authorAtom);
  const [type] = useRecoilState(typeAtom);
  const [lang] = useRecoilState(langAtom);
  const [algo] = useRecoilState(algoAtom);
  const data = useMemo(
    () =>
      allData
        .filter(
          (datum) =>
            datum.type === type && datum.lang === lang && datum.algo === algo
        )
        .sort((a, b) => a.time - b.time),
    [algo, allData, lang, type]
  );

  const [showAxis, setShowAxis] = useState(false);

  return (
    <Container>
      <Typography variant="h5">
        <span>{author}</span>&nbsp;<span>{lang}</span>&nbsp;
        <span>{algo}</span>
        &nbsp;<span>{type}</span>
      </Typography>

      <GraphContainer
        onMouseEnter={() => setShowAxis(true)}
        onMouseLeave={() => setShowAxis(false)}
      >
        <LineChart width={800} height={300} data={data}>
          <Line type="monotone" dataKey="time" stroke={colors.primary.main} />
          {showAxis && <CartesianGrid stroke="#ccc2" />}
          <XAxis dataKey="count" />
          <YAxis />
          <Tooltip />
        </LineChart>

        <PerformanceBox onMouseEnter={(e) => e.stopPropagation()}>
          <AreaChart
            width={200}
            height={60}
            data={statsData}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <Tooltip />
            <Area
              type="monotone"
              dataKey="cpu"
              stroke={colors.primary.main}
              fill={colors.primary.main}
            />
            <Legend
              verticalAlign="middle"
              height={36}
              wrapperStyle={{ transform: "translateY(12px)" }}
            />
          </AreaChart>
          <AreaChart
            width={200}
            height={60}
            data={statsData}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <Tooltip />
            <Area
              type="monotone"
              dataKey="memory"
              stroke={colors.secondary.main}
              fill={colors.secondary.main}
            />
            <Legend
              verticalAlign="middle"
              height={36}
              wrapperStyle={{ transform: "translateY(12px)" }}
            />
          </AreaChart>
        </PerformanceBox>
      </GraphContainer>
    </Container>
  );
}

export default GraphTab;

const PerformanceBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const GraphContainer = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  height: 100%;

  span {
    text-transform: capitalize;
  }
`;
