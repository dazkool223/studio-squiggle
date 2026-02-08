import { SquigglyFriend } from "./about-us-data";
import Image from "next/image";
export const SquigglyFriendComponent = (props: SquigglyFriend) => {
  const { name, image, attributes, order } = props;
  return (
    <>
      <div className="md:hidden flex items-center justify-center border border-black rounded-full uppercase font-serif m-5 p-2 font-xl">
        {name}
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-2`}>
        <Image
          src={image}
          height={100}
          width={100}
          alt={name}
          className="items-center justify-self-center w-50"
        />
        <div
          className={`flex flex-col gap-2 m-10 text-xl font-serif md:${order}`}
        >
          <p className="lowercase">{name}</p>
          {attributes.map((attribute, index) => (
            <p key={index}>
              <span className="font-bold">{attribute.key}: </span>
              {attribute.value}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};
