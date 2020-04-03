import React, { useState, useEffect } from 'react'
import { Category } from '../Category'

import { List, Item } from './styles'

export const ListOfCategories = () => {
  const [categories, setCategories] = useState([])

useEffect(() => {
  fetch('https://petgram-server-solej77.now.sh/categories')
    .then(res => res.json())
    .then(data => {
      setCategories(data)
    })
}, [])
// el array vacio indica que solo se debe de mostar un sola vez cuando es renderizado

  return(
    <List>
      {
        categories.map(category => <Item key={category.id} ><Category {...category} /></Item>)
      }
    </List>
  )
}