# Serverless Typescript with LocalStack

This project demonstrates a serverless setup using TypeScript and LocalStack for local AWS service emulation. It includes configurations for creating and interacting with a DynamoDB table locally.


+----------------------------------+
|          Local Environment       |
|                                  |
|  +--------------------------+    |
|  |  Serverless Framework    |    |
|  |  (serverless.yml)        |    |
|  +--------------------------+    |
|              |                   |
|              v                   |
|  +--------------------------+    |
|  |       LocalStack         |    |
|  |                          |    |
|  |  +-------------------+   |    |
|  |  |   API Gateway     |   |    |
|  |  +-------------------+   |    |
|  |         /   \            |    |
|  |        /     \           |    |
|  |       v       v          |    |
|  |  +--------+  +--------+  |    |
|  |  | Lambda |  | Lambda |  |    |
|  |  |Create  |  | Get    |  |    |
|  |  |Message |  |Messages|  |    |
|  |  +--------+  +--------+  |    |
|  |        |       |         |    |
|  |        v       v         |    |
|  |  +-------------------+   |    |
|  |  |    DynamoDB       |   |    |
|  |  |   Messages Table  |   |    |
|  |  +-------------------+   |    |
|  +--------------------------+    |
|                                  |
+----------------------------------+

## Prerequisites

Before getting started, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)
- [Docker](https://www.docker.com/get-started)
- [LocalStack](https://github.com/localstack/localstack)
- [AWS CLI](https://aws.amazon.com/cli/) or [awslocal](https://github.com/localstack/awscli-local)

## Setup

### 1. Install Dependencies

Clone the repository and install the necessary dependencies:

```sh
git clone <your-repo-url>
cd serverless-typescript-localstack
npm install
```

### 2. Configure Serverless

Ensure your `serverless.yml` is properly configured to use LocalStack and includes the necessary resources, functions, and IAM permissions.

### 3. Start LocalStack

Start LocalStack using Docker:

```sh
localstack start --docker
```

This command will start LocalStack, a fully functional local AWS cloud stack that runs in a single container.

### 4. Deploy the Service

Deploy the Serverless service to LocalStack:

```sh
serverless deploy --stage local
```

This command will deploy your service defined in the `serverless.yml` file to the local environment.

### 5. Run Serverless Offline

To test your endpoints locally, run:

```sh
serverless offline --stage local
```

This command will start the local server to simulate AWS API Gateway locally.

### 6. Interact with DynamoDB

You can interact with your DynamoDB table using `awslocal`, which is a wrapper for the AWS CLI to interact with LocalStack.

#### Scan the Table

To retrieve all items from the `Messages` table:

```sh
awslocal dynamodb scan --table-name Messages
```

#### Put an Item

To add an item to the `Messages` table:

```sh
awslocal dynamodb put-item --table-name Messages --item '{"id": {"S": "1"}, "message": {"S": "Hello"}, "createdAt": {"S": "2024-05-30T12:00:00"}}'
```

### 7. Test the Endpoints

#### Create a Message

You can create a message by sending a POST request:

```sh
curl -X POST http://localhost:3000/local/messages -H "Content-Type: application/json" -d '{"message": "Hello, LocalStack!"}'
```

#### Get Messages

To retrieve all messages:

```sh
curl http://localhost:3000/local/messages
```

## Explanation of Commands

### LocalStack Commands

- `localstack start --docker`: Starts LocalStack in a Docker container, emulating AWS services locally.

### Serverless Commands

- `serverless deploy --stage local`: Deploys the service to the local stage using the configurations defined in `serverless.yml`.
- `serverless offline --stage local`: Runs the Serverless Offline plugin, simulating AWS API Gateway locally.

### AWS Local CLI Commands (awslocal)

- `awslocal dynamodb scan --table-name Messages`: Scans the `Messages` table and retrieves all items.
- `awslocal dynamodb put-item --table-name Messages --item '{"id": {"S": "1"}, "message": {"S": "Hello"}, "createdAt": {"S": "2024-05-30T12:00:00"}}'`: Puts an item into the `Messages` table with the specified attributes.

## Project Structure

- **serverless.yml**: Defines the service, provider, functions, resources, and plugins used.
- **src/**: Contains the source code for the Lambda functions.
- **dist/**: Contains the compiled JavaScript code after building the project.

## Conclusion

This setup allows you to develop and test your serverless application locally using LocalStack, ensuring a smoother and faster development cycle. Once you're ready, you can deploy your service to a real AWS environment with minimal changes.

