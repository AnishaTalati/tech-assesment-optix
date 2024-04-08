import { useState, SetStateAction, Dispatch, useMemo } from "react";
import { MovieCompany, MovieData, Order } from "../types";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { purple, yellow } from "@mui/material/colors";
import { capitalise } from "../utils/capitalise";
import { useFetch } from "../hooks/useFetch";
import { GlobalButton as Button } from "./Button";
import { Star } from "@mui/icons-material";
import { sort } from "../utils/sort";
import { formatMovieData } from "../utils/formatMovies";
import { Loading } from "./Loading";

interface MovieTableProps {
  setSelectedMovie: Dispatch<SetStateAction<MovieData | undefined>>;
  setShowReviewCard: Dispatch<SetStateAction<boolean>>;
  selectedMovie?: MovieData;
}

export const MovieTable = ({
  setSelectedMovie,
  selectedMovie,
  setShowReviewCard,
}: MovieTableProps) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof MovieData>("title");

  const {
    data: movieData = [],
    loading: moviesLoading,
    refetch: refetchMovies,
  } = useFetch("http://localhost:3000/movies");
  const {
    data: movieCompanyData = [],
    loading: movieCompaniesLoading,
    refetch: refetchMovieCompanies,
  } = useFetch("http://localhost:3000/movieCompanies");

  const rows = useMemo(() => {
    const sortedArray = sort(formatMovieData(movieData), order, orderBy);
    return sortedArray;
  }, [movieData, movieCompanyData, order, orderBy]);

  const handleOnClick = (movie: MovieData) => {
    if (movie) {
      setSelectedMovie(movie);
      setShowReviewCard(true);
    }
  };

  const headings = [
    { label: "Title", value: "title" },
    { label: "Average Rating", value: "averageRating" },
    { label: "Production Company", value: "filmCompanyId" },
    { label: "Release Year", value: "releaseYear" },
  ];

  const handleRefresh = () => {
    refetchMovieCompanies();
    refetchMovies();
  };

  if (moviesLoading || movieCompaniesLoading)
    return (
      <Loading
        size={100}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-50px",
          marginLeft: "-50px",
        }}
      />
    );

  return (
    <Grid container direction="row" justifyContent="center">
      {movieCompanyData && movieCompanyData.length > 0 && (
        <Button onClick={handleRefresh}>Refresh Movies</Button>
      )}
      <TableContainer component={Paper} sx={{ padding: "10px" }}>
        <Table>
          <caption> Total movies shown: {rows.length} </caption>
          <TableHead sx={{ backgroundColor: purple[300] }}>
            <TableRow>
              {headings.map((heading) => (
                <TableCell key={heading.value}>
                  <TableSortLabel
                    active={orderBy === heading.value}
                    direction={orderBy === heading.value ? order : "asc"}
                    onClick={() => {
                      setOrder(order === "asc" ? "desc" : "asc");
                      setOrderBy(
                        heading.value === "reviews"
                          ? "averageRating"
                          : (heading.value as keyof MovieData)
                      );
                    }}
                  >
                    {heading.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows ? (
              rows.map((movie) => (
                <TableRow
                  hover
                  key={movie.id}
                  sx={
                    selectedMovie?.id === movie.id
                      ? { backgroundColor: "#0000000a" }
                      : {}
                  }
                  onClick={() => handleOnClick(movie)}
                >
                  <TableCell>{capitalise(movie.title)}</TableCell>
                  <TableCell>
                    <Star sx={{ color: yellow[600] }} />
                    {movie.averageRating}/10
                  </TableCell>
                  <TableCell>
                    {capitalise(
                      (movieCompanyData as MovieCompany[]).find(
                        (company: MovieCompany) =>
                          company.id === movie.filmCompanyId
                      )?.name ?? ""
                    )}
                  </TableCell>
                  <TableCell>{movie.releaseYear}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>No Movies to Show</TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
