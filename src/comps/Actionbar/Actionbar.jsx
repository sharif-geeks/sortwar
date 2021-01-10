import { Button, ButtonGroup } from "@material-ui/core";
import styled from "styled-components";
import useCallers from "../../hooks/useCallers";

function Actionbar() {
  const {
    handleCallDataGen,
    handleCallProgram,
    handleCallReferee,
  } = useCallers();

  return (
    <Container>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
        fullWidth
      >
        <Button onClick={handleCallDataGen}>Make Random Data</Button>
        <Button onClick={handleCallProgram} color="secondary" fullWidth>
          Sort Data
        </Button>
        <Button onClick={handleCallReferee}>Check Correct</Button>
      </ButtonGroup>
    </Container>
  );
}

export default Actionbar;

const Container = styled.div`
  padding: 12px;
`;
