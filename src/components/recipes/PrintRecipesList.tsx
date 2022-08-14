import React, { useState } from 'react'
import PrintSingleRecipe from './PrintSingleRecipe';
import PartyDish from '../../partyDish';

interface Props {
  partyDishes: PartyDish[],
  setPartyDishes: React.Dispatch<any>
  recipesList: [],
  partyId: string
}

const PrintRecipesList: React.FC<Props> = ( {
  partyDishes,
  setPartyDishes,
  recipesList,
  partyId
}: Props ) => {

  const [recipeId, setRecipeId] = useState<number>(0);

  const handleClick = (e: any) => {
    setRecipeId(e.target.value);
  }

  const printRecipes = () => {
    return (
      recipesList.length > 0 ?
      recipesList.map((recipe: any) => {
        return (
          <div key={recipe.id} className="searchRecipeResult">
            <button
              className="coolbutton"
              value={recipe.id}
              onClick={handleClick}
            >
              {recipe.title}
            </button>
          </div>
        )
      })
      : null
    )
  }

  return (
    <div className="printRecipeList">
      <section id="recipe">
        <PrintSingleRecipe
          partyDishes={partyDishes}
          setPartyDishes={setPartyDishes}
          recipeId={recipeId}
          partyId={partyId}
        />
      </section>
      
      <section className="recipe-list">
        {printRecipes()}
      </section>
    </div>
  )
}

export default PrintRecipesList
