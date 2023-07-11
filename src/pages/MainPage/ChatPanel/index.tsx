import Container from "@mui/material/Container";

import Chatbot from "~/components/Chatbot";

function ChatPanel() {
  return (
    <Container maxWidth={false} sx={{ pt: "64px", height: "100vh" }}>
      <Chatbot />
    </Container>
  );
}

export default ChatPanel;
