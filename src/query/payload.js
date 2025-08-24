const GRAPHQL_URL = "http://localhost:8080/graphql";
const LOGIN_URL = "http://localhost:8080/login";
const REGISTER = "http://localhost:8080/register";
const IS_LOGGED_IN = "http://localhost:8080/isLoggedIn";
const LOGOUT = "http://localhost:8080/logout";
const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials : true
};
const getPasswordsQuery =
    `query AllPasswords($isActive : Boolean , $username : String , $password : String){
        passwords(isActive : $isActive , username : $username , masterPassword : $password){
            uuid
            domain
            url
            email
            updationDate,
            password
        }
    }`

const getPasswordByUUIDQuery =
    `query GetPassword($uuid : String , $username : String , $password : String) {
  password(uuid : $uuid , username : $username , masterPassword : $password){
    domain
    url
    username
    email
    password
  }
}`

const getExpiredPasswordsQuery =
    `query Notifications($type : [String] , $username : String){
      notifications(type :$type , username : $username){
        description
      }
    }`

const getMultiplePasswordsByUUIDQuery =
    `query MultiplePasswords($uuids : [String] , $username : String){
      multiplePasswords(uuids : $uuids , username : $username){
        url
        domain
      }
    }`

const insertPasswordQuery = `mutation InsertPassword($domain : String! , $url : String! , $username : String! , $password : String! , $email : String! , $notes : String , $masterPassword : String! , $uname : String!){
                    insertPassword(passwordInput : {
                        url :$url
                        domain :$domain
                        username : $username
                        password : $password
                        email :$email
                        notes :$notes
                        uname : $uname
                        masterPassword : $masterPassword
                    }){
                        uuid
                        domain
                        username
                        password
                        email
                        creationDate
                        updationDate
                        notes
                        url
                    }
                }`;

const deletePasswordQuery = `mutation DeletePassword($uuid :String!){
                                      deletePassword(uuid : $uuid)
                                    }`

const updatePasswordQuery = `mutation UpdatePassword($uuid : String! , $password : String!){
                                      updatePassword(uuid : $uuid , password : $password)
                                    }`
const restorePasswordQuery = `mutation RestorePassword($uuid : String!){
                                      restorePassword(uuid : $uuid)
                                    }`

const getPasswords = {
  "url" : GRAPHQL_URL,
  "query" : getPasswordsQuery,
  "config" : CONFIG
}

const getPassword = {
  "url" : GRAPHQL_URL,
  "query" : getPasswordByUUIDQuery,
  "config" : CONFIG
}

const getExpiredPasswords = {
  "url" : GRAPHQL_URL,
  "query" : getExpiredPasswordsQuery,
  "config" : CONFIG
}

const getMultiplePasswordsByUUID = {
  "url" : GRAPHQL_URL,
  "query" : getMultiplePasswordsByUUIDQuery,
  "config" : CONFIG
}

const savePassword = {
  "url" : GRAPHQL_URL,
  "query" : insertPasswordQuery,
  "config" : CONFIG
}

const deletePassword = {
  "url" : GRAPHQL_URL,
  "query" : deletePasswordQuery,
  "config" : CONFIG
}

const updatePassword = {
  "url" : GRAPHQL_URL,
  "query" : updatePasswordQuery,
  "config" : CONFIG
}

const restorePassword = {
  "url" : GRAPHQL_URL,
  "query" : restorePasswordQuery,
  "config" : CONFIG
}

const loginData = {
  "url" : LOGIN_URL,
  "config" : {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials : true
  }
}

const registerData = {
  "url" : REGISTER,
  "config" : {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials : true
  }
}

const isLoggedIn = {
  "url" : IS_LOGGED_IN,
  "config" : {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials : true
  }
}

const logout = {
  "url" : LOGOUT,
  "config" : {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials : true
  }
}

export {
  getPasswords,
  savePassword,
  getPassword,
  getExpiredPasswords,
  getMultiplePasswordsByUUID,
  deletePassword,
  updatePassword,
  restorePassword,
  loginData,
  isLoggedIn,
  logout,
  registerData
};