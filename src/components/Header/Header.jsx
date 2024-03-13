import { Container, Logo, LogoutBtn } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Import useState

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false); // State for menu visibility

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <header className="navbar relative flex items-center bg-blue-300 justify-between py-4 z-2">
      <Container className="w-full">
        <nav className="flex items-center justify-between">
        <div><Logo/></div>
          <div className="menu">
            <button
              className="menuBtn lg:hidden"
              onClick={toggleMenu}
            >
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6 mb-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
            <ul className={`menuItems rounded-lg z-20 lg:flex flex-col p-2  lg:flex-row bg-red-300 gap-4 lg:bg-transparent absolute lg:relative right-4 ml-5 lg:mt-0 ${isMenuOpen ? 'block' : 'hidden'}`}>
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          setMenuOpen(false); // Close menu on click
                          navigate(item.slug);
                        }}
                        className="text-lg font-medium text-white transition-colors duration-200"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
