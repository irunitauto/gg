import { useEffect, useState } from 'react';

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('http://localhost:5000/recipes');
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipe Hub</h1>
      <div className="grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="card">
            <img src={recipe.image} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <p>{recipe.ingredients.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
