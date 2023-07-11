import ReactLoading from "react-loading";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import { Owner } from "~/types/chat";

import FlexBox from "../Common/FlexBox";
import BotAvatar from "./BotAvatar";
import UserAvatar from "./UserAvatar";

const Loading = styled(ReactLoading)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  owner: Owner;
  text?: string;
  loading?: boolean;
};

function Chatbox({ owner, text, loading }: Props) {
  return (
    <FlexBox
      flexDirection={owner === Owner.Bot ? "row" : "row-reverse"}
      alignItems="end"
      justifyContent={owner === Owner.Bot ? "start" : "end"}
      my={1}
    >
      {owner === Owner.Bot ? <BotAvatar /> : <UserAvatar />}
      {loading ? (
        <Loading type="bubbles" height={35} color="#333" />
      ) : (
        <Typography
          variant="h6"
          sx={{
            mx: 1,
            width: "60%",
            textAlign: owner === Owner.Bot ? "left" : "right",
          }}
        >
          {text}
        </Typography>
      )}
    </FlexBox>
  );
}

export default Chatbox;
