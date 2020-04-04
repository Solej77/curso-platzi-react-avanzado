import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

const getPhoto = gql`
query getSinglePhoto($id:ID!) {
  photo(id:$id) {
    id
    categoryId
    src
    likes
    userId
    liked
  }
}
`
export const useGetPhotos = (id) => {
  const { loading, error, data = {}  } = useQuery(getPhoto, { variables: { id } })
  return { loading, error, data }
}
