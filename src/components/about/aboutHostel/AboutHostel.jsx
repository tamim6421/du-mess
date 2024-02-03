/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Style from "./aboutHostel.module.css";

const AboutHostel = () => {
  return (
    <div className={Style.banner}>
      <Container>
        <Row className="mb-5">
          <Col md={6}>
            <img className={`${Style.img} img-fluid mb-3`} src="/about.png" alt="" />
          </Col>
          <Col md={6} className="d-flex mb-3">
            <div className="d-flex flex-column justify-content-center pe-5">
              {/* <h3 className={Style.title}>AMADER HOSTEL</h3> */}
              <h5 className={Style.title2}>
                Learn about Our Journey to Create the <span className={Style.titleName}>AMADER HOSTEL</span>
              </h5>
              <p className={Style.des}>
                Starting operations in 2009 by operating in small vacation homes
                and hotels, we have carried out a rigorous study of the property
                industry and come up with an ever-growing body of solutions –
                the Booking Ninjas PMS application, under a partnership with
                Salesforce.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      {/* <img src="/bg_1.png" alt="" className={Style.styleImg} /> */}
    </div>
  );
};

export default AboutHostel;
