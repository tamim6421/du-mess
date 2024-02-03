/* eslint-disable react/jsx-no-duplicate-props */
import AboutHostel from "@/components/about/aboutHostel/AboutHostel";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>ABOUT | AMADER HOSTEL</title>
        <meta name="description" content="Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main style={{ background: "#edf0f2" }}>
        <AboutHostel />
      </main>
    </>
  );
}
