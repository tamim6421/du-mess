import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import Router from 'next/router';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import DashboardLeftSide from '@/components/dashboard/dashboardLeftSide/DashboardLeftSide';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/footer/Footer';
import HeaderMenu from '@/components/headerMenu/HeaderMenu';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  // Add a listener to listen for route changes
  Router.events.on('routeChangeStart', () => {
    setLoading(true); // Show the custom loading spinner when a route change starts
  });

  Router.events.on('routeChangeComplete', () => {
    setLoading(false); // Hide the loading spinner when a route change is complete
  });

  Router.events.on('routeChangeError', () => {
    setLoading(false); // Hide the loading spinner when a route change has an error
  });

  const router = Router.useRouter();
  const currentPathname = router.pathname;

  // If pathname is not dashboard then show footer
  const shouldShowHeaderFooter = !currentPathname.startsWith('/dashboard')

  return (
    <>

    {/* Menu */}
    {shouldShowHeaderFooter && <HeaderMenu />}

    {/* Dashboard Side */}
    {!shouldShowHeaderFooter && <DashboardLeftSide />}
    
    {/* Component */}
      {
        loading ? (
          <LoadingSpinner />
        ) : (
          <Component {...pageProps} />
        )
      }
      {/* Footer */}
      {shouldShowHeaderFooter && <Footer />}
      <ToastContainer />
    </>
  )
}
