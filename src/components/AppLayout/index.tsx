import React from "react";
import Container from "@mui/material/Container";

import Alert from "./Alert";
import PrimaryAppBar from "./PrimaryAppBar";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        px: "0 !important",
      }}
    >
      <PrimaryAppBar />
      <Alert />
      {children}
    </Container>
  );
}
