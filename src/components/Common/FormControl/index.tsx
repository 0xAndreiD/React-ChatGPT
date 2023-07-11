import { forwardRef } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";

function CustomFormControl({ label, ...props }: OutlinedInputProps) {
  return (
    <FormControl sx={{ marginBottom: 2 }}>
      <FormLabel sx={{ marginBottom: 0.5 }}>{label}</FormLabel>
      <OutlinedInput inputProps={{ sx: { padding: 1 } }} {...props} />
    </FormControl>
  );
}

export default forwardRef<HTMLInputElement, OutlinedInputProps>(
  (props, ref) => <CustomFormControl inputRef={ref} {...props} />
);
