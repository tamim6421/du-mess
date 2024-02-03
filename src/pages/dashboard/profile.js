/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "@/utils/api";
import axios from "axios";
import Style from "@/styles/dashboard/profile.module.css";
import Link from "next/link";
import { toast } from "react-toastify";
import { baseImgUrl } from "@/utils/imgUrl";
import { FaEdit } from "react-icons/fa";

export default function Profile() {
  const [data, setData] = useState({});
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
        if (response?.data?.status === 500) {
          toast.error(response?.data?.message);
          router.push("/");
        }
        setData(response?.data?.data);
      });
  }, [router]);

  console.log(data)
  console.log(baseImgUrl)


  return (
    <>
      <Head>
        <title>
          DASHBOARD::Profile::Dhaka University Chemistry Alumni Association
        </title>
        <meta name="description" content="{data?.admin?.nameen}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        {/* {loading ? (
          <div className="loadingContainer">
            <img src="./loading.gif" alt="" className="loadingGif" />
          </div>
        ) : ( */}
        <>
          <div className={`${Style.mainContainer} d-flex`}>
            {/* Dashboard Left Side and Header */}
            <DashboardLeftSide />

            {/* Main Content */}
            <div className={`${Style.content} px-4`}>
              {/* Profile Details Title */}
              <div
                className="headerTitle text-left mt-4 mb-2"
                style={{ textAlign: "left", height: "7vh" }}
              >
                <h3 className="fs-4 fw-bold mt-2" style={{color:"#58818a"}}>
                  My Profile
                </h3>
              </div>
              <Row>
                <Col md={9} sm={12}>
                  <div className={Style.profileBox}>
                    <Row>
                      <Col md={2} sm={12} className="">
                        <div className={Style.imgUpdateButton}>
                          <img
                            src={baseImgUrl + data?.profile_image}
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "50%",
                            }}
                          />
                          {/* <br /> */}
                          <Link
                            href="/dashboard/updateInfo"
                            className="text-center mt-2"
                          >
                            <Button  variant="success"><FaEdit /></Button>
                          </Link>
                        </div>
                      </Col>
                      <Col md={5} sm={12}>
                        <div className={`${Style.titleSubTitle}`}>
                          <div className="mb-3">
                            <h3 className={Style.title}>Full Name</h3>
                            <h5 className={Style.subTitle}>
                              {data?.name !== null ? data?.name : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Email Address</h3>
                            <h5 className={Style.subTitle}>
                              {data?.email !== null ? data?.email : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Father</h3>
                            <h5 className={Style.subTitle}>
                              {data?.father !== null ? data?.father : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Department</h3>
                            <h5 className={Style.subTitle}>
                              {data?.dept !== null ? data?.dept : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Nation</h3>
                            <h5 className={Style.subTitle}>
                              {data?.nation !== null ? data?.nation : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Zilla</h3>
                            <h5 className={Style.subTitle}>
                              {data?.zila !== null ? data?.zila : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Upozilla</h3>
                            <h5 className={Style.subTitle}>
                              {data?.upazila !== null ? data?.upazila : "----"}
                            </h5>
                          </div>

                          <div className="mb-3">
                            <h3 className={Style.title}>Village</h3>
                            <h5 className={Style.subTitle}>
                              {data?.village !== null ? data?.village : "----"}
                            </h5>
                          </div>
                        </div>
                      </Col>
                      <Col md={5} sm={12}>
                        <div className={Style.titleSubTitle}>
                          <div className="mb-3">
                            <h3 className={Style.title}>Birth Date</h3>
                            <h5 className={Style.subTitle}>
                              {data?.birth_date !== null
                                ? data?.birth_date
                                : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Phone</h3>
                            <h5 className={Style.subTitle}>
                              {data?.phone !== null ? data?.phone : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Mother</h3>
                            <h5 className={Style.subTitle}>
                              {data?.mother !== null ? data?.mother : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Religion</h3>
                            <h5 className={Style.subTitle}>
                              {data?.religion !== null
                                ? data?.religion
                                : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Division</h3>
                            <h5 className={Style.subTitle}>
                              {data?.division !== null
                                ? data?.division
                                : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Post Code</h3>
                            <h5 className={Style.subTitle}>
                              {data?.postcode !== null
                                ? data?.postcode
                                : "----"}
                            </h5>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </>
        {/* )} */}
      </main>
    </>
  );
}
