import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";


function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Ubuntu'
  },
  palette: {
    type: "dark",
    primary: { main: "#01c5c4" },
    secondary: { main: "#b8de6f" }
  }
})