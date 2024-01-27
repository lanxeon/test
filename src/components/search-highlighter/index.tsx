import "./search-highllighter.styles.css";
import { FC } from "react";

type SearchHighlighterProps = {
  text: string;
  searchQuery: string;
};

export const SearcHighlighter: FC<SearchHighlighterProps> = ({
  text,
  searchQuery,
}) => {
  // regular expression to match any letter/group of letters that match search query
  const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
  return (
    <p className="search-list--container__item__text">
      {parts.map((part, i) => (
        <span
          key={i}
          className={`
            ${
              part.toLowerCase() === searchQuery.toLowerCase()
                ? "text-highlights"
                : ""
            }
          `}
        >
          {part}
        </span>
      ))}
    </p>
  );
};
