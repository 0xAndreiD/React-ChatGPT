import { useForm, FormProvider, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";

import { useShowAlert, AlertType } from "~/store/reducers/alert";
import { useLogin } from "~/store/reducers/auth";
import { LoginFormValues } from "~/types/auth";
import { Form, FormControl } from "~/components/Common";

import { schema, defaultValues, formWidth } from "./utils";

function Login() {
  const resolver = joiResolver(schema);

  const form = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver,
  });

  const login = useLogin();
  const showAlert = useShowAlert();

  const handleSubmit = form.handleSubmit(login, (errors) => {
    const [, { message }] = Object.entries(errors)[0];
    showAlert({ type: AlertType.Error, message });
  });

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: formWidth,
          margin: "120px auto 60px",
        }}
        noValidate
      >
        <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
          Sign In
        </Typography>

        <Controller<LoginFormValues, "apiKey">
          name="apiKey"
          render={({ field }) => (
            <FormControl
              label="OpenAI API Key"
              type="text"
              autoFocus
              {...field}
            />
          )}
        />

        <LoadingButton
          endIcon={<LoginIcon />}
          loadingPosition="end"
          type="submit"
          variant="outlined"
          sx={{ alignSelf: "end", px: 2, mt: 2 }}
        >
          Sign In
        </LoadingButton>
      </Form>
    </FormProvider>
  );
}

export default Login;
