import Layout from "@/components/Layout";
import Link from "next/link";
import Head from "next/head";

export default function ServicesOverview() {
  return (
    <>
      <Head>
        <title>事業内容TOP - 日向BPOセンター</title>
        <meta name="description" content="当社の5つのコアBPOサービスをご覧ください。" />
      </Head>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <main className="py-12 px-8 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">事業内容TOP</h2>
            <p className="text-lg text-center mb-8">当社の5つのコアBPOサービスをご覧ください。</p>
            <ul className="list-disc pl-6">
              <li><Link href="/services/ec-fulfillment" className="hover:underline">EC・フルフィルメント</Link></li>
              <li><Link href="/services/assembly" className="hover:underline">アセンブリ・セット作業</Link></li>
              <li><Link href="/services/secretariat" className="hover:underline">事務局代行</Link></li>
              <li><Link href="/services/inventory" className="hover:underline">在庫管理・受発注業務</Link></li>
              <li><Link href="/services/data-processing" className="hover:underline">データ処理・オーバープリント</Link></li>
            </ul>
          </main>
      </div>
    </>
  );
}