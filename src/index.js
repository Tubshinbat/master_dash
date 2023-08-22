import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./Pages/App/";
import reportWebVitals from "./reportWebVitals";

// Reducers
import bannerReducer from "./redux/reducer/bannerReducer";
import contactReducer from "./redux/reducer/contactReducer";
import faqReducer from "./redux/reducer/faqReducer";
import footerMenuReducer from "./redux/reducer/footerMenuReducer";
import galleryReducer from "./redux/reducer/galleryReducer";
import menuReducer from "./redux/reducer/menuReducer";
import newsReducer from "./redux/reducer/newsReducer";
import newsCategoryReducer from "./redux/reducer/newsCategoryReducer";
import pageReducer from "./redux/reducer/pageReducer";
import partnerReducer from "./redux/reducer/partnerReducer";
import serviceReducer from "./redux/reducer/serviceReducer";
import socialLinkReducer from "./redux/reducer/socialLinkReducer";
import tokenReducer from "./redux/reducer/tokenReducer";
import loginReducer from "./redux/reducer/loginReducer";
import userReducer from "./redux/reducer/userReducer";
import webInfoReducer from "./redux/reducer/webinfoReducer";
import memberReducer from "./redux/reducer/memberReducer";
import memberCategoryReducer from "./redux/reducer/memberCategoryReducer";
import memberRateReducer from "./redux/reducer/memberRateReducer";
// styles
import "./index.css";

const loggerMiddlaware = (store) => {
  return (next) => {
    return (action) => {
      // console.log("MyLoggerMiddleware: Dispatching ==> ", action);
      // console.log("MyLoggerMiddleware: State BEFORE : ", store.getState());
      const result = next(action);
      // console.log("MyLoggerMiddleware: State AFTER : ", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  bannerReducer,
  contactReducer,
  faqReducer,
  footerMenuReducer,
  galleryReducer,
  menuReducer,
  newsReducer,
  newsCategoryReducer,
  pageReducer,
  partnerReducer,
  serviceReducer,
  socialLinkReducer,
  tokenReducer,
  loginReducer,
  memberReducer,
  userReducer,
  webInfoReducer,
  memberCategoryReducer,
  memberRateReducer,
});

const middlewares = [loggerMiddlaware, thunk];

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
