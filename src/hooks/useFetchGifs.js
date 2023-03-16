import { useEffect, useState } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = (cat) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getImages = async () => {
    const gifs = await getGifs(cat);
    setImages(gifs);
    setIsLoading(false);
  };

  // dispara un proceso cuando algo suceda []
  // [] se dispara una unica vez
  useEffect(() => {
    getImages();
  }, []);

  // useState retorna valores cuando se termina la peticion ( los dos casos)
  return {
    images,
    isLoading,
  };
};
