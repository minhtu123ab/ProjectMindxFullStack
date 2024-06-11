import React, { useContext, useEffect, useRef, useState } from "react";
import NavbarAd from "./NavbarAd";
import { dataAll } from "../../../App";
import { Button, Input } from "antd";

const Statistical = () => {
  const data = useContext(dataAll);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const [value, setValue] = useState("");
  const [searchProduct, setSearchProduct] = useState(data);

  useEffect(() => {
    setSearchProduct(data);
  }, [data]);

  const onChange = (e) => {
    setValue(e.target.value);
    if (!e.target.value) {
      setSearchProduct(data);
    } else {
      const dataSearch = data.filter((item) =>
        item.movieName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchProduct(dataSearch);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/movie/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSearchProduct((prev) => prev.filter((item) => item._id != id));
      } else {
        console.error("Failed to delete the movie.");
      }
    } catch (error) {
      console.error("Error:", error);
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
    // Cập nhật chiều rộng mỗi khi dữ liệu thay đổi
    window.addEventListener("resize", updateColumnWidths);

    // Dọn dẹp
    return () => {
      window.removeEventListener("resize", updateColumnWidths);
    };
  }, [searchProduct]);

  return (
    <div>
      <NavbarAd />
      <div className="table-container">
        <Input
          placeholder="Tìm tên phim..."
          className="search-movie-admin"
          value={value}
          onChange={onChange}
        />
        <div className="table-header" ref={headerRef}>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên phim</th>
                <th>Thể loại</th>
                <th>Quốc gia</th>
                <th>Ngày phát hành</th>
                <th>Số lượt xem</th>
                <th>Số bình luận</th>
                <th>Rank phim</th>
                <th>Tùy chọn</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="table-content" ref={contentRef}>
          <table>
            <tbody>
              {searchProduct.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.movieName}</td>
                  <td>{item.category}</td>
                  <td>{item.nation}</td>
                  <td>{item.releaseDate}</td>
                  <td>{item.count}</td>
                  <td>{item.comment.length}</td>
                  <td>{item.rankMovie}</td>
                  <td>
                    <Button
                      type="primary"
                      style={{ backgroundColor: "red" }}
                      className="btn-ad"
                      onClick={() => deleteMovie(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistical;
