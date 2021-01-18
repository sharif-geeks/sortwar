import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";
import CustomSnackbar from './comps/CustomSnackbar'
import Appbar from "./comps/Appbar/Appbar";
import styled from "styled-components";
import { colors } from "./config/vars";
import recoilPersist from 'recoil-persist'

const { RecoilPersist, updateState } = recoilPersist()

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Ubuntu'
  },
  palette: {
    type: "dark",
    primary: colors.primary,
    secondary: colors.secondary
  },
  overrides: {
    MuiButton: {
      root: {
        paddingTop: 12,
        paddingBottom: 12
      }
    }
  }
})

function App() {
  return (
    <RecoilRoot initializeState={updateState}>
      <RecoilPersist />
      <ThemeProvider theme={theme}>
        <Container>
          <Appbar />
          <Home />
        </Container>
        <CustomSnackbar />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;


const Container = styled.div`
  height: 100vh; 
  position: relative;
  display:flex; 
  flex-direction:column;
`