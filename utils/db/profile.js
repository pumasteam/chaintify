import prisma from "utils/prisma";

/**
 * Create a new user
 * @param {string} username
 * @returns {string}
 * example:
 * createUser("john");
 * // => "UUID"
 */

const createProfile = async (username) => {
  const profile = await prisma.profile.create({
    data: {
      username,
    },
  });

  return profile.username;
};

/**
 * Delete a user
 * @param {string} id
 * @returns {object}
 * example:
 * deleteUser("UUID")
 */

const deleteProfile = async (id) => {
  const profile = await prisma.profile.delete({
    where: { username: id },
  });

  return profile;
};

/**
 * Get a user
 * @param {string} id
 * @param {boolean} allData
 * @returns {object}
 * example:
 * getUser("UUID")
 * // => { id: "UUID", name: "John Doe" }
 */

const getProfile = async (id, allData = true) => {
  const profile = await prisma.profile.findFirst({
    where: { username: id },
  });

  if (allData) {
    const updates = await prisma.update.findMany({
      where: { authorId: id },
    });

    const certifications = await prisma.certification.findMany({
      where: { userId: id },
    });

    profile.updates = updates;
    profile.certifications = certifications;
  }

  return profile;
};

/**
 * Get all profiles
 * @returns {array}
 * example:
 * getAllProfiles()
 * // => [{ id: "UUID", name: "John Doe" }, { id: "UUID", name: "John Doe" }]
 */

const getAllProfiles = async () => {
  const profiles = await prisma.profile.findMany();

  return profiles;
};

/**
 * Update a user
 * @param {string} id
 * @param {object} data
 * @returns {object}
 * example:
 * updateUser("UUID", { name: "John Doe" })
 * // => { id: "UUID", name: "John Doe" }
 */

const updateProfile = async (id, data) => {
  if (getProfile(id) == {}) {
    createProfile(id);
  }
  const profile = await prisma.profile.update({
    where: { username: id },
    data,
  });

  return profile;
};

export {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfile,
  getAllProfiles,
};
