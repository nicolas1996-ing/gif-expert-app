import React, { useEffect, useState } from "react";
import { getGifs } from "../helpers/getGifs";
import { useFetchGifs } from "../hooks/useFetchGifs";
import { ShowImgsCategory } from "./ShowImgsCategory";

export const GifGrid = ({ cat }) => {
  const { images, isLoading } = useFetchGifs(cat);

  return (
    <div>
      {/* <h1> {isLoading ? "loading ..." : cat} </h1> */}

      {/* and logico: si es true ejecuta el lado derecho */}
      <h1> {isLoading && "loading ..."} </h1>
      <h1>{cat}</h1>
      <div className="card-grid">
        {images.map((img) => (
          <ShowImgsCategory key={img.id} imageInfo={img} />
          // <ShowImgsCategory key={img.id} {...img} />
        ))}
      </div>
    </div>
  );
};
