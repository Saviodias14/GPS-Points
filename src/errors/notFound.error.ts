import { ApplicationError } from '@/protocols';
import httpStatus from 'http-status';

export function notFoundError(message?: string): ApplicationError {
    return {
        name: 'NotFound',
        message,
        status:httpStatus.NOT_FOUND
    };
}