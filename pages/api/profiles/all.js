import { getAllProfiles } from "utils/db/profile";

/**
 * @swagger
 * /api/profiles/all:
 *  get:
 *   description: Get all profiles
 *  tags:
 *   - Profile
 *  responses:
 *   '200':
 *     description: All profiles retrieved
 *   '500':
 *     description: Internal server error
 */

const handleGetAllProfiles = async (req, res) => {
  try {
    const profiles = getAllProfiles();

    res.status(200).json({
      message: "Profiles retrieved",
      profiles: profiles,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export default handleGetAllProfiles;
