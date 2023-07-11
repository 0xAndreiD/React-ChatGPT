import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";

import { useStoreSelector } from "~/store";
import { useHideAlert, AlertType, AlertState } from "~/store/reducers/alert";

const colors = {
  [AlertType.Success]: "#357235",
  [AlertType.Info]: "#17a2b8",
  [AlertType.Error]: "#d62c2f",
};

export default function Alert() {
  const hideAlert = useHideAlert();

  const { type, message } = useStoreSelector(
    ({ alert }) => alert
  ) as AlertState;

  return (
    <Container
      maxWidth={false}
      sx={{
        position: "fixed",
        top: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        background: type ? colors[type] : "white",
        height: type ? 40 : 0,
        transition: "height 400ms ease",
        overflow: "hidden",
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <span>{message}</span>
      <Button
        sx={{
          position: "absolute",
          right: 0,
          padding: 0.5,
          color: "white",
          clipPath: "ellipse(16px 16px at 50% 50%)",
        }}
        onClick={hideAlert}
      >
        <CloseIcon sx={{ width: 24, height: 24 }} />
      </Button>
    </Container>
  );
}
