import hero from "public/images/hero.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@mantine/core";
import Link from "next/link";

const Hero = () => {
  const { data: session } = useSession();
  return (
    <section className="m-2 flex flex-col items-center justify-around">
      <Image src={hero} width={400} height={400} alt="hero" />
      <article className="mx-6 flex flex-col items-center justify-center">
        <h1 className="text-center">
          Certificate in your favorite technologies, protected by the blockchain
        </h1>
        <p className="text-xl -mt-2 text-center">
          Create your profile, add your experiences, certificate in your
          favorite technologies and start to be discovered.
        </p>
        <Link href="/home" passHref>
          <Button size="lg" component="a">
            {!session ? "Register to start" : "Start now"}
          </Button>
        </Link>
      </article>
    </section>
  );
};

export default Hero;
