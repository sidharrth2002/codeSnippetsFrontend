import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(
      email: $email,
      password: $password
    ) {
      id
      name
      email
      accessToken
    } 
  } 
`

export const GET_SNIPPETS = gql`
query getSnippets {
  snippetsForUser(userId: 1) {
    id
    title
    description
    snippet
    comments {
      user
      body
    }
  }
}
`