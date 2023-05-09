# YDB2CSV
**YDB Document API => CSV file**

## YDB connection config (.env):


```properties
RN_AWS_ID=
RN_AWS_KEY=
DB_ENDPOINT=
CLOUD_REGION=
```

## App conf (config/app.config.ts):

```typescript
export const appConfig: IappConfig = {
  TableName: "TableName",               // Your table to export name
  Limit: 20,                            // No more then 1mb
  KeyConditionExpression: "id = :val",  // Your KeyConditionExpression
  ExpressionAttributeValues: marshall({
    ":val": "7777777",                  // Your ExpressionAttributeValues
  }),
};
```
**More info:**
https://cloud.yandex.com/en-ru/docs/ydb/docapi/tools/aws-sdk/query-and-scan
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#scan-property

```typescript
export const csvConfig = {
  csvFilePath: "csv/result.csv",        // output file
  delimiter: "\t",                      // csv delimiter (now tab)
  columnFilter: ["user_data_params_"],  // if column name include any filter word, remove the column from result csv
};
```
