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

export const GET_SNIPPETS_BY_KEYWORD = gql`
query snippetsByKeyword($keyword: String!) {
    snippetsByKeyword(keyword: $keyword) {
      id
      title
      description
      snippet
    }
  }
`

export const ADD_SNIPPET = gql`
  mutation createSnippet($title: String!, $description: String!, $snippet: String!, $userId: ID!) {
    createSnippet(
      title: $title,
      description: $description,
      snippet: $snippet,
      userId: $userId
    ) {
      title
      description
      snippet
    }
  }
`