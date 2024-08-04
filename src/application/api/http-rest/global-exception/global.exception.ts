import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus, NotFoundException } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {

    console.error('error', error);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (error instanceof BadRequestException) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    } else if (error instanceof NotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not Found',
        error: error.message,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: error.message,
      });
    }
  }
}
