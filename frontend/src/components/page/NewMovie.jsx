import React, { useContext, useEffect, useState } from 'react';
import { dataAll } from '../../App';
import Product from '../products/Product';

const NewMovie = () => {
  const data = useContext(dataAll);

  // Sử dụng state để lưu trữ danh sách phim mới đã sắp xếp
  const [newMovies, setNewMovies] = useState([]);

  useEffect(() => {
    // Chuyển đổi và sắp xếp dữ liệu trong useEffect
    if (data.length > 0) {
      const updatedData = data.map(item => {
        const parts = item.releaseDate.split('/');
        const year = parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10) - 1; // Chú ý, tháng trong JavaScript bắt đầu từ 0
        const day = parseInt(parts[0], 10);
        return { ...item, formattedDate: new Date(year, month, day) };
      });

      // Sắp xếp dữ liệu dựa vào ngày được format
      const sortedData = updatedData.sort((a, b) => b.formattedDate - a.formattedDate).slice(0, 5);
      setNewMovies(sortedData); // Cập nhật state với dữ liệu đã sắp xếp
    }
  }, [data]); // Phụ thuộc vào dữ liệu đầu vào

  return (
    <div className='hot-movies'>
      <h2 className='title-hot-movies'>Các phim được ra mắt gần đây</h2>
      <Product item={newMovies} />
    </div>
  );
};

export default NewMovie;
