import Head from "next/head";

// Debug: Environmental initiatives page in light mode only, in /pages/environmental.js, with footer at bottom via Layout.js.
export default function Environmental() {
  return (
    <>
      <Head>
        <title>環境への取り組み - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
        <meta
          name="description"
          content="ダイオーミウラBPOビジネスセンターの環境への取り組みをご覧ください。"
        />
        <meta property="og:title" content="環境への取り組み - ダイオーミウラBPOビジネスセンター" />
        <meta
          property="og:description"
          content="ダイオーミウラBPOビジネスセンターの環境への取り組みをご覧ください。"
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com/environmental" />
      </Head>
      <main className="flex-grow"> {/* Ensure content fills viewport for footer via Layout.js */}
        <section className="py-12 px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">環境への取り組み</h1>
          <p className="text-lg mb-8 text-center">
            こちらはダイオーミウラBPOビジネスセンターの環境への取り組みに関するページです。詳細は後で追加されます。
          </p>
        </section>
      </main>
    </>
  );
}