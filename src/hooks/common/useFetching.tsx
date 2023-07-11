import { useState } from "react";

export default function useFetching(
  initialState: boolean | (() => boolean) = false
) {
  return useState<boolean>(initialState);
}
