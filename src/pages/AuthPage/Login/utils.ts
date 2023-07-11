import Joi from "joi";

import { joiMessages } from "~/helpers";

export const formWidth = 300;

export const defaultValues = {
  apiKey: "",
};

export const schema = Joi.object({
  apiKey: Joi.string()
    .required()
    .messages(joiMessages({ name: "API Key" })),
});
