import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { dynamoConfig } from "../config/dynamo.config";
import { appConfig } from "../config/app.config";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const scanAll = async function () {
  try {
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

      let results: {}[] = [];
      let items;

      do {
        items = await dynamodb.send(new QueryCommand(params));
        if (!items || !items.Items) return [];
        items.Items.forEach((item: {}) => results.push(unmarshall(item)));
        if (items.LastEvaluatedKey)
          params.ExclusiveStartKey = items.LastEvaluatedKey;
      } while (typeof items.LastEvaluatedKey != "undefined");

      return results;
    }
  } catch (e) {
    console.error((e as Error).message);
  }
};
