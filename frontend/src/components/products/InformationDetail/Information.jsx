import React from 'react'

const Information = ({item}) => {
  return (
    <div className='information-detail'>
        <div className='title-detail-all'>
            <h2 className='name-movie-detail'>{item.movieName}</h2>
            <p className='time-movie'>{item.time}</p>
        </div>
        <div className='source-detail'>
            <p className='releaseDate'>THỂ LOẠI : {item.category}</p>
            <p className='releaseDate'>KỊCH BẢN :  {item.director}</p>  
            <p className='releaseDate'>ĐẠO DIỄN :  {item.script}</p>
            <p className='releaseDate'>QUỐC GIA :  {item.nation}</p>
            <p className='releaseDate'>KHỞI CHIẾU :  {item.releaseDate}</p>
            <p className='releaseDate'>RANK PHIM :  {item.rankMovie}</p>
        </div>
            <p className='description'>{item.description}</p>
    </div>
  )
}

export default Information