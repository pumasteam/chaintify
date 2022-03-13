import Image from "next/image";
import { Button } from "@mantine/core";
import Link from "next/link";

const Profile = ({ isEditable, data }) => {
  console.log(data);
  return (
    <section className="flex flex-col items-center justify-center">
      <Image
        className="rounded-full"
        src={data.image}
        width={200}
        height={200}
        alt="avatar"
      />
      <h1>{`${data.name} - @${data.username}`}</h1>
      <p className="-mt-8 text-lg">{data.location}</p>
      <p className="-mt-4 text-xl">{data.description}</p>
      <p>Certificated in:</p>
      {data.certifications.map((certification, index) => (
        <p key={index} className="-mt-4 text-xl">
          {certification.type}
        </p>
      ))}
      <Button className="m-6" size="lg" component="a" href={data.website}>
        Visit Website
      </Button>
      <Link href="/certifications" passHref>
        <Button component="a" className="m-2">
          Get more certifications
        </Button>
      </Link>
      <Link href="/edit" passHref>
        <Button component="a" className="m-2">
          Edit profile
        </Button>
      </Link>
    </section>
  );
};

export default Profile;
