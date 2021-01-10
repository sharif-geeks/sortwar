import styled from "styled-components";
import Actionbar from "../comps/Actionbar";
import Graph from "../comps/Graph/Graph";
import Overview from "../comps/Overview";
import Selectors from "../comps/Selectors";

function Home() {
  return (
    <Container>
      <Selectors />
      <Graph />
      <Overview />
      <Actionbar />
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;
