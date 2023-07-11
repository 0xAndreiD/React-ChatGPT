import { FormEventHandler, useState } from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";

import { requestImageUrl } from "~/api";
import { useFetching } from "~/hooks/common";
import { AlertType, useShowAlert } from "~/store/reducers/alert";
import { Message } from "~/enums";
import Form from "~/components/Common/Form";
import FlexBox from "~/components/Common/FlexBox";

function ImageGenerator() {
  const [keyword, setKeyword] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [isFetching, setIsFetching] = useFetching();

  const showAlert = useShowAlert();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!keyword.trim() || isFetching) {
      return;
    }

    try {
      setIsFetching(true);
      const { data } = await requestImageUrl(keyword);
      setUrl(data.url || "");
    } catch (err) {
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
        <FlexBox flexDirection="column" alignItems="center">
          <FormControl variant="outlined" sx={{ width: "100%", mt: 1, mb: 3 }}>
            <OutlinedInput
              placeholder="Enter keyword here."
              disabled={isFetching}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </FormControl>
          <FlexBox
            width={512}
            height={512}
            bgcolor="#ccc"
            alignItems="center"
            justifyContent="center"
          >
            {url ? (
              <img src={url} alt={keyword} width={512} height={512} />
            ) : (
              <Typography variant="h2">512 × 512</Typography>
            )}
          </FlexBox>
        </FlexBox>
      </Form>
    </Container>
  );
}

export default ImageGenerator;
