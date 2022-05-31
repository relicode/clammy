// import type { APIGatewayProxyResult, APIGatewayEvent, Handler } from 'aws-lambda'

module.exports.handler /* : Handler<APIGatewayEvent, APIGatewayProxyResult> */ = async (ev, ctx) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      ev,
    }),
  }
}