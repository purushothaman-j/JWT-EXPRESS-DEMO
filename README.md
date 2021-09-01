# JWT-EXPRESS-DEMO

This is a micro MERN stack application contains signup, signin, me(restricted access) to demonstrate JWT authentication.

1. SignUp
   url : http://127.0.0.1:3000/user/signup/
   method : POST
   sample data : {
   "email" : "example@gmail.com",
   "password" : "passwordjwt"
   }

2. SignIn
   url : http://127.0.0.1:3000/user/signin
   method : POST
   sample data : {
   "email" : "example@gmail.com",
   "password" : "passwordjwt"
   }

3. Protected Access (User/me)
   url : http://127.0.0.1:3000/user/me
   method: GET
   Authorization:{
   "Type" : "BearerToken",
   "Token" : "tokenFromSigninResponse"
   }
