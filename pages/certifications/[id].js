import react from "tests/react";
import javascript from "tests/javascript";
import python from "tests/python";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@mantine/core";

const Certification = ({ data }) => {
  return (
    <section className="flex flex-col items-center justify-center">
      <Image
        src={`/images/${data.id}.png`}
        width={600}
        height={400}
        alt="Certification image"
      />
      <h1 className="text-center">{data.name}</h1>
      <p className="-mt-4 mx-16 text-center">{data.description}</p>
      <Link href={`/test/${data.id}`} passHref>
        <Button component="a" size="lg">
          Take the test
        </Button>
      </Link>
    </section>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "react" } },
      { params: { id: "javascript" } },
      { params: { id: "python" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const { id } = ctx.params;

  const data = id == "react" ? react : id == "javascript" ? javascript : python;

  return {
    props: {
      data,
    },
  };
};

export default Certification;
