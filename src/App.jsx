import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import RecipeContainer from "./Components/RecipeContainer";
import "./assets/style.css";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://api.sampleapis.com/recipes/recipes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRecipes(data);
      });
    return () => console.log("unmounted");
  }, []);

  function filterRecipesComputeIntensive(recipes) {
    const now = performance.now();
    while (performance.now() - now < 1000) {
      //spin()
    }
    return recipes;
  }

  const filteredRecipes = filterRecipesComputeIntensive(recipes);

  const handleEdit = (editedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === editedRecipe.id ? editedRecipe : recipe
    );
    setRecipes(updatedRecipes);
  };

  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
  };

  return (
    <>
      <Navbar />
      {recipes.map((data) => (
        <RecipeContainer
          key={data.id}
          recipe={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
      <Footer />
    </>
  );
}

export default App;
