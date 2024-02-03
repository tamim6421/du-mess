/* eslint-disable react/jsx-no-duplicate-props */
import Head from "next/head";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Style from "@/styles/login.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Login() {
  const [hallName, setHallName] = useState([]);
  const [hallId, setHallId] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get(BASE_URL + "/hall_information").then((res) => {
      setHallName(res.data.data);
    });
  }, []);

  const handleHallNameChange = (event) => {
    const selectedValue = event.target.value;
    setHallId(selectedValue);
  };
  console.log(hallId);
  
  const handleHallSubmit = (e) => {
    e.preventDefault();

    if (!hallId) {
      toast.error("Please Select Hall / Mess Name");
      return;
    }
    if(hallId === "Select your Hostel Name"){
      toast.error("Please Select Hall / Mess Name");
      return;
    }
    router.push(`/application/${hallId}`)
  }
  

  return (
    <>
      <Head>
        <title>Select Hall/Mess:: AMADER HOSTEL</title>
        <meta name="description" content="{data?.admin?.nameen}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main className={Style.login}>
        <Container>
          <Row>
            <div
              className="d-flex justify-content-center min-vh-100 mb-5 mt-4"
              style={{ width: "100%" }}
            >
              <Col lg={4} md={7} sm={7}>
                <div className={Style.loginContainer}>
                  {/* Form header and login Form data */}
                  {/* Title */}
                  <Form onSubmit={handleHallSubmit}>
                    <Form.Group
                      className={`${Style.institute} mb-4`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label style={{fontSize: '16px', fontWeight: "bold"}}>
                        Select Hostel / Mess Name
                      </Form.Label>
                      <Form.Select
                        value={hallId}
                        onChange={handleHallNameChange}
                        aria-label="Default select example"
                        className={`${Style.inputField} ${Style.formSelect}`}
                      >
                        <option>Select your Hostel Name</option>
                        {hallName?.map((item) => (
                          <option key={item.id} value={item?.hall_id}>
                            {item?.hall}
                          </option>
                        ))}
                      </Form.Select>
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
