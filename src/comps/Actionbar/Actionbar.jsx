import { Button, ButtonGroup } from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import styled from "styled-components";
import useCallers from "../../hooks/useCallers";

function Actionbar() {
  const {
    handleCallDataGen,
    handleCallProgram,
    handleCallReferee,
    busy,
  } = useCallers();

  return (
    <Container>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
        fullWidth
        disabled={busy}
      >
        <Button
          onClick={handleCallDataGen}
          startIcon={<PlaylistAddIcon />}
          style={{ backgroundColor: "#d9adad" }}
        >
          Make Random Data
        </Button>
        <Button
          onClick={handleCallProgram}
          color="secondary"
          fullWidth
          startIcon={<PlaylistPlayIcon />}
          style={{ backgroundColor: "#84a9ac" }}
        >
          Sort Data
        </Button>
        <Button
          onClick={handleCallReferee}
          startIcon={<PlaylistAddCheckIcon />}
          style={{ backgroundColor: "#89c9b8" }}
        >
          Check Correct
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default Actionbar;

const Container = styled.div`
  padding: 12px;
`;
