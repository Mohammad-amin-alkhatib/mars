import Footer from "@/components/Footer";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <link href="https://fonts.cdnfonts.com/css/gibson-walsh" rel="stylesheet"></link>
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
