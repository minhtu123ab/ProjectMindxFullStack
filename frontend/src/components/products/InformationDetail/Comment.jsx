import React, { useState, useEffect } from "react";
import { FaRegComments } from "react-icons/fa";
import axios from "axios";

const Comment = ({ item }) => {
  const user = JSON.parse(sessionStorage.getItem("login"));

  const API_URL = "http://localhost:8080";
  const api = axios.create({
    baseURL: API_URL,
  });

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (item && item[0] && item[0].comment) {
      setComments(item[0].comment);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Bình luận không được để trống!");
      return;
    }

    const movieId = item[0]?._id;
    const nameComment = user[0]?.name;
    const newComment = {
      id: Date.now(),
      name: nameComment,
      content: comment,
    };

    try {
      const response = await api.patch(`/movie/${movieId}`, {
        comment: [...comments, newComment],
      });

      if (response && response.data) {
        setComments([...comments, newComment]);
        setComment("");
      } else {
        console.error("Lỗi khi thêm bình luận");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  return (
    <div className="comment-all">
      <div className="title-comment-all">
        <FaRegComments size={30} />
        <span>Bình luận phim</span>
      </div>
      <form className="content-comment-all" onSubmit={handleSubmit}>
        <div className="content-comment">
          {comments.map((comment) => (
            <div key={comment.id} className="name-content-comment">
              <p className="name-comment">{comment.name}</p>
              <p className="content-comment-child">{comment.content}</p>
            </div>
          ))}
        </div>
        <div className="input-btn-comment">
          <input
            className="input-comment"
            placeholder="Nhập bình luận..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="btn-comment" type="submit">
            Gửi
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comment;
