import prisma from "utils/prisma";

/**
 * Create a new update
 * @param {string} id
 * @param {string} title
 * @param {string} content
 * @returns {object}
 */

const createUpdate = async (id, title, content) => {
  const update = await prisma.update.create({
    data: {
      title,
      content,
      authorId: id,
    },
  });

  return update;
};

/**
 * Delete an update
 * @param {string} id
 * @returns {object}
 * example:
 * deleteUpdate("UUID")
 */

const deleteUpdate = async (id) => {
  const update = await prisma.update.delete({
    where: { id },
  });

  return update;
};

export { createUpdate, deleteUpdate };
