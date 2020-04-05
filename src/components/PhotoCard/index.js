import React from 'react'
import { Link } from '@reach/router'
import { Article, ImgWrapper, Img } from './styles'
import { useNearScreen } from '../../hooks/useNearScreen'
import { FavButton } from '../FavButton'
import { ToggleLikeMutation } from '../../container/ToggleLikeMutation'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

export const PhotoCard = ({ id, liked, likes=0, src=DEFAULT_IMAGE }) => {
  const [show, element] = useNearScreen()
  

  return(
    <Article ref={element}>
      {
        show && <>
          <Link to={`/detail/${id}`}>
            <ImgWrapper>
              <Img src={src} />
            </ImgWrapper>
          </Link>

          {/* render prop, tiene que ser una funcion que indique que es lo que se quiere renderizar */}
          <ToggleLikeMutation>
            {
              (toggleLike) => {
                const handleFavClick = () => {
                  toggleLike({ variables: {
                    input: { id }
                  }})
                }

                return <FavButton 
                  liked={liked}
                  likes={likes}
                  onClick={handleFavClick}
                />
              } 
            }
          </ToggleLikeMutation>
        </>
      }
    </Article>
  )
}