/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
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
  console.log("page2 id", id);

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

  console.log("Page 2", data);

  const payment = data?.find((item) => item?.id === parseInt(id));
  console.log("page2 payment ", payment);

  // const breakfastStatus = true;
  // const lunchStatus = true;
  // const dinnerStatus = true;

  const breakFast = [
    {
      title: "Breakfast Rate",
      value: payment?.breakfast_rate,
    },
    {
      title: " Breakfast ON Meal",
      value: payment?.breakfast_onmeal,
    },
    {
      title: "Breakfast OFF Meal",
      value: payment?.breakfast_offmeal,
    },
    {
      title: "Breakfast Inactive Meal",
      value: payment?.breakfast_inmeal,
    },
  ];

  const lunch = [
    {
      title: "Lunch Rate",
      value: payment?.lunch_rate,
    },
    {
      title: "Lunch ON Meal",
      value: payment?.lunch_onmeal,
    },
    {
      title: "Lunch OFF Meal",
      value: payment?.lunch_offmeal,
    },
    {
      title: "Lunch Inactive Meal ",
      value: payment?.lunch_inmeal,
    },
  ];

  const dinner = [
    {
      title: "Dinner Rate",
      value: payment?.dinner_rate,
    },
    {
      title: "Dinner ON Meal",
      value: payment?.dinner_onmeal,
    },
    {
      title: "Dinner OFF Meal",
      value: payment?.dinner_offmeal,
    },
    {
      title: "Dinner Inactive Meal",
      value: payment?.dinner_inmeal,
    },
  ];


  // {
  //   title: "Previous Due Amount",
  //   value: payment?.pre_monthdue,
  // },
  // {
  //   title: "Previous Reserve Amount",
  //   value: payment?.pre_reserve_amount,
  // },
  // {
  //   title: "Previous Refund Amount",
  //   value: payment?.pre_refund,
  // },

  const adjustment = payment?.pre_monthdue - (payment?.pre_reserve_amount + payment?.pre_refund )
  console.log(adjustment)

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
              <Row className=" mt-4">
                <Col md={8} sm={12}>
                  <div className={Style.contentContainer}>
                    {/* Payment Table */}
                    <div className="table-responsive shadow-lg p-3" style={{borderRadius:"5px"}}>
                      <p className="fw-bold fs-4" style={{color:"#7da5a8"}}>Current Section Total Bill Details </p>

                      <Table
                        striped
                        bordered
                        hover
                        size="sm"
                        className="py-4 px-4"
                      >
                        <thead>
                          <tr>
                            <th style={{ color: "#f79514" }}>Description </th>
                            <th style={{ color: "#f79514" }}>Value </th>
                          </tr>
                        </thead>
                        <tbody>
                          {payment?.breakfast_status === '1' &&
                            breakFast.map((item, index) => (
                              <tr key={index}>
                                <th
                                  className="py-2 px-1"
                                  style={{ fontSize: "14px" }}
                                >
                                  {item?.title}
                                </th>

                                <td colSpan={2} style={{ fontSize: "14px" }}>
                                  {item?.value}
                                </td>
                              </tr>
                            ))}

                          {payment?.lunch_status === '1' &&
                            lunch.map((item, index) => (
                              <tr key={index}>
                                <th
                                  className="py-2 px-1"
                                  style={{ fontSize: "14px" }}
                                >
                                  {item?.title}
                                </th>

                                <td colSpan={2} style={{ fontSize: "14px" }}>
                                  {item?.value}
                                </td>
                              </tr>
                            ))}

                          {payment?.dinner_status === '1' &&
                            dinner.map((item, index) => (
                              <tr key={index}>
                                <th
                                  className="py-2 px-1"
                                  style={{ fontSize: "14px" }}
                                >
                                  {item?.title}
                                </th>

                                <td colSpan={2} style={{ fontSize: "14px" }}>
                                  {item?.value}
                                </td>
                              </tr>
                            ))}

                          {/* single condation  */}

                          {payment?.section_day > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Total Section Day
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.section_day}
                              </td>
                            </tr>
                          )}

                          {payment?.hostel_fee > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Hostel Fee
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.hostel_fee}TK
                              </td>
                            </tr>
                          )}

                          {payment?.employee > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Employee
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.employee}TK
                              </td>
                            </tr>
                          )}

                          {payment?.friday > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Friday
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.friday}TK
                              </td>
                            </tr>
                          )}

                          {payment?.feast > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Feast
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.feast}TK
                              </td>
                            </tr>
                          )}

                          {payment?.welfare > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Welfare
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.welfare}TK
                              </td>
                            </tr>
                          )}

                          {payment?.gass > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Gass
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.gass}TK
                              </td>
                            </tr>
                          )}

                          {payment?.electricity > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Electricity
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.electricity}TK
                              </td>
                            </tr>
                          )}

                          {payment?.tissue > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Tissue
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.tissue}TK
                              </td>
                            </tr>
                          )}

                          {payment?.water > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Water
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.water}TK
                              </td>
                            </tr>
                          )}

                          {payment?.dirt > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Dirt
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.dirt}TK
                              </td>
                            </tr>
                          )}

                          {payment?.wifi > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Wifi
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.wifi}TK
                              </td>
                            </tr>
                          )}

                          {payment?.service_charge > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Service Charge
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.service_charge}TK
                              </td>
                            </tr>
                          )}

                          {payment?.security > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Security Money
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.security}TK
                              </td>
                            </tr>
                          )}

                          {payment?.others > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Others Fee
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.others}TK
                              </td>
                            </tr>
                          )}

                          {payment?.card_fee > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                Card Fee
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.card_fee}TK
                              </td>
                            </tr>
                          )}

                          {/* total items valaue  */}

                          {payment?.cur_others_amount > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                1. Total Others Amount
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.cur_others_amount}TK
                              </td>
                            </tr>
                          )}

                          {payment?.cur_meal_amount > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                2. Total Meal Amount
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.cur_meal_amount}TK
                              </td>
                            </tr>
                          )}

                          {payment?.inmeal_amount > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                                3. Total Inactive Amount
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.inmeal_amount}TK
                              </td>
                            </tr>
                          )}

                          {payment && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                               4. Previous Adjustment [pre due - (pre refund + pre resurve)]
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {adjustment} TK
                              </td>
                            </tr>
                          )}


                          {payment?.payble_amount > 0 && (
                            <tr>
                              <th
                                className="py-2 px-1"
                                style={{ fontSize: "14px" }}
                              >
                               Current Section Total Bill [(1+2+4) - (3)]
                              </th>
                              <td colSpan={2} style={{ fontSize: "14px" }}>
                                {payment?.payble_amount}TK
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

