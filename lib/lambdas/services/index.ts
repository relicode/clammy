import { APIGatewayProxyResult, APIGatewayEvent, Handler } from 'aws-lambda'
import initScanner from './services/virus-scanner'

export type LHandler = Handler<APIGatewayEvent, APIGatewayProxyResult>

export const handler: LHandler = async (ev, context) => {
  const { scanDir } = await initScanner()
  const scanResults = scanDir('/clamav-test-files')

  return {
    statusCode: 200,
    body: JSON.stringify({
      scanResults,
    }),
  }
}
