import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dataAll } from "../../App";
import { Button } from "antd";
import { FaPlay } from "react-icons/fa";
import Comment from "./InformationDetail/Comment";
import Information from "./InformationDetail/Information";
import SimilarMovie from "./InformationDetail/SimilarMovie";

const ProductDetail = () => {
  const user = JSON.parse(sessionStorage.getItem("login"));
  const navigate = useNavigate();
  const navigateWatch = useNavigate();
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
  const [countView, setCountView] = useState(0);
  const [countViewUser, setCountViewUser] = useState(user[0]?.count || 0);

  useEffect(() => {
    if (dataProductDetail.length > 0) {
      setCountView(dataProductDetail[0].count);
    }
  }, [dataProductDetail]);

  const onClickWatch = async (itemId, itemName) => {
    navigateWatch(`/${itemId}/${itemName}`);
    const count = countView;
    const countUser = countViewUser;
    const movieId = dataProductDetail[0]._id;
    try {
      const updateCount = await fetch(
        `http://localhost:8080/movie/count/${movieId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            count: count + 1,
          }),
        }
      );
      const updateCountUser = await fetch(
        `http://localhost:8080/user/count/${user[0]._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            count: countUser + 1,
          }),
        }
      );

      if (updateCount.ok && updateCountUser.ok) {
        console.log("Update count successfully");
        setCountView(count + 1);
        setCountViewUser(countUser + 1);

        // Cập nhật thông tin user trong sessionStorage
        const updatedUser = { ...user[0], count: countUser + 1 };
        sessionStorage.setItem("login", JSON.stringify([updatedUser]));
      } else {
        console.error("Update count failed");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra", error);
    }
  };

  const canWatch = (userRank, movieRank) => {
    const rankOrder = ["Silver", "Gold", "Diamond"];
    const userRankIndex = rankOrder.indexOf(userRank);
    const movieRankIndex = rankOrder.indexOf(movieRank);
    return userRankIndex >= movieRankIndex;
  };

  return (
    <div className="bacground-detail">
      {dataProductDetail.map((item) => (
        <div key={item._id}>
          <img className="background-img-detail" src={item.background} />
          <div className="blurred-background"></div>
          <div className="product-detail-all">
            <div className="btn-img-product-detail">
              <img className="img-product-detail" src={item.image} />
              {canWatch(user[0].rank, item.rankMovie) ? (
                <Button
                  onClick={() => onClickWatch(item._id, item.movieName)}
                  icon={<FaPlay size={16} />}
                  className="btn-play"
                >
                  Xem phim
                </Button>
              ) : (
                <Button
                  className="btn-play"
                  style={{
                    color: "#ABABAB",
                    backgroundColor: "#E5E5E5",
                  }}
                  disabled
                >
                  Bạn chưa đủ Rank
                </Button>
              )}
            </div>
            <Information item={item} />
          </div>
          <SimilarMovie item={dataProductSimilar} onClick={onClick} />

          <Comment item={dataProductDetail} />
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
