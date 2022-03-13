import { Loader } from "@mantine/core";

const Loading = () => {
  return (
    <section className="flex h-screen">
      <Loader size="xl" className="m-auto" />
    </section>
  );
};

export default Loading;
