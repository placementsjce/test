import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Variants({ height }) {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height={height} />
      <Skeleton variant="rectangular" height={height} />
      <Skeleton
        variant="rectangular"
        height={height}
        sx={{ marginBottom: "3rem" }}
      />
    </Stack>
  );
}
