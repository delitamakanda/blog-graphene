import gql from 'graphql-tag'

export const siteInfo = gql`
query {
  site {
    id
    name
    description
  }
}
`

export const postsByCategory = gql`
query ($category: String!) {
  postsByCategory(category: $category) {
    title
    slug
    content
    isPublished
    isFeatured
    createdDate
  }
}`
