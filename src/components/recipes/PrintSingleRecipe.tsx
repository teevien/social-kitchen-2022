import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

interface Props {
  partyDishes: any[],
  setPartyDishes: React.Dispatch<any>
  recipeId: number,
  partyId: string
}

const PrintSingleRecipe: React.FC<Props> = ( { 
  partyDishes,
  setPartyDishes,
  recipeId,
  partyId
}: Props ) => {

  const api_key = '121a367a73dd467087a9345b27246fe9';
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  const addDish = (recipe: any) => {
    const newDishes = partyDishes;

    const index = newDishes.findIndex(
      dish =>
        dish.partyId === partyId &&
        dish.id === recipe.id
    );

    console.log(index);

    if (index < 0) {
      newDishes.push({
        id: recipe.id,
        servings: recipe.servings,
        image: recipe.image,
        title: recipe.title,
        partyId: partyId,
        spoonacularSourceUrl: recipe.spoonacularSourceUrl,
        extendedIngredients: recipe.extendedIngredients
      });
      setPartyDishes(newDishes);
      window.localStorage.setItem('partyDishes', JSON.stringify(newDishes));
      swal(`${recipe.title} has been added to your event`);
    } else {
      swal(`${recipe.title} has already been added to your event`);
    }
  }

  const fetchRecipeInfo = async (recipeId: number) => {
    const res = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${api_key}&includeNutrition=false`);
    const data = await res.json();
    setSelectedRecipe(data);
  }

  useEffect(() => {
    if (recipeId > 0) {
      fetchRecipeInfo(recipeId);
    }
  }, [recipeId]);

  const printRecipe = () => {

    return (
      <div className="searchRecipe--card">
        <h2 className="searchRecipeHeading">{selectedRecipe.title}</h2>
        <img className="searchRecipeImg" src={selectedRecipe.image} alt={selectedRecipe.title} />
        <div className="searchRecipeInfo">

          <p className="sub__heading--recipe">
            <span className="sub__text--headingSearch">Servings: </span>
            {selectedRecipe.servings}
          </p>

          <p className="sub__heading--recipe">
            <span>Ingredients: </span>
          </p>

          <ul>
            {
              selectedRecipe.extendedIngredients.map((ing: any) => {
                return (
                  <li key={ing.id}>{ing.original}</li>
                )
              })
            }
          </ul>

          <div className="container--searchRecipeLink">
            <a target="_blank" href={selectedRecipe.spoonacularSourceUrl} className="searchRecipeLink">
              Directions
            </a>
            <button onClick={() => addDish(selectedRecipe)} className="btn__add--searchRecipe">
              Add Dish
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="printSingleRecipe">
      { selectedRecipe ? printRecipe(): ''}
    </div>
  )
}

export default PrintSingleRecipe
