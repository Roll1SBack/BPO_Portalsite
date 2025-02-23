import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";

// Debug: Homepage content only (no header/footer).
export default function Home() {
  return (
    <>
      <Head>
        <title>日向BPOセンター</title>
        <meta name="description" content="あなたのビジネスを加速するBPOソリューション" />
        <meta property="og:title" content="日向BPOセンター" />
        <meta property="og:description" content="あなたのビジネスを加速するBPOソリューション" />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com" />
      </Head>
        <main>
          {/* Debug: Hero Section */}
          <section className="relative bg-blue-600 text-white py-20 text-center dark:bg-blue-900 z-0">
            <Image
              src="/office.png"
              alt="日向BPOセンターのオフィス"
              width={1024}
              height={576}
              className="absolute inset-0 w-full h-full object-cover opacity-20 z-[-1]"
            />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                あなたのビジネスを加速するBPOソリューション
              </h2>
              <p className="text-lg mb-8">
                EC運営からデータ処理まで、業務効率化とコスト削減を実現します。
              </p>
              <Link href="/quote" className="px-6 py-3 bg-white text-blue-600 rounded hover:bg-gray-200 dark:bg-gray-200 dark:text-blue-800 dark:hover:bg-gray-300">
                無料見積もり
              </Link>
            </div>
          </section>

          {/* Debug: Service Previews */}
          <section className="py-12 px-8 max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-10">私たちのサービス</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "EC・フルフィルメント", href: "/services/ec-fulfillment", img: "/ec.png" },
                { name: "アセンブリ・セット作業", href: "/services/assembly", img: "/assembly.png" },
                { name: "事務局代行", href: "/services/secretariat", img: "/secretariat.png" },
                { name: "在庫管理・受発注業務", href: "/services/inventory", img: "/inventory.png" },
                { name: "データ処理・オーバープリント", href: "/services/data-processing", img: "/data.png" },
              ].map((service) => (
                <Link key={service.href} href={service.href} className="block">
                  <div className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition dark:bg-gray-800 dark:shadow-gray-700">
                    <Image
                      src={service.img}
                      alt={`${service.name}のイメージ`}
                      width={400}
                      height={225}
                      className="w-full h-auto"
                    />
                    <div className="p-4">
                      <h4 className="text-xl font-semibold">{service.name}</h4>
                      <p className="text-gray-600 mt-2 dark:text-gray-400">詳細を見る</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
    </>
  );
}