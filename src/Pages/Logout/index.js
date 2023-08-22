import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/loginActions";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

const Logout = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    removeCookie("gotiretoken");
    props.logout();
  }, []);

  return <Redirect to="/login" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
