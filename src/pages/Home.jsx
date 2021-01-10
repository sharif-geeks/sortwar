import styled from "styled-components";
import Actionbar from "../comps/Actionbar";
import Overview from "../comps/Overview";
import Selectors from "../comps/Selectors";

function Home() {
  return (
    <Container>
      <Selectors />
      <Actionbar />
      <Overview />
    </Container>
  );
}

export default Home;

const Container = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  flex-direction: column;
  overflow: hidden;
`;
