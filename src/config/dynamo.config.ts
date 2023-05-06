import "dotenv/config";

export const dynamoConfig = {
  accessKeyId: process.env.RN_AWS_ID,
  secretAccessKey: process.env.RN_AWS_KEY,
  region: process.env.CLOUD_REGION,
  endpoint: process.env.DB_ENDPOINT,
};
