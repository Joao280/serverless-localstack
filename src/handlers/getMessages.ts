import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const endpoint = `http://${process.env.LOCALSTACK_HOSTNAME}:4566` 
  

const dynamoDb = new DynamoDB.DocumentClient({
  endpoint,
  region: 'us-east-1',
});

export const handler: APIGatewayProxyHandler = async () => {
    const tableName = process.env.MESSAGES_TABLE || 'Messages';
    
    const params = {
        TableName: tableName,
    };

    try {
        const result = await dynamoDb.scan(params).promise();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result.Items),
        };
    } catch (error) {

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Could not retrieve messages' }),
        };
    }
};
