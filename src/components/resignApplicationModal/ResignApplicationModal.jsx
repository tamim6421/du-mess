import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "../button/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";

function ResignApplicationModal({ handleClose, show }) {
    const [loadingBtn, setLoadingBtn] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const url = BASE_URL + "/member_feedback/Resign";
  const cookieValue = Cookies.get("TOKEN_LOGIN");
    const handleResignApplication = async(data) => {
        try{
            setLoadingBtn(true);
            const newData = {
                subject: data.subject,
                text: data.message,
                resign_month: data.month
            };
            const response = await axios.post(url, newData, {
              headers: {
                TOKEN_MEMBER: cookieValue,
              }});
              console.log(response)
              if (response.status === 200) {
                if (response.data.status === 200) {
                  toast.success(response.data.message);
                  handleClose();
                  reset();
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
          }catch (err) {
            console.log(err);
            setLoadingBtn(false);
          }
    }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "16px", fontWeight: "bold", color:"#58818a" }}>
            Member Resign Application Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleResignApplication)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: "15px", fontWeight: "bold" }}>
                Select Month
              </Form.Label>
              <Form.Control
                type="month"
                name="dob"
                placeholder="Select Month"
                {...register("month", { required: true })}
              />
              {errors.month && (
                <span className="text-danger">Month is required</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                {...register("subject", { required: true })}
                autoFocus
              />
              {errors.subject && (
                <span className="text-danger">Subject is required</span>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{ fontSize: "15px", fontWeight: "bold" }}>
                Why are you cancelling membership from this month?
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("message", { required: true })}
              />
              {errors.message && (
                <span className="text-danger">Message is required</span>
              )}
            </Form.Group>
            {
              loadingBtn ? (
                <Button title="Loading..." disabled />
              ) : (
                <Button title="Submit" />
              )
            }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
      
          title="Close" className="btn btn-danger" handleClick={handleClose} />
        
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResignApplicationModal;
