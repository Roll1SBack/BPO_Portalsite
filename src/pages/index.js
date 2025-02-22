import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const services = [
    { name: "EC・フルフィルメント", href: "/services/ec-fulfillment", img: "/ec.png" },
    { name: "アセンブリ・セット作業", href: "/services/assembly", img: "/assembly.png" },
    { name: "事務局代行", href: "/services/secretariat", img: "/secretariat.png" },
    { name: "在庫管理・受発注業務", href: "/services/inventory", img: "/inventory.png" },
    { name: "データ処理・オーバープリント", href: "/services/data-processing", img: "/data.png" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white shadow py-4 px-8 sticky top-0 z-10 dark:bg-gray-800 dark:shadow-gray-700">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="日向BPOセンターの公式ロゴ" width={50} height={50} />
            <h1 className="text-2xl font-bold ml-3">日向BPOセンター</h1>
          </div>
          <nav role="navigation">
            <ul className="flex gap-6">
              <li className="relative group">
                <span className="hover:underline cursor-pointer">サービス一覧</span>
                <ul className="absolute hidden group-hover:block w-64 bg-white shadow-lg p-2 mt-1 rounded dark:bg-gray-700">
                  {services.map((service) => (
                    <li key={service.href}>
                      <Link href={service.href} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 whitespace-nowrap">
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li><Link href="/cases" className="hover:underline">導入事例</Link></li>
              <li><Link href="/columns" className="hover:underline">コラム</Link></li>
              <li><Link href="/contact" className="hover:underline">お問い合わせ</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 text-center dark:bg-blue-900">
        <Image
          src="/office.png"
          alt="日向BPOセンターのオフィス"
          width={1024}
          height={576}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
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

      {/* Service Previews */}
      <section className="py-12 px-8 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-10">私たちのサービス</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
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

      {/* Footer */}
      <footer className="bg-white shadow py-6 px-8 mt-auto dark:bg-gray-800 dark:shadow-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} 日向BPOセンター. All Rights Reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-sm text-gray-600 hover:underline dark:text-gray-400">プライバシーポリシー</Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:underline dark:text-gray-400">利用規約</Link>
            <Link href="/sitemap" className="text-sm text-gray-600 hover:underline dark:text-gray-400">サイトマップ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}