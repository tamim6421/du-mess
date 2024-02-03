/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Style from "./headerMenu.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const HeaderMenu = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [cookies, setCookies] = useState(null);

  useEffect(() => {
    const storedCookies = Cookies.get("TOKEN_LOGIN");
    setCookies(storedCookies);
  }, []);

  // Collect path name and show the active button
  useEffect(() => {
    const { pathname } = router;
    setActiveItem(pathname);
  }, [router]);

  return (
    <Navbar collapseOnSelect sticky="top" expand="lg" className={Style.navbar}>
      <Container>
        <Navbar.Brand className={Style.menuBrand}>
          <Link href="/">
            <img
              className={Style.logo}
              src="/DU-mess.png"
              alt=""
              onClick={() => setExpanded(false)}
            />

           
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav" in={expanded}>
          <Nav
            className={`${Style.nav} ms-auto justify-content-end d-flex menu-right p-0`}
          >
            {/* Home Link */}
            <Nav>
              <Link
                href="/"
                onClick={() => setExpanded(false)}
                className={`${activeItem === "/" ? Style.active : ""} ${
                  Style.link
                }`}
              >
                Home
              </Link>
            </Nav>
            {/* <Nav>
              <Link
                href="/about"
                onClick={() => setExpanded(false)}
                className={`${activeItem === "/about" ? Style.active : ""} ${
                  Style.link
                }`}
              >
                About Us
              </Link>
            </Nav> */}
            {/* <Nav>
              <Link
                href="/contact"
                onClick={() => setExpanded(false)}
                className={`${activeItem === "/contact" ? Style.active : ""} ${
                  Style.link
                }`}
              >
                Contact Us
              </Link>
            </Nav> */}
            {cookies ? (
              <Nav>
                <Link
                  href="/dashboard"
                  onClick={() => setExpanded(false)}
                  className={`${
                    activeItem === "/dashboard" ? Style.active : ""
                  } ${Style.link}`}
                >
                  Dashboard
                </Link>
              </Nav>
            ) : (
              <>
                {/* <Nav>
                  <Link
                    href="/login"
                    onClick={() => setExpanded(false)}
                    className={`${
                      activeItem === "/login" ? Style.active : ""
                    } ${Style.link}`}
                  >
                    Login
                  </Link>
                </Nav> */}
                <Nav>
                  <Link
                    href="/selectHall"
                    onClick={() => setExpanded(false)}
                    className={`${
                      activeItem === "/selectHall" ? Style.active : ""
                    } ${Style.link}`}
                  >
                    Application
                  </Link>
                </Nav>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderMenu;
