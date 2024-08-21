import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ValidationResponse } from 'src/types/Response';

@Catch(BadRequestException)
export class FormFilter implements ExceptionFilter {
  constructor(private messageProvider: ValidationResponse[] = []) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const response = exception.getResponse() as ValidationResponse;

    ctx
      .getResponse<FastifyReply>()
      .status(status)
      .send({
        statusCode: status,
        timestamp: new Date().getTime(),
        path: request.url,
        message:
          this.messageProvider.find(
            (messageObj) =>
              response.expected.includes(messageObj.expected) &&
              messageObj.path === response.path,
          )?.message ??
          response.message ??
          exception.message ??
          'Not valid data',
      });
  }
}
