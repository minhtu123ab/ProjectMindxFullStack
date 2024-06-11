import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./components/auth/Login";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Register from "./components/auth/Register";
import Home from "./components/page/Home";
import FAQ from "./components/page/FAQ";
import Navbar from "./components/layout/Navbar";
import HotMovies from "./components/page/HotMovies";
import SingleMovie from "./components/page/SingleMovie";
import SeriesMovie from "./components/page/SeriesMovie";
import NewMovie from "./components/page/NewMovie";
import Search from "./components/page/Search";
import Footer from "./components/layout/Footer";
import axios from "axios";
import ProductDetail from "./components/products/ProductDetail";
import WatchMovie from "./components/products/WatchMovie";
import Admin from "./components/admin/Admin";
import Statistical from "./components/admin/components/Statistical";
import PushMovie from "./components/admin/components/PushMovie";
import User from "./components/admin/components/User";

export const dataAll = createContext();

const App = () => {
  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    const URL = axios.create({
      baseURL: "http://localhost:8080/movie",
    });

    const fetchData = async () => {
      try {
        const { data } = await URL.get();
        setDataProduct(data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("login")) || [];

    const updateUserRank = async () => {
      if (user[0] && user[0].count >= 5 && user[0].count < 10) {
        try {
          const response = await fetch(
            `http://localhost:8080/user/rank/${user[0]._id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                rank: "Gold",
              }),
            }
          );

          if (response.ok) {
            const updatedUser = { ...user[0], rank: "Gold" };
            sessionStorage.setItem("login", JSON.stringify([updatedUser]));
          }
        } catch (error) {
          console.error("Có lỗi xảy ra khi cập nhật rank:", error);
        }
      }
      if (user[0] && user[0].count >= 10) {
        try {
          const response = await fetch(
            `http://localhost:8080/user/rank/${user[0]._id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                rank: "Diamond",
              }),
            }
          );

          if (response.ok) {
            const updatedUser = { ...user[0], rank: "Diamond" };
            sessionStorage.setItem("login", JSON.stringify([updatedUser]));
          }
        } catch (error) {
          console.error("Có lỗi xảy ra khi cập nhật rank:", error);
        }
      }
    };

    updateUserRank();
  }, []);

  return (
    <BrowserRouter>
      <RoutesWithNavbar dataProduct={dataProduct} />
    </BrowserRouter>
  );
};

const RoutesWithNavbar = ({ dataProduct }) => {
  let location = useLocation();
  let hideNavbarPaths = [
    "/login",
    "/register",
    "/admin",
    "/statistical",
    "/pushmovie",
    "/user",
  ];
  let hideNavbarPaths2 = ["/login", "/register"];

  return (
    <dataAll.Provider value={dataProduct}>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotmovies" element={<HotMovies />} />
        <Route path="/singlemovie" element={<SingleMovie />} />
        <Route path="/seriesmovie" element={<SeriesMovie />} />
        <Route path="/newmovie" element={<NewMovie />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path="/:id/:movieName" element={<WatchMovie />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/statistical" element={<Statistical />} />
        <Route path="/pushmovie" element={<PushMovie />} />
        <Route path="/user" element={<User />} />
      </Routes>
      {!hideNavbarPaths2.includes(location.pathname) && <Footer />}
    </dataAll.Provider>
  );
};

export default App;
