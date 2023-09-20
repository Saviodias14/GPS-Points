import { ApplicationError } from '@/protocols';
import httpStatus from 'http-status';

export function unauthorizedError(message?: string): ApplicationError {
    return {
        name: 'Unauthorized',
        message,
        status:httpStatus.UNAUTHORIZED
    };
}