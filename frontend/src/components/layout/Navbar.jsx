import { Button } from 'antd';
import React , {useState , useEffect}from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { IoDiamond } from "react-icons/io5";
import { GiGoldBar } from "react-icons/gi";
import { GiSilverBullet } from "react-icons/gi";

const Navbar = () => {
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
                        <NavLink to={"/search"} className={"opp-nav"}><IoIosSearch className='search-icon'/>Tìm Kiếm</NavLink>
                        <NavLink to={"/hotmovies"} className={"opp-nav"}>Phim Hot</NavLink>
                        <NavLink to={"/singlemovie"} className={"opp-nav"}>Phim Lẻ</NavLink>
                        <NavLink to={"/seriesmovie"} className={"opp-nav"}>Hoạt Hình</NavLink>
                        <NavLink to={"/newmovie"} className={"opp-nav"}>Phim Mới</NavLink>
                        <NavLink to={"/faq"} className={"opp-nav"}>FAQ</NavLink>
                        {login && login[0].name == 'Administrator' && <NavLink className={"opp-nav"} to={"/admin"}>Admin</NavLink>}
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
                        {login && login[0].rank == "Diamond" && <IoDiamond size={33} style={{
                            color: "white",
                        }}/>}
                        {login && login[0].rank == "Gold" && <GiGoldBar size={33} style={{
                            color: "white",
                        }}/>}
                        {login && login[0].rank == "Silver" && <GiSilverBullet size={33} style={{
                            color: "white",
                        }}/>}
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

export default Navbar;
