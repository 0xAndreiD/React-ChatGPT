import { FormEventHandler, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import ReactMarkdown from "react-markdown";

import { requestCodeExplanation } from "~/api";
import { useFetching } from "~/hooks/common";
import { AlertType, useShowAlert } from "~/store/reducers/alert";
import { Message } from "~/enums";
import Form from "~/components/Common/Form";

function CodeExplanator() {
  const [code, setCode] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [isFetching, setIsFetching] = useFetching();

  const showAlert = useShowAlert();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!code.trim() || isFetching) {
      return;
    }

    try {
      setIsFetching(true);
      const { data } = await requestCodeExplanation(code);
      setExplanation(data.text || "");
    } catch {
      showAlert({
        type: AlertType.Error,
        message: Message.SomethingWrong,
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ mt: "64px" }}>
      <Form
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          py: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <textarea
              placeholder="Enter code here."
              rows={20}
              style={{ width: "-webkit-fill-available" }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></textarea>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Explanation</Typography>
            <ReactMarkdown children={explanation} />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingButton
              endIcon={<LoginIcon />}
              loading={isFetching}
              loadingPosition="end"
              type="submit"
              variant="outlined"
              sx={{ alignSelf: "end", px: 2, mt: 2 }}
            >
              Explain
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
}

export default CodeExplanator;
