export type SquigglyFriend = {
  name: string;
  image: string;
  species: string;
  mood: string;
  funFact: string;
  stateOfBeing: string;
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
    species: "human (probably)",
    mood: "tired but okay",
    funFact: "he is not a fox",
    stateOfBeing: "simply existing",
  },
];
