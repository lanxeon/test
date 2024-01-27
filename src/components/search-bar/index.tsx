// TODO: get interface of native input field
// TODO: Separate the logic of suggestions list
// TODO: Add a debouncer
// TODO: Check edge cases

import "./search-bar.styles.css";
import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";

// custom input component interfaces to autocomplete all input props
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  searchQuery: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = forwardRef<HTMLInputElement, InputProps>(
  ({ label, searchQuery, handleChange, ...otherProps }, ref) => {
    //follows BEM practices
    return (
      <div className="search-bar">
        <label className="search-bar__label" htmlFor={otherProps.id}>
          {label}
        </label>
        <div className="search-bar--input-container box-shadow">
          <input
            className="search-bar--input-container__input"
            value={searchQuery}
            onChange={handleChange}
            type="text"
            ref={ref}
            {...otherProps}
          />
        </div>
      </div>
    );
  },
);

export default SearchBar;
