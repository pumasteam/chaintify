import prisma from "utils/prisma";

/**
 * @swagger
 * /api/profiles/{username}:
 *  get:
 *      description: Get a user
 *  put:
 *      description: Update a user
 *  delete:
 *      description: Delete a user
 */

const handleProfile = async (req, res) => {
  const { username } = req.query;
  const { method } = req;

  if (method === "GET") {
    const profile = await prisma.profile.findFirst({
      where: {
        username,
      },
    });
    res.status(200).json(profile);
  } else if (method === "PUT") {
    const updateprofile = await prisma.profile.update({
      where: { username },
      data: JSON.parse(req.body),
    });
    res.status(200).json(updateprofile);
  } else if (method === "DELETE") {
    const deleteprofile = await prisma.profile.delete({
      where: { username },
    });
    res.status(200).json(deleteprofile);
  } else {
    res.status(405).json({
      message: "Method not allowed",
    });
  }
};

export default handleProfile;
