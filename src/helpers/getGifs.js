export const getGifs = async (category) => {
  const api_key = "j7oMU7ONZhAzrtiSVxnqjRMWA9DRoF29";
  const limit = 10;
  const url_base = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${category}&limit=${limit}`;

  const resp = await fetch(url_base);
  const { data } = await resp.json();
  const gifs = data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.downsized_medium.url,
  }));

  return gifs
};

