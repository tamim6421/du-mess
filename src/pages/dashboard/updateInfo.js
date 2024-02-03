/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Style from "@/styles/dashboard/updateInfo.module.css";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { baseImgUrl } from "@/utils/imgUrl";
import { useRouter } from "next/router";

export default function UpdateInfo() {
  const [profileData, setProfileData] = useState({});

  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const router = useRouter();

  useEffect(() => {
    const cookieValue = Cookies.get("TOKEN_LOGIN");

    axios
      .get(BASE_URL + "/profile_view", {
        headers: {
          // Set your cookie in the request headers
          TOKEN_MEMBER: cookieValue,
        },
      })
      .then((response) => {
        setProfileData(response?.data?.data);
      });
  }, []);

  console.log(profileData)

  const [formUpdateData, setFormUpdateData] = useState({
    name: profileData?.name || "",
    email: profileData?.email || "",
    phone: profileData?.phone || "",
    birth_date: profileData?.birth_date || "",
    father: profileData?.father || "",
    mother: profileData?.mother || "",
    dept: profileData?.dept || "",
    nation: profileData?.nation || "",
    religion: profileData?.religion || "",
    division: profileData?.division || "",
    zila: profileData?.zila || "",
    upazila: profileData?.upazila || "",
    postcode: profileData?.postcode || "",
    village: profileData?.village || "",
  });

  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  useEffect(() => {
    // Populate the form values with default values from profileData
    setFormUpdateData({
      name: profileData?.name || "",
      email: profileData?.email || "",
      phone: profileData?.phone || "",
      birth_date: profileData?.birth_date || "",
      father: profileData?.father || "",
      mother: profileData?.mother || "",
      dept: profileData?.dept || "",
      nation: profileData?.nation || "",
      religion: profileData?.religion || "",
      division: profileData?.division || "",
      zila: profileData?.zila || "",
      upazila: profileData?.upazila || "",
      postcode: profileData?.postcode || "",
      village: profileData?.village || "",
    });
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUpdateData({
      ...formUpdateData,
      [name]: value,
    });
  };

  const updateSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingBtn(true);
      const cookieValue = Cookies.get("TOKEN_LOGIN");

      const formData = new FormData();

      formData.append("name", formUpdateData.name);
      formData.append("email", formUpdateData.email);
      formData.append("phone", formUpdateData.phone);
      formData.append("birth_date", formUpdateData.birth_date);
      if (image) {
        formData.append("profile_image", image);
      }
      formData.append("father", formUpdateData.father);
      formData.append("mother", formUpdateData.mother);
      formData.append("dept", formUpdateData.dept);
      formData.append("nation", formUpdateData.nation);
      formData.append("religion", formUpdateData.religion);
      formData.append("division", formUpdateData.division);
      formData.append("zila", formUpdateData.zila);
      formData.append("upazila", formUpdateData.upazila);
      formData.append("postcode", formUpdateData.postcode);
      formData.append("village", formUpdateData.village);

      const response = await axios({
        method: "post",
        url: BASE_URL + "/profile_update",
        data: formData,
        headers: {
          // "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          TOKEN_MEMBER: cookieValue,
        },
      });
      console.log(response)

      if (response.status === 200) {
        if (response.data.status === 200) {
          const profileData = {
            name: response.data.data.name,
            email: response.data.data.email,
            phone: response.data.data.phone,
            profile_image: response.data.data.profile_image,
          };
          localStorage.removeItem("user-info");

          localStorage.setItem("user-info", JSON.stringify(profileData));
          toast.success("Successfully Updated Profile");
          router.push("/dashboard/profile");
          setLoadingBtn(false);
        } else if (response.data.status === 500) {
          toast.error(response?.data?.message);
          setLoadingBtn(false);
          router.push("/login");
        } else if (
          response.data.status === 700 ||
          response.data.status === 600
        ) {
          toast.error(response?.data?.message);
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

  // console.log(profileData)
  // console.log(baseImgUrl)
  // console.log(BASE_URL)

  return (
    <>
      <Head>
        <title>DASHBOARD:: Update Profile </title>
        <meta name="description" content="Drining" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <div className="loadingContainer ">
            <img src="./loading.gif" alt="" className="loadingGif" />
          </div>
        ) : (
          <>
            <div className={`${Style.mainContainer} d-flex pt-3`}>
              {/* Dashboard Left Side and Header */}
              <DashboardLeftSide />

              {/* Main Content */}
              <div className={`${Style.content} ${Style.element} px-2 mt-3 mb-3  ms-5 p-3 bg-light rounded shadow-lg`}>
              
                <Row>
                  <Col lg={8} md={10} sm={12} className="mx-auto">
                  <p className="fw-bold fs-4" style={{ color: "#7da5a8" }}>Update Profile Info</p>
                    <img
                      src={baseImgUrl + profileData?.profile_image}
                      alt=""
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        marginTop: "8px",
                      }}
                    />
                  </Col>
                </Row>
                <Col lg={8} md={10} sm={12} className="mx-auto">
                  <div className={Style.application}>
                    <Form onSubmit={updateSubmit}>
                      {/* <button> */}

                      <input
                        type="file"
                        className="mt-2"
                        name="profile_image"
                        onChange={handleFileChange}
                      />
                      {/* </button> */}
                      {/* For Name and Category */}
                      <div className={Style.contactInstitute}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Name <span className="text-danger">*</span>
                          </Form.Label>

                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="name"
                            defaultValue={profileData.name}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Phone <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="number"
                            className={`${Style.inputField} ${Style.inputNumber}`}
                            name="phone"
                            readOnly
                            onChange={handleChange}
                            defaultValue={profileData?.phone}
                          />
                        </Form.Group>
                      </div>

                      {/* For Email and Phone number */}
                      <div className={`${Style.contactInstitute}`}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Email <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="email"
                            readOnly
                            className={`${Style.inputField} input`}
                            name="email"
                            onChange={handleChange}
                            defaultValue={profileData?.email}
                          />
                        </Form.Group>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Birth Date <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={`${Style.inputField} input`}
                            name="birth_date"
                            onChange={handleChange}
                            defaultValue={profileData?.birth_date}
                          />
                        </Form.Group>
                      </div>

                      {/* For Degree Category and passig year  */}
                      <div className={`${Style.contactInstitute}`}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Department <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={`${Style.inputField} input`}
                            name="dept"
                            onChange={handleChange}
                            defaultValue={profileData?.dept}
                          />
                        </Form.Group>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Father <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="father"
                            onChange={handleChange}
                            defaultValue={profileData?.father}
                          />
                        </Form.Group>
                      </div>

                      {/* For Gender & Blood Group */}
                      <div className={`${Style.contactInstitute}`}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Mother <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="mother"
                            onChange={handleChange}
                            defaultValue={profileData?.mother}
                          />
                        </Form.Group>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Nation
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="nation"
                            onChange={handleChange}
                            defaultValue={profileData?.nation}
                          />
                        </Form.Group>
                      </div>

                      {/* For Country & City */}
                      <div className={Style.contactInstitute}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Religion <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={`${Style.inputField} input`}
                            name="religion"
                            onChange={handleChange}
                            defaultValue={profileData?.religion}
                          />
                        </Form.Group>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Division
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="division"
                            onChange={handleChange}
                            defaultValue={profileData?.division}
                          />
                        </Form.Group>
                      </div>

                      {/* Occupation & Organization */}
                      <div className={Style.contactInstitute}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Zilla <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="zila"
                            onChange={handleChange}
                            defaultValue={profileData?.zila}
                          />
                        </Form.Group>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Upazila
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="upazila"
                            onChange={handleChange}
                            defaultValue={profileData?.upazila}
                          />
                        </Form.Group>
                      </div>

                      {/* Designation & Affiliation */}
                      <div className={Style.contactInstitute}>
                        <Form.Group
                          className={`${Style.contact} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            postcode
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="postcode"
                            onChange={handleChange}
                            defaultValue={profileData?.postcode}
                          />
                        </Form.Group>
                        <Form.Group
                          className={`${Style.institute} mb-3`}
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className={Style.inputLabel}>
                            Village
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            className={Style.inputField}
                            name="village"
                            onChange={handleChange}
                            defaultValue={profileData?.village}
                          />
                        </Form.Group>
                      </div>

                      {/* Error Message  */}
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

                      {/* Submit button */}
                      {loadingBtn ? (
                        <div className="d-flex justify-content-center">
                          <Button disabled className={Style.submit}>
                            Inserting...
                          </Button>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center">
                          <Button type="submit" variant="success" className={Style.submit}>
                            Submit
                          </Button>
                        </div>
                      )}
                    </Form>
                  </div>
                </Col>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
