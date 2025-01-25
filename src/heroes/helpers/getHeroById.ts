import { heroes } from "../data/heroes";

type Hero = (typeof heroes)[number];

export const getHeroById = (id: string): Hero | undefined => {
  return heroes.find((hero) => hero.id === id);
};
