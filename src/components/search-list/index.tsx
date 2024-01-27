//FIXME: handle situation where user wants to use up and down arrow keys to navigate
//TODO: highlight searched text
import "./search-list.styles.css";
import { ElementRef, ForwardRefRenderFunction, forwardRef, memo } from "react";
import SearchItem from "../search-item";
import { Recipe } from "@/interfaces";

type SearchListProps = {
  recipes: Recipe[];
  searchQuery: string;
  loading: boolean;
  setChange: () => void;
  active: number;
  onClick: (recipe: string) => void;
};

export type SelectRef = ElementRef<"ul">;

const SearchList: ForwardRefRenderFunction<SelectRef, SearchListProps> = (
  { recipes, searchQuery, loading, setChange, active, onClick },
  ref
) => {
  const hasRecipies = recipes.length > 0;
  return (
    <>
      {hasRecipies ? (
        <div className={`search-list ${hasRecipies ? "box-shadow-small" : ""}`}>
          {!loading ? (
            <ul ref={ref} className="search-list--container">
              {recipes.map((recipe, idx) => {
                let className = "";
                if (idx === active) {
                  // give a classname to active index
                  className = "active";
                }
                setChange();
                return (
                  <SearchItem
                    onClick={onClick}
                    key={recipe.id}
                    searchQuery={searchQuery}
                    recipe={recipe}
                    className={className}
                  />
                );
              })}
            </ul>
          ) : (
            <p className="search-list__loading-text">Loading</p>
          )}
        </div>
      ) : null}
    </>
  );
};

const ForwardedSearchList = forwardRef<SelectRef, SearchListProps>(SearchList);
export const PureSearchList = memo(ForwardedSearchList);
