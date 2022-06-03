import React from "react";
import { Backdrop, Modal as MUIModal, Fade, Box } from "@mui/material";

const Modal = ({ open, handleClose, children }) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <MUIModal
      aria-labelledby="app-modal"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>{children}</Box>
      </Fade>
    </MUIModal>
  );
};

export default Modal;
