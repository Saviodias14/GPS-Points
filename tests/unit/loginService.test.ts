import { faker } from "@faker-js/faker"
import * as loginRepository from "@/repository/login.repository"
import { createJwt } from "@/service/login.service"
import { fakeEmail, fakePassword, fakeUserData } from "../factories/login.faker"
import { string } from "yargs"


describe('Login tests', () => {
    it('Should not pass if email does not exist', async () => {

        jest.spyOn(loginRepository, 'getUser').mockResolvedValueOnce(undefined)

        try {
            await createJwt(fakeEmail, fakePassword)
        } catch (err) {
            console.log(err)
            expect(err.message).toEqual('Email or password invalid');
        }
    })
    it('Should not pass if password is wrong', async () => {

        const user = await fakeUserData()

        jest.spyOn(loginRepository, 'getUser').mockResolvedValueOnce(user)

        try {
            await createJwt(fakeEmail, fakePassword)
        } catch (err) {
            console.log(err)
            expect(err.message).toEqual('Email or password invalid');
        }
    })
    it('Should pass if password and email are ok', async () => {

        const user = await fakeUserData()

        jest.spyOn(loginRepository, 'getUser').mockResolvedValueOnce(user)

        const result = await createJwt(fakeEmail, user.password)
        expect(result.token).toEqual(expect.any(String))


    })
})