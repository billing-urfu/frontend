import "./header.scss";
import "./header-media.scss";

function Header() {
  return (
    <div className="wrapperHeader">
      <header>
        <div className="title">
          <img
            className="Alphalogo"
            width={46}
            height={46}
            src="/image/Alpha_logo_red_white.svg"
          />
        </div>
        <div className="user-profile">
          <span>Имя</span>
          <img className="user" width={40} height={40} src="/image/user1.svg" />
        </div>
      </header>
    </div>
  );
}

export default Header;
