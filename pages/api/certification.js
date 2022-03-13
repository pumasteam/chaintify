import { createTransaction } from "utils/blockchain";
import { createCertification } from "utils/db/certifications";

/**
 * @swagger
 * /api/certification:
 *  post:
 *   description: Create a new certification
 *  tags:
 *    - Certification
 *  parameters:
 *    - in: body
 *      name: Body
 *      schema:
 *        type: object
 *        required:
 *          - userId
 *          - type
 *        properties:
 *         userId:
 *          type: string
 *         type:
 *           type: string
 */

const handleCertification = async (req, res) => {
  try {
    const { userId, type } = req.body;
    const transaction = await createTransaction(
      `Certificate: ${userId} - ${type}`
    );
    const certification = await createCertification(userId, type);

    res.status(200).json({
      message: "Certification created",
      certification: certification,
      transaction: transaction,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export default handleCertification;
