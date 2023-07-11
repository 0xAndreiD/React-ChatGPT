import { useState, useRef } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import { useLogout } from "~/store/reducers/auth";

export default function AccountMenu() {
  const icon = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const close = () => setOpen(false);

  const toggle = () => setOpen((prev) => !prev);

  const logout = useLogout();

  return (
    <>
      <IconButton
        ref={icon}
        onClick={toggle}
        sx={{ color: "inherit" }}
        size="large"
      >
        <AccountCircleIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={icon?.current}
        placement="bottom-start"
        disablePortal
      >
        <Paper
          sx={{
            boxShadow: "0 0 5px rgb(0 0 0 / 25%)",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 20,
              width: 8,
              height: 8,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          }}
        >
          <ClickAwayListener onClickAway={close}>
            <MenuList>
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Sign out
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
}
