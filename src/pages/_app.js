import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <link href="https://fonts.cdnfonts.com/css/gibson-walsh" rel="stylesheet"></link>
      <NavBar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer className={pageProps.footerClassName}/>
    </>
  );
}
