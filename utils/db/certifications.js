import prisma from "utils/prisma";

/**
 * Create a certification
 * @param {string} id
 * @param {string} type
 * @returns {object}
 * example:
 * createCertification("UUID", "react")
 */

const createCertification = async (id, type) => {
  const certification = await prisma.certification.create({
    data: {
      type,
      userId: id,
    },
  });

  return certification;
};

export { createCertification };
