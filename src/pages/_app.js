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
          {description && <meta name="og:description" content={description} />}
          {description && <meta name="twitter:description" content={description} />}
          {title && <meta name="og:title" content={title} />}
          {title && <meta name="twitter:title" content={title} />}
          {keywords && <meta name="keywords" content={keywords} />}
          <meta content="width=device-width,initial-scale=1,maximum-scale=5" name="viewport" />
          <meta charSet="utf-8" />
          <meta content="#000000" name="theme-color" />
          {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
          {imageUrl && <meta property="og:image" content={imageUrl} />}
          {imageUrl && <meta name="twitter:image" content={imageUrl} />}
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
