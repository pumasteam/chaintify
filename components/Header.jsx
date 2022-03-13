import { useSession, signIn, signOut } from "next-auth/react";
import { Anchor, Button, Text } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import logo from "public/images/logo.png";

const Header = () => {
  const { data: session } = useSession();

  const links = [
    { href: "/home", label: "Home" },
    { href: "/certifications", label: "Certifications" },
    { href: "/profiles", label: "Profiles" },
  ];

  return (
    <header className="flex flex-row items-center justify-around m-4">
      <Link href="/">
        <a>
          <Image src={logo} width={60} height={60} alt={"logo"} />
        </a>
      </Link>
      <nav className="flex flex-row items-center justify-evenly">
        {links.map((i, k) => (
          <Link key={k} href={i.href} passHref>
            <Anchor className="m-2" component="a">
              {i.label}
            </Anchor>
          </Link>
        ))}
      </nav>
      <Button onClick={() => (!session ? signIn() : signOut())}>
        {!session ? "Sign In" : "Sign Out"}
      </Button>
    </header>
  );
};

export default Header;
