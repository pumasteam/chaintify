import { useRouter } from "next/router";
import Profile from "components/Profile";
import { getSession } from "next-auth/react";
import prisma from "utils/prisma";

const Home = ({ profile }) => {
  const router = useRouter();

  if (!profile.name) {
    router.push("/edit");
  }

  return <Profile data={profile} isEditable />;
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const profile = await prisma.profile.findFirst({
    where: { username: session.user.email.split("@")[0] },
  });
  const certifications = await prisma.certification.findMany({
    where: { userId: session.user.email.split("@")[0] },
  });

  profile.certifications = certifications;

  return {
    props: {
      profile,
    },
  };
};

Home.auth = true;

export default Home;
