/* eslint-disable @next/next/no-img-element */
import { BASE_URL } from "@/utils/apibase";
import axios from "axios";
import Head from "next/head";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Journey() {
  const router = useRouter();
  const { id } = router.query;
//   console.log(id)

  useEffect(() => {
    (async()=> {
      axios.get(BASE_URL + `/member/email_verify/${id}`).then((response) => {
        
        if (response.status === 200) {
          if (response.data.status === 200) {
          //   const res = response.data.message;
            Swal.fire("Congratulations!", "Email Verified", "success");
            router.push("/");
          } else if (
            response.data.status === 600 
          ) {
            toast.error(response.data.message)
          }
          else if(response.data.status === 400){
            toast.error(response.data.message)
          }
          else{
              toast.error("Email not verified")
          }
        }
      });
    })()
    
  }, [id]);

  return (
    <>
      <Head>
        <title>Email_Verify</title>
        <meta name="description" content="Email Verify" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main></main>
    </>
  );
}