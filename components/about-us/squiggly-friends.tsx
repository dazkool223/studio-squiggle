import { SquigglyFriend } from "./about-us-data";
import Image from "next/image";

export const SquigglyFriendComponent = (props: SquigglyFriend) => {
  const { name, image, attributes, reverse } = props;
  return (
    <div className="squiggly-friend">
      <div className="md:hidden flex items-center justify-center border border-black rounded-full uppercase font-serif m-5 p-2 font-xl">
        {name}
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-2 items-center`}>
        <Image
          src={image}
          height={100}
          width={100}
          alt={name}
          className={`friend-image items-center justify-self-center w-50 md:w-64 ${
            reverse ? "md:order-last" : ""
          }`}
        />
        <div className="friend-card flex flex-col gap-2 m-10 text-xl font-serif">
          <p className="lowercase font-light text-3xl font-sans hidden md:block">
            {name}
          </p>
          {attributes.map((attribute, index) => (
            <p key={index}>
              <span className="font-bold">{attribute.key}: </span>
              {attribute.value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
