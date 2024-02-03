/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Style from "@/styles/dashboard/changePassword.module.css";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Password hide and show
  const showHideOldPassword = () => {
    setIsOldPasswordVisible(!isOldPasswordVisible);
  };
  const showHideNewPassword = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };
  const showHideConfirmPassword = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleLoginSubmit = async (data) => {
    setLoadingBtn(true);
    const url = BASE_URL + "/password_update";
    const cookieValue = Cookies.get("TOKEN_LOGIN");
    try {
      const newData = {
        old_password: data.oldPassword,
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      };
      const response = await axios.post(url, newData, {
        headers: {
            TOKEN_MEMBER: cookieValue,
        },
      });

      if (response.status === 200) {
        if (response.data.status === 200) {
          toast.success(response.data.message);
          setPasswordErrors({});
          setLoadingBtn(false);
          router.push("/dashboard");
        } else if (response.data.status === 500) {
          toast.error(response.data.message);
          setLoadingBtn(false);
          router.push("/login");
        } else if (
          response.data.status === 400 ||
          response.data.status === 600
        ) {
          toast.error(response.data.message);
          setLoadingBtn(false);
        } else if (response.data.status === 700) {
          setPasswordErrors(response.data.message);
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
        <title>DASHBOARD::Change Password</title>
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
                <div className="d-flex mb-5 mt-4" style={{ width: "100%" }}>
                  <Col lg={5} md={7} sm={7}>
                    <div
                      style={{
                        background: "#fff",
                        padding: "50px 50px",
                        borderRadius: "20px",
                      }}
                    >
                      {/* Form header and login Form data */}
                      {/* Title */}
                      <div className="headerTitle mt-0 mb-3">
                        <h3
                         className="fs-4 fw-bold " style={{color:"#58818a"}}
                        >
                          Change Password
                        </h3>
                      </div>
                      <Form onSubmit={handleSubmit(handleLoginSubmit)}>
                        <Form.Group className="mb-3" controlId="formEmail">
                          <div className={Style.passwordField}>
                            <Form.Control
                              type={isOldPasswordVisible ? "text" : "password"}
                              className={`${Style.inputField} remove-focus`}
                              {...register("oldPassword", { required: true })}
                              placeholder="Old Password"
                            />
                            {isOldPasswordVisible ? (
                              <span className={Style.passwordIconDiv}>
                                <AiOutlineEye
                                  className={Style.passwordIcon}
                                  onClick={showHideOldPassword}
                                />
                              </span>
                            ) : (
                              <span className={Style.passwordIconDiv}>
                                <AiOutlineEyeInvisible
                                  className={Style.passwordIcon}
                                  onClick={showHideOldPassword}
                                />
                              </span>
                            )}
                          </div>
                          {errors.oldPassword && (
                            <span className="text-danger">
                              Old Password is required
                            </span>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                          <div className={Style.passwordField}>
                            <Form.Control
                              type={isNewPasswordVisible ? "text" : "password"}
                              className={`${Style.inputField} remove-focus`}
                              {...register("newPassword", {
                                required: true,
                              })}
                              placeholder="New Password"
                            />
                            {isNewPasswordVisible ? (
                              <span className={Style.passwordIconDiv}>
                                <AiOutlineEye
                                  className={Style.passwordIcon}
                                  onClick={showHideNewPassword}
                                />
                              </span>
                            ) : (
                              <span className={Style.passwordIconDiv}>
                                <AiOutlineEyeInvisible
                                  className={Style.passwordIcon}
                                  onClick={showHideNewPassword}
                                />
                              </span>
                            )}
                          </div>
                          {errors.newPassword && (
                            <span className="text-danger">
                              New Password is required
                            </span>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                          <div className={Style.passwordField}>
                            <Form.Control
                              type={
                                isConfirmPasswordVisible ? "text" : "password"
                              }
                              className={`${Style.inputField} remove-focus`}
                              {...register("confirmPassword", {
                                required: true,
                              })}
                              placeholder="Confirm Password"
                            />
                            {isConfirmPasswordVisible ? (
                              <span className={Style.passwordIconDiv}>
                                <AiOutlineEye
                                  className={Style.passwordIcon}
                                  onClick={showHideConfirmPassword}
                                />
                              </span>
                            ) : (
                              <span className={Style.passwordIconDiv}>
                                <AiOutlineEyeInvisible
                                  className={Style.passwordIcon}
                                  onClick={showHideConfirmPassword}
                                />
                              </span>
                            )}
                          </div>
                          {errors.confirmPassword && (
                            <span className="text-danger">
                              Confirm password is required
                            </span>
                          )}
                        </Form.Group>

                        {/* Error Message  */}
                        {passwordErrors && (
                          <>
                            <ul>
                              {Object.entries(passwordErrors).map(
                                ([key, value], index) => (
                                  <li key={index}>
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
                                  </li>
                                )
                              )}
                            </ul>
                          </>
                        )}

                        {/* Submit Button */}
                        {loadingBtn ? (
                          <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit" disabled>
                              Loading...
                            </Button>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-center">
                            <Button variant="success" type="submit">
                              Change Password
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
