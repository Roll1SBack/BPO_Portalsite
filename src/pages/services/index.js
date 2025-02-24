import Head from "next/head";
import Link from "next/link";

// Debug: Services overview page in light mode only, in /pages/services/index.js, with footer at bottom via Layout.js.
export default function ServicesOverview() {
  return (
    <>
      <Head>
        <title>事業内容TOP - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
        <meta name="description" content="当社の5つのコアBPOサービスをご覧ください。" />
        <meta property="og:title" content="事業内容TOP - ダイオーミウラBPOビジネスセンター" />
        <meta property="og:description" content="当社の5つのコアBPOサービスをご覧ください。" />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com/services" />
      </Head>
      <main className="flex-grow"> {/* Ensure content fills viewport for footer via Layout.js */}
        <section className="py-12 px-8 max-w-4xl mx-auto"> {/* Removed min-h to rely on flex-grow and Layout.js */}
          <h2 className="text-4xl font-bold mb-6 text-center">事業内容TOP</h2>
          <p className="text-lg text-center mb-8">当社の5つのコアBPOサービスをご覧ください。</p>
          <ul className="list-disc pl-6">
            <li><Link href="/services/ec-fulfillment" className="hover:underline">EC・フルフィルメント</Link></li>
            <li><Link href="/services/assembly" className="hover:underline">アセンブリ・セット作業</Link></li>
            <li><Link href="/services/secretariat" className="hover:underline">事務局代行</Link></li>
            <li><Link href="/services/inventory" className="hover:underline">在庫管理・受発注文業務</Link></li>
            <li><Link href="/services/data-processing" className="hover:underline">データ処理・オーバープリント</Link></li>
          </ul>
        </section>
      </main>
    </>
  );
}