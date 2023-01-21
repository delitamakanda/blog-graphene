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

export const postsByTag = gql`
query ($tag: String!) {
  postsByTag(tag: $tag) {
    title
    slug
    content
    isPublished
    isFeatured
    createdDate
  }
}`

export const allCategories = gql`
query {
  allCategories {
    id
    name
    description
    slug
  }
}`


export const allTags = gql`
query {
  allTags {
    id
    name
    description
    slug
  }
}`

export const allPosts = gql`
query {
  allPosts {
    id
    title
    slug
    content
    isPublished
    isFeatured
    createdDate
  }
}`

export const postBySlug = gql`
query ($slug: String!) {
  postBySlug(slug: $slug) {
    id
    title
    slug
    content
    isPublished
    isFeatured
    featuredImage
    tags {
      id
      name
      description
      slug
    }
    createdDate
    author {
      id
      username
    }
    category {
      name
      slug
    }
    likes {
      id
    }
    numberOfLikes
    commentSet {
      id
      content
      isApproved
      numberOfLikes
      likes {
        id
      }
      author {
        id
        username
        avatar
      }
    }
  }
}
`
