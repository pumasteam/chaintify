import prisma from "utils/prisma";
import { getSession } from "next-auth/react";

/**
 * @swagger
 * /api/profiles/new:
 *  post:
 *   description: Create a new profile with a username
 *  tags:
 *   - Profile
 *  responses:
 *   '200':
 *     description: Profile created
 *   '500':
 *     description: Internal server error
 *   '401':
 *     description: Not authorized
 */

const handleCreateProfile = async (req, res) => {
  const session = await getSession({ req });
  try {
    if (session) {
      const profile = await prisma.profile.create({
        data: {
          username: session.user.email.split("@")[0],
        },
      });
      res.status(200).json({
        message: "Profile created",
        id: profile,
      });
    } else {
      res.status(401).json({
        message: "Not authorized",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export default handleCreateProfile;
