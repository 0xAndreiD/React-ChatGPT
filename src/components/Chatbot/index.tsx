import { FormEventHandler, useEffect, useRef, useState } from "react";
import { create } from "zustand";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

import { requestCompletion } from "~/api";
import { useFetching } from "~/hooks/common";
import { AlertType, useShowAlert } from "~/store/reducers/alert";
import { Message } from "~/enums";
import { ChatMessage, Owner } from "~/types/chat";

import { FlexBox, Form } from "../Common";
import Chatbox from "./Chatbox";

type State = {
  messages: ChatMessage[];
  loading?: Owner;
  addMessages: (...messages: ChatMessage[]) => void;
  showLoading: (loading: Owner) => void;
  hideLoading: () => void;
};

const useChatbot = create<State>((set) => ({
  messages: [],
  addMessages(...messages) {
    set((state) => ({
      ...state,
      messages: [...state.messages, ...messages],
      loading: undefined,
    }));
  },
  showLoading(loading) {
    set((state) => ({ ...state, loading }));
  },
  hideLoading() {
    set((state) => ({ ...state, loading: undefined }));
  },
}));

function Chatbot() {
  const { messages, loading, addMessages, showLoading } = useChatbot();

  const [inputText, setInputText] = useState<string>("");
  const [isFetching, setIsFetching] = useFetching();

  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!messages.length) {
      addMessages({
        owner: Owner.Bot,
        text: "How can I help you today?",
      });
    }
  }, []);

  useEffect(() => {
    box.current?.scrollTo(0, box.current.scrollHeight);
  }, [messages]);

  const showAlert = useShowAlert();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!inputText.trim() || isFetching) {
      return;
    }

    addMessages({ owner: Owner.User, text: inputText });
    setInputText("");

    try {
      showLoading(Owner.Bot);
      setIsFetching(true);
      const { data } = await requestCompletion(inputText);
      addMessages({ owner: Owner.Bot, text: data.answer || "" });
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
    <Form
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        height: "fill-available",
        py: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <FlexBox ref={box} overflow="hidden" flexDirection="column" flexGrow={1}>
        {messages.map((props, key) => (
          <Chatbox key={key} {...props} />
        ))}
        {loading ? <Chatbox owner={loading} loading={true} /> : null}
      </FlexBox>
      <FormControl variant="outlined" sx={{ width: "100%", my: 1 }}>
        <OutlinedInput
          placeholder="Text here."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </FormControl>
    </Form>
  );
}

export default Chatbot;
