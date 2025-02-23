import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children, extraContact = null }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 50);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white shadow py-4 px-8 sticky top-0 z-50 dark:bg-gray-800 dark:shadow-gray-700">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="日向BPOセンターの公式ロゴ" width={50} height={50} />
            <h1 className="text-2xl font-bold ml-3">日向BPOセンター</h1>
          </div>
          <div className="flex items-center gap-6">
            <nav role="navigation">
              <ul className="flex gap-6">
                {/* Wrap "サービス一覧" and dropdown in a single div */}
                <div 
                  className="relative group"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* "サービス一覧" is now part of the same hover area */}
                  <button className="hover:underline px-4 py-2 block">
                    サービス一覧
                  </button>

                  {/* Dropdown Menu */}
                  <ul 
                    className={`absolute left-0 w-64 bg-white shadow-lg p-2 rounded z-50 dark:bg-gray-700 transition-opacity duration-100 ${dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                  >
                    {[
                      { name: "事業内容TOP", href: "/services" },
                      { name: "EC・フルフィルメント", href: "/services/ec-fulfillment" },
                      { name: "アセンブリ・セット作業", href: "/services/assembly" },
                      { name: "事務局代行", href: "/services/secretariat" },
                      { name: "在庫管理・受発注業務", href: "/services/inventory" },
                      { name: "データ処理・オーバープリント", href: "/services/data-processing" },
                    ].map((service) => (
                      <li key={service.href}>
                        <Link
                          href={service.href}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 whitespace-nowrap"
                          onClick={() => setDropdownOpen(false)} // Close on click
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Other menu items */}
                <li><Link href="/cases" className="hover:underline px-4 py-2 block">導入事例</Link></li>
                <li><Link href="/columns" className="hover:underline px-4 py-2 block">コラム</Link></li>
                <li><Link href="/documents" className="hover:underline px-4 py-2 block">資料請求</Link></li>
                <li><Link href="/quote" className="hover:underline px-4 py-2 block">無料見積</Link></li>
              </ul>
            </nav>
            <Link href="/contact" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 z-40">
              お問い合わせ
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {extraContact && extraContact}

      <footer className="bg-white shadow py-6 px-8 mt-auto dark:bg-gray-800 dark:shadow-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} 日向BPOセンター. All Rights Reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/environmental" className="text-sm text-gray-600 hover:underline dark:text-gray-400">環境への取り組み</Link>
            <Link href="/sitemap" className="text-sm text-gray-600 hover:underline dark:text-gray-400">サイトマップ</Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:underline dark:text-gray-400">サイトご利用上の注意</Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:underline dark:text-gray-400">プライバシーポリシー</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}