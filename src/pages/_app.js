import Layout from "../components/Layout";
import "../styles/globals.css";

// Debug: App component wrapping all pages with Layout.
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}