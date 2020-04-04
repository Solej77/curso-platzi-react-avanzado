import React from 'react'
import { PhotoCard } from '../components/PhotoCard'
import { useGetPhotos } from '../hooks/useGetPhoto'

export const PhotoCardWithQuery = ({ id }) => {
  const { loading, error, data } = useGetPhotos(id)

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error!</p>
  
  const { photo = {} } = data
  return <PhotoCard {...photo} />
}

// With Query
// export const PhotoCardWithQuery = ({ id }) => (
//   <Query query={query} variables={{ id }}>
//     {
//       ({ loading, error, data = {} }) => {
//         console.log(data)
//         const { photo = {} } = data
//         return <PhotoCard {...photo} />
//       }
//     }
//   </Query>
// )
