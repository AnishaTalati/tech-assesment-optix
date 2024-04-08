import { SyntheticEvent, useState } from "react";
import { MovieData } from "./types";
import { MovieTable } from "./components/MovieTable";
import { ReviewCard } from "./components/ReviewCard";
import { Alert, Container, Grid, Snackbar, Typography } from "@mui/material";

export const App = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieData>();
  const [showReviewCard, setShowReviewCard] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    isError: false,
  });

  return (
    <Container>
      <Grid
        padding="20px"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() =>
            setSnackbar({ open: false, message: "", isError: false })
          }
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={!snackbar.isError && snackbar.open ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
        <Typography align="center" variant="h3" gutterBottom>
          Welcome to Movie Database!
        </Typography>
        <Typography align="center" variant="h5" gutterBottom>
          Select a movie to review!
        </Typography>
        <Grid>
          <MovieTable
            setSelectedMovie={setSelectedMovie}
            setShowReviewCard={setShowReviewCard}
            selectedMovie={selectedMovie}
          />
        </Grid>
        <Grid textAlign="center" padding="20px">
          {showReviewCard && (
            <ReviewCard
              setSnackbar={setSnackbar}
              selectedMovie={selectedMovie}
              setShowReviewCard={setShowReviewCard}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
