/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Style from "./homeBanner.module.css";

const HomeBanner = () => {
  return (
    <div className={Style.banner}>
      <Container>
        <Row className="mb-5">
          <Col md={6} className="d-flex mb-3">
            <div className="d-flex flex-column justify-content-center pe-5">
              <h3 className={Style.title}>AMADER HOSTEL</h3>
              <h5 className={Style.title2}>Online Hostel Management System</h5>
              <p className={Style.des}>
                All-In-One Hostel Management System To Manage Your Hostel In The
                Cloud
              </p>
              <Link href="/selectHall">
                <Button className={Style.button}>Application</Button>
              </Link>
            </div>
          </Col>
          <Col md={6}>
            <img className={`${Style.img} img-fluid`} src="/pic.jpeg" alt="" />
          </Col>
        </Row>
      </Container>
      <img src="/bg_1.png" alt="" className={Style.styleImg} />
    </div>
  );
};

export default HomeBanner;
