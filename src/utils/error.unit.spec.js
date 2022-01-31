import { appError } from '@/utils/errors';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { logger } from './logger';

jest.mock('./logger');
jest.mock('http-errors');

describe('Unit > Errors', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute logger errors', () => {
    appError('Error message');

    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith('Error message');
  });

  it('should execute logger errors with message and default status code', () => {
    appError('Error message');

    expect(createError).toHaveBeenCalledTimes(1);
    expect(createError).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR, 'Error message'
    );
  });

  it('should execute logger errors with message and provided status code', () => {
    appError('Error message', StatusCodes.UNPROCESSABLE_ENTITY);

    expect(createError).toHaveBeenCalledTimes(1);
    expect(createError).toHaveBeenCalledWith(
      StatusCodes.UNPROCESSABLE_ENTITY, 'Error message'
    );
  });
});
