import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillDashboard } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";
import Style from "./dashboardLeftSide.module.css";
import DashboardHeader from "../dashboardHeader/DashboardHeader";
import { useRouter } from "next/router";
import { MdFeedback } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";

const DashboardLeftSide = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("");
  const [open, setOpen] = useState(false);

  // Collect path name and show the active button
  useEffect(() => {
    const { pathname } = router;
    setActiveItem(pathname);
  }, [router]);

  const handleLogout = () => {
    // Cookies.remove("TOKEN_LOGIN");
    localStorage.removeItem("user-info");
    router.push("/");
  };

  return (
    <>
      {/* Dashboard Header */}
      <DashboardHeader open={open} setOpen={setOpen} />

      {/* Dashboard Left Side bar */}
      <div
        className={`${Style.sidebar} ${open ? Style.active : null}`}
        id="side_nav"
      >
        <ul className="list-unstyled px-2 mt-3">
          <li className="border rounded" style={{backgroundColor:"#f2faf3"}}>
            <Link
              href="/dashboard"
              className={`${Style.link} ${
                activeItem === "/dashboard" ? Style.active : ""
              } text-decoration-none px-3 py-2 d-block d-flex align-items-center`}
            >
              <AiFillDashboard className="me-1" /> Dashboard
            </Link>
          </li>
          <li className="border rounded" style={{backgroundColor:"#f2faf3"}}>
            <Link
              href="/dashboard/payment"
              className={`${Style.link} ${
                activeItem === "/dashboard/payment" ? Style.active : ""
              } text-decoration-none px-3 py-2 d-block d-flex align-items-center`}
            >
              <FaMoneyCheck className="me-1" /> Payment
            </Link>
          </li>
          <li className="border rounded" style={{backgroundColor:"#f2faf3"}}>
            <Link
              href="/dashboard/feedback"
              className={`${Style.link} ${
                activeItem === "/dashboard/feedback" ? Style.active : ""
              } text-decoration-none px-3 py-2 d-block d-flex align-items-center`}
            >
              <MdFeedback className="me-1" /> Feedback
            </Link>
          </li>

          <li className="border rounded" style={{backgroundColor:"#f2faf3"}}>
            <Link
              href="/dashboard/resign"
              className={`${Style.link} ${
                activeItem === "/dashboard/resign" ? Style.active : ""
              } text-decoration-none px-3 py-2 d-block d-flex align-items-center`}
            >
              <AiOutlineLogout className="me-1" /> Resign Member
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashboardLeftSide;
