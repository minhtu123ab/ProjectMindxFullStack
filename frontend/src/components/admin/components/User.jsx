import React, { useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import NavbarAd from "./NavbarAd"; // Đảm bảo rằng đường dẫn này chính xác

// Giả sử rằng NavbarAd là một component đã được định nghĩa ở một nơi khác và bạn muốn sử dụng nó ở đây

const User = () => {
  const URL = "http://localhost:8080/user"; // URL của API
  const [users, setUsers] = useState([]); // Sử dụng `users` thay vì `user` để rõ ràng hơn về việc đang lưu trữ một mảng người dùng
  const [value, setValue] = useState("");
  const [searchProduct, setSearchProduct] = useState(users);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setUsers(response.data);
        setSearchProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSearchProduct(users);
  }, [users]);

  const onChange = (e) => {
    const searchValue = e.target.value;
    setValue(searchValue);
    const filteredUsers = users.filter((user) =>
      user.nameRegister.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchProduct(filteredUsers);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      const updatedUsers = users.filter((user) => user._id != id);
      setUsers(updatedUsers);
      setSearchProduct(updatedUsers);
    } catch (error) {
      console.error("Failed to delete the user:", error);
    }
  };

  useEffect(() => {
    const updateColumnWidths = () => {
      const headerCells = headerRef.current.querySelectorAll("th");
      const firstRowCells =
        contentRef.current.querySelectorAll("tr:first-child td");

      if (headerCells.length === firstRowCells.length) {
        for (let i = 0; i < headerCells.length; i++) {
          const width = firstRowCells[i].offsetWidth + "px";
          headerCells[i].style.width = width;
        }
      }
    };

    updateColumnWidths();
    window.addEventListener("resize", updateColumnWidths);

    return () => {
      window.removeEventListener("resize", updateColumnWidths);
    };
  }, [searchProduct]);

  return (
    <div>
      <NavbarAd />
      <div className="table-container">
        <Input
          placeholder="Tìm tên người dùng..."
          className="search-movie-admin"
          value={value}
          onChange={onChange}
        />
        <div className="table-header" ref={headerRef}>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên người dùng</th>
                <th>Số lượt xem</th>
                <th>Rank</th>
                <th>Số bình luận</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="table-content" ref={contentRef}>
          <table>
            <tbody>
              {searchProduct.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.nameRegister}</td>
                  <td>{user.count}</td>
                  <td>{user.rank}</td>
                  <td>{user.cmt ? user.cmt.length : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
