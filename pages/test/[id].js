import react from "tests/react";
import javascript from "tests/javascript";
import python from "tests/python";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@mantine/core";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useNotifications } from "@mantine/notifications";

const Test = ({ data }) => {
  const { data: session } = useSession();
  const notifications = useNotifications();
  const [actual, setActual] = useState(0);
  const [points, setPoints] = useState(0);

  const handleClick = (id) => {
    if (actual < 2) {
      if (id === data.questions[actual].correctAnswer) {
        setPoints(points + 1);
      }
      setActual(actual + 1);
    } else if (actual === 2 && points > 1) {
      fetch("/api/certification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.email.split("@")[0],
          type: data.id,
        }),
      });

      notifications.showNotification({
        title: "Certification added",
        message: `You have successfully completed the certification!`,
        type: "success",
      });

      setActual(actual + 1);
    } else if (actual === 2 && points < 2) {
      notifications.showNotification({
        title: "Certification failed",
        message: `You have failed the certification!`,
        type: "error",
      });

      setActual(actual + 1);
    }
  };

  const TestButton = ({ id }) => {
    return (
      <Button
        onClick={() => handleClick(data.questions[actual].answers[id].id)}
        size="lg"
        className="m-4 max-w-xs"
      >
        {data.questions[actual].answers[id].answer}
      </Button>
    );
  };

  if (actual === 3) {
    return (
      <section className="flex flex-col items-center justify-center">
        <Image
          src={`/images/${points > 1 ? "success" : "error"}.png`}
          height={400}
          width={400}
          alt={points > 1 ? "success" : "error"}
        />
        <h1 className="text-center">
          {points > 1
            ? "You pass the certification test"
            : "You not pass the certification test"}
        </h1>
        <Link href="/home" passHref>
          <Button size="lg" className="m-4" component="a">
            Continue
          </Button>
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-center">{`Test for ${data.name}`}</h1>
      <article>
        <p className="text-center text-4xl font-bold">
          {data.questions[actual].question}
        </p>
        <section className="flex flex-wrap items-center justify-around">
          <TestButton id="0" />
          <TestButton id="1" />
        </section>
        <section className="flex flex-wrap items-center justify-around">
          <TestButton id="2" />
          <TestButton id="3" />
        </section>
      </article>
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

Test.auth = true;

export default Test;
