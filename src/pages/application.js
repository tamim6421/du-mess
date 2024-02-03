import Head from "next/head";
import { Inter } from "next/font/google";
import useFetch from "@/hooks/useFetch";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Style from '@/styles/application.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/api";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";

export default function Application() {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [hallName, setHallName] = useState([]);
  const [hallId, setHallId] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [isPasswordSimilar, setIsPasswordSimilar] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get(BASE_URL + "/hall_information").then((res) => {
      setHallName(res.data.data);
    });
  }, []);

  const handleHallNameChange = (event) => {
    const selectedValue = event.target.value;
    setHallId(selectedValue);
  };

  // Password hide and show
  const showHidePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const showHideConfirmPassword = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoadingBtn(true);
      data.hall_id = hallId;
      const profile_image = data.profile_image[0];
      const residential_image = data.residential_image[0];
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("hall_id", data.hall_id);
      formData.append("registration", data.registration);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("profile_image", profile_image);
      formData.append("file_name", residential_image);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.confirmPassword);
      formData.append("custom1", data.custom1);
      formData.append("custom2", data.custom2);
      formData.append("custom3", data.custom3);

      if (data.password !== data.confirmPassword) {
        setIsPasswordSimilar(false);
        setLoadingBtn(false);
      } else {
        setIsPasswordSimilar(true);
      }

      const response = await axios({
        method: "post",
        url: BASE_URL + "/application_memebr",
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      });

      if (response.data.status === 700) {
        setLoadingBtn(false);
        setErrorMessage(response.data.message);
        toast.error(response.data.message);
      } else if (response.data.status === 600) {
        setLoadingBtn(false);
        toast.error(response.data.message);
      } else if (response.data.status === 400) {
        setLoadingBtn(false);
        toast.error(response.data.message);
      } else if (response.data.status === 300) {
        setLoadingBtn(false);
        toast.error(response.data.message);
      } else if (response.data.status === 200) {
        Swal.fire(
          "Congratulations!",
          "Registration Successful. Please, verify your email.",
          "success"
        );
        setErrorMessage({});
        toast.success("Registration Successful");
        setLoadingBtn(false);
        setIsPasswordSimilar(true);
        router.push('/')
        reset();
      } else {
        toast.error("Something went wrong");
        setLoadingBtn(false);
      }
    } catch (error) {
      console.error(error);
      setLoadingBtn(false);
    }
  };

  return (
    <>
      <Head>
        <title>Dining::Application Form</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./csfdu.jpeg" />
      </Head>
      <main>
        <>
          {/* Alumni Details */}
          <Container className="mt-4 mb-5">
            <Row>
              <Col lg={8} md={10} sm={12} className="mx-auto">
                <div className={Style.application}>
                  <div className=" mb-3">
                    <h3 className="text-center fs-4 ">MEMBER APPLICATION  FORM</h3>
                  </div>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Student Name and Hall Name */}
                    <div className={Style.contactInstitute}>
                      <Form.Group
                        className={`${Style.contact} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Student Name
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          className={Style.inputField}
                          {...register("name", { required: true })}
                          placeholder="Name"
                        />
                        {errors.name && (
                          <span className="text-danger">Name is required</span>
                        )}
                      </Form.Group>
                      <Form.Group
                        className={`${Style.institute} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Hall Name
                        </Form.Label>
                        <Form.Select
                          value={hallId}
                          onChange={handleHallNameChange}
                          aria-label="Default select example"
                          className={`${Style.inputField} ${Style.formSelect}`}
                        >
                          <option>Select your Hall Name</option>
                          {hallName?.map((item) => (
                            <option key={item.id} value={item?.hall_id}>
                              {item?.hall}
                            </option>
                          ))}
                          {/* <option value="Member">Member</option>
                          <option value="Life_Member">Life_Member</option> */}
                        </Form.Select>
                      </Form.Group>
                    </div>

                    {/* Registration & Phone Number */}
                    <div className={`${Style.contactInstitute}`}>
                      <Form.Group
                        className={`${Style.contact} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Registration
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          className={`${Style.inputField} input`}
                          {...register("registration", { required: true })}
                          placeholder="Registration"
                        />
                        {errors.registration && (
                          <span className="text-danger">
                            Registration is required
                          </span>
                        )}
                      </Form.Group>
                      <Form.Group
                        className={`${Style.institute} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          className={Style.inputField}
                          {...register("phone", { required: true })}
                          placeholder="Phone Number"
                        />
                        {errors.phone && (
                          <span className="text-danger">
                            Phone Number is required
                          </span>
                        )}
                      </Form.Group>
                    </div>

                    {/* Email & Profile Image */}
                    <div className={`${Style.contactInstitute}`}>
                      <Form.Group
                        className={`${Style.contact} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Email
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="email"
                          className={`${Style.inputField} input`}
                          {...register("email", { required: true })}
                          placeholder="Email"
                        />
                        {errors.email && (
                          <span className="text-danger">Email is required</span>
                        )}
                      </Form.Group>
                      <Form.Group
                        className={`${Style.institute} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Select Profile Image(300*300px)
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="file"
                          className={`${Style.inputField} input`}
                          {...register("profile_image", { required: true })}
                        />
                        {errors.file && (
                          <span className="text-danger">
                            Profile Image is required
                          </span>
                        )}
                      </Form.Group>
                    </div>

                    {/* Residential Card & Password */}
                    <div className={`${Style.contactInstitute}`}>
                      <Form.Group
                        className={`${Style.contact} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Residential Card
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="file"
                          className={`${Style.inputField} input`}
                          {...register("residential_image", { required: true })}
                        />
                        {errors.residential_image && (
                          <span className="text-danger">
                            Residential Card is required
                          </span>
                        )}
                      </Form.Group>

                      <Form.Group
                        className={`${Style.institute} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Password
                        </Form.Label>
                        <div className="position-relative">
                        <Form.Control
                          size="sm"
                          type={isPasswordVisible ? "text" : "password"}
                          className={`${Style.inputField} input`}
                          {...register("password", { required: true })}
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
                            Password is required
                          </span>
                        )}
                      </Form.Group>
                    </div>

                    {/* Confirm Password & Custom 1 */}
                    <div className={`${Style.contactInstitute}`}>
                      <Form.Group
                        className={`${Style.contact} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Confirm Password
                        </Form.Label>
                        <div className="position-relative">
                        <Form.Control
                          size="sm"
                          type={isConfirmPasswordVisible ? "text" : "password"}
                          className={`${Style.inputField} input`}
                          {...register("confirmPassword", { required: true })}
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
                            Confirm Password is required
                          </span>
                        )}
                        {!isPasswordSimilar && (
                          <span className="text-danger">
                            This Password are not similar
                          </span>
                        )}
                      </Form.Group>
                      <Form.Group
                        className={`${Style.institute} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Custom 1
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          className={Style.inputField}
                          {...register("custom1")}
                          placeholder="Custom 1"
                        />
                      </Form.Group>
                    </div>

                    {/* Custom 2 & Custom 3 */}
                    <div className={`${Style.contactInstitute}`}>
                      <Form.Group
                        className={`${Style.contact} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Custom 2
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          className={`${Style.inputField} input`}
                          {...register("custom2")}
                          placeholder="Custom 2"
                        />
                      </Form.Group>
                      <Form.Group
                        className={`${Style.institute} mb-3`}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className={Style.inputLabel}>
                          Custom 3
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          className={Style.inputField}
                          {...register("custom3")}
                          placeholder="Custom 3"
                        />
                      </Form.Group>
                    </div>

                    {errorMessage && (
                      <>
                        <ul>
                          {Object.entries(errorMessage).map(
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
                        <Button disabled className={Style.submit}>
                          Inserting...
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center">
                        <Button type="submit" className={Style.submit}>
                          Submit
                        </Button>
                      </div>
                    )}
                  </Form>
                  <p className="text-center mt-3">
                    Already have an account?{" "} <br />
                    <Link href="/">Login</Link>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      </main>
    </>
  );
}
