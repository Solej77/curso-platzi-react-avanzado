import { useState, useEffect, useRef } from 'react'

export function useNearScreen() {
  // nos va a permitir capturtar el elemento del DOM
  const element = useRef(null)
  const [show, setShow] = useState(false)

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

  return [show, element] 
}