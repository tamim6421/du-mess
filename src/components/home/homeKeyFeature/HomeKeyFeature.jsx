import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Style from "./homeKeyFeature.module.css";

const HomeKeyFeature = () => {
  return (
    <>
      <Container>
        <Row className={Style.keyFeature}>
          <Col md={6} className="mb-3">
            <img className={`${Style.img} img-fluid`} src="/pic2.jpeg" alt="" />
          </Col>
          <Col md={6}>
            <h3 className={Style.title}>OUR KEY FEATURES</h3>
            <ul>
              <li>Your Hostel, Your Rules, Our Software</li>
              <li>Experience the Next Level of Hostel Management</li>
              <li>Effortless Management, Seamless Experience</li>
              <li>Simplify, Manage, Thrive!</li>
              <li>From Meals to Resignation, Everything in One Place</li>
              <li> Meal Management, Resignation, and Beyond</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeKeyFeature;
