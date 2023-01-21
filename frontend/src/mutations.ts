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

export const createComment = gql`
    mutation ($content: String!, $authorID: ID!, $postID: ID!) {
        createComment(content: $content, authorId: $authorID, postId: $postID) {
            comment {
                content
            }
        }
    }
`

export const updatePostLike = gql`
    mutation ($postId: ID!, $authorId: ID!) {
        updatePostLikes(postId: $postId, authorId: $authorId) {
            post {
                id
                title
                likes {
                    id
                }
            }
        }
    }
`
