 const addCategorie = () => {
    setcategories([...categories, { name: `new-categorie-${categories.length+1}` }]);
    // setcategories(cat => [...cat, { name: `${'new-categorie-'+Math.random()*100}` }]);
  };
 
 <button onClick={addCategorie}>Agregar</button>

