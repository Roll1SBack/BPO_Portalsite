import Head from "next/head";

// Debug: Site usage terms page in light mode only, in /pages/terms.js, with footer at bottom via Layout.js.
export default function Terms() {
  return (
    <>
      <Head>
        <title>サイトご利用上の注意 - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
        <meta
          name="description"
          content="ダイオーミウラBPOビジネスセンターのサイトご利用上の注意をご覧ください。"
        />
        <meta property="og:title" content="サイトご利用上の注意 - ダイオーミウラBPOビジネスセンター" />
        <meta
          property="og:description"
          content="ダイオーミウラBPOビジネスセンターのサイトご利用上の注意をご覧ください。"
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com/terms" />
      </Head>
      <main className="flex-grow"> {/* Ensure content fills viewport for footer via Layout.js */}
        <section className="py-12 px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">サイトご利用上の注意</h1>
          <p className="text-lg mb-8 text-center">
            こちらはダイオーミウラBPOビジネスセンターのサイトご利用上の注意に関するページです。詳細は後で追加されます。
          </p>
        </section>
      </main>
    </>
  );
}