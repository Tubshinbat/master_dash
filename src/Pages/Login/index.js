import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";

//Libs
import base from "../../base";
import { toastControl } from "../../lib/toasControl";

//ANTD Components
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Input, Form, Button } from "antd";

// Style
import css from "./__.module.css";

// Actions
import * as actions from "../../redux/actions/loginActions";

const Login = (props) => {
  const [cookies, setCookie] = useCookies(["gotiretoken"]);
  // Init
  useEffect(() => {
    if (cookies.gotiretoken) document.location.href = base.baseUrl;
  });

  useEffect(() => {
    if (props.token) setCookie("gotiretoken", props.token);
  }, [props.token]);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    if (props.error) toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) toastControl("success", props.success);
  }, [props.success]);

  const onFinishFailed = (errorInfo) => {
    toastControl("error", errorInfo);
  };

  const onFinish = (values) => {
    props.login(values);
  };

  return (
    <>
      <Helmet>
        <title>Нэвтрэх</title>
      </Helmet>
      <div className={css.LoginPage}>
        <div className={css.LoginHeader}>
          <div className={css.Logo}>
            <img src={`${base.baseUrl}assets/img/logo.png`} alt="logo" />
          </div>
          <p> Та өөрийнхөө админ нэвтрэх эрхээр орно уу</p>
        </div>
        <div className={css.LoginContent}>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Та өөрийн бүртгэлтэй имэйлээ оруулна уу!",
                },
                {
                  type: "email",
                  message: "Имэйл хаяг буруу байна!",
                },
              ]}
              className="loginInput"
            >
              <Input
                size="large"
                placeholder="Та имэйл хаягаа оруулна уу"
                prefix={<UserOutlined />}
                className="test"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Нууц үгээ оруулна уу",
                },
              ]}
              className="loginInput"
            >
              <Input.Password
                size="large"
                placeholder="Нууц үгээ оруулна уу"
                prefix={<KeyOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button size="large" htmlType="submit" className="loginBtn">
                Нэвтрэх
              </Button>
            </Form.Item>
          </Form>
          <div className={css.Forgot}>
            <Link to="/forget-password">Нууц үгээ мартсан?</Link>
          </div>
        </div>
        <div className={css.LoginFooter}>
          © Webr - Контент удирдлагын систем
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.loginReducer.error,
    success: state.loginReducer.success,
    loading: state.loginReducer.loading,
    userId: state.loginReducer.userId,
    token: state.loginReducer.token,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    login: (data) => dispatch(actions.loginUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Login);
