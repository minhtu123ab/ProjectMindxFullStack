import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const URL = axios.create({
    baseURL: "http://localhost:8080/user",
  });

  const [register, setRegister] = useState([]);

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const response = await URL.get("/");
        setRegister(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
        toast.error("Failed to load user data");
      }
    };
    getDataUser();
  }, []);

  const navigate = useNavigate();
  const [value, setValue] = useState({
    _id: "",
    name: "",
    useName: "",
    password: "",
  });

  const [errorLogin, setErrorLogin] = useState("");
  const [errorPassAgain, setErrorPassAgain] = useState("");

  const [touched, setTouched] = useState({
    useName: false,
    password: false,
  });

  const onChangeValue = (field) => (e) => {
    setValue({ ...value, [field]: e.target.value });
  };

  const onBlurField = (field) => () => {
    setTouched({ ...touched, [field]: true });
  };

  const check = (field) => {
    if (!touched[field]) return true;
    if (!value[field]) return false;
    return true;
  };

  const checkPassLength = (field) => {
    if (!touched[field]) return true;
    if (value[field] == 0) return true;
    if (value[field].length < 6) {
      return false;
    }
    return true;
  };

  const login = [];
  const onClickLogin = (e) => {
    e.preventDefault();
    let count = 0;
    for (let i = 0; i < register.length; i++) {
      if (
        value.password === register[i].passwordRegister &&
        value.useName === register[i].useNameRegister
      ) {
        count++;
        login.push({
          _id: register[i]._id,
          name: register[i].nameRegister,
          count: register[i].count,
          rank: register[i].rank,
        });
      }
    }
    sessionStorage.setItem("login", JSON.stringify(login));
    if (value.useName == "admin@gmail.com" && value.password == "admin123") {
      setErrorLogin("");
      setTouched({
        useName: false,
        password: false,
      });
      setValue({
        useName: "",
        password: "",
      });
      toast.success("Đang chuyển sang trang admin");
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } else if (value.password.length < 6) {
      setErrorPassAgain("Mật khẩu phải chứa ít nhất 6 ký tự");
      setValue({
        useName: "",
        password: "",
      });
      setTouched({
        useName: false,
        password: false,
      });
    } else if (count == 0) {
      setErrorLogin("Thông tin tài khoản hoặc mật khẩu không chính xác");
      setTimeout(() => {
        setErrorLogin("");
      }, 2000);
      setTouched({
        useName: false,
        password: false,
      });
      setValue({
        useName: "",
        password: "",
      });
    } else {
      setErrorLogin("");
      setTouched({
        useName: false,
        password: false,
      });
      setValue({
        useName: "",
        password: "",
      });
      toast.success("Đăng nhập thành công");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <div className="login-all-backgroud">
      <div className="login">
        <ToastContainer />
        <div className="login-app-all">
          <form className="login-app" onSubmit={onClickLogin}>
            <h1 className="login-app-title">Đăng Nhập</h1>
            <div className="label-input">
              <label>Tên đăng nhập</label>
              <input
                className="login-app-input"
                type="email"
                placeholder="Email"
                value={value.useName}
                onChange={onChangeValue("useName")}
                onBlur={onBlurField("useName")}
              />
              {!check("useName") && (
                <p className="error-register">Vui lòng nhập tên đăng nhập</p>
              )}
              {errorLogin && (
                <p className="error-register error-login">{errorLogin}</p>
              )}
            </div>
            <div className="label-input">
              <label>Mật khẩu</label>
              <input
                className="login-app-input"
                type="password"
                placeholder="Mật khẩu"
                value={value.password}
                onChange={onChangeValue("password")}
                onBlur={onBlurField("password")}
              />
              {!check("password") && (
                <p className="error-register">Vui lòng nhập mật khẩu</p>
              )}
              {!checkPassLength("password") && (
                <p className="error-register">
                  Mật khẩu phải chứa ít nhất 6 kí tự
                </p>
              )}
              {errorPassAgain && (
                <p className="error-register">{errorPassAgain}</p>
              )}
            </div>

            <div className="login-app-button-all">
              <button
                type="submit"
                className="login-app-button"
                onSubmit={onClickLogin}
              >
                Đăng Nhập
              </button>
            </div>
            <p className="login-app-res">
              Nếu chưa có tài khoản xin vui lòng{" "}
              <NavLink className="login-app-register" to={"/register"}>
                đăng ký ngay
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
