/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import useFetch from "@/hooks/useFetch";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Style from "@/styles/dashboard/payment.module.css";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import TopTitle from "@/components/topTitle/TopTitle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "@/utils/api";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function Payment() {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const url = BASE_URL + "/member_feedback/Feedback";
  const cookieValue = Cookies.get("TOKEN_LOGIN");
  const handleFeedbackSubmit = async (data) => {
    console.log(data);
    try{
      setLoadingBtn(true);
      const newData = {
        subject: data.subject,
        text: data.message,
      };
      const response = await axios.post(url, newData, {
        headers: {
          TOKEN_MEMBER: cookieValue,
        }});
        if (response.status === 200) {
          if (response.data.status === 200) {
            toast.success(response.data.message);
            setLoadingBtn(false);
            reset();
          } else if (response.data.status === 500) {
            toast.error(response.data.message);
            setLoadingBtn(false);
            router.push("/");
          } else if (
            response.data.status === 400 ||
            response.data.status === 600 
          ) {
            toast.error(response.data.message);
            setLoadingBtn(false);
          } else if (response.data.status === 700) {
            toast.error("Something went wrong");
            setLoadingBtn(false);
          } else {
            toast.error("Something went wrong");
            setLoadingBtn(false);
          }
        }
    }catch (err) {
      console.log(err);
      setLoadingBtn(false);
    }
  }

  return (
    <>
      <Head>
        <title>DASHBOARD::Payment</title>
        <meta name="description" content="Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        <>
          <div className={`${Style.mainContainer} d-flex`}>
            {/* Dashboard Left Side and Header */}
            <DashboardLeftSide />

            {/* Main Content */}
            <div className={`${Style.content} px-4`}>
              
              <Row>
                <div className="d-flex mb-5 mt-0" style={{ width: "100%" }}>
                  <Col lg={5} md={7} sm={7}>
                    <div
                      style={{
                        background: "#fff",
                        padding: "25px 50px",
                        borderRadius: "20px",
                        marginTop: '40px'
                      }}
                    >
                      {/* <TopTitle title="Feedback Message" textAlign="left" /> */}
                      {/* Form header and login Form data */}
                      {/* Title */}
                      <Form onSubmit={handleSubmit(handleFeedbackSubmit)}>
                        <p className="fs-4 fw-bold " style={{color:"#58818a"}}>
                        Feedback Message
                        </p>
                        <Form.Group className="mb-3" controlId="formEmail">
                          <Form.Label className={Style.inputLabel}>
                            Subject
                          </Form.Label>
                          <div className={Style.textField}>
                            <Form.Control
                              type="text"
                              className={`${Style.inputField} remove-focus`}
                              {...register("subject", { required: true })}
                              placeholder="Enter your subject"
                            />
                            {errors.subject && (
                        <span className="text-danger">Subject is required</span>
                      )}
                          </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                          <div className={Style.textField}>
                          <Form.Label className={Style.inputLabel}>
                            Message
                          </Form.Label>
                            <Form.Control
                              as="textarea"
                              className={`${Style.inputField} remove-focus`}
                              {...register("message", { required: true })}
                              placeholder="Leave a comment here"
                              style={{ height: "100px" }}
                            />
                            {errors.message && (
                        <span className="text-danger">Message is required</span>
                      )}
                          </div>
                        </Form.Group>

                        {/* Submit Button */}
                        {loadingBtn ? (
                          <div className="d-flex justify-content-center">
                            <Button style={{backgroundColor: "#29cc04", border:"none"}} variant="primary" type="submit" disabled>
                              Loading...
                            </Button>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-center">
                            <Button style={{backgroundColor: "#29cc04", border: "none"}} variant="success" type="submit">
                              Submit
                            </Button>
                          </div>
                        )}
                      </Form>
                    </div>
                  </Col>
                </div>
              </Row>
            </div>
          </div>
        </>
      </main>
    </>
  );
}
