import { SquigglyFriend } from "./about-us-data";
import Image from "next/image";
export const SquigglyFriendComponent = (props: SquigglyFriend) => {
  const { name, image, species, mood, funFact, stateOfBeing } = props;
  return (
    <>
      <div className="flex items-center justify-center border border-black rounded-full uppercase font-serif m-5 p-2 font-xl">
        {name}
      </div>
      <div className="flex flex-col">
        <Image
          src={image}
          height={100}
          width={100}
          alt={name}
          className="items-center justify-center w-50"
        />
        <div className="flex flex-col gap-2 m-10 text-xl font-serif">
          <p className="lowercase">{name}</p>
          <p>
            <span className="font-bold">species: </span>
            {species}
          </p>
          <p>
            <span className="font-bold">mood: </span>
            {mood}
          </p>
          <p>
            <span className="font-bold">fun fact: </span>
            {funFact}
          </p>
          <p>
            <span className="font-bold">state of being: </span>
            {stateOfBeing}
          </p>
        </div>
      </div>
    </>
  );
};
