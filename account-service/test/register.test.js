import mongoose from "mongoose";
import { UserModel } from "../src/database/models";

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src"

const API = "http://localhost:3001";
let should = chai.should();

chai.use(chaiHttp);

describe("User", () => {
    beforeEach((done) => {
        UserModel.deleteMany({}, (err) => {
            done();
        });
    });

    describe("Register User", () => {
        it('Resgiter user with correct input', (done) => {
            let user = {
                email: 'akuncoba@email.com',
                password: 'akun123',
                firstName: 'Akun',
                lastName: 'Coba',
                gender: 'Male'
            }
            chai.request(API)
                .post('/auth/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});