import { Recipe } from "@/interfaces";
import { getRecipies } from "@/services";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useFetchRecipies(
  query: string
): [Recipe[], boolean, string, Dispatch<SetStateAction<Recipe[]>>] {
  const [recipies, setRecepies] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    // //initialize abort
    const controller = new AbortController();
    const signal = controller.signal;

    // handle empty query
    if (query) {
      getRecipies(query, signal)
        .then((res) => {
          if (res.recipes?.length) {
            setError("");
            setRecepies(res.recipes);
            setLoading(false);
          } else {
            setRecepies([]);
            setError("No recipies found");
            setLoading(false);
          }
        })
        .catch((error: Error) => {
          setLoading(false);
          if (error) setError(error.message);
        });
    } else {
      setRecepies([]);
      setError("");
      setLoading(false);
    }
    return () => {
      // aborting api call to avoid race condition
      controller.abort();
    };
  }, [query]);

  return [recipies, loading, error, setRecepies];
}

export default useFetchRecipies;
