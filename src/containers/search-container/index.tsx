//TODO: create a search container
//TODO: create a searchbar
//TODO: create a searchlist
//TODO: call recepies api from utils
//TODO: add debouncer
//TODO: make list pure component
//TODO: write a abort controller
import "./search-container.styles.css";
import SearchBar from "@/components/search-bar";
import {
  PureSearchList as SearchList,
  SelectRef,
} from "@/components/search-list";
import { useDebounce } from "@/hooks";

import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import useFetchRecipies from "@/hooks/use-fetch-recipies";

enum KEYS {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  Enter = "Enter",
}

const SearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<SelectRef>(null);
  const debouncedQuery = useDebounce<string>(searchQuery, 300); // delayes capturing query by N ms
  const { recipies, loading, error, setRecipies } =
    useFetchRecipies(debouncedQuery); // fetches query

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.validity.valid);
    // check for valid string [a-z] [0-9]
    setSearchQuery(e.target.value);
  };

  // helper function for list item navigation
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case KEYS.Enter:
        // Handle Enter key
        setActive(0);
        if (recipies[active].name) {
          // setSearchQuery(recipies[active].name);
          inputRef.current!.value = recipies[active].name;
        }
        break;
      case KEYS.ArrowUp:
        // Handle Arrow Up
        setActive(active > 0 ? active - 1 : recipies.length - 1);
        break;
      case KEYS.ArrowDown:
        // Handle Arrow Down
        setActive(active < recipies.length - 1 ? active + 1 : 0);
        break;
      default:
        // Allow default behavior for other keys
        break;
    }
  };

  const handleListItemClick = (recipe: string) => {
    setActive(0);
    setRecipies([]);
    setSearchQuery(recipe);
  };

  // helper function for list scroll
  const setChange = useCallback(() => {
    const selected = selectRef?.current?.querySelector(".active");
    if (selected) {
      selected?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, searchQuery]);

  return (
    <div className="search-container">
      <SearchBar
        id="person-name"
        name="person-name"
        autoCapitalize="words"
        label="Whip up Memories, One Recipe at a Time - Explore, Create, Savor"
        placeholder={"Search for a recipe"}
        searchQuery={searchQuery}
        onKeyDown={onKeyDown}
        autoComplete="off"
        pattern={"^[ _]*[A-Z0-9][A-Z0-9 _]*$"} //to avoid unwanted characters
        handleChange={handleSearchChange}
        ref={inputRef}
      />
      {!error ? (
        <SearchList
          recipes={recipies}
          searchQuery={debouncedQuery}
          loading={loading}
          setChange={setChange}
          onClick={handleListItemClick}
          active={active}
          ref={selectRef}
        />
      ) : (
        <p className="error">{error}</p>
      )}
    </div>
  );
};

export default SearchContainer;
