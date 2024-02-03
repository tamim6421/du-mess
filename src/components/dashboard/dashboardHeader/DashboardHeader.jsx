/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import Style from "./dashboardHeader.module.css";
import Link from "next/link";
import { baseImgUrl } from "@/utils/imgUrl";
import { BiSolidEditLocation } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "@/utils/api";

const DashboardHeader = ({ open, setOpen }) => {
  const [itemValue, setItemValue] = useState(null);
  const [hallInfo, setHallInfo] = useState({})
  const router = useRouter();

  const handleControlSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const cookieValue = Cookies.get("TOKEN_LOGIN");

    axios
      .get(BASE_URL + "/profile_view", {
        headers: {
          // Set your cookie in the request headers
          TOKEN_MEMBER: cookieValue,
        },
      })
      .then((response) => {
        setItemValue(response?.data?.data);
      });
  }, []);


    // Get the hall_info cookie
    useEffect(() => {
      // Get the hall_info cookie
      const hallInfoCookie = Cookies.get("hall_info");
  
      // Check if the cookie exists
      if (hallInfoCookie) {
        const parsedHallInfo = JSON.parse(hallInfoCookie);
        // console.log("University:", parsedHallInfo.university);
        // console.log("Hall:", parsedHallInfo.hall);
        setHallInfo(parsedHallInfo);
      } else {
        console.log("hall_info cookie not found");
      }
    }, []); // Empty dependency array ensures that this effect runs once after the initial render
  
    // console.log(hallInfo);
    // console.log(hallInfo.hall.split(' '))


  // Logout button
  const handleLogout = () => {
    Cookies.remove("TOKEN_LOGIN");
    // localStorage.removeItem("user-info");

    Cookies.remove("hall_info");
    router.push("/");
  };

  // console.log(itemValue)


  return (
    <div className={`${Style.dashboardHeader} pt-2`}>
      <div className="d-flex justify-content-between">
        <div>
          <div className="d-flex d-block">
            <button
              className={`${Style.barIcon} btn px-1 py-0 open-btn ms-4`}
              onClick={handleControlSidebar}
            >
              <FaBars className="fs-4" />
            </button>
            <Link href="/" className="text-decoration-none text-black">
              <span className="ps-3 fs-4 fw-bold text-uppercase d-none d-sm-block" style={{color:"#3d6e99"}}>{hallInfo.hall}</span>
            </Link>
          </div>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className={Style.dropdown} style={{margin: 0, padding: 0, background: 'transparent',  border: 'none'}}>
              {
                itemValue?.profile_image !== null ? (
                  <img
                src={baseImgUrl + itemValue?.profile_image}
                className={Style.dropdownImg}
                alt=""
              />
                ) : (
                  <img
                src="https://i.ibb.co/D8yhMLX/456322.webp"
                className={Style.dropdownImg}
                alt="profile"
              />
                )
              }

              {/* {
                itemValue !== null ? (
                  <img
                src={baseImgUrl + itemValue?.profile_image}
                className={Style.dropdownImg}
                alt=""
              />
                ) : (
                  <img
                src="https://i.ibb.co/D8yhMLX/456322.webp"
                className={Style.dropdownImg}
                alt="profile"
              />
                )
              } */}
              
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link href="/dashboard/profile" className="text-decoration-none text-black d-flex align-items-center"><CgProfile className="me-1" /> Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/dashboard/updateInfo" className="text-decoration-none text-black d-flex align-items-center"><BiSolidEditLocation className="me-1" /> Update Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/dashboard/changePassword" className="text-decoration-none text-black d-flex align-items-center"><RiLockPasswordFill className="me-1" /> Change Password</Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>
              <span className="d-flex align-items-center"><FiLogOut className="me-1" /> Log out</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
