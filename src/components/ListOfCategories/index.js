import React, { useState, useEffect } from 'react'
import { Category } from '../Category'

import { List, Item } from './styles'

export const ListOfCategories = () => {
  const [categories, setCategories] = useState([])
  const [showFixed, setShowFixed] = useState(false)  

  useEffect(() => {
    fetch('https://petgram-server-solej77.now.sh/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data)
      })
  }, [])
  // el array vacio indica que solo se debe de mostar un sola vez cuando es renderizado

  useEffect(() => {
    const onScroll = e => {
      const newShowFixed = window.scrollY > 200
      showFixed !== newShowFixed && setShowFixed(newShowFixed)
    }

    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [showFixed])

  const renderList = (fixed) => (
    <List className={fixed ? 'fixed' : ''}>
      {
        categories.map(category => <Item key={category.id} ><Category {...category} /></Item>)
      }
    </List>
  )

  return(
    <>
      {renderList()}
      {showFixed && renderList(true)}
    </>
  )
}