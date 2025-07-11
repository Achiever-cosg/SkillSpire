import { useEffect, useRef, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/logo-full-light-main.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown" 

import {ImCross} from "react-icons/im"

import SmallScreenNavbar from "./SmallScreenNavbar"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  // const windowWidth = useRef(window.innerWidth);
  // console.log("--------window-width----", windowWidth);
  // const [smallScreen, setSmallScreen] = useState(false);
  const [isClose, setIsClose] = useState(false);


  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const handleCrossButton = () => { 
    isClose = isClose ? setIsClose(false) : setIsClose(true);  
    // smallScreen = smallScreen ? setSmallScreen(false) : setSmallScreen(true);
  }
  

  return (
    <div
    className={`flex h-14 items-center justify-center border-b-[1px]
      border-b-richblack-700
       ${ location.pathname !== "/" ? "bg-richblack-800" : "" }
       ${ location.pathname === "/" ?
          "fixed w-screen z-[1000]  bg-richblack-900" : "" }
        ${ location.pathname === "/about" ?
        "fixed w-screen z-[1000]  bg-richblack-700" : "" }  
        ${
      location.pathname === "/contact" || matchRoute("/catalog/:catalogName")
                                      ||  matchRoute("/courses/:couseId") ?
            "fixed w-screen z-[1000]  bg-richblack-800" : "" }
         transition-all duration-200`}
  >
    <div className= {`flex fixed ${
      location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"
      } z-40 lg:relative  w-[100%] h-[8%] border-b-[1px] lg:border-none border-b-richblack-500  lg:w-11/12 
        max-w-maxContent items-center justify-between`}>
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
      </Link>
      {/* Navigation links */}
      <nav className="hidden md:block">
        <ul className="flex gap-x-6 text-richblack-25">
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === "Catalog" ? (
                <>
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] 
                      translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4
                      text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible 
                      group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%]
                          translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center spinner">Loading...</p>
                      ) : (subLinks && subLinks.length) ? (
                        <>
                          {subLinks
                            ?.filter(
                              (subLink) => subLink?.courses?.length > 0
                            )
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Course Found</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <Link to={link?.path}>
                  <p
                    className={`${
                      matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    {link.title}
                  </p>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {/* Login / Signup / Dashboard */}
      <div className="hidden items-center gap-x-4 md:flex">
        {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
          <Link to="/dashboard/cart" className="relative">
            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
            {totalItems > 0 && (
              <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                {totalItems}
              </span>
            )}
          </Link>
        )}
        {token === null && (
          <Link to="/login">
            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
              Log in
            </button>
          </Link>
        )}
        {token === null && (
          <Link to="/signup">
            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
              Sign up
            </button>
          </Link>
        )}
        {token !== null && <ProfileDropdown />}
      </div>

      {/* <button 
        onClick={() => (setSmallScreen(true))}
        className="mr-4 md:hidden">
        <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
      </button> */} 
      {
        isClose === false ? (
          <button className="mr-4 md:hidden"
            onClick={handleCrossButton}>
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          </button>
        ) :
        (
          <button className="mr-4 md:hidden"
          onClick={handleCrossButton}>
            <ImCross fontSize={24} fill="#AFB2BF" />
          </button>
        )
      }
      {
        isClose && <SmallScreenNavbar 
                      isClose={isClose}
                      // setIsClose={setIsClose}
                      handleCrossButton={handleCrossButton} />
      }
    </div>
    </div>

  )
}

export default Navbar
