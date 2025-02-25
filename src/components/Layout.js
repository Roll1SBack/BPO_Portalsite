import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Debug: Site-wide Layout in light mode only, with dropdowns closing on menu clicks, clickable サービス一覧 and 成功事例.
export default function Layout({ children, extraContact = null }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [caseDropdownOpen, setCaseDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);
  const caseTimeoutRef = useRef(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 50);
  };

  const handleCaseMouseEnter = () => {
    if (caseTimeoutRef.current) clearTimeout(caseTimeoutRef.current);
    setCaseDropdownOpen(true);
  };

  const handleCaseMouseLeave = () => {
    caseTimeoutRef.current = setTimeout(() => setCaseDropdownOpen(false), 50);
  };

  const handleDropdownClick = () => {
    setDropdownOpen(false);
  };

  const handleCaseDropdownClick = () => {
    setCaseDropdownOpen(false);
  };

  const isActive = (href) => router.pathname === href || (href === "/services" && router.pathname.startsWith("/services/"));

  // Service data for breadcrumbs (matching the dropdown in the menu)
  const services = {
    "ec-fulfillment": "EC・フルフィルメント",
    assembly: "アセンブリ・セット作業",
    secretariat: "事務局代行",
    inventory: "在庫管理・受発注業務",
    "data-processing": "データ処理・オーバープリント",
  };

  // Close dropdowns when navigating to list pages
  const handleMenuClick = (path, isService) => {
    if (isService) {
      setDropdownOpen(false);
    } else {
      setCaseDropdownOpen(false);
    }
    router.push(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow py-4 px-8">
        <div className="flex flex-col items-start justify-between max-w-7xl mx-auto">
          <div className="mb-4 flex items-center justify-between w-full">
            <div className="w-[200px]"> {/* Fixed width container for logo */}
              <Image 
                src="/logo.jpg" 
                alt="ダイオーミウラBPOビジネスセンターの公式ロゴ" 
                width={200} 
                height={200} 
              />
            </div>
            <h1 className="text-3xl font-extrabold tracking-wide text-gray-800 ml-4 animate-pulse text-yellow-300 hover:text-yellow-400 transition-colors duration-500 flex-1 text-center">
              BPOビジネスセンター
            </h1>
            <div className="w-[200px]"></div> {/* Spacer div to balance the logo */}
          </div>
          <div className="flex items-end justify-between w-full"> {/* Menu and buttons on same line */}
            <nav role="navigation">
              <ul className="flex gap-6 items-end"> {/* Aligned with buttons bottom */}
                {/* Main menu items */}
                <li>
                  <Link
                    href="/"
                    className={`hover:underline px-4 py-2 block ${isActive("/") ? "underline text-blue-600" : ""}`}
                  >
                    私たちについて
                  </Link>
                </li>
                <li className="relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <Link
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick("/services", true);
                    }}
                    className={`hover:underline px-4 py-2 block cursor-pointer ${isActive("/services") ? "underline text-blue-600" : ""}`}
                  >
                    サービス一覧
                  </Link>
                  {/* Restored Dropdown Menu (exact match to your provided version) */}
                  <ul 
                    className={`absolute hidden group-hover:block w-64 bg-white shadow-lg p-2 rounded z-50 transition-opacity duration-100 ${dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
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
                          className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap"
                          onClick={handleDropdownClick}
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="relative group" onMouseEnter={handleCaseMouseEnter} onMouseLeave={handleCaseMouseLeave}>
                  <Link
                    href="/cases"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick("/cases", false);
                    }}
                    className={`hover:underline px-4 py-2 block cursor-pointer ${isActive("/cases") || router.pathname.startsWith("/cases/") ? "underline text-blue-600" : ""}`}
                  >
                    成功事例
                  </Link>
                  {/* Restored Dropdown Menu for 成功事例 (exact match to your provided version) */}
                  <ul 
                    className={`absolute hidden group-hover:block w-64 bg-white shadow-lg p-2 rounded z-50 transition-opacity duration-100 ${caseDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                  >
                    {[
                      { name: "成功事例TOP", href: "/cases" },
                      { name: "EC事業の効率化", href: "/cases/ec-efficiency" },
                      { name: "製造プロセスの最適化", href: "/cases/manufacturing-optimization" },
                      { name: "事務作業の自動化", href: "/cases/office-automation" },
                      { name: "在庫管理の改善", href: "/cases/inventory-improvement" },
                      { name: "データ処理の高速化", href: "/cases/data-processing-speedup" },
                    ].map((caseStudy) => (
                      <li key={caseStudy.href}>
                        <Link
                          href={caseStudy.href}
                          className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap"
                          onClick={handleCaseDropdownClick}
                        >
                          {caseStudy.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <Link
                    href="/columns"
                    className={`hover:underline px-4 py-2 block ${isActive("/columns") || router.pathname.startsWith("/columns/") ? "underline text-blue-600" : ""}`}
                  >
                    コラム
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className={`hover:underline px-4 py-2 block ${isActive("/faq") ? "underline text-blue-600" : ""}`}
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documents"
                    className={`hover:underline px-4 py-2 block ${isActive("/documents") ? "underline text-blue-600" : ""}`}
                  >
                    資料請求
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-end gap-2"> {/* Buttons on same line as menu, different colors with icons, uniform size */}
              <Link
                href="/quote"
                className="w-32 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <span>🧮</span> 無料見積
              </Link>
              <Link
                href="/contact"
                className="w-32 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <span>📞</span> お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb (Optional, simple version, can refine or remove later) */}
      <nav className="bg-gray-200 py-2 px-8 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto">
          {router.pathname === "/" && "Top"}
          {router.pathname === "/services" && "Top - 私たちについて - サービス一覧"}
          {router.pathname.startsWith("/services/") && router.pathname !== "/services" && 
            `Top - 私たちについて - サービス一覧 - ${services[router.pathname.split("/").pop()] || "詳細"}`}
          {router.pathname === "/cases" && "Top - 私たちについて - 成功事例"}
          {router.pathname.startsWith("/cases/") && "Top - 私たちについて - 成功事例 - " + (caseStudies[router.pathname.split("/").pop()]?.title || "詳細")}
          {router.pathname === "/columns" && "Top - 私たちについて - コラム"}
          {router.pathname.startsWith("/columns/") && "Top - 私たちについて - コラム - " + (articles[router.pathname.split("/").pop()]?.title || "詳細")}
          {router.pathname === "/documents" && "Top - 私たちについて - 資料請求"}
          {router.pathname === "/quote" && "Top - 私たちについて - 無料見積"}
          {router.pathname === "/contact" && "Top - 私たちについて - お問い合わせ"}
          {router.pathname === "/environmental" && "Top - 私たちについて - 環境への取り組み"}
          {router.pathname === "/sitemap" && "Top - 私たちについて - サイトマップ"}
          {router.pathname === "/terms" && "Top - 私たちについて - サイトご利用上の注意"}
          {router.pathname === "/privacy" && "Top - 私たちについて - プライバシーポリシー"}
        </div>
      </nav>

      <main className="flex-grow">{children}</main>

      {extraContact && extraContact}

      <footer className="bg-white shadow py-6 px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} ダイオーミウラ株式会社. All Rights Reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/environmental" className="text-sm text-gray-600 hover:underline">環境への取り組み</Link>
            <Link href="/sitemap" className="text-sm text-gray-600 hover:underline">サイトマップ</Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:underline">サイトご利用上の注意</Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:underline">プライバシーポリシー</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Placeholder data for breadcrumbs (to be expanded with real content)
const caseStudies = {
  "ec-efficiency": { title: "EC事業の効率化" },
  "manufacturing-optimization": { title: "製造プロセスの最適化" },
  "office-automation": { title: "事務作業の自動化" },
  "inventory-improvement": { title: "在庫管理の改善" },
  "data-processing-speedup": { title: "データ処理の高速化" },
};

const articles = {
  article1: { title: "BPOの最新トレンド2025" },
  article2: { title: "EC業務の効率化Tips" },
  article3: { title: "データ処理のベストプラクティス" },
  article4: { title: "在庫管理の課題と解決策" },
  article5: { title: "事務作業の自動化事例" },
};