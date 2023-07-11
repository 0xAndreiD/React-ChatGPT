import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ImageIcon from "@mui/icons-material/Image";
import CodeIcon from "@mui/icons-material/Code";

import { useStoreSelector } from "~/store";

import Logo from "./Logo";
import AccountMenu from "./AccountMenu";

const navLinks: Array<{
  to: string;
  Icon: typeof SvgIcon;
}> = [
  {
    to: "/main/chat",
    Icon: QuestionAnswerIcon,
  },
  {
    to: "/main/img-gen",
    Icon: ImageIcon,
  },
  {
    to: "/main/code-exp",
    Icon: CodeIcon,
  },
];

export default function PrimarySearchAppBar() {
  const isAuthenticated = !!useStoreSelector(({ auth }) => auth.apiKey);

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Logo />
        {isAuthenticated ? (
          <>
            <Box sx={{ display: "flex", "& > *": { mx: 3 } }}>
              {navLinks.map(({ Icon, to }) => (
                <Link key={to} to={to} className="text-white">
                  <IconButton size="large" color="inherit">
                    <Icon />
                  </IconButton>
                </Link>
              ))}
            </Box>
            <AccountMenu />
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
