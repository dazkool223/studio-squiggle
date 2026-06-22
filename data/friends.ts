// About Us imagery and the Squiggly Friends character sheets.

export const aboutTitle = { src: "/about-us/about-us-text.svg", alt: "About Us" };
export const sayeePhoto1 = { src: "/about-us/sayee-1.jpg", alt: "Sayee, founder of Studio.Squiggle" };
export const sayeePhoto2 = { src: "/about-us/sayee-2.jpg", alt: "Sayee at work" };
export const arrowPink = "/about-us/arrow-pink.svg";
export const arrowBlue = "/about-us/arrow-blue.svg";

export interface SquigglyFriend {
  name: string;
  /** Five pose illustrations, cycled every 2 s in the showcase. */
  images: string[];
  reverse: boolean;
  attributes: { key: string; value: string }[];
}

export const squigglyFriends: SquigglyFriend[] = [
  {
    name: "fork",
    images: [
      "/squiggly-friends/fork-1.svg",
      "/squiggly-friends/fork-2.svg",
      "/squiggly-friends/fork-3.svg",
      "/squiggly-friends/fork-4.svg",
      "/squiggly-friends/fork-5.svg",
    ],
    reverse: false,
    attributes: [
      { key: "species", value: "human (probably)" },
      { key: "mood", value: "tired but okay" },
      { key: "fun fact", value: "he is not a fox" },
      { key: "state of being", value: "simply existing" },
    ],
  },
  {
    name: "blaze",
    images: [
      "/squiggly-friends/blaze-1.svg",
      "/squiggly-friends/blaze-2.svg",
      "/squiggly-friends/blaze-3.svg",
      "/squiggly-friends/blaze-4.svg",
      "/squiggly-friends/blaze-5.svg",
    ],
    reverse: true,
    attributes: [
      { key: "species", value: "hot head" },
      { key: "mood", value: "slightly angry (always)" },
      { key: "reason", value: "unclear" },
      { key: "state of being", value: "overheating" },
    ],
  },
];
