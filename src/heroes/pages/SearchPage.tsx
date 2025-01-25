import queryString from "query-string";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search) as { q: string };

  const heroes = getHeroesByName(q);
  const { formState, onInputChange } = useForm({ searchText: q });
  const { searchText } = formState;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const showSearchMessage = isSubmitted && q.trim().length === 0;
  const showErrorMessage =
    isSubmitted && q.trim().length > 0 && heroes.length === 0;

  const onSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    navigate(`?q=${searchText.trim().toLowerCase()}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="col-5">
        <h4>Searching</h4>
        <hr />
        <form onSubmit={onSearchSubmit}>
          <input
            type="text"
            placeholder="Search a hero"
            className="form-control"
            name="searchText"
            autoComplete="off"
            value={searchText}
            onChange={onInputChange}
          />
          <button className="btn btn-outline-primary mt-1">Search</button>
        </form>
      </div>

      <div className="col-7">
        <h4>Results</h4>
        <hr />

        {showSearchMessage && (
          <div className="alert alert-primary animate__animated animate__fadeIn">
            Search a hero
          </div>
        )}

        {showErrorMessage && (
          <div className="alert alert-danger animate__animated animate__fadeIn">
            No hero with <b>{q}</b>
          </div>
        )}

        {heroes.map((hero) => (
          <HeroCard key={hero.id} {...hero} />
        ))}
      </div>
    </>
  );
};
