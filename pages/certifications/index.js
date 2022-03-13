import Image from "next/image";
import Link from "next/link";
import { Button } from "@mantine/core";

const Certifications = () => {
  const certifications = [
    {
      id: "python",
      name: "Python certification",
    },
    {
      id: "javascript",
      name: "Javascript certification",
    },
    {
      id: "react",
      name: "React certification",
    },
  ];

  return (
    <section className="flex flex-wrap items-center justify-center">
      {certifications.map((i, k) => (
        <article
          key={k}
          className="m-4 flex items-center justify-center flex-col"
        >
          <Image
            src={`/images/${i.id}.png`}
            width={200}
            height={150}
            alt="Certification image"
          />
          <h2>{i.name}</h2>
          <Link href={`/certifications/${i.id}`} passHref>
            <Button component="a" size="lg">
              View more
            </Button>
          </Link>
        </article>
      ))}
    </section>
  );
};

export default Certifications;
