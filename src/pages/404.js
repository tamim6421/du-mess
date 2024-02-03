import Style from "@/styles/errorPage.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const ErrorPage = () => {
    const router = useRouter();

    setTimeout(() => {
        router.push("/");
    }, 5000)


  return (
    <div className={Style.main}>
      <div className={Style.section}>
        <h1 className={Style.error}>404</h1>
        <div className={Style.page}>
          Ooops!!! The page you are looking for is not found
        </div>
        <Link href="/" className={Style.backHome}>Back to home</Link>
      </div>
    </div>
  );
};

export default ErrorPage