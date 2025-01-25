import React, { useMemo } from "react";
import { getHeroesByPublisher, Props } from "../helpers";
import { HeroCard } from "./HeroCard";
interface HeroListProps {
  publisher: Props["publisher"];
}

export const HeroList: React.FC<HeroListProps> = ({ publisher }) => {
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};
