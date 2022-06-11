process.env.NODE_ENV == 'test'
// import { Router, Request, Response, NextFunction } from 'express';
import db from '../db/model';
const { Lesson } = db
import chai, { use } from 'chai'
// import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../index'
import delay from 'delay'
// import { should } from 'chai';
const { expect } = chai;
chai.use(chaiHttp);

describe('Lesson',  function (){
  beforeEach(async function()  { //Before each test we empty the database
    Lesson.destroy({truncate: true, where: {}}) 
    await delay(1000)          
    });        
  });
  /*
  * Test the /GET route
  */
  describe('/GET Lesson', function() {
    it('it should GET all the Lesson', async function () {
      await delay(1000)
      chai.request(app)
          .get('/api/v1/lessons')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
          })
    });
});

/*
* Test the /POST route
*/

describe('/POST Sign-up user', function() {
  it('It should create a user', async function() {
    await delay(1000)
    const user = {
      "childName": "Kehinde Jacob", 
      "email": "metikenny0002=4@gmail.com", 
      "phoneNumber": "08100780269", 
      "countryCode": "234", 
      "password": "123456789", 
      "confirmPassword": "123456789", 
      "grade": "primary six"
    };
    chai.request(app)
        .post('/api/v1/user/sign-up')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.body).to.include({
            message: 'learner created successfully',
            status: true
          })
        });
  });

  it('It should not create a user with incomplete parameters', async function () {
    await delay(1000)
    const user = {
      "childName": "Kehinde Jacob", 
      "phoneNumber": "08100780269", 
      "countryCode": "234", 
      "password": "123456789", 
      "confirmPassword": "123456789", 
      "grade": "primary six"
    }
    chai.request(app)
      .post('/api/v1/user/sign-up')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(422);
      });
  });

  it("It should login user", async function () {
    await delay(1000)
    const user = {
      "email": "metikenny0004@gmail.com",
      "password": "123456789",
      "comfirmPassord": "123456789"
    }
    chai.request(app)
    .post('/api/v1/user/login')
    .send(user)
    .end((err, res) => {

      expect(res.status).to.equal(200);
      expect(res.body).to.include({
        "message": "Logged in successfully",
        "success": true,
      })
    })
  })

  it("It should should not login if the password is wrong", async function () {
    await delay(1000)
    const user = {
      "email": "metikenny0004@gmail.com",
      "password": "1234567",
      "comfirmPassord": "1234567"
    }
    chai.request(app)
    .post('/api/v1/user/login')
    .send(user)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.include({
        "message": "Sorry, those credentials are incorrect."
      })
    })
  })
});

/*
* Test the /GET/:id route
*/

describe('/GET/:id lesson', function () {
  it('It should get a particular lesson', async function (){
    await delay(1000)
    const LessonId = 1;
    chai.request(app)
      .get(`/api/v1/lesson/${LessonId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.include({
          "message": "success",
          "success": true,
          "data": {
              "id": 1,
              "name": "Introduction to computer science",
              "startDate": "11-06-2022",
              "duration": 60,
              "createdAt": "2022-06-11T12:16:17.269Z",
              "updatedAt": "2022-06-11T12:16:17.269Z"
          }
        })
      });
  });

  it('It should not get a particular lesson with invalid id', async function () {
    await delay(1000)
    const lessonId = 8888;
    chai.request(app)
      .get(`/api/v1/lesson/${lessonId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message').eql(`Cannot find lesson with the id ${lessonId}`);
      });
  });

  it('It should not get a particular lesson with non-numeric id', async function() {
    await delay(1000)
    const lessonId = 'aaa';
    chai.request(app)
      .get(`/api/v1/lession/${lessonId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.include({
          "message": "Route not exist",
        })
      });
  });
})
