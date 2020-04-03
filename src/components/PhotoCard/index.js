import React, { useEffect, useRef, useState } from 'react'
import { Article, ImgWrapper, Img, Button } from './styles'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

export const PhotoCard = ({ id, likes=0, src=DEFAULT_IMAGE }) => {
  // nos va a permitir capturtar el elemento del DOM
  const element = useRef(null)
  const [show, setShow] = useState(false)
  const key = `like-${id}`
  const [liked, setLiked] = useState(() => {
    try {
      const like = window.localStorage.getItem(key)
      return like
    } catch (e) {
      return false
    }
  })

  console.log(liked)
  useEffect(() => {
    // Cargar el Polyfill intersection-observer, en caso de que no los soporte el navegador
    Promise.resolve(
      typeof window.IntersectionObserver !== 'undefined'
      ? window.IntersectionObserver
      : import('intersection-observer')
    ).then(() =>{
      // element.current, es nuestro elemento del dom, para este componente es el article
      // console.log(element.current)
      const obersver = new window.IntersectionObserver(function(entries) {
        const { isIntersecting } = entries[0]
  
        if (isIntersecting) {
          setShow(true)
          obersver.disconnect()
        }
      })
  
      obersver.observe(element.current)
    })

  }, [element])

  const Icon = liked ? MdFavorite : MdFavoriteBorder
  const setLocalStorage = value => {
    try {
      window.localStorage.setItem(key, value)
      setLiked(value)
    } catch (e) {
      console.error(e)
    }
  }

  return(
    <Article ref={element}>
      {
        show && <>
          <a href={`detail/${id}`}>
            <ImgWrapper>
              <Img src={src} />
            </ImgWrapper>
          </a>

          <Button onClick={() => setLocalStorage(!liked)}>
            <Icon size='32px'/> {likes} likes!
          </Button>
        </>
      }
    </Article>
  )
}