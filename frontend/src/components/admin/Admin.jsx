import React from 'react'
import NavbarAd from './components/NavbarAd'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='admin-all'>
        <NavbarAd/>
        <div className='admin-options'>
          <div className='admin-options-child'>
            <Link to={"/statistical"} className='admin-op-all admin-statistical'>
              Thống kê
            </Link>
            <Link to={"/pushmovie"} className='admin-op-all admin-push'>
              Thêm Phim
            </Link>
          </div>
          <Link to={"/user"} className='admin-op-all admin-user'>
            Quản lý người dùng
          </Link>
        </div>
    </div>
  )
}

export default Admin