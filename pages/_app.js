import { SessionProvider, useSession, signIn } from "next-auth/react";
import Head from "next/head";
import Header from "components/Header";
import Loading from "components/Loading";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "styles/global.css";

const Auth = ({ children, isRequired }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (isRequired && !session) {
    signIn();
  }

  return children;
};

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Chaintify</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          defaultRadius: "sm",
          fontFamily: "sans-serif",
          primaryColor: "yellow",
        }}
      >
        <NotificationsProvider>
          <Auth isRequired={Component.auth}>
            <section className="flex flex-col items-center">
              <main className="max-w-3xl">
                <Header />
                <Component {...pageProps} />
              </main>
            </section>
          </Auth>
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  );
};

export default App;
