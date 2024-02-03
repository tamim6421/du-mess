/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useEffect, useState } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import Style from "@/styles/dashboard/paymentView.module.css";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";

export default function Payment() {
  const [data, setData] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  //   console.log(id)

  const cookieValue = Cookies.get("TOKEN_LOGIN");
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
  }, []);

  const payment = data?.find((item) => item?.id === parseInt(id));
  //   console.log(payment)

  const tableArray1 = [
    {
      title: "Invoice No",
      value: payment?.id,
    },
    {
      title: "Invoice Month",
      value: payment?.invoice_year+"-"+payment?.invoice_month,
    },
    {
      title: "Invoice Section",
      value: payment?.invoice_section,
    },
    {
      title: "Previous Due Amount",
      value: payment?.pre_monthdue+"TK",
    },
    {
      title: "Previous Reserve Amount",
      value: payment?.pre_reserve_amount+"TK",
    },
    {
      title: "Previous Refund Amount",
      value: payment?.pre_refund+"TK",
    },
    {
      title: "Current Section Total Bill",
      value: payment?.payble_amount+"TK",
    },
  ];

  const tableArray2 = [
    {
      title: "First Pymnet Amount",
      value: payment?.payble_amount1+"TK",
    },
    {
      title: "First Payment Status ",
      value: payment?.payment_status1+"TK",
    },
    {
      title: "First Payment Type & Time ",
      value: payment?.payment_type1 + "-"+ payment?.payment_time1,
    },
    {
      title: "Second Payment Amount",
      value: payment?.payble_amount2+"TK",
    },
    {
      title: "Second Payment Staus",
      value: payment?.payment_status2,
    },
    {
      title: "Second Payment Type & Time",
      value: payment?.payment_type2+" - "+payment?.payment_time2,
    },

    {
      title: "Current Section Reserve",
      value: payment?.reserve_amount,
    },
    {
      title: "Current Section Due",
      value: payment?.total_due,
    },
    {
      title: "Current Section Refund",
      value: payment?.total_refund,
    },
  ];

  const handleViewClick1 = (id) => {
    router.push(`/dashboard/paymentView1/${id}`);
    // console.log(id)
  };
  const handleViewClick2 = (id) => {
    router.push(`/dashboard/paymentView2/${id}`);
    // console.log(id)
  };

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
            <div className={`${Style.content} py-5 px-5`}>
              <div className=" ">
                <Row
                  className={`${Style.element} shadow-lg p-4 rounded`}
              
                >
                  <Col md={8}  className="w-100">
                    <p className="fw-bold fs-4" style={{ color: "#7da5a8" }}>
                      {" "}
                      Your Payment Details{" "}
                    </p>
                    <Table className="w-100" style={{width: ""}} striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th style={{ color: "#f79514" }}>Description </th>
                          <th style={{ color: "#f79514" }}>Value </th>
                        </tr>
                      </thead>

                      <tbody className="">
                        {tableArray1?.map((item, index) => (
                          <tr key={index}>
                            <th className="px-1" style={{ fontSize: "14px" }}>
                              {item?.title}
                            </th>
                            <td
                              className="d-flex justify-content-between "
                              colSpan={2}
                              style={{ fontSize: "14px" }}
                            >
                              {item?.value}

                              {item.title === "Current Section Total Bill" && (
                                <Button
                                  variant="success"
                                  size="sm"
                                  onClick={() => handleViewClick1(id)}
                                >
                                  {" "}
                                  See Details
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                        {tableArray2?.map((item, index) => (
                          <tr key={index}>
                            <th className="px-1" style={{ fontSize: "14px" }}>
                              {item?.title}
                            </th>
                            <td
                              className="d-flex justify-content-between"
                              colSpan={2}
                              style={{ fontSize: "14px" }}
                            >
                              {item?.value} 

                              {item.title === "Current Section Refund" && (
                                <Button
                                  variant="success"
                                  size="sm"
                                  onClick={() => handleViewClick2(id)}
                                >
                                  {" "}
                                  See Details
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>

                  {/* <Col md={8} className="w-100">
                    <Table className="mt-4 " striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th
                            style={{ color: "#f79514", visibility: "hidden" }}
                          >
                            Description{" "}
                          </th>
                          <th
                            style={{ color: "#f79514", visibility: "hidden" }}
                          >
                            Value{" "}
                          </th>
                        </tr>
                      </thead>

                      <tbody className="">
                        {tableArray2?.map((item, index) => (
                          <tr key={index} className="">
                            {item.title === "Current Section Refund" ? (
                              <>
                                <th
                                  className="px-1"
                                  style={{ fontSize: "14px" }}
                                >
                                  {item?.title}
                                </th>
                                <td
                                  className="d-flex justify-content-between "
                                  colSpan={2}
                                  style={{ fontSize: "14px" }}
                                >
                                  {item?.value}

                                  <Button
                                    variant="success"
                                    onClick={() => handleViewClick2(id)}
                                  >
                                    {" "}
                                    See Details
                                  </Button>
                                </td>
                              </>
                            ) : (
                              <>
                                <th
                                  className="px-1"
                                  style={{ fontSize: "14px" }}
                                >
                                  {item?.title}
                                </th>
                                <td colSpan={2} style={{ fontSize: "14px" }}>
                                  {item?.value}
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className="d-flex gap-5 justify-content-between border">
              <span className="mt-2 ms-2 fw-bold" style={{ fontSize: "14px" }} >Current Section Refund:</span>
              <div className="d-flex justify-content-center align-items-center px-1" style={{borderLeft:"1px solid #e8e7e6"}}>
               <p className="mt-2">{payment?.total_refund} </p>
               <Button variant="success"  onClick={() => handleViewClick2(id)} className="ms-5 me-3">See Details</Button>
               </div>
              
              </div>
                  </Col> */}
                </Row>
              </div>
            </div>
          </div>
        </>
      </main>
    </>
  );
}
