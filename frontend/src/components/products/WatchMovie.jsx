import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dataAll } from "../../App";
import Comment from "./InformationDetail/Comment";
import Information from "./InformationDetail/Information";
import SimilarMovie from "./InformationDetail/SimilarMovie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPlayer from "react-player";

const WatchMovie = () => {
  const user = JSON.parse(sessionStorage.getItem("login"));
  useEffect(() => {
    if (user[0].count == 4) {
      toast.success("Chúc mừng bạn đã đạt hạng Vàng \n Nhấn F5 để cập nhật");
    }
    if (user[0].count == 9) {
      toast.success(
        "Chúc mừng bạn đã đạt hạng Kim Cương \n Nhấn F5 để cập nhật"
      );
    }
  }, [user[0].count]);
  const navigate = useNavigate();
  const data = useContext(dataAll);
  const { id } = useParams();
  const dataProductDetail = data.filter((item) => item._id == id);
  const dataProductSimilar = data.filter(
    (item) =>
      item.category == dataProductDetail[0].category &&
      item._id != dataProductDetail[0]._id
  );
  const onClick = (itemId) => {
    navigate(`/${itemId}`);
  };
  return (
    <div className="bacground-detail">
      <ToastContainer />
      {dataProductDetail.map((item) => (
        <div key={item._id}>
          <div className="product-watch-all">
            <ReactPlayer
              url={item.video}
              className="background-video-detail-2"
              playing
              controls
            />
            ;
            <Information item={item} />
          </div>
          <SimilarMovie item={dataProductSimilar} onClick={onClick} />

          <Comment item={dataProductDetail} />
        </div>
      ))}
    </div>
  );
};

export default WatchMovie;
