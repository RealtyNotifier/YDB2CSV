import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { dynamoConfig } from "../config/dynamo.config";
import { appConfig } from "../config/app.config";

export const scanAll = async function () {
  if (dynamoConfig.accessKeyId && dynamoConfig.secretAccessKey) {
    const dynamodb = new DynamoDBClient({
      credentials: {
        accessKeyId: dynamoConfig.accessKeyId,
        secretAccessKey: dynamoConfig.secretAccessKey,
      },
      endpoint: dynamoConfig.endpoint,
      region: dynamoConfig.region,
    });
    const params = appConfig;

    dynamodb
      .send(new QueryCommand(params))
      .then((data) => {
        console.log("Запрос успешно выполнен:");
        console.log("Count: ", data.Count);
        data.Items?.forEach(function (item) {
          console.log(" -", item);
        });
      })
      .catch((err) => {
        console.error(
          "Не удалось выполнить запрос. Ошибка:",
          JSON.stringify(err, null, 2)
        );
      });
  }
};
