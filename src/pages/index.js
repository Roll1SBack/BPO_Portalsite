import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow py-4 px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="日向BPOセンターの公式ロゴ" width={50} height={50} />
            <h1 className="text-2xl font-bold ml-3">日向BPOセンター</h1>
          </div>
          <nav role="navigation">
            <ul className="flex gap-6">
              <li>
                <Link href="/services" className="hover:underline">
                  サービス紹介
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  会社案内
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-8 py-12 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6 text-center">
          日本のビジネスプロセスアウトソーシング
        </h2>
        <p className="text-lg text-center max-w-2xl mb-8">
          当社は、業務効率化とコスト削減のお手伝いをするために、最先端のBPOサービスを提供しています。お客様のニーズに合わせた柔軟なソリューションで、ビジネスの成長をサポートいたします。
        </p>
        <div className="flex gap-6">
          <Link href="/services" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
            サービス詳細
          </Link>
          <Link href="/contact" className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700">
            お問い合わせ
          </Link>
        </div>
        <div className="mt-12">
          <Image
            src="/office.jpg"
            alt="日向BPOセンターのオフィス風景"
            width={800}
            height={450}
            layout="responsive"
            className="rounded shadow"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow py-6 px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} 日向BPOセンター. All Rights Reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-sm text-gray-600 hover:underline">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:underline">
              利用規約
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}