/* eslint-disable react/prop-types */
/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { css } from "@emotion/react";
import Grid from "@mui/material/Grid2";
import { SettingsOutlined } from "@mui/icons-material";
import EditProfile from "./editProfile";

const styles = {
  coverUpload: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#E0E0E0",
    width: "100%",
    height: 200,
  }),
  profileSection: css({
    maxWidth: "90%",
    height: "50vh",
    background: "#fff",
    margin: "0 auto",
    transform: "translateY(-50px)",
    borderRadius: 2,
    padding: "20px 10px",
  }),
  profileAvatar: css({
    width: "60%",
    height: "auto",
    aspectRatio: "1",
  }),
  profileName: css({}),
  editBtn: css({
    border: "1px solid #e0e0e0",
    borderRadius: "2px",
    "& .MuiButton-root": {
      borderRadius: "2px",
    },
    "& .MuiButtonGroup-firstButton": {
      textTransform: "capitalize",
    },
  }),
};

const Profile = () => {
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <Box sx={{ background: "#F2F2F2", minHeight: "100vh" }}>
      <Box css={styles.coverUpload}>
        <Typography>Add cover photo</Typography>
      </Box>
      <Box css={styles.profileSection}>
        <Grid container sx={{ alignItems: "center" }}>
          <Grid size={1.8} sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar css={styles.profileAvatar} />
          </Grid>
          <Grid
            size={10}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box>
                <Typography variant="h4" css={styles.profileName}>
                  Dinesh
                </Typography>
              </Box>
              <Box>
                <Typography>Bharathi</Typography>
              </Box>
            </Grid>
            <Grid>
              <SplitButton setOpenEdit={setOpenEdit} />
              <EditProfile openEdit={openEdit} setOpenEdit={setOpenEdit} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

function SplitButton({ setOpenEdit }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const options = [
    "Create a merge commit",
    "Squash and merge",
    "Rebase and merge",
  ];

  const handleClick = () => {
    setOpenEdit(true);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="outlined"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button onClick={handleClick} sx={{ textTransform: "capitalize" }}>
          Edit Profile
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <SettingsOutlined sx={{ fontSize: "16px" }} />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}

export default Profile;
