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
import TopTitle from "@/components/topTitle/TopTitle";

export default function Payment() {
  const [data, setData] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  console.log(id)

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
  const tableArray = [
    
    {
        title: "Invoice No",
        value: payment?.id
    },
    {
        title: "Invoice Month",
        value: payment?.invoice_month
    },
    {
        title: "Invoice Section",
        value: payment?.invoice_section
    },
    {
        title: "Previous Reserve Amount",
        value: payment?.pre_reserve_amount
    },
    {
        title: "Previous Refund Amount",
        value: payment?.pre_refund
    },
    {
        title: "Previous Month Due",
        value: payment?.pre_monthdue
    },
    {
        title: "Hostel Fee",
        value: payment?.hostel_fee
    },
    {
        title: "Total Section Day",
        value: payment?.section_day
    },
    {
        title: "Breakfast Rate",
        value: payment?.breakfast_rate
    },
    {
        title: "Lunch Rate",
        value: payment?.lunch_rate
    },
    {
        title: "Dinner Rate",
        value: payment?.dinner_rate
    },
    {
        title: "Total Meal Amount",
        value: payment?.cur_meal_amount
    },
    {
        title: "Employee",
        value: payment?.employee
    },
    {
        title: "Friday",
        value: payment?.friday
    },
    {
        title: "Feast",
        value: payment?.feast
    },
    {
        title: "Welfare",
        value: payment?.welfare
    },
    {
        title: "Others",
        value: payment?.others
    },
    {
        title: "Gass",
        value: payment?.gass
    },
    {
        title: "Electricity",
        value: payment?.electricity
    },
    {
        title: "Tissue",
        value: payment?.tissue
    },
    {
        title: "Water",
        value: payment?.water
    },
    {
        title: "Dirt",
        value: payment?.dirt
    },
    {
        title: "Wifi",
        value: payment?.wifi
    },
    {
        title: "Card Fee",
        value: payment?.card_fee
    },
    {
        title: "Security Money",
        value: payment?.security
    },
    {
        title: "Service Charge",
        value: payment?.service_charge
    },
    {
        title: "Total Others Amount",
        value: payment?.cur_others_amount
    },
    {
        title: "Withdraw Status",
        value: payment?.withdraw_status
    },
    {
        title: "Total Inactive Meal Amount",
        value: payment?.inmeal_amount
    },
    {
        title: "Payable Amount",
        value: payment?.payble_amount
    },
    {
        title: "First payment  Meal No",
        value: payment?.first_pay_mealon
    },
    {
        title: "First payment Meal Amount",
        value: payment?.first_pay_mealamount
    },
    {
        title: "First Others Amount",
        value: payment?.first_others_amount
    },
    {
        title: "First Payable Amount",
        value: payment?.payble_amount1
    },
    {
        title: "First Payable Status",
        value: payment?.payment_status1
    },
    {
        title: "Second Meal No",
        value: payment?.second_pay_mealon
    },
    {
        title: "Second Meal Amount",
        value: payment?.second_pay_mealamount
    },
    {
        title: "Second Others Amount",
        value: payment?.second_others_amount
    },
    {
        title: "Second Payable Amount",
        value: payment?.payble_amount2
    },
    {
        title: "Second Payable Status",
        value: payment?.payment_status2
    },
    {
        title: "Breakfast ON Meal",
        value: payment?.breakfast_onmeal
    },
    {
        title: "Breakfast OFF Meal",
        value: payment?.breakfast_offmeal
    },
    {
        title: "Breakfast Inactive Meal",
        value: payment?.breakfast_inmeal
    },
    {
        title: "Lunch ON Meal",
        value: payment?.lunch_onmeal
    },
    {
        title: "Lunch OFF Meal",
        value: payment?.lunch_offmeal
    },
    {
        title: "Lunch Inactive Meal",
        value: payment?.lunch_inmeal
    },
    {
        title: "Dinner ON Meal",
        value: payment?.dinner_onmeal
    },
    {
        title: "Dinner OFF Meal",
        value: payment?.dinner_offmeal
    },
    {
        title: "Dinner Inactive Meal",
        value: payment?.dinner_inmeal
    },
    {
        title: "Total On Meal Amount",
        value: payment?.onmeal_amount
    },
    {
        title: "Refund Breakfast Rate",
        value: payment?.refund_breakfast_rate
    },
    {
        title: "Refund Lunch Rate",
        value: payment?.refund_lunch_rate
    },
    {
        title: "Refund Dinner Rate",
        value: payment?.refund_dinner_rate
    },
    {
        title: "Reduce Meal Amount",
        value: payment?.mealreducetk
    },
    {
        title: "Total OFF Meal Amount",
        value: payment?.offmeal_amount
    },

    {
        title: "Refund feast",
        value: payment?.refund_feast
    },
    {
        title: "Refund Welfare",
        value: payment?.refund_welfare
    },
    {
        title: "Refund Friday",
        value: payment?.refund_friday
    },
    {
        title: "Refund Employee",
        value: payment?.refund_employee
    },
    {
        title: "Refund Others",
        value: payment?.refund_others
    },
    {
        title: "Refund Tissue",
        value: payment?.refund_tissue
    },
    {
        title: "Refund gass",
        value: payment?.refund_gass
    },
    {
        title: "Refund Electricity",
        value: payment?.refund_electricity
    },
    {
        title: "Refund Water",
        value: payment?.refund_water
    },
    {
        title: "Refund Wifi",
        value: payment?.refund_wifi
    },
    {
        title: "Refund Dirt",
        value: payment?.refund_dirt
    },
    {
        title: "Total Refund",
        value: payment?.total_refund
    },
    {
        title: "Due Amount",
        value: payment?.total_due
    },
    {
        title: "Reserve Amount",
        value: payment?.reserve_amount
    },
]

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
              <Row className="mb-4 mt-4">
                <TopTitle title="Payment View Details" textAlign="left" />
                <Col md={8} sm={12}>
                  <div className={Style.contentContainer}>
                    {/* Payment Table */}
                    <div className="table-responsive">
                      <Table striped bordered hover size="sm" className="py-4 px-4">
                        <tbody>
                          {tableArray.map((item, index) => (
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
