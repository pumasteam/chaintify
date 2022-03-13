// Service for blockchain operations

import {
  Client,
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
  PrivateKey,
  AccountId,
} from "@hashgraph/sdk";

/*
 * @param {string} memo
 * @returns {Promise<object>}
 * example:
 * createTransaction("hello world")
 */

const createTransaction = async (memo = "") => {
  let client;

  try {
    client = Client.forTestnet().setOperator(
      AccountId.fromString(process.env.ACCOUNT_ID),
      PrivateKey.fromString(process.env.PRIVATE_KEY)
    );
  } catch (error) {
    throw new Error("Environment variables missing.");
  }

  const createResponse = await new TopicCreateTransaction().execute(client);
  const createReceipt = await createResponse.getReceipt(client);

  const sendResponse = await new TopicMessageSubmitTransaction({
    topicId: createReceipt.topicId,
    message: memo,
  }).execute(client);

  const sendReceipt = await sendResponse.getReceipt(client);

  return sendReceipt;
};

export { createTransaction };
