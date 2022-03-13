import { useForm } from "@mantine/form";
import { getSession } from "next-auth/react";
import { Input, InputWrapper, Textarea, Button } from "@mantine/core";
import { Widget } from "@uploadcare/react-widget";
import { useState } from "react";
import { useNotifications } from "@mantine/notifications";
import prisma from "utils/prisma";

const Edit = ({ profile, username }) => {
  const notifications = useNotifications();
  const [image, setImage] = useState(profile?.image);
  const form = useForm({
    initialValues: {},
  });

  if (!profile) {
    fetch(`/api/profiles/new`);
  }

  console.log(profile);

  const onSubmit = async (values) => {
    values.image = image;
    fetch(`/api/profiles/${username}`, {
      method: "PUT",
      body: JSON.stringify(values),
    });
    notifications.showNotification({
      message: "Profile updated",
      type: "success",
    });
  };

  return (
    <form
      onSubmit={form.onSubmit(onSubmit)}
      className="flex flex-col items-center justify-center"
    >
      <InputWrapper
        id="image"
        required
        label="Upload your image"
        className="w-72 m-2 flex flex-col items-center"
      >
        <Widget
          publicKey="624de14caf2cf3c7f75c"
          tabs="file url"
          previewStep="true"
          onChange={(e) => setImage(e.cdnUrl)}
        />
      </InputWrapper>
      <InputWrapper id="name" required label="Your Name" className="w-72 m-2">
        <Input
          id="name"
          placeholder="Your name"
          {...form.getInputProps("name")}
        />
      </InputWrapper>
      <InputWrapper
        id="description"
        label="Your profile description"
        required
        className="w-72 m-2"
      >
        <Textarea
          id="description"
          placeholder="Your profile description"
          {...form.getInputProps("description")}
        />
      </InputWrapper>
      <InputWrapper
        id="website"
        label="Your website"
        required
        className="w-72 m-2"
      >
        <Input
          id="website"
          placeholder="Your website"
          {...form.getInputProps("website")}
        />
      </InputWrapper>
      <InputWrapper
        id="location"
        label="Your location"
        required
        className="w-72 m-2"
      >
        <Input
          id="location"
          placeholder="Your location"
          {...form.getInputProps("location")}
        />
      </InputWrapper>
      <Button size="lg" type="submit">
        Submit
      </Button>
    </form>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const username = session.user.email.split("@")[0];
  const profile = await prisma.profile.findFirst({
    where: {
      username,
    },
  });

  return {
    props: {
      profile,
      username,
    },
  };
};

Edit.auth = true;

export default Edit;
