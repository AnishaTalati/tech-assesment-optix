import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  CircularProgress,
  Collapse,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Grow,
  Input,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { MovieData } from "../types";
import { capitalise } from "../utils/capitalise";
import { useForm, SubmitHandler } from "react-hook-form";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { amber, green, purple } from "@mui/material/colors";
import { GlobalButton as Button } from "./Button";

interface ReviewCardProps extends CardProps {
  selectedMovie?: MovieData;
  setShowReviewCard: Dispatch<SetStateAction<boolean>>;
  setSnackbar: Dispatch<
    SetStateAction<{ open: boolean; message: string; isError: boolean }>
  >;
}

interface FormData {
  review: string;
}

export const ReviewCard = ({
  selectedMovie,
  setShowReviewCard,
  setSnackbar,
}: ReviewCardProps) => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);

    fetch("http://localhost:3000/submitReview", {
      method: "POST",
      headers: { "Content-TypeError": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setShowReviewCard(false);
        setSnackbar({ open: true, message: data.message, isError: false });
      })
      .catch((error) => {
        setLoading(false);
        setSnackbar({
          open: true,
          message:
            "Something went wrong submitting this review, please try again or contact support",
          isError: true,
        });
      });
  };

  if (loading)
    return (
      <CircularProgress
        size={24}
        sx={{
          color: amber[800],
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-12px",
          marginLeft: "-12px",
        }}
      />
    );

  return (
    <Grid alignItems="center" width="100%">
      <Paper
        sx={{
          border: 2,
          alignItems: "center",
          borderColor: purple[300],
        }}
        square={false}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {selectedMovie
              ? selectedMovie.title
                ? "You have selected: " + capitalise(selectedMovie.title)
                : "No Movie Title"
              : "No Movie Selected"}
          </Typography>
          {selectedMovie && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormLabel>Please leave a review below:</FormLabel>
              <Input
                type="text"
                fullWidth
                multiline
                {...register("review", {
                  required: {
                    value: true,
                    message: "Please fill in this field",
                  },
                  maxLength: {
                    value: 100,
                    message: "Please keep review to 100 characters or less",
                  },
                })}
              />
              {errors?.review?.message && (
                <Alert severity="error">{errors.review?.message}</Alert>
              )}
              <Button type="submit">Submit Review</Button>
            </form>
          )}
        </CardContent>
      </Paper>
    </Grid>
  );
};
