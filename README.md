# Serverless Typescript with LocalStack

This project demonstrates a serverless setup using TypeScript and LocalStack for local AWS service emulation (Lambda, DynamoDB and API Gateway).


![Local Environment](https://github.com/Joao280/serverless-localstack/blob/master/public/local_env.png)


## Prerequisites

Before getting started, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (version 20.x or higher)
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)
- [Docker](https://www.docker.com/get-started)
- [Serverless-localstack plugin](https://www.serverless.com/plugins/serverless-localstack)

## Setup

### 1. Install Dependencies

Clone the repository and install the necessary dependencies:

```sh
git clone https://github.com/Joao280/serverless-localstack.git
cd serverless-localstack
npm install
```

### 2. Start LocalStack

Start LocalStack using Docker:

```sh
docker-compose up
```

### 4. Deploy the Application

Deploy all resources and infra to LocalStack:

```sh
serverless deploy --stage local
```

### 5. Grab the endpoint from the output of the previous command

Example:

```sh
http://localhost:4566/restapis/<api_gateway_id>/local/_user_request_/
```

### 6. Invoke Lambdas

Create a message

```sh
curl -X POST http://localhost:4566/restapis/<api_gateway_id>/local/_user_request_/messages -H "Content-Type: application/json" -d '{"message": "Hello, LocalStack!"}'
```

Get first message

```sh
curl http://localhost:4566/restapis/<api_gateway_id>/local/_user_request_/firstmessage
```

Get all messages

```sh
curl http://localhost:4566/restapis/<api_gateway_id>/local/_user_request_/messages
```

