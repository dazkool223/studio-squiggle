import Image from "next/image";
import logo from "@/public/logo.svg";
import hero from "@/public/hero-whistle.svg";
import { Button } from "@/components/ui";

export const Hero = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-portfolio-yellow text-primary">
        <Image src={logo} alt="logo" className="h-15 mt-10" />
        <Image
          src={hero}
          alt="hero"
          className="h-100 mt-10 mb-10"
          loading="eager"
        />
        <div className="font-light text-4xl items-center text-center">
          <h1>For the Weird</h1>
          <h1 className="font-semibold">By the Weird</h1>
        </div>
        <div className="font-serif font-light mt-5 text-xs">
          <p>We help brands embrace their own kind of weird.</p>
          <p>carefully built identities, illustrated with intention</p>
        </div>
        <Button
          variant={"ghost"}
          className="font-serif font-light font-s mt-10 border border-black rounded-full"
        >
          Book a meeting with us
        </Button>
      </div>
      <div className="scalloped-box scalloped-bottom bg-portfolio-yellow min-h-21"></div>
    </>
  );
};
