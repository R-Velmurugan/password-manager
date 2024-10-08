const URL = "http://localhost:8080/graphql";
const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const getPasswordsQuery =
    `query AllPasswords($isActive : Boolean){
        passwords(isActive : $isActive){
            uuid
            domain
            url
            email
            updationDate
        }
    }`

const getPasswordByUUIDQuery =
    `query GetPassword($uuid : String) {
  password(uuid : $uuid){
    domain
    url
    username
    email
    password
  }
}`

const insertPasswordQuery = `mutation InsertPassword($domain : String! , $url : String! , $username : String! , $password : String! , $email : String! , $notes : String){
                    insertPassword(passwordInput : {
                        url :$url
                        domain :$domain
                        username : $username
                        password : $password
                        email :$email
                        notes :$notes
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
  "url" : URL,
  "query" : getPasswordsQuery,
  "config" : CONFIG
}

const getPassword = {
  "url" : URL,
  "query" : getPasswordByUUIDQuery,
  "config" : CONFIG
}

const savePassword = {
  "url" : URL,
  "query" : insertPasswordQuery,
  "config" : CONFIG
}

const deletePassword = {
  "url" : URL,
  "query" : deletePasswordQuery,
  "config" : CONFIG
}

const updatePassword = {
  "url" : URL,
  "query" : updatePasswordQuery,
  "config" : CONFIG
}

const restorePassword = {
  "url" : URL,
  "query" : restorePasswordQuery,
  "config" : CONFIG
}

export {getPasswords , savePassword , getPassword , deletePassword , updatePassword , restorePassword};