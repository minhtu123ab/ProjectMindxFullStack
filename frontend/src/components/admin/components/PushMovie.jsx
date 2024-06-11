import React, { useState } from "react";
import NavbarAd from "./NavbarAd";
import { Input, Button, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const { Option } = Select;

const PushMovie = () => {
  const [value, setValue] = useState({
    movieName: "",
    description: "",
    image: null,
    background: null,
    time: "",
    nation: "",
    releaseDate: "",
    count: 0,
    category: "",
    video: "",
    comment: [],
    script: "",
    director: "",
    rankMovie: "",
  });

  function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; // getMonth() trả về từ 0-11
    let year = date.getFullYear();

    // Thêm số 0 ở đầu nếu ngày hoặc tháng là một chữ số
    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;

    return `${day}/${month}/${year}`;
  }

  const onSubmit = async () => {
    // Đầu tiên kiểm tra các giá trị nhập vào
    if (
      !value.movieName ||
      !value.description ||
      !value.image ||
      !value.background ||
      !value.time ||
      !value.nation ||
      !value.category ||
      !value.video ||
      !value.director ||
      !value.script ||
      !value.rankMovie
    ) {
      toast.error("Bạn cần nhập đầy đủ thông tin");
      return; // Dừng hàm nếu thiếu thông tin
    }

    // Nếu thông tin đầy đủ, tiếp tục xử lý
    try {
      const date = formatDate(new Date());
      const formData = new FormData();
      formData.append("movieName", value.movieName);
      formData.append("description", value.description);
      formData.append("image", value.image);
      formData.append("background", value.background);
      formData.append("time", value.time);
      formData.append("nation", value.nation);
      formData.append("releaseDate", date);
      formData.append("count", 0);
      formData.append("category", value.category);
      formData.append("video", value.video);
      formData.append("script", value.script);
      formData.append("director", value.director);
      formData.append("rankMovie", value.rankMovie);

      const response = await axios.post(
        "http://localhost:8080/movie",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      toast.success("Bạn đã thêm thông tin thành công");

      // Reset form
      setValue({
        movieName: "",
        description: "",
        image: null,
        background: null,
        time: "",
        nation: "",
        releaseDate: "",
        count: 0,
        category: "",
        video: "",
        comment: [],
        script: "",
        director: "",
        rankMovie: "",
      });
    } catch (error) {
      console.error("There was an error!", error);
      toast.error("Có lỗi xảy ra khi thêm thông tin");
    }
  };

  return (
    <div>
      <ToastContainer />
      <NavbarAd />
      <form className="push-movie">
        <div>
          <label>Tên phim</label>
          <Input
            value={value.movieName}
            onChange={(e) => setValue({ ...value, movieName: e.target.value })}
          />
        </div>
        <div>
          <label>Ảnh mô tả</label>
          <Input
            type="file"
            onChange={(e) => setValue({ ...value, image: e.target.files[0] })}
            style={{
              width: "300px",
            }}
          />
        </div>
        <div>
          <label>Ảnh backgroud</label>
          <Input
            type="file"
            onChange={(e) =>
              setValue({ ...value, background: e.target.files[0] })
            }
            style={{
              width: "300px",
            }}
          />
        </div>
        <div>
          <label>Thời lượng phim</label>
          <Input
            value={value.time}
            onChange={(e) => setValue({ ...value, time: e.target.value })}
          />
        </div>
        <div>
          <label>Quốc gia</label>
          <Input
            value={value.nation}
            onChange={(e) => setValue({ ...value, nation: e.target.value })}
          />
        </div>
        <div>
          <label>Video phim</label>
          <Input
            value={value.video}
            onChange={(e) => setValue({ ...value, video: e.target.value })}
          />
        </div>
        <div>
          <label>Thể Loại</label>
          <Input
            value={value.category}
            onChange={(e) => setValue({ ...value, category: e.target.value })}
          />
        </div>
        <div>
          <label>Mô tả phim</label>
          <Input
            value={value.description}
            onChange={(e) =>
              setValue({ ...value, description: e.target.value })
            }
          />
        </div>
        <div>
          <label>Kịch bản</label>
          <Input
            value={value.script}
            onChange={(e) => setValue({ ...value, script: e.target.value })}
          />
        </div>
        <div>
          <label>Đạo diễn</label>
          <Input
            value={value.director}
            onChange={(e) => setValue({ ...value, director: e.target.value })}
          />
        </div>
        <div>
          <label>Rank phim</label>
          <Select
            value={value.rankMovie || undefined} // Chuyển thành undefined nếu giá trị là chuỗi rỗng
            onChange={(val) => setValue({ ...value, rankMovie: val })}
            style={{ width: "10%" }} // Đảm bảo kích thước đủ lớn để hiển thị nội dung
            placeholder="Chọn Rank"
          >
            <Option value="Silver">Silver</Option>
            <Option value="Gold">Gold</Option>
            <Option value="Diamond">Diamond</Option>
          </Select>
        </div>
        <Button
          onClick={onSubmit}
          size="large"
          type="primary"
          className="btn-push"
        >
          Gửi
        </Button>
      </form>
    </div>
  );
};

export default PushMovie;
