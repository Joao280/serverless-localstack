import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const lambda = new AWS.Lambda({
    endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`, 
    region: 'us-east-1',
});

type Message = {
    id: string;
    message: string;
    createdAt: string;
};

export const handler: APIGatewayProxyHandler = async () => {
    const params = {
        FunctionName: 'serverless-localstack-local-getMessages', // Name of the existing Lambda function
        InvocationType: 'RequestResponse', // Invoke synchronously
        Payload: JSON.stringify({}), // Empty payload as we don't need to pass any data
    };

    try {
        const result = await lambda.invoke(params).promise();

        if (result.StatusCode === 200 && result.Payload) {
            const response = JSON.parse(result.Payload.toString('utf-8')); // Parse the JSON string to get the response object

            if (response.statusCode === 200 && response.body) {
                const messages: Message[] = JSON.parse(response.body); // Parse the body to get the array of Message objects

                if (Array.isArray(messages) && messages.length > 0) {
                    const firstMessage = messages[0];

                    return {
                        statusCode: 200,
                        body: JSON.stringify(firstMessage),
                    };
                } else {
                    return {
                        statusCode: 404,
                        body: JSON.stringify({ message: 'No messages found' }),
                    };
                }
            } else {
                return {
                    statusCode: response.statusCode || 500,
                    body: JSON.stringify({ error: 'Failed to retrieve messages from lambda' }),
                };
            }
        } else {
            return {
                statusCode: result.StatusCode || 500,
                body: JSON.stringify({ error: 'Failed to retrieve messages ' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to retrieve messages' }),
        };
    }
};
