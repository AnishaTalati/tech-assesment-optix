import { Button, ButtonBaseProps } from "@mui/material";
import { purple } from "@mui/material/colors";

interface ButtonProps extends ButtonBaseProps {
  onClick?: () => void;
}

export const GlobalButton = ({ children, onClick, type }: ButtonProps) => {
  return (
    <Button
      sx={{ marginY: "10px", color: purple[300] }}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
