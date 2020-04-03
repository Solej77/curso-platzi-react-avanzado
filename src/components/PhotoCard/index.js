import React, { useEffect, useRef, useState } from 'react'
import { Article, ImgWrapper, Img, Button } from './styles'
import { MdFavoriteBorder } from 'react-icons/md'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

export const PhotoCard = ({ id, likes=0, src=DEFAULT_IMAGE }) => {
  // nos va a permitir capturtar el elemento del DOM
  const element = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // element.current, es nuestro elemento del dom, para este componente es el article
    // console.log(element.current)

    const obersver = new window.IntersectionObserver(function(entries) {
      const { isIntersecting } = entries[0]
      console.log(isIntersecting)

      if (isIntersecting) {
        setShow(true)
        obersver.disconnect()
      }
    })

    obersver.observe(element.current)
  }, [element])

  return(
    <Article ref={element}>
      {
        show && <>
          <a href={`detail/${id}`}>
            <ImgWrapper>
              <Img src={src} />
            </ImgWrapper>
          </a>

          <Button>
            <MdFavoriteBorder size='32px'/> {likes} likes!
          </Button>
        </>
      }
    </Article>
  )
}