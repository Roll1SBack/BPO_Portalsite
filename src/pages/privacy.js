import Head from "next/head";

// Debug: Privacy policy page in light mode only, in /pages/privacy.js, with footer at bottom via Layout.js.
export default function Privacy() {
  return (
    <>
      <Head>
        <title>プライバシーポリシー - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
        <meta
          name="description"
          content="ダイオーミウラBPOビジネスセンターのプライバシーポリシーをご覧ください。"
        />
        <meta property="og:title" content="プライバシーポリシー - ダイオーミウラBPOビジネスセンター" />
        <meta
          property="og:description"
          content="ダイオーミウラBPOビジネスセンターのプライバシーポリシーをご覧ください。"
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com/privacy" />
      </Head>
      <main className="flex-grow"> {/* Ensure content fills viewport for footer via Layout.js */}
        <section className="py-12 px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">プライバシーポリシー</h1>
          <p className="text-lg mb-8 text-center">
            こちらはダイオーミウラBPOビジネスセンターのプライバシーポリシーに関するページです。詳細は後で追加されます。
          </p>
        </section>
      </main>
    </>
  );
}