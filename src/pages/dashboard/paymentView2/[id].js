/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useEffect, useState } from "react";
import { Col, Row, Table,  } from "react-bootstrap";
import Style from "@/styles/dashboard/paymentView.module.css";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";


export default function PaymentPage3() {
  const [data, setData] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  console.log("payment page 3", id);

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

  console.log("payment page 3", data);

  const payment = data?.find((item) => item?.id === parseInt(id));
  console.log("payment page 3", payment);




  

  

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
            <div className={`${Style.content} px-4`}>
              <Row className="mt-4">
                <Col md={8} sm={12}>
                  <div className={Style.contentContainer}>
                    {/* Payment Table */}
                    <div
                      className="table-responsive shadow-lg p-3 "
                      style={{ borderRadius: "5px" }}
                    >
                      <p className="fw-bold  fs-4" style={{ color: "#7da5a8" }}>
                        Current Section Refund Details
                      </p>
                      <Table striped bordered hover size="sm" className=" px-4">
                        <thead>
                          <tr>
                            <th style={{ color: "#f79514" }}>Description </th>
                            <th style={{ color: "#f79514" }}>Value </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* single condation  */}
                          {/* breakFast  */}

                          {payment?.breakfast_status == "1" && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Breakfast OFF Meal
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.breakfast_offmeal}
                              </td>
                            </tr>
                          )}

                          {payment?.breakfast_status == "1" && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Breakfast Rate
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_breakfast_rate}
                              </td>
                            </tr>
                          )}

                          {/* luch section */}
                          {payment?.lunch_status == "1" && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Lunch OFF Meal
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.lunch_offmeal}
                              </td>
                            </tr>
                          )}

                          {payment?.lunch_status == "1" && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Lunch Rate
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_lunch_rate}
                              </td>
                            </tr>
                          )}

                          {/* dinner section  */}
                          {payment?.dinner_status == "1" && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Dinner OFF Meal
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.dinner_offmeal}
                              </td>
                            </tr>
                          )}

                          {payment?.dinner_status == "1" && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Dinner Rate
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_dinner_rate}
                              </td>
                            </tr>
                          )}

                          {/* others sections  */}
                          {payment?.refund_feast > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Feast
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_feast}TK
                              </td>
                            </tr>
                          )}

                          {payment?.refund_welfare > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Welfare
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_welfare}TK
                              </td>
                            </tr>
                          )}

                          {payment?.refund_friday > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Friday
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_friday}TK
                              </td>
                            </tr>
                          )}

                          {payment?.refund_employee > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Employee
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_employee}TK
                              </td>
                            </tr>
                          )}

                          {payment?.refund_others > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Others
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_others}TK
                              </td>
                            </tr>
                          )}

                          {payment?.refund_tissue > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Tissue
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_tissue}TK
                              </td>
                            </tr>
                          )}

                          {payment?.refund_gass > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund gass
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_gass}TK
                              </td>
                            </tr>
                          )}

                          {payment?.refund_electricity > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Electricity
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_electricity}TK
                              </td>
                            </tr>
                          )}

                          {payment?.refund_water > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Water
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_water}TK
                              </td>
                            </tr>
                          )}

                          {payment?.refund_wifi > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Wifi
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_wifi}TK
                              </td>
                            </tr>
                          )}

                          {payment?.refund_dirt > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Refund Dirt
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.refund_dirt}TK
                              </td>
                            </tr>
                          )}

                          <tr>
                            <th
                              className="py-2 px-1"
                              style={{ fontSize: "14px" }}
                            >
                              Total Off Meal Amount
                            </th>
                            <td colSpan={2} style={{ fontSize: "14px" }}>
                              {payment?.offmeal_amount}TK
                            </td>
                          </tr>

                          <tr>
                            <th
                              className="py-2 px-1"
                              style={{ fontSize: "14px" }}
                            >
                              Reserve Refund Amount
                            </th>
                            <td colSpan={2} style={{ fontSize: "14px" }}>
                              {payment?.reserve_amount}TK
                            </td>
                          </tr>

                          {payment?.total_refund > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Total Refund
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.total_refund} TK
                              </td>
                            </tr>
                          )}
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
