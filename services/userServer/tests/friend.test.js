const request = require('supertest')
const app = require('../app.js')
const { User } = require('../models')
const { queryInterface } = require('sequelize')
const { generateToken } = require('../helpers/jwt')

let token = "";
let access_token = "";

beforeAll(async () => {
  let user1 = {
    username: "user1",
    email: "user1@mail.com",
    password: "12345",
    isOnline: false,
  };

  let user2 = {
    username: "user2",
    email: "user2@mail.com",
    password: "12345",
    isOnline: false,
  };

  let test1 = await User.create(user1);
  let data = {
    email: test1.email,
    username: test1.username,
    id: test1.id,
  };
  access_token = generateToken(data);
  // onsole.log(access_token, 'ini access token');

  let test2 = await User.create(user2);
  let data2 = {
    email: test2.email,
    username: test2.username,
    id: test2.id,
  };
  token = generateToken(data2);
});

afterAll(async (done) => {
  try {
    await queryInterface.bulkDelete("UserFriendlists", null);
    await queryInterface.bulkDelete("Users", null);
    done();
  } catch (err) {
    done(err);
  }
});
//// Friendlist Success
describe('Test Friendlist Success', function(){
    // describe('Test Succes Get Friendlist GET /friendlist', function(){
    //     it.only('200: Success read data friendlist', function(done){
    //         const friendlist = {
                
    //         }
    //         request(app)
    //         .get('/friendlist')
    //         .set('access_token',access_token)
    //     })
    // })
    describe('Test Succes Add Friend POST /friendlist', function(){
        it('200: Success Add Friend', function(done){
            request(app)
            .post('/friendlist')
            .send({FriendId : 1})
            .set('access_token', access_token)
            .then((response) =>{
                const {body, status} = response
                console.log(response, 'ini response')
                expect(status).toBe(200)
                expect(body).toHaveProperty(Object.keys(response.body))
                done()
            })
            .catch(error =>{
                console.log(error);
            })
        })
    })
})