import React, { useContext, useEffect, useState } from 'react'
import { GiLion } from "react-icons/gi";
import { dataAll } from '../../App';
import Product from '../products/Product';
const SeriesMovie = () => {
  const data = useContext(dataAll)
  const [cartoonMovie , setCartoonMovie] = useState([]);
  useEffect(() => {
    const cartoon = data.filter((item) => item.category === "Cartoon");
    setCartoonMovie(cartoon);
  },[data]) 
  return (
    <div className='hot-movies'>
      <h2 className='title-hot-movies cartoon-movies'><GiLion size={25}/> Phim hoạt hình</h2>
      <Product item={cartoonMovie}/>
    </div>
  )
}

export default SeriesMovie