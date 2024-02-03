/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useEffect, useState } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import Style from "@/styles/dashboard/payment.module.css";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import EntriesSearch from "@/components/dashboard/dashboardHeader/entriesSearch/EntriesSearch";

export default function Payment() {
  const [data, setData] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter();
  const cookieValue = Cookies.get("TOKEN_LOGIN");
  // console.log(cookieValue)

  useEffect(() => {
    axios
      .get(BASE_URL + "/invoice_view", {
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
  }, [cookieValue, router]);

  const convertMonth = (input) => {
    const monthIndex = parseInt(input, 10);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (!isNaN(monthIndex) && monthIndex >= 1 && monthIndex <= 12) {
      return months[monthIndex - 1];
    } else {
      return "Invalid input";
    }
  };

  const handleViewClick = (id) => {
    router.push(`/dashboard/paymentView/${id}`);
  };

  return (
    <>
      <Head>
        <title>DASHBOARD | Payment</title>
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
            <div className={`${Style.content} px-4 p-3`}>
              <Row className="mb-6 mt-4">
                <Col md={10} sm={12}>
                  <div className={Style.contentContainer}>
                    <p className="fw-bold fs-4" style={{ color: "#7da5a8" }}>
                      Payment Details{" "}
                    </p>

                    {/* <EntriesSearch /> */}
                    {/* Payment Table */}
                    <div className="table-responsive">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th className={Style.heading}>Invoice ID</th>
                            <th className={Style.heading}>
                              Invoice Month, Section
                            </th>
                            <th className={Style.heading}>
                              Total Payable Amount
                            </th>
                            <th className={Style.heading}>First Payable</th>
                            {/* <th className={Style.heading}>
                              First Payable Status
                            </th> */}
                            <th className={Style.heading}>Second Payable</th>
                            {/* <th className={Style.heading}>
                              Second Payable Status
                            </th> */}
                            <th className={Style.heading}>Refund Withdraw</th>
                            {/* <th className={Style.heading}>
                              Refund Withdraw 
                            </th> */}
                            <th className={Style.heading}> </th>
                            <th className={Style.heading}>
                              First Payment Type
                            </th>
                            <th className={Style.heading}>
                              Second Payment Type
                            </th>
                            <th className={Style.heading}>Withdraw Type</th>
                            <th className={Style.heading}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.map((item, index) => (
                            <tr key={item.id}>
                              <td className={Style.text}>{item?.id}</td>
                              <td className={Style.text}>
                                {convertMonth(item?.invoice_month)}-
                                {item?.invoice_year} <br />{" "}
                                {item?.invoice_section}{" "}
                              </td>
                              <td className={Style.text}>
                                {item?.payble_amount}TK
                              </td>
                              <td className={Style.text}>
                                {item?.payble_amount1}TK

                                {item?.payment_status1 === "1" ? (
                                  <>
                                    <p
                                      className="rounded"
                                      style={{
                                        backgroundColor: "#25943d",
                                        color: "white",
                                        textAlign: "center",
                                      }}
                                    >
                                      Paid
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p
                                      className="rounded"
                                      style={{
                                        backgroundColor: "#e3351e",
                                        color: "white",
                                        textAlign: "center",
                                      }}
                                    >
                                      Unpaid
                                    </p>
                                  </>
                                )}
                              </td>

                              <td className={Style.text}>
                                {item?.payble_amount2}TK
                                {item?.payment_status2 === "1" ? (
                                  <>
                                    <p
                                      className="rounded"
                                      style={{
                                        backgroundColor: "#25943d",
                                        color: "white",
                                        textAlign: "center",
                                      }}
                                    >
                                      Paid
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p
                                      className="rounded"
                                      style={{
                                        backgroundColor: "#e3351e",
                                        color: "white",
                                        textAlign: "center",
                                      }}
                                    >
                                      Unpaid
                                    </p>
                                  </>
                                )}
                              </td>
                              {/* <td className={Style.text}>
                             
                              </td> */}
                              <td className={Style.text}>
                                {item?.withdraw}TK
                                {item?.withdraw_status === "1" ? (
                                  <>
                                    <p
                                      className="rounded"
                                      style={{
                                        backgroundColor: "#e6e7e8",
                                        color: "green",
                                        textAlign: "center",
                                      }}
                                    >
                                      Paid
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p
                                      className="rounded"
                                      style={{
                                        backgroundColor: "#e3351e",
                                        color: "white",
                                        textAlign: "center",
                                      }}
                                    >
                                      Unpaid
                                    </p>
                                  </>
                                )}

                                
                                </td>
                             
                              <td className={Style.text}>
                                <Button
                                  onClick={() => handleViewClick(item?.id)}
                                  size="sm"
                                  style={{
                                    backgroundColor: "#22a305",
                                    border: "none",
                                    hover: { backgroundColor: "#187004" },
                                  }}
                                  className={`${Style.customBtn} border-none px-4`}
                                >
                                  View
                                </Button>
                              </td>
                              <td className={Style.text}>
                                {item?.payment_type1} <br />{" "}
                                {item?.payment_time1}{" "}
                              </td>
                              <td className={Style.text}>
                                {item?.payment_type2} <br />{" "}
                                {item?.payment_time2}{" "}
                              </td>
                              <td className={Style.text}>
                                {item?.withdraw_type} <br />{" "}
                                {item?.withdraw_time}{" "}
                              </td>
                              <td className={Style.text}>
                                <Button
                                  style={{
                                    backgroundColor: "#22a305",
                                    border: "none",
                                    hover: { backgroundColor: "#187004" },
                                  }}
                                  className="border-none"
                                  size="sm"
                                >
                                  Pay Now
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </>
      </main>
    </>
  );
}
