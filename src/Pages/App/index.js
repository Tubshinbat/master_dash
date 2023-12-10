import { useEffect } from "react";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useCookies, CookiesProvider } from "react-cookie";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";
import Cookies from "js-cookie";

//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

// Import components
import Header from "../../Components/Header";
import Side from "../../Components/Side";

// Import page

//Faq
import Faq from "../Faq";
import FaqAdd from "../Faq/Add";
import FaqEdit from "../Faq/Edit";
//Gallery
import Gallery from "../Gallery";
import GalleryAdd from "../Gallery/Add";
import GalleryEdit from "../Gallery/Edit";

//MENU
import Menus from "../Menus";
import FooterMenu from "../Menus/footer";
//NEWS
import News from "../News";
import NewsAdd from "../News/Add";
import NewsEdit from "../News/Edit";
import NewsCategories from "../News/News_categories";

// Page
import PageAdd from "../Page/Add";
import PageEdit from "../Page/Edit";
import Page from "../Page";
//Partner
import Partner from "../Partner";
import PartnerAdd from "../Partner/Add";
import PartnerEdit from "../Partner/Edit";

//Services
import Service from "../Service";
import ServiceAdd from "../Service/Add";
import ServiceEdit from "../Service/Edit";

//User
import User from "../Users";
import UserAdd from "../Users/Add";
import UserEdit from "../Users/Edit";

// MEMBERS
import Member from "../Member";
import MemberAdd from "../Member/Add";
import MemberEdit from "../Member/Edit";
//Member categories
import MemberCategory from "../Member/Member_categories";
import MemberRates from "../MemberRate";
// PRODUCT
import Product from "../Products";
import ProductAdd from "../Products/Add";
import ProductEdit from "../Products/Edit";
// WEBSETTINGS
import WebSettings from "../WebSettings";
import Socials from "../WebSettings/socials";
import Banner from "../WebSettings/banner";
import BannerAdd from "../WebSettings/banner/Add";
import BannerEdit from "../WebSettings/banner/Edit";
import Logout from "../Logout";
import LoginPage from "../Login";
import Dashboard from "../Dashboard";

// Actions
import { tokenCheck } from "../../redux/actions/tokenActions";

function App(props) {
  const validateMessages = {
    required: "Заавал бөглөнө үү!",
  };

  const [cookies] = useCookies(["nodetoken", "language"]);

  useEffect(() => {
    if (cookies.nodetoken) {
      const token = cookies.nodetoken;
      props.checkToken(token);
    }
  }, cookies);

  useEffect(() => {
    if (props.tokenError) {
      cookies.remove("nodetoken");
      document.location.href = "/login";
    }
  }, props.tokenError);

  useEffect(() => {
    if (props.role && props.role !== "admin") {
      Cookies.remove("nodetoken");
      document.location.href = "/login";
    }
  }, props.role);

  return (
    <>
      {cookies.nodetoken ? (
        <ConfigProvider form={{ validateMessages }}>
          <CookiesProvider>
            <Header />
            <Side />
            <Switch>
              <Route path="/" exact component={Dashboard} />
              //FAQ
              <Route path={"/faqs/edit/:id"} component={FaqEdit} />
              <Route path="/faqs/add" component={FaqAdd} />
              <Route path="/faqs" exact component={Faq} />
              //Gallery
              <Route path={"/gallery/edit/:id"} component={GalleryEdit} />
              <Route path="/gallery/add" component={GalleryAdd} />
              <Route path="/gallery" exact component={Gallery} />
              //Page
              <Route path={"/pages/edit/:id"} component={PageEdit} />
              <Route path="/pages/add" component={PageAdd} />
              <Route path="/pages" exact component={Page} />
              // Partner
              <Route path={"/partners/edit/:id"} component={PartnerEdit} />
              <Route path="/partners/add" component={PartnerAdd} />
              <Route path="/partners" exact component={Partner} />
              //Service
              <Route path={"/services/edit/:id"} component={ServiceEdit} />
              <Route path="/services/add" component={ServiceAdd} />
              <Route path="/services" exact component={Service} />
              //users
              <Route path="/users/add" exact component={UserAdd} />
              <Route path="/users/edit/:id" exact component={UserEdit} />
              <Route path="/users" exact component={User} />
              //Member
              <Route path="/members/add" exact component={MemberAdd} />
              <Route path="/members/edit/:id" exact component={MemberEdit} />
              <Route path="/members" exact component={Member} />
              // Member categories
              <Route
                path="/members/categories"
                exact
                component={MemberCategory}
              />
              <Route path="/rates" exact component={MemberRates} />
              //NEWS
              <Route path={"/news/edit/:id"} component={NewsEdit} />
              <Route path="/news/categories" exact component={NewsCategories} />
              <Route path="/news/add" component={NewsAdd} />
              <Route path="/news" exact component={News} />
              //Product
              <Route path={"/products/edit/:id"} component={ProductEdit} />
              <Route path="/products/add" component={ProductAdd} />
              <Route path="/products" exact component={Product} />
              // Websettings
              <Route
                path="/web_settings/banners/add"
                exact
                component={BannerAdd}
              />
              <Route
                path="/web_settings/banners/edit/:id"
                exact
                component={BannerEdit}
              />
              <Route path="/web_settings/banners" exact component={Banner} />
              <Route path="/menus" exact component={Menus} />
              <Route path="/menus/footer" exact component={FooterMenu} />
              <Route path="/web_settings/socials" exact component={Socials} />
              <Route path="/web_settings" exact component={WebSettings} />
              <Route path="/logout" component={Logout} />
              <Redirect to="/" />
            </Switch>
          </CookiesProvider>
        </ConfigProvider>
      ) : (
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Redirect to="/login" />
        </Switch>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tokenError: state.tokenReducer.error,
    role: state.tokenReducer.role,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    checkToken: (token) => dispatch(tokenCheck(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(App);
