import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import getTranslatedMessage from "../languages/LanguageFallback";

function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar variant="dense">
          <img
            src="/images/quadyster.svg"
            height={25}
            width={160}
            alt="Quadyster Logo"
          />
          <Button
            disableRipple
            variant="text"
            sx={{ textTransform: "none", marginLeft: "2px" }}
            style={{ color: "black" }}
          >
            <HomeIcon
              style={{ color: "darkblue" }}
              sx={{ marginRight: "2px" }}
            />
            {getTranslatedMessage("appbar-clocktime")}
          </Button>
          <Button
            disableRipple
            variant="text"
            sx={{ textTransform: "none" }}
            style={{ color: "black" }}
          >
            <ListIcon style={{ color: "green" }} sx={{ marginRight: "2px" }} />
            {getTranslatedMessage("appbar-timelog")}
          </Button>
          <Button
            disableRipple
            variant="text"
            sx={{ textTransform: "none" }}
            style={{ color: "black" }}
            href="/"
          >
            <BeachAccessIcon
              style={{ color: "maroon" }}
              sx={{ marginRight: "2px" }}
            />
            {getTranslatedMessage("appbar-holiday")}
          </Button>
          <Button
            disableRipple
            variant="text"
            sx={{ textTransform: "none" }}
            style={{ color: "black" }}
          >
            <AttachMoneyIcon
              style={{ color: "maroon" }}
              sx={{ marginRight: "0px", paddingRight: "0px" }}
            />
            {getTranslatedMessage("appbar-timesummary")}
          </Button>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            variant="text"
            sx={{ textTransform: "none" }}
            style={{ color: "black" }}
            disableRipple
          >
            <SettingsIcon
              style={{ color: "DarkTurquoise" }}
              sx={{ marginRight: "2px" }}
            />
            {getTranslatedMessage("appbar-settings")}
            <KeyboardArrowDownIcon
              style={{ color: "black" }}
              sx={{ marginRight: "2px" }}
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem disableRipple onClick={handleClose}>
              <SettingsIcon style={{ color: "DarkTurquoise" }} />
              {getTranslatedMessage("appbar-changeappsettings")}
            </MenuItem>
            <MenuItem disableRipple onClick={handleClose}>
              <SettingsIcon style={{ color: "DarkTurquoise" }} />
              {getTranslatedMessage("appbar-changeadminpermissions")}
            </MenuItem>
            <MenuItem disableRipple onClick={handleClose}>
              <SettingsIcon style={{ color: "DarkTurquoise" }} />
              {getTranslatedMessage("appbar-changelocalesettings")}
            </MenuItem>
          </Menu>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            id="profile-button"
            aria-controls={open2 ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open2 ? "true" : undefined}
            onClick={(e) => setAnchorEl2(e.currentTarget)}
            variant="text"
            sx={{ textTransform: "none" }}
            style={{ color: "black" }}
            disableRipple
          >
            <PersonIcon
              style={{ color: "purple" }}
              sx={{ marginRight: "2px" }}
            />
            {getTranslatedMessage("appbar-username")}
            <KeyboardArrowDownIcon
              style={{ color: "black" }}
              sx={{ marginRight: "2px" }}
            />
          </Button>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl2}
            open={open2}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "profile-button",
            }}
          >
            <MenuItem disableRipple onClick={handleClose}>
              <PersonIcon style={{ color: "purple" }} />
              {getTranslatedMessage("appbar-changepassword")}
            </MenuItem>
            <MenuItem disableRipple onClick={handleClose}>
              <PersonIcon style={{ color: "purple" }} />
              {getTranslatedMessage("appbar-changepassphrase")}
            </MenuItem>
            <Divider />
            <MenuItem disableRipple onClick={handleClose}>
              <LogoutIcon
                style={{ color: "red" }}
                sx={{ marginRight: "3px" }}
              />
              {getTranslatedMessage("appbar-logout")}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;
