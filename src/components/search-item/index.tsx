import "./search-item.styles.css";
import { Recipe } from "@/interfaces";
import { FC } from "react";
import { SearcHighlighter } from "../search-highlighter";

type SearchItemProps = {
  recipe: Recipe;
  searchQuery: string;
  className: string;
  onClick: (recipe: string) => void;
};

const SearchItem: FC<SearchItemProps> = ({
  recipe,
  searchQuery,
  className,
  onClick,
}) => {
  return (
    <li
      key={recipe.id}
      onClick={() => onClick(recipe.name)}
      className={`search-list--container__item ${className}`}
    >
      <div>
        <SearcHighlighter text={recipe.name} searchQuery={searchQuery} />
        <p className="search-list--container__item__sub-heading">
          Rating: <span className="text-highlights-small">{recipe.rating}</span>
        </p>
      </div>
    </li>
  );
};

export default SearchItem;
