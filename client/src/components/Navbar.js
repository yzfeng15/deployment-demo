import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
const { Header } = Layout;

function Navbar(props) {
  const { activeUser, activePage, changePage } = props;

  return (
    <Header>
      <div className="logo">
        <a href="/">Deployed App</a>
      </div>
      <Menu
        onClick={(e) => {
          changePage(e.key);
        }}
        selectedKeys={[activePage]}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        {activeUser ? (
          <>
            <Menu.Item key="profile">
              <Link to="/user">Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login">
              <Link to="/login">Log In</Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register">Register</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
}

export default Navbar;
