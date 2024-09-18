const URL = "http://localhost:8080/graphql";
const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const getPasswordsQuery = {
  query:
    `query{
        passwords{
            uuid
            domain
            url
            email
            updationDate
        }
    }`
};

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

const getPasswords = {
  "url" : URL,
  "data" : getPasswordsQuery,
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

export {getPasswords , savePassword , getPassword};