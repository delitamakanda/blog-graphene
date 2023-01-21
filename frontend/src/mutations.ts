import gql from "graphql-tag"

export const userSignup = gql`
    mutation ($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            user {
                id
                username
            }
        }
    }
`

export const userLogin = gql`
    mutation ($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token,
            user {
                id
                username
                email
                firstName
                lastName
                avatar
                bio
                location
                website
            }
        }
    }
`