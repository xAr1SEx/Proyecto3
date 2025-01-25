import { heroes } from "../data/heroes";

type Hero = (typeof heroes)[number];

export interface Props {
  publisher: "DC Comics" | "Marvel Comics";
}

export const getHeroesByPublisher = (publisher: Props["publisher"]): Hero[] => {
  const validPublishers: Props["publisher"][] = ["DC Comics", "Marvel Comics"];

  if (!validPublishers.includes(publisher)) {
    throw new Error(`${publisher} is not a valid publisher`);
  }

  return heroes.filter((hero) => hero.publisher === publisher);
};
