import React from 'react'
import { Layout } from '../components/Layout'
import { ListOfCategories } from '../components/ListOfCategories'
import { ListOfPhotoCards } from '../container/ListOfPhotoCards'

const HomePage = ({ categoryId }) => (
  <>
    <Layout
      title='Tu app de fotos de mascotas'
      subtitle='Con Petgram puedes encontrar fotos de animales domésticos muy bonitos'
    >
      <ListOfCategories />
      <ListOfPhotoCards categoryId={categoryId}/>
    </Layout>
  </>
)

export const Home = React.memo(HomePage, (prevProps, props) => {
  return prevProps.categoryId === props.categoryId
})