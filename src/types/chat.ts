export enum Owner {
  Bot = 1,
  User,
}

export type ChatMessage = {
  owner: Owner;
  text: string;
};
