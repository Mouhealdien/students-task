import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";

type NotificationCardProps = {
  logo: React.ReactNode;
  title: string;
  color: string;
  paragraph: string;
  btnIcon?: React.ReactNode;
  btnText?: string;
  fun?: () => void;
  cardBtnText?: string;
};

const NotificationCard = ({
  logo,
  title,
  paragraph,
  color,
  btnIcon,
  btnText,
  fun,
  cardBtnText,
}: NotificationCardProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handelLogout = () => {
    fun ? fun() : "";
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
        }}
        onClick={handleClickOpen}
      >
        {btnIcon ? btnIcon : ""} {" " + btnText ? btnText : ""}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        sx={{
          "& .MuiPaper-root": {
            padding: 0,
          },
          padding: 0,
        }}
      >
        <DialogContent sx={{ padding: 0 }}>
          <Box
            height="140"
            sx={{
              backgroundColor: color,
              height: "140px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              textAlign: "center",
            }}
          >
            {logo}
          </Box>
          <Box paddingY={3}>
            <Typography
              align="center"
              gutterBottom
              variant="h5"
              component="div"
              color={color}
            >
              {title}
            </Typography>
            <Typography align="center" variant="body2" color="text.secondary">
              {paragraph}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "block" }}>
          <Stack
            paddingX={2}
            paddingY={2}
            direction={"row"}
            gap={3}
            justifyContent={"center"}
          >
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={[
                { backgroundColor: color },
                () => ({
                  "&:hover": {
                    color: color,
                    bgcolor: "white",
                    border: `1px solid ${color}`,
                  },
                }),
              ]}
              color="primary"
              onClick={handelLogout}
            >
              {cardBtnText}
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleClose}
              sx={[
                {
                  backgroundColor: "white",
                  color: color,
                  border: `1px solid ${color}`,
                },
                () => ({
                  "&:hover": {
                    color: "white",
                    bgcolor: color,
                  },
                }),
              ]}
              color="primary"
            >
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NotificationCard;
