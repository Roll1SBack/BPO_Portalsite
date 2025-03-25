import { Html, Head, Main, NextScript } from "next/document";

// Debug: Custom document for site-wide HTML structure with Tailwind support.
export default function Document() {
  return (
    <Html lang="ja"> {/* Changed to "ja" for Japanese content */}
      <Head>
        {/* Add any global meta tags or styles here if needed */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo_BPO.svg" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}