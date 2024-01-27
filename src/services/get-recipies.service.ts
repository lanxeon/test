//TODO: create a function to get recepies from the api
//ENDPOINT: https://dummyjson.com/recipes/search?q=

import { RecipeApiResponse } from "@/interfaces/recipe";

export const getRecipies = async (
  searchQuery: string,
  signal?: AbortSignal
): Promise<RecipeApiResponse | ErrorResponse> => {
  try {
    // dummy json api
    const url = `https://dummyjson.com/recipes/search?q=${searchQuery
      .toLowerCase()
      .trim()}`;

    const res = await fetch(url, { signal });
    // throw error on 404
    if (res.status === 404) throw new Error("Recipe not found");

    const data: RecipeApiResponse = await res.json();

    if (data.recipes.length) return data;
    else throw new Error("No match Found! Try searching other recipe");
  } catch (error) {
    // returns formatted errors
    return { recipes: null, message: (error as Error).message };
  }
};

interface ErrorResponse {
  recipes: null;
  message: string;
}
