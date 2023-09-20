import app, { init } from "@/app";
import { cleanDb } from "../factories/cleanDb";
import supertest from 'supertest'
import { disconnectDB } from "@/database";
import { fakeDeviceId } from "../factories/location.faker";
import httpStatus from "http-status";
import { createLocation, signUp, signUpUsers } from "../factories/signUser";

beforeAll(async () => {
    await init();
    await cleanDb();
});

afterAll(async () => {
    await disconnectDB();
});

const server = supertest(app);

describe('Test of integration on location route', () => {

    it('Should respond with 401 if no token is given', async () => {
        const response = await server.get(`/api/v1/location/${fakeDeviceId}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    })
    it('Should respond with 404 if the device_id does not exist', async () => {
        const user = await signUp()
        const token = await server.post('/api/v1/login').send({ email: user.email, password: user.password })
        const response = await server.get(`/api/v1/location/${fakeDeviceId}`).set('Authorization', `Bearer ${token.body.token}`)
        expect(response.status).toBe(httpStatus.NOT_FOUND);
    })
    it('Should respond with 401 if user is not owner of device_id', async () => {
        const user = await signUpUsers(2)
        const token = await server.post('/api/v1/login').send({ email: user[0].email, password: user[0].password })
        const response = await server.get(`/api/v1/location/${user[1].device_id}`).set('Authorization', `Bearer ${token.body.token}`)
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    })
    it('Should respond with 200 if is everything ok', async () => {
        const user = await signUp()
        const token = await server.post('/api/v1/login').send({ email: user.email, password: user.password })
        const response = await server.get(`/api/v1/location/${user.device_id}`).set('Authorization', `Bearer ${token.body.token}`)
        expect(response.status).toBe(httpStatus.OK);
    })
})