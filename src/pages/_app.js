import Footer from "@/components/Footer";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const { keywords, description, title, canonicalUrl, imageUrl } = pageProps?.meta || {};

  return (
    <>
      <link href="https://fonts.cdnfonts.com/css/gibson-walsh" rel="stylesheet"></link>
      <main>
        <Head>
          {title && <title>{title}</title>}
          {description && <meta name="description" content={description} />}
          <meta content="Mars" property="og:site_name" />
          {description && <meta name="og:description" content={description} />}
          {title && <meta name="og:title" content={title} />}
          {imageUrl && <meta property="og:image" content={imageUrl} />}
          {keywords && <meta name="keywords" content={keywords} />}
          <meta content="summary" name="twitter:card" />
          <meta content="@mars" name="twitter:site" />
          {imageUrl && <meta content={imageUrl} name="twitter:image" />}
          {title && <meta content={title} name="twitter:title" />}
          {description && <meta content={description} name="twitter:description" />}
          <meta content="width=device-width,initial-scale=1,maximum-scale=5" name="viewport" />
          <meta charSet="utf-8" />
          <meta content="#000000" name="theme-color" />
          {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
          {imageUrl && <meta content={imageUrl} itemProp="thumbnailURL" />}
          <link href='/mars-logo.svg' rel="shortcut icon" />
          <meta content="origin-when-cross-origin" name="referrer" />
        </Head>
        <Component {...pageProps} />
      </main>
      <Footer className={pageProps.footerClassName} />
    </>
  );
}
