import { CircularProgress, CircularProgressProps } from "@mui/material";
import { purple } from "@mui/material/colors";

interface LoadingProps extends CircularProgressProps {}

export const Loading = (props: LoadingProps) => (
  <CircularProgress
    size={40}
    {...props}
    sx={{
      color: purple[800],
    }}
  />
);
