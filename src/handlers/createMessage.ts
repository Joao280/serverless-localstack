import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const endpoint = `http://${process.env.LOCALSTACK_HOSTNAME}:4566` 

const dynamoDb = new DynamoDB.DocumentClient({
  endpoint,
  region: 'us-east-1',
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const { message } = JSON.parse(event.body!);

  const params = {
    TableName: process.env.MESSAGES_TABLE || 'Messages',
    Item: {
      id: uuidv4(), // UUID as a string
      message, // message as a string
      createdAt: new Date().toISOString(), // ISO date as a string
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create message' }),
    };
  }
};
