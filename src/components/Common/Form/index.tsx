import Box, { BoxProps } from "@mui/material/Box";

export default function Form(props: BoxProps<"form">) {
  return <Box component="form" {...props} />;
}
