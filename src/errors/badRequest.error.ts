import { ApplicationError } from '@/protocols';
import httpStatus from 'http-status';

export function badRequestError(message?: string): ApplicationError {
    return {
        name: 'BadRequest',
        message,
        status: httpStatus.BAD_REQUEST
    };
}