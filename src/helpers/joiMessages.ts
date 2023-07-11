type JoiMessageCredentials = {
  name: string;
};

export default function joiMessages({ name }: JoiMessageCredentials) {
  return {
    "string.empty": `${name} is required.`,
  };
}
