import React, { useState } from "react";
import { Button, Dialog } from "@mui/material";
import AddStudenForm from "./AddStudentForm";

type NotificationCardProps = {
  color: string;
  btnIcon?: React.ReactNode;
  btnText?: string;
  fun?: () => void;
  cardBtnText?: string;
  studentId?: string;
  FormComponent: React.ComponentType<{ formClose: () => void }>;
};

const StudentFormModal = ({
  btnIcon,
  btnText,
  fun,
  FormComponent,
  studentId,
}: NotificationCardProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        sx={{
          border: "none",
          outline: "none",
          boxShadow: "none",
          "&:focus": {
            outline: "none",
          },

          "&:hover": {
            bgcolor: btnText ? "#1f7bf4" : "",
            color: btnText ? "white" : "",
            translate: " 0 10%",
          },
          bgcolor: btnText ? "#1f7bf4" : "",
          color: btnText ? "white" : "",
        }}
        onClick={handleClickOpen}
      >
        {btnIcon ? btnIcon : ""} {" " + btnText ? btnText : ""}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiPaper-root": {
            padding: 0,
          },
          padding: 0,
        }}
      >
        {FormComponent ? (
          <FormComponent studentId={studentId} formClose={formClose} />
        ) : (
          <p>Component not found</p>
        )}
      </Dialog>
    </div>
  );
};

export default StudentFormModal;
