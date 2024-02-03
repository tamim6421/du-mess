/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Style from "@/styles/dashboard/dashboard.module.css";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import PaymentButton from "@/components/paymentButton/PaymentButton";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [change, setChange] = useState(false);

  const router = useRouter();
  const cookieValue = Cookies.get("TOKEN_LOGIN");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + "/cur_invoice_view", {
          headers: {
            TOKEN_MEMBER: cookieValue,
          },
        });

        if (response?.data?.status === 500 || response?.data?.status === 501) {
          toast.error(response?.data?.message);
          router.push("/");
        } else {
          setData(response?.data?.data);
        }
      } catch (error) {
        console.error("Error making the request:", error);
      }
    };

    fetchData(); // Call the async function
  }, [router, cookieValue, change]);

  // Add dependencies if needed
  // console.log(data)

  const section_day = parseInt(data?.section_day);
  // console.log(section_day)
  const newArray = Array.from({ length: section_day }, () => 0);
  // console.log(newArray)

  const url = BASE_URL + "/meal_off_on";
  // console.log(url)

  // Handle Meal On off function
  const handleMealOnOff = async (mealName, mealStatus) => {
    try {
      setLoadingBtn(true);
      const newData = {
        meal_name: mealName,
        meal_status: mealStatus,
      };

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to change meal status?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        const response = await axios.post(url, newData, {
          headers: {
            TOKEN_MEMBER: cookieValue,
          },
        });

        // console.log(response?.data);

        if (response.status === 200) {
          if (response.data.status === 200) {
            setChange(!change); // Trigger re-fetch
            toast.success(response.data.message);
            setLoadingBtn(false);
          } else if (response.data.status === 500) {
            toast.error(response.data.message);
            setLoadingBtn(false);
            router.push("/");
          } else if (
            response.data.status === 400 ||
            response.data.status === 600
          ) {
            toast.error(response.data.message);
            setLoadingBtn(false);
          } else if (response.data.status === 700) {
            toast.error("Something went wrong");
            setLoadingBtn(false);
          } else {
            toast.error("Something went wrong");
            setLoadingBtn(false);
          }
        }
      }
    } catch (err) {
      console.log(err);
      setLoadingBtn(false);
    }
  };

  // const handleMealOnOff = async (mealName, mealStatus) => {
  //   try {
  //     setLoadingBtn(true);
  //     const newData = {
  //       meal_name: mealName,
  //       meal_status: mealStatus,
  //     };
  //     const isConfirm = window.confirm(
  //       "Are you sure you want to change meal status?"
  //     );
  //     if (isConfirm) {
  //       const response = await axios.post(url, newData, {
  //         headers: {
  //           TOKEN_MEMBER: cookieValue,
  //         },
  //       });
  //       console.log(response);
  //       if (response.status === 200) {
  //         if (response.data.status === 200) {
  //           setChange(!change);
  //           toast.success(response.data.message);
  //           setLoadingBtn(false);
  //         } else if (response.data.status === 500) {
  //           toast.error(response.data.message);
  //           setLoadingBtn(false);
  //           router.push("/");
  //         } else if (
  //           response.data.status === 400 ||
  //           response.data.status === 600
  //         ) {
  //           toast.error(response.data.message);
  //           setLoadingBtn(false);
  //         } else if (response.data.status === 700) {
  //           toast.error("Something went wrong");
  //           setLoadingBtn(false);
  //         } else {
  //           toast.error("Something went wrong");
  //           setLoadingBtn(false);
  //         }
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setLoadingBtn(false);
  //   }
  // };

  // Convert Month
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

  return (
    <>
      <Head>
        <title>DASHBOARD | </title>
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
              <Row className="mb-4 mt-3">
                <Col md={10} sm={12}>
                  <div
                    className={Style.contentContainer}
                    style={{ marginTop: "20px" }}
                  >
                    <div className={`d-flex justify-content-between pt-4`}>
                      <div>
                        <h5 className="fw-bold" style={{ color: "#6c9196" }}>
                          Meal Chart
                        </h5>
                      </div>
                      <div style={{ marginRight: "25px" }}>
                        <h5>
                          {convertMonth(data?.invoice_month)}-
                          {data?.invoice_year}-{data?.invoice_section}
                        </h5>
                      </div>
                    </div>

                    <p className="" style={{ color: "#707e80" }}>
                      Click specific day button to change meal/dayfeast status
                    </p>

                    {/* Payment Table */}
                    <div className={`table-responsive`}>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Date</th>
                            {data?.breakfast_status === "1" && (
                              <th>Breakfast</th>
                            )}
                            {data?.breakfast_status === "0" &&
                            data?.dinner_status === "0" ? (
                              <>{data?.lunch_status === "1" && <th>Meal</th>}</>
                            ) : (
                              <>
                                {data?.lunch_status === "1" && <th>Lunch</th>}
                              </>
                            )}

                            {data?.dinner_status === "1" && <th>Dinner</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {newArray.map((date, index) => (
                            <tr key={index}>
                              <td>{data?.[`date${index + 1}`]}</td>
                              {/* For Breakfast */}
                              {data?.breakfast_status === "1" && (
                                <td>
                                  <PaymentButton
                                    title="On"
                                    handleClick={handleMealOnOff}
                                    mealName={`b${index + 1}`}
                                    mealStatus={data?.[`b${index + 1}`]}
                                  />
                                </td>
                              )}

                              {/* For Lunch Column */}
                              {data?.lunch_status === "1" && (
                                <td>
                                  <PaymentButton
                                    title="On"
                                    handleClick={handleMealOnOff}
                                    mealName={`l${index + 1}`}
                                    mealStatus={data?.[`l${index + 1}`]}
                                  />
                                </td>
                              )}

                              {/* For dinner column */}
                              {data?.dinner_status === "1" && (
                                <td>
                                  <PaymentButton
                                    title="On"
                                    handleClick={handleMealOnOff}
                                    mealName={`d${index + 1}`}
                                    mealStatus={data?.[`d${index + 1}`]}
                                  />
                                </td>
                              )}
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
