import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Props {
  recipeId: string,
}

const ShowSingleRecipe: React.FC<Props> = ( { 
  recipeId,
}: Props ) => {

  const api_key = '121a367a73dd467087a9345b27246fe9';
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const paramsPartyId = useParams().party_id;

  const fetchRecipeInfo = async (recipeId: string) => {
    const res = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${api_key}&includeNutrition=false`);
    const data = await res.json();
    setSelectedRecipe(data);
  }

  useEffect(() => {
    if (parseInt(recipeId, 10) > 0) {
      fetchRecipeInfo(recipeId);
    }
  }, [recipeId]);

  const printRecipe = () => {

    return (
      <div className="wrapper">
        <div className="dish">
          <h2 className="dish__title">{selectedRecipe.title}</h2>
          <div className="dish__container">
            <aside className="dish__aside">
              <img
                className="dish__image"
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
              />
              <p className="dish__servings">Servings: {selectedRecipe.servings}</p>
              <div className="dish__buttons-container">
                <Link className="dish__back-button" to={`/${paramsPartyId}`}>
                  <i className="fas fa-arrow-left"></i>
                </Link>
                <a target="_blank" href={selectedRecipe.spoonacularSourceUrl} className="dish__directions-button">
                  Directions
                </a>
              </div>
            </aside>
            <section className="dish__main">
              <h3 className="dish__ingredients-title">Ingredients</h3>
              <ul>
                {
                  selectedRecipe.extendedIngredients.map((ing: any) => {
                    return (
                      <li key={ing.id}>{ing.original}</li>
                    )
                  })
                }
              </ul>
            </section>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="printSingleRecipe">
      { selectedRecipe ? printRecipe() : '' }
    </div>
  )
}

export default ShowSingleRecipe
