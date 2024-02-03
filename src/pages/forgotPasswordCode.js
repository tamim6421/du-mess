import Head from "next/head";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Style from "@/styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function ForgotPasswordCode() {
  const [loadingBtn, setLoadingBtn] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRecoveryCode = (data) => {
    try {
      const cookieValue = Cookies.get("TOKEN_FORGET");

      setLoadingBtn(true);

      axios
        .get(BASE_URL + `/forget_code/${data.code}`, {
          headers: {
            // Set your cookie in the request headers
            TOKEN_FORGET: cookieValue,
          },
        })
        .then((response) => {

          if (response.status === 200) {
            if (response.data.status === 200) {
              setLoadingBtn(false);
              toast.success(response.data.message);
              router.push(`/recoverPassword/${data.code}`);
            } else if (
              response.data.status === 300 ||
              response.data.status === 400 ||
              response.data.status === 600 
            ) {
              toast.error(response.data.message);
              setLoadingBtn(false);
            }
             else if (
              response.data.status === 500 
            ) {
              toast.error(response.data.message);
              setLoadingBtn(false);
              router.push('/login')
            } else {
              toast.error("Something went wrong");
              setLoadingBtn(false);
            }
          }
          else if (response.status === 404){
            toast.error("Something went wrong");
              setLoadingBtn(false);
          }
          setLoadingBtn(false);
        });
    } catch (err) {
      
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
                  <Form onSubmit={handleSubmit(handleRecoveryCode)}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Control
                        type="text"
                        className={`${Style.inputField} remove-focus`}
                        placeholder="Your Code"
                        {...register("code", { required: true })}
                      />
                    </Form.Group>

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
