import React, { useContext } from 'react'
import { dataAll } from '../../App'
import Product from '../products/Product';
const Home = () => {
  const data = useContext(dataAll)
  return (
    <div className='all-item'>
      <Product item={data}/>
    </div>
  )
}

export default Home