export const imageUrl = path => {
  const poster = `https://image.tmdb.org/t/p/w500${path}`;
  return poster;
};

export const smallImages = path => {
  const miniImage = `https://image.tmdb.org/t/p/w300${path}`;
  return miniImage;
};
