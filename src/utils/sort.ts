import { MovieData } from "../types";

export const sort = (
  array: MovieData[],
  direction: string,
  property: keyof MovieData
) => {
  if (direction === "asc") {
    array.sort((a, b) =>
      a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
    );
  } else {
    array.sort((a, b) =>
      b[property] > a[property] ? 1 : a[property] > b[property] ? -1 : 0
    );
  }

  return array;
};
