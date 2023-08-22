import base from "../../base";

const Header = () => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav ml-2">
        <li className="nav-item">
          <div className="nav-link" data-widget="pushmenu" role="button">
            <i className="fas fa-bars" />
          </div>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/" className="nav-link">
            Хянах самбар
          </a>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto mr-4">
        {/* Navbar Search */}
        <li className="nav-item">
          <a className="nav-link" href={base.siteUrl}>
            <i className="fas fa-link" /> Сайтыг үзэх
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
