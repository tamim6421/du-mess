/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import Style from "@/styles/dashboard/payment.module.css";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import EntriesSearch from "@/components/dashboard/dashboardHeader/entriesSearch/EntriesSearch";
import Button from "@/components/button/Button";
import { BASE_URL } from "@/utils/api";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ResignApplicationModal from "@/components/resignApplicationModal/ResignApplicationModal";

export default function Resign() {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [resignMember, setResignMember] = useState([]);
  const [show, setModalShow] = useState(false);
  const router = useRouter();

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const cookieValue = Cookies.get("TOKEN_LOGIN");
  useEffect(() => {
    axios
      .get(BASE_URL + "/member_feedback_view/Resign", {
        headers: {
          // Set your cookie in the request headers
          TOKEN_MEMBER: cookieValue,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            setLoadingBtn(false);
            setResignMember(response.data.data);
          } else if (response.data.status === 500) {
            toast.error(response.data.message);
            setLoadingBtn(false);
            router.push("/");
          } else {
            toast.error("Something went wrong");
            setLoadingBtn(false);
          }
        }
        setLoadingBtn(false);
      });
  }, [cookieValue, router, show]);


  return (
    <>
      <Head>
        <title>DASHBOARD | Resign</title>
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
                    className={`${Style.contentContainer} py-3`}
                    style={{ marginTop: "20px" }}
                  >
                    <div className="">
                      <div >
                        <p className="fw-bold fs-4" style={{color:"#58818a"}}>Member Resign Application</p>
                      </div>
                      <div style={{ marginRight: "15px", marginBottom:"10px" }}>
                        <Button  title="Application" className="" handleClick={handleShow} />
                      </div>
                     
                    </div>

                    {/* <EntriesSearch /> */}
                    {/* Payment Table */}
                    <div className="table-responsive">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Card No</th>
                            <th>Submitted Date</th>
                            <th>MealOff Month</th>
                            <th>Reason</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resignMember?.map((member) => (
                            <tr key={member.id}>
                              <td>{member.member_id}</td>
                              <td>{member.submited_time}</td>
                              <td>{member.resign_month}</td>
                              <td>{member.text}</td>
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
              <ResignApplicationModal show={show} handleShow={handleShow} handleClose={handleClose} />
      </main>
    </>
  );
}
