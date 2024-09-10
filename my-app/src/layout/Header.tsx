import { useEffect, useState } from 'react';
import Button from '../component/reusable/button/button';
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
// import { useAuth } from '../hooks/use-auth';

const NavItems = [
  {
    title: "Home",
    path: "/"
  },
  {
    title: "Products",
    path: "/Products"
  },
  {
    title: "Pricing",
    path: "/Pricing"
  },
  {
    title: "Contact",
    path: "/Contact"
  },

  {
    title: "Post",
    path: "/Post"
  },


]

const Header = () => {

  const { accessToken, role } = useAuth();

  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (location.pathname === "/signin") {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [location.pathname])

  return (

    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">E-Commerce</span>
        </Link>
        <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {
              NavItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className={` ${item.path === location.pathname ? "text-blue-700" : "text-black"} block py-2 px-3 rounded md:bg-transparent md:p-0`}
                    aria-current="page">
                    {item.title}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
        <div className='flex gap-2 items-center'>

          {
            !accessToken ?
              <>
            
                <Link to="/signin">
                  <Button
                    buttonType={"button"}
                    buttonColor={isLogin ? { primary: true } : { outline: true }}
                    rounded
                  >
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    buttonType={"button"}
                    buttonColor={!isLogin ? { primary: true } : { outline: true }}
                    rounded
                  >
                    Register
                  </Button>
                </Link>
              </> :
              <Link to={`${role && role === "admin"? "/dashboard" : "/user-dashboard"}`}>
                <Button
                  buttonType={"button"}
                  buttonColor={{ secondary: true }}
                  rounded
                >
                  Dashboard
                </Button>
              </Link>
          }

        </div>
      </div>
    </nav>

  )
}

export default Header