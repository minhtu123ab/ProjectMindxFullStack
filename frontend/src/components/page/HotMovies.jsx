import React, { useContext } from 'react'
import { dataAll } from '../../App'
import Product from '../products/Product';

const HotMovies = () => {
  const data = useContext(dataAll)
  const dataHot = [...data];
  for (let i = 0; i < dataHot.length; i++) {
    for ( let j = i; j < dataHot.length; j++){
      let x;
      if(dataHot[j].count > dataHot[i].count){
        x = dataHot[j];
        dataHot[j] = dataHot[i];
        dataHot[i] = x;
      }
    }
  }
  const dataHotMovies = dataHot.slice(0,5)
  return (
    <div className='hot-movies'>
      <h2 className='title-hot-movies'>Top 5 phim được xem nhiều nhất</h2>
      <Product item={dataHotMovies}/>
    </div>
  )
}

export default HotMovies