import React, { useState, useEffect } from 'react';
import PrintRecipesList from './PrintRecipesList';
import PartyDish from '../../partyDish';

interface Props {
  partyDishes: PartyDish[],
  setPartyDishes: React.Dispatch<any>,
  partyId: string
}

const SearchForRecipe: React.FC<Props> = ( { 
  partyDishes,
  setPartyDishes,
  partyId
}: Props ) => {

  const [recipeSearch, setRecipeSearch] = useState<string>('');
  const [recipesList, setRecipesList] = useState<[]>([]);

  const api_key = '121a367a73dd467087a9345b27246fe9';

  const searchForRecipes = async (searchTerm: string) => {
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=10&apiKey=${api_key}`);
    const data = await res.json();
    setRecipesList(data.results);
  }

  const handleChange = (e: any) => {
    setRecipeSearch(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    searchForRecipes(recipeSearch);
  }

  // const toggleSearchAndSingle = () => {
  //   console.log('toggle search');
  // }

  return (
    <div className="searchForRecipe">
      <form onSubmit={handleSubmit} className="searchForm">
        <input
          type="text"
          id="recipeSearch"
          value={recipeSearch}
          onChange={handleChange}
          className="recipeSearch"
          placeholder="Search for recipes"
        />
        <label htmlFor="recipeSearch" />

        <input
          type="submit"
          id="submit"
          value="Search"
          className="BTN__submit--search"
        />
        <label htmlFor="submit" />
      </form>
      {/* <button
        onClick={toggleSearchAndSingle}
        className="toggleSearch"
      >
        <i className="fas fa-eye-slash"></i>
      </button> */}
      <PrintRecipesList
        partyDishes={partyDishes}
        setPartyDishes={setPartyDishes}
        recipesList={recipesList}
        partyId={partyId}
      />
    </div>
  )
}

export default SearchForRecipe
