import { Button } from 'antd';
import React , {useState , useEffect}from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";

const NavbarAd = () => {
    const [isOpen, setIsOpen] = useState(false);
    let login = sessionStorage.getItem('login') ? JSON.parse(sessionStorage.getItem('login')) : null;
    const onClickDelete = () => {
        sessionStorage.removeItem('login');
    };

    const [colorChange, setColorChange] = useState(false);

  const changeNavbarColor = () =>{
     if(window.scrollY >= 80){
       setColorChange(true);
     }
     else{
       setColorChange(false);
     }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNavbarColor);
    return () => {
      window.removeEventListener('scroll', changeNavbarColor);
    }
  }, []);


    return (
        <div className={`navbar-all-login ${colorChange ? 'navbar-white' : 'navbar-black'}`}>
            <div className='navbar-login'>
                <div className='navbar-opp'>
                    <Link className='title-web-link' to={"/"}>
                        <p className='title-web'>Movies Chill</p>
                    </Link>
                    <Button className="nav-toggle" type="primary" icon={<FiMenu size={23} color='white' className='item-nav-toggle'/>} onClick={() => setIsOpen(!isOpen)}>
                    </Button>
                    <ul className={`opp-nav-all ${isOpen ? 'open' : ''}`}>
                        <NavLink to={"/admin"} className={"opp-nav"}>Admin</NavLink>
                        <NavLink to={"/statistical"} className={"opp-nav"}>Thống kê</NavLink>
                        <NavLink to={"/pushmovie"} className={"opp-nav"}>Thêm phim</NavLink>
                        <NavLink to={"/user"} className={"opp-nav"}>Người dùng</NavLink>
                    </ul>
                </div>
                {
                    !login ? 
                    <NavLink to={"/login"}>
                        <Button style={{
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: "bold",
                        }}>Đăng Nhập</Button>
                    </NavLink> : <div className='name-people-all'>
                        <FaUser size={35} className='icon-user'/>
                        <p className='name-people'>{login[0].name}</p>
                        <NavLink to={"/login"}>
                            <Button style={{
                                backgroundColor: "red",
                                color: "white",
                                fontWeight: "bold",
                            }} onClick={onClickDelete}>Đăng xuất</Button>
                        </NavLink>
                    </div>
                }
            </div>
        </div>
    );
}

export default NavbarAd;
