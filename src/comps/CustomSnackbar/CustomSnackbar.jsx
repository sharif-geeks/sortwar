import { Portal } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useRecoilState } from "recoil";
import { snackbarAtom } from "../../recoil/atoms";

export default function CustomSnackbar() {
  const [{ message, severity }, setSnackbar] = useRecoilState(snackbarAtom);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ message: "", severity });
  };

  return (
    <Portal>
      <Snackbar open={!!message} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity || "info"}>
          {message}
        </Alert>
      </Snackbar>
    </Portal>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
