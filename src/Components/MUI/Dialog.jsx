import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const {t} = useTranslation();
  const [open, setOpen] = React.useState(props.openAlert);

React.useEffect(() => {
  setOpen(props.openAlert);
}, [props.openAlert]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.cancelAction}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "#3a73c2" }} onClick={props.cancelAction}>
            {t("Cancel")}
          </Button>
          <Button
            style={{ color: "red" }}
            onClick={() => {
              handleClose();
              props.Action();
            }}
          >
            {t("Ok")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
