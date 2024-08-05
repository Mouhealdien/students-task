import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationCard from "./NotificationCard";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { clearToken } from "../lib/redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: theme.spacing(2),
  boxSizing: "border-box",
}));

const DrawerFooter = styled(Box)(() => ({
  marginTop: "auto",
}));

export default function PersistentDrawerLeft() {
  const cultureCode = useSelector((state) => state.language.cultureCode);
  const EnglishPages = ["Student's Data"];
  const ArabicPages = ["بيانات الطلاب "];
  const pages = cultureCode == 0 ? EnglishPages : ArabicPages;
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Logout = () => {
    dispatch(clearToken());
    navigate("/");
    console.log("done");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            bgcolor: "white",
            display: "flex",
            justifyContent: !open ? "space-between" : "end",
          }}
        >
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ color: "gray", mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <LanguageSelector />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <div> LOGO</div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerContent sx={{ padding: 0 }}>
          <List>
            {pages.map((text, index) => (
              <ListItem
                sx={{
                  color: "black",
                  bgcolor: "#edf4fe",
                  borderLeft: "2px solid #1f7bf4 ",
                }}
                key={text}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon sx={{ color: "#1f7bf4" }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <DrawerFooter>
            <NotificationCard
              logo={
                <MeetingRoomIcon
                  sx={{ color: "white", fontSize: "50px", marginTop: 5 }}
                />
              }
              title={cultureCode == "0" ? "Sign Out" : " تسجيل الخروج"}
              paragraph={
                cultureCode == "0"
                  ? "Are you sure you would like to logout of your account?"
                  : "  هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟"
              }
              color="#1f7bf4"
              btnIcon={<PowerSettingsNewIcon />}
              btnText={cultureCode == "0" ? "Sign Out" : " تسجيل الخروج"}
              cardBtnText={cultureCode == "0" ? "Sign Out" : " تسجيل الخروج"}
              fun={Logout}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
