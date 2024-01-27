import { Recipe } from "@/interfaces";
import { getRecipies } from "@/services";
import { useEffect, useMemo, useState } from "react";

function useFetchRecipies(query: string) {
  const [recipies, setRecipies] = useState<Recipe[]>([]);
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
            setRecipies(res.recipes);
            setLoading(false);
          } else {
            setRecipies([]);
            setError("No recipies found");
            setLoading(false);
          }
        })
        .catch((error: Error) => {
          setLoading(false);
          if (error) setError(error.message);
        });
    } else {
      setRecipies([]);
      setError("");
      setLoading(false);
    }
    return () => {
      // aborting api call to avoid race condition
      controller.abort();
    };
  }, [query]);

  return useMemo(
    () => ({
      recipies,
      loading,
      error,
      setRecipies,
    }),
    [recipies, loading, error, setRecipies]
  );
}

export default useFetchRecipies;
