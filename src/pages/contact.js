/* eslint-disable react/jsx-no-duplicate-props */
import Head from "next/head";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Style from "@/styles/contact.module.css";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import { BsFillEnvelopeFill, BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

export default function Login() {
  const [loadingBtn, setLoadingBtn] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Login form
  const url = BASE_URL + "/contact_form";
  const handleContactSubmit = async (data) => {
    console.log(data);
    setLoadingBtn(true);
    try {
      const newData = {
        subject: data.phone,
        text: data.hostelName,
        text1: data.ownerName,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(url, newData, { headers });
      console.log(response);
      if (response.status === 200) {
        if (response.data.status === 200) {
          toast.success("Send Successful");
          setLoadingBtn(false);
          reset();
        } else if (
          response.data.status === 700 ||
          response.data.status === 300 ||
          response.data.status === 400 ||
          response.data.status === 500 ||
          response.data.status === 600 ||
          response.data.status === 800 ||
          response.data.status === 900
        ) {
          toast.error(response.data.message);
          setLoadingBtn(false);
        } else {
          toast.error("Something went wrong");
          setLoadingBtn(false);
        }
      }
    } catch (err) {
      console.log(err);
      setLoadingBtn(false);
    }
  };

  return (
    <>
      <Head>
        <title>CONTACT | AMADER HOSTEL</title>
        <meta name="description" content="{data?.admin?.nameen}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main className={Style.contact}>
        <div className="py-5">
          <Container>
            <Row>
              {/* Contact page left side Email, contact and others */}
              <Col md={6} sm={12}>
                <div className="mb-4">
                  <h2
                    className="fs-2 mb-3"
                    style={{ fontFamily: "Merriweather", color:"#43929c "}}
                  >
                    Have any Questions?
                  </h2>
                </div>

                <div>
                  <div className="d-flex align-items-center mb-2">
                    <div className="fs-1 "  style={{ color:"#43929c "}} >
                      <BsFillEnvelopeFill />
                    </div>
                    <div className="ms-3">
                      <h4
                        className="fs-5 fw-bold mt-3"
                        style={{ fontFamily: "Lato", color: "#707e80"  }}
                      >
                        Email Us
                      </h4>
                      <p>ancovasoft@gmail.com</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <div className="fs-1 " style={{ color:"#43929c "}}>
                      <BsFillTelephoneFill />
                    </div>
                    <div className="ms-3">
                      <h4
                        className="fs-5 fw-bold mt-3"
                        style={{ fontFamily: "Lato", color: "#707e80"  }}
                      >
                        Contact Us
                      </h4>
                      <p>01750-360044</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="fs-1 " style={{ color:"#43929c "}}>
                      <FaLocationDot />
                    </div>
                    <div className="ms-3">
                      <h4
                        className="fs-5 fw-bold mt-3"
                        style={{ fontFamily: "Lato", color: "#707e80"  }}
                      >
                        Office Location
                      </h4>
                      <p>West tejturi para farmget Dhaka.</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6} sm={12}>
                {/* Contact form are here */}
                <div
                  className="px-5 py-5"
                  style={{ background: "#ffffff", borderRadius: "15px" }}
                >
                  <Form onSubmit={handleSubmit(handleContactSubmit)}>
                    <div className="contactName">
                      <Form.Group
                        className="contactInnerName mb-3 mr-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Control
                          className={Style.inputField}
                          size="sm"
                          type="text"
                          {...register("phone", { required: true })}
                          placeholder="Phone Number"
                        />
                        {errors.phone && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                      </Form.Group>
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        className={Style.inputField}
                        size="sm"
                        type="text"
                        {...register("hostelName", { required: true })}
                        placeholder="Hostel / Mess Name"
                      />
                      {errors.hostelName && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        className={Style.inputField}
                        size="sm"
                        type="text"
                        {...register("ownerName", { required: true })}
                        placeholder="Hostel / Mess Owner Name"
                      />
                      {errors.ownerName && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                      {loadingBtn ? (
                        <Button
                          size="sm"
                          variant="primary"
                          className="px-4 py-2"
                          disabled
                        >
                          Processing...
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="primary"
                          type="submit"
                          className="px-4 py-2"
                          style={{backgroundColor: "#01d65a", border: "none"}}
                        >
                          Submit
                        </Button>
                      )}
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    </>
  );
}
