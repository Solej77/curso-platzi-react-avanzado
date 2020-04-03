import React, { useState, useEffect } from 'react'
import { Category } from '../Category'

import { List, Item } from './styles'

function useCategoriesData() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    fetch('https://petgram-server-solej77.now.sh/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data)
        setLoading(false)
      })
  }, [])
  // el array vacio indica que solo se debe de mostar un sola vez cuando es renderizado

  return { categories, loading };
}

export const ListOfCategories = () => {
  const { categories, loading } = useCategoriesData();
  const [showFixed, setShowFixed] = useState(false)  

  useEffect(() => {
    const onScroll = e => {
      const newShowFixed = window.scrollY > 200
      showFixed !== newShowFixed && setShowFixed(newShowFixed)
    }

    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [showFixed])

  const renderList = (fixed) => (
    <List fixed={fixed}>
      {
        loading 
        ? <Item key='loading'><Category /></Item>
        : categories.map(category => <Item key={category.id} ><Category {...category} /></Item>)
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