import Container from "@mui/material/Container";

function WelcomePage() {
  return (
    <Container
      maxWidth={false}
      sx={{ marginTop: "80px", display: "flex", justifyContent: "center" }}
    >
      <h1>Welcome!</h1>
    </Container>
  );
}

export default WelcomePage;
