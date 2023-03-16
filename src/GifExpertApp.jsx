// rafc: react functional component

import React, { useState } from "react";
import { AddCategorie, GifGrid } from "./components";


const initCategories = ["categorie-one", "categorie-two"];

export const GifExpertApp = () => {
  // hook
  const [categories, setCategories] = useState([]);

  // validar categoria
  const existCategory = (category) =>
    categories.map((c) => c.toLowerCase()).includes(category.toLowerCase());

  const onAddCategory = (categorie) => {
    if (existCategory(categorie)) return;
    setCategories([categorie, ...categories]);
  };

  return (
    <>
      {/* title */}
      <h1>GifExpertApp</h1>

      {/* modifica el hook */}
      {/* <AddCategorie setCategories={setCategories}/> */}

      {/* dispara la f(x) */}
      <AddCategorie onNewCategory={onAddCategory} />

      {/* input */}
      <div>
        {categories.map((cat) => (
          <GifGrid key={`${cat}?id=${ Math.floor(Math.random()*1000)}`} cat={cat} />
        ))}
      </div>
    </>
  );
};
