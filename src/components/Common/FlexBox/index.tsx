import Box, { BoxProps } from "@mui/material/Box";
import { forwardRef } from "react";

export default forwardRef(function ({ sx, ...props }: BoxProps, ref) {
  return (
    <Box
      ref={ref}
      sx={{
        ...sx,
        display: "flex",
      }}
      {...props}
    />
  );
});
