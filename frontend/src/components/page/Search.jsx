import { Input } from "antd";
import React, { useContext, useState } from "react";
import { dataAll } from "../../App";
import Product from "../products/Product";

const Search = () => {
  const data = useContext(dataAll);
  const [value, setValue] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);
  const onChange = (e) => {
    setValue(e.target.value);
    if (!e.target.value) {
      setSearchProduct([]);
    } else {
      const dataSearch = data.filter((item) =>
        item.movieName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchProduct(dataSearch);
    }
  };
  return (
    <div className="search-page">
      <Input
        className="search-input"
        placeholder="Nhập tên phim..."
        value={value}
        onChange={onChange}
      />
      <Product item={searchProduct} />
    </div>
  );
};

export default Search;
