import type { APIGatewayProxyResult, APIGatewayEvent, Handler } from 'aws-lambda'

type H = Handler<APIGatewayEvent, APIGatewayProxyResult>

export const handler: H = async (ev, ctx) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      ev,
      ctx,
    }),
  }
}