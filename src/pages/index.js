/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Style from "@/styles/Home.module.css";
import Image from "next/image";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Link from "next/link";
import { useForm } from "react-hook-form";
// import Style from "@/styles/login.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import TopTitle from "@/components/topTitle/TopTitle";

export default function Home() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Password hide and show
  const showHidePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

   // Login form
   const url = BASE_URL + "/member/login";
   const handleLoginSubmit = async (data) => {
    setLoadingBtn(true);
    try {
      const newData = {
        phone: data.phone,
        password: data.password,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(url, newData, { headers });
      console.log(response.data)
      if (response.status === 200) {
        if (response.data.status === 200) {
          Cookies.set("TOKEN_LOGIN", response.data.TOKEN_MEMBER, { expires: 2 });
          const hallInfoString = JSON.stringify(response.data.hall_info);
          console.log(hallInfoString)
          Cookies.set("hall_info", hallInfoString);
         

          toast.success("Login Successful");
          setLoadingBtn(false);
          router.push("/dashboard");
          
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
        <title>AMADER HOSTEL</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${Style.home}`}>
        {/* <HomeBanner />
        <HomeKeyFeature /> */}

<Container>
          <Row>
            <div
              className="d-flex justify-content-center mb-5 mt-5 min-vh-100"
              style={{ width: "100%" }}
            >
              <Col lg={4} md={7} sm={7}>
                <div className={Style.loginContainer}
                  
                >
                  {/* Form header and login Form data */}
                  {/* Title */}
                  {/* <TopTitle title="Login" /> */}
                  <Form onSubmit={handleSubmit(handleLoginSubmit)}>
                    <p className="text-center fs-4" style={{color:"#083e94"}}>Login</p>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Control
                        type="text"
                        className={`${Style.inputField} remove-focus`}
                        {...register("phone", { required: true })}
                        placeholder="Phone Number"
                      />
                      {errors.phone && (
                        <span className="text-danger">Phone is required</span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <div className={Style.passwordField}>
                        <Form.Control
                          type={isPasswordVisible ? "text" : "password"}
                          className={`${Style.inputField} remove-focus`}
                          {...register("password", {
                            required: true,
                          })}
                          placeholder="Password"
                        />
                        {isPasswordVisible ? (
                          <span className={Style.passwordIconDiv}>
                            <AiOutlineEye
                              className={Style.passwordIcon}
                              onClick={showHidePassword}
                            />
                          </span>
                        ) : (
                          <span className={Style.passwordIconDiv}>
                            <AiOutlineEyeInvisible
                              className={Style.passwordIcon}
                              onClick={showHidePassword}
                            />
                          </span>
                        )}
                      </div>
                      {errors.password && (
                        <span className="text-danger">
                          Password Must be atleast 6 characters
                        </span>
                      )}
                    </Form.Group>
                    <Link href="/forgottenPassword">
                      <p>Forgotten Password?</p>
                    </Link>

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
                        className={Style.btn}
                        type="submit"
                        style={{ width: "100%" }}
                      >
                        Sign In
                      </Button>
                    )}
                  </Form>
                  <p className="text-center mt-3">
                    Don&apos;t have an account?{" "}
                    <Link href="/selectHall">Application Now</Link>
                  </p>
                </div>
              </Col>
            </div>
          </Row>
        </Container>

      </main>
    </>
  );
}
