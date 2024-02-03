/* eslint-disable react/jsx-no-duplicate-props */
import Head from "next/head";
import Image from "next/image";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Style from "@/styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function RecoverPassword() {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRecoveryPassword = async (data) => {
    try {
      setLoadingBtn(true);
      const cookieValue = Cookies.get("TOKEN_FORGET");

      const newData = {
        new_password: data?.newPassword,
        confirm_password: data?.confirmPassword,
      };

      const response = await axios({
        method: "post",
        url: BASE_URL + `/confirm_password`,
        data: newData,
        headers: {
          // Set your cookie in the request headers
          TOKEN_FORGET: cookieValue,
        },
      });
      
      if (response.status === 200) {
        if (response.data.status === 200) {
          setLoadingBtn(false);
          toast.success(response.data.message);
          router.push('/');
        } else if (response.data.status === 300 || response.data.status === 600) {
          setLoadingBtn(false);
          toast.success(response.data.message);
        }
         else if (response.data.status === 500) {
          setLoadingBtn(false);
          toast.error(response.data.message);
          router.push("/");
        } else if (response.data.status === 700) {
          setValidationErrors(response.data.message);
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
        <title>LOGIN::</title>
        <meta name="description" content="{data?.admin?.nameen}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main style={{ background: "#EDF0F2" }}>
        <Container>
          <Row>
            <div
              className="d-flex justify-content-center mb-5 mt-4"
              style={{ width: "100%" }}
            >
              <Col lg={4} md={7} sm={7}>
                <div
                  style={{
                    background: "#fff",
                    padding: "50px 50px",
                    borderRadius: "20px",
                    marginTop: '40px'
                  }}
                >
                  {/* Form header and login Form data */}
                  <Form onSubmit={handleSubmit(handleRecoveryPassword)}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Control
                        type="password"
                        className={`${Style.inputField} remove-focus`}
                        placeholder="Enter New Password"
                        {...register("newPassword", { required: true })}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Control
                        type="password"
                        className={`${Style.inputField} remove-focus`}
                        placeholder="Confirm Password"
                        {...register("confirmPassword", { required: true })}
                      />
                    </Form.Group>

                    {/* Error Message  */}
                    {validationErrors && (
                      <>
                        <ul>
                          {Object.entries(validationErrors).map(
                            ([key, value], index) => (
                              <span key={index}>
                                {Array.isArray(value) ? ( // Check if the property is an array
                                  <ul>
                                    {value.map((item, itemIndex) => (
                                      <li
                                        className="text-danger"
                                        key={itemIndex}
                                      >
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  value // Render as is for non-array properties
                                )}
                              </span>
                            )
                          )}
                        </ul>
                      </>
                    )}

                    {/* Submit Button */}
                    {loadingBtn ? (
                      <Button
                        variant="primary"
                        type="submit"
                        style={{ width: "100%" }}
                        disabled
                      >
                        Loading...
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        type="submit"
                        style={{ width: "100%" }}
                      >
                        Submit
                      </Button>
                    )}
                  </Form>
                </div>
              </Col>
            </div>
          </Row>
        </Container>
      </main>
    </>
  );
}
