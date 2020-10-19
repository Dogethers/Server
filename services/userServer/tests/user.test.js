const request = require('supertest')
const app = require('../app.js')
const { createHash, compareHash } = require('../helpers/bcrypt')



// REGISTER SUCCESS
// describe("test user register POST/register", function(){
//     it.only("test success register with json", function(done){
//         request(app)
//             .post("/register")
//             .send({username:"vikgans", email: "vik@mail.com", password:createHash("vikvik"), isOnline:false})
//             .set("Accept", "application/json")
//             // .expect("Content-Type", "/json/")
//             .then((response) =>{
//                 const { body, status} = response
//                 expect(status).toBe(200)
//                 expect(body).toHaveProperty("email", "vik@mail.com")
//                 done()
//             })
//     })
// })


// //// REGISTER FAILED
// describe("Test user Failed Register POST/register", function(){
//     describe("Test failed email format is invalid with json", function(){
//         it("400: Invalid email format", function(done){
//             request(app)
//             .post("/register")
//             .send({username:"vikgans", email: "vikmail.com", password:createHash("vikvik"), isOnline:false})
//             .set("Accept", "application/json")
//             // .expect("Content-Type", "/json/")
//             .then((response) =>{
//                 const { body, status} = response
//                 expect(status).toBe(400)
//                 expect(body).toHaveProperty(Object.keys(response.body))
//                 done()
//             })
//         })
//     })
//     describe("Test failed password length is invalid ", function(){
//         it("400: Invalid password length (min. 6 and max. 100 characters)", function(done){
//             request(app)
//             .post("/register")
//             .send({username:"vikgans", email: "vikmail.com", password:"vikk", isOnline:false})
//             .set("Accept", "application/json")
//             // .expect("Content-Type", "/json/")
//             .then((response) =>{
//                 const { body, status} = response
//                 expect(status).toBe(400)
//                 expect(body).toHaveProperty(Object.keys(response.body))
//                 done()
//             })
//         })
//     })
//     describe(`Test failed empty value in register with json`, function(){
//         it("400: bad request", function (done){
//             request(app)
//             .post("/register")
//             .send({ email: "", password: "", username:""})
//             .set("Accept", "application/json")
//             // .expect("Content-Type", /json/)
//             .then((response) => {
//               const { body, status } = response;
//               expect(status).toBe(400);
//               expect(body).toHaveProperty(Object.keys(response.body))
//               done();
//             });
//         })
//     })

// })


//// LOGIN SUCCESS
describe("test user login POST/login", function () {
    it.only("test success login with json", function (done) {
      request(app)
        .post("/login")
        .send({email: "vik@mail.com", password:"vikvik", isOnline:true})
        .set("Accept", "application/json")
        // .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          // expect(body).toHaveProperty("email", "vik@mail.com");
          expect(body).toHaveProperty("access_token", expect.any(String));
          done();
        });
    });
  });
  
  
//// LOGIN FAILED
  // describe("Test Failed user login POST/login", () => {
  //   describe(`Test failed email not registered with json`, function () {
  //     it("400: invalid email or password", function (done) {
  //       request(app)
  //         .post("/login")
  //         .send({ email: "v@mail.com", password: "vikvik"})
  //         .set("Accept", "application/json")
  //         // .expect("Content-Type", /json/)
  //         .then((response) => {
  //           const { body, status } = response;
  //           expect(status).toBe(400);
  //           expect(body).toHaveProperty(Object.keys(response.body))
  //           done();
  //         });
  //     });
  //   });
  //   describe(`Test failed invalid password with json`, function(){
  //       it("400: invalid email or password", function (done){
  //           request(app)
  //           .post("/login")
  //           .send({ email: "vikvik@mail.com", password: "wrongPass"})
  //           .set("Accept", "application/json")
  //           // .expect("Content-Type", /json/)
  //           .then((response) => {
  //             const { body, status } = response;
  //             expect(status).toBe(400);
  //             expect(body).toHaveProperty(Object.keys(response.body))
  //             done();
  //           });
  //       })
  //   })
  //   describe(`Test failed empty value in login with json`, function(){
  //       it("400: bad request", function (done){
  //           request(app)
  //           .post("/login")
  //           .send({ email: "", password: ""})
  //           .set("Accept", "application/json")
  //           // .expect("Content-Type", /json/)
  //           .then((response) => {
  //             const { body, status } = response;
  //             expect(status).toBe(400);
  //             expect(body).toHaveProperty(Object.keys(response.body))
  //             done();
  //           });
  //       })
  //   })
  // });
