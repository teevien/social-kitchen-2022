export interface PartyDish {
  id: string,
  servings: number,
  image: string,
  title: string,
  partyId: string,
  spoonacularSourceUrl: string,
  extendedIngredients: []
}

export default PartyDish