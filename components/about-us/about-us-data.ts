export type SquigglyFriend = {
  name: string;
  image: string;
  order: string;
  attributes: SquigglyFriendAttribute[];
};
export type SquigglyFriendAttribute = {
  key: string;
  value: string;
};
export const aboutUsInformation = {
  src: "about-us/about-us-text.svg",
  alt: "About Us",
};
export const coverImage1 = {
  src: "about-us/sayee-1.jpg",
  alt: "Profile Photo 1",
};
export const coverImage2 = {
  src: "about-us/sayee-2.jpg",
  alt: "Profile Photo 2",
};

export const arrowPink = "about-us/arrow-pink.svg";
export const arrowBlue = "about-us/arrow-blue.svg";

export const squigglyFriends: SquigglyFriend[] = [
  {
    name: "fork",
    image: "squiggly-friends/friend-1.svg",
    order: "",
    attributes: [
      {
        key: "species",
        value: "human (probably)",
      },
      {
        key: "mood",
        value: "tired but okay",
      },
      {
        key: "fun fact",
        value: "he is not a fox",
      },
      {
        key: "state of being",
        value: "simply existing",
      },
    ],
  },
  {
    name: "blaze",
    image: "squiggly-friends/friend-2.svg",
    order: "order-first",
    attributes: [
      {
        key: "species",
        value: "hot head",
      },
      {
        key: "mood",
        value: "slightly angry (always)",
      },
      {
        key: "reason",
        value: "unclear",
      },
      {
        key: "state of being",
        value: "overheating",
      },
    ],
  },
];
