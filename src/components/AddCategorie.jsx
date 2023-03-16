import React, { useState } from "react";

// export const AddCategorie = ({setCategories}) => {
export const AddCategorie = ({ onNewCategory }) => {
  // hook asociado al input
  const [inputValue, setInputValue] = useState("");
  const onInputChanges = (ev) => {
    setInputValue(ev.target.value); // udp input value
  };

  // evento aociado al formulario
  const onSubmit = (ev) => {
    ev.preventDefault();
    if (inputValue.trim().length < 1) return;

    // sol 1. modificar el hook que lleva el listado de categorias
    /* 
    setCategories((cat)=> [...cat, {name:inputValue}])
    setInputValue("")
    */

    // sol 2. dispara la f(x) en el componente padre
    onNewCategory(inputValue.trim());
    setInputValue("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="search gifs ... "
        value={inputValue}
        onChange={onInputChanges}
      />
    </form>
  );
};
