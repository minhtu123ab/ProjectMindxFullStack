import React, { useContext, useState, useEffect } from 'react'
import { dataAll } from '../../App';
import Product from '../products/Product';
const SingleMovie = () => {
  const data = useContext(dataAll)
  const [singleMovie , setSingleMovie] = useState([]);
  useEffect(() => {
    const Single = data.filter((item) => item.category != "Cartoon");
    setSingleMovie(Single);
  },[data]) 
  return (
    <div className='hot-movies'>
      <h2 className='title-hot-movies cartoon-movies'>Phim lẻ</h2>
      <Product item={singleMovie}/>
    </div>
  )
}

export default SingleMovie