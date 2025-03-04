import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { slide as Menu } from "react-burger-menu";
import { FaCalculator, FaEnvelope, FaMailBulk, FaPhone } from "react-icons/fa";

export default function Layout({ children, extraContact = null }) {
  const [dropdownOpen, setDropdownOpen] = useState({ services: false, cases: false });
  const timeoutRef = useRef(null);
  const caseTimeoutRef = useRef(null);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseEnter = (type) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (caseTimeoutRef.current) clearTimeout(caseTimeoutRef.current);
    setDropdownOpen((prev) => ({ ...prev, [type]: true }));
  };

  const handleMouseLeave = (type) => {
    const timeout = setTimeout(() => {
      setDropdownOpen((prev) => ({ ...prev, [type]: false }));
    }, 50);
    if (type === "services") timeoutRef.current = timeout;
    else caseTimeoutRef.current = timeout;
  };

  const handleDropdownClick = (type) => {
    setDropdownOpen((prev) => ({ ...prev, [type]: false }));
  };

  const isActive = (href) =>
    router.pathname === href || (href === "/services" && router.pathname.startsWith("/services/"));

  const services = {
    "ec-fulfillment": "EC・フルフィルメント",
    assembly: "アセンブリ・セット作業",
    secretariat: "事務局代行",
    inventory: "在庫管理・受発注業務",
    "data-processing": "データ処理・オーバープリント",
  };

  const handleMenuClick = (path, isService) => {
    setDropdownOpen({ services: false, cases: false });
    router.push(path);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuStyles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      right: "20px",
      top: "20px",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmMenuWrap: {
      top: "0",
      background: "rgba(0, 0, 0, 0.3)",
    },
    bmMenu: {
      background: "#ffe",
      padding: "2.5em 1.5em 0",
      fontSize: "1.00em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.1em",
      flexDirection: "column",
      display: "flex",
    },
    bmItem: {
      display: "inline-block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo and Subtitle */}
            <div className="flex items-center space-x-4">
              <Link href="/">
                <div className="w-48">
                  <Image
                    src="/logo_full.jpeg"
                    alt="ダイオーミウラBPOビジネスセンターの公式ロゴ"
                    width={200}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </Link>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-orange-700">BPOビジネスセンター</h1>
                {/* Subtitle 
                <p className="text-sm text-gray-600">DMPSよりの極限の効率と価値創造、ビジネスに革新を。</p>
              */}
                </div>
            </div>

            {/* Navigation */}
            <nav role="navigation" className="hidden md:block">
              <ul className="flex gap-4 items-center">
              <li>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href="/"
                      className={`hover:underline px-0 py-3 block text-lg font-semibold whitespace-nowrap ${isActive("/") ? "underline text-blue-600" : "text-gray-900"}`}
                    >
                      私たちについて
                    </Link>
                  </motion.div>
                </li>
                <li className="relative group" onMouseEnter={() => handleMouseEnter("services")} onMouseLeave={() => handleMouseLeave("services")}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href="/services"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClick("/services", true);
                      }}
                      className={`hover:underline px-4 py-3 block text-lg font-semibold cursor-pointer whitespace-nowrap ${isActive("/services") ? "underline text-blue-600" : "text-gray-900"}`}
                    >
                      サービス
                    </Link>
                  </motion.div>
                  {/* Restored Dropdown Menu with Animation */}
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={dropdownOpen.services ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute hidden group-hover:block w-50 bg-white shadow-lg p-3 rounded-lg z-50 transition-opacity duration-100 ${dropdownOpen.services ? "opacity-100 visible" : "opacity-0 invisible"}`}
                  >
                    {[
                      { name: "事業内容TOP", href: "/services" },
                      { name: "EC・フルフィルメント", href: "/services/ec-fulfillment" },
                      { name: "アセンブリ・セット作業", href: "/services/assembly" },
                      { name: "事務局代行", href: "/services/secretariat" },
                      { name: "在庫管理・受発注業務", href: "/services/inventory" },
                      { name: "データ処理・オーバープリント", href: "/services/data-processing" },
                    ].map((service) => (
                      <motion.li key={service.href} whileHover={{ scale: 1.05 }}>
                        <Link
                          href={service.href}
                          className="block px-1 py-2 hover:bg-gray-100 text-base font-medium text-gray-800 hover:text-blue-600 whitespace-nowrap"
                          onClick={() => handleDropdownClick("services")}
                        >
                          {service.name}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </li>
                <li className="relative group" onMouseEnter={() => handleMouseEnter("cases")} onMouseLeave={() => handleMouseLeave("cases")}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href="/cases"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClick("/cases", false);
                      }}
                      className={`hover:underline px-4 py-3 block text-lg font-semibold cursor-pointer whitespace-nowrap ${isActive("/cases") || router.pathname.startsWith("/cases/") ? "underline text-blue-600" : "text-gray-900"}`}
                    >
                      成功事例
                    </Link>
                  </motion.div>
                  {/* Restored Dropdown Menu for 成功事例 with Animation */}
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={dropdownOpen.cases ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute hidden group-hover:block w-50 bg-white shadow-lg p-3 rounded-lg z-50 transition-opacity duration-100 ${dropdownOpen.cases ? "opacity-100 visible" : "opacity-0 invisible"}`}
                  >
                    {[
                      { name: "成功事例TOP", href: "/cases" },
                      { name: "EC事業の効率化", href: "/cases/ec-efficiency" },
                      { name: "製造プロセスの最適化", href: "/cases/manufacturing-optimization" },
                      { name: "事務作業の自動化", href: "/cases/office-automation" },
                      { name: "在庫管理の改善", href: "/cases/inventory-improvement" },
                      { name: "データ処理の高速化", href: "/cases/data-processing-speedup" },
                    ].map((caseStudy) => (
                      <motion.li key={caseStudy.href} whileHover={{ scale: 1.05 }}>
                        <Link
                          href={caseStudy.href}
                          className="block px-1 py-2 hover:bg-gray-100 text-base font-medium text-gray-800 hover:text-blue-600 whitespace-nowrap"
                          onClick={() => handleDropdownClick("cases")}
                        >
                          {caseStudy.name}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </li>
                <li>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href="/columns"
                      className={`hover:underline px-4 py-3 block text-lg font-semibold whitespace-nowrap ${isActive("/columns") || router.pathname.startsWith("/columns/") ? "underline text-blue-600" : "text-gray-900"}`}
                    >
                      コラム
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href="/faq"
                      className={`hover:underline px-4 py-3 block text-lg font-semibold whitespace-nowrap ${isActive("/faq") ? "underline text-blue-600" : "text-gray-900"}`}
                    >
                      FAQ
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href="/documents"
                      className={`hover:underline px-4 py-3 block text-lg font-semibold whitespace-nowrap ${isActive("/documents") ? "underline text-blue-600" : "text-gray-900"}`}
                    >
                      資料請求
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </nav>

            {/* Contact Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                href="/quote"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaCalculator className="mr-2" />
                無料見積もり
              </Link>
              <Link
                href="/contact"
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaEnvelope className="mr-2" />
                お問い合わせ
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Menu
                right
                isOpen={isMenuOpen}
                onStateChange={({ isOpen }) => setIsMenuOpen(isOpen)}
                styles={menuStyles}
                customBurgerIcon={<span className="text-2xl">☰</span>}
                customCrossIcon={<span className="text-2xl">✕</span>}
              >
                <Link
                  href="/"
                  onClick={() => handleMenuClick("/", false)}
                  className="block py-2 px-4 text-gray-900 hover:text-blue-600 hover:underline"
                >
                  私たちについて
                </Link>
                <Link
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick("/services", true);
                  }}
                  className="block py-2 px-4 text-gray-900 hover:text-blue-600 hover:underline"
                >
                  サービス一覧
                </Link>
                <div className="pl-4">
                  {[
                    { name: "事業内容TOP", href: "/services" },
                    { name: "EC・フルフィルメント", href: "/services/ec-fulfillment" },
                    { name: "アセンブリ・セット作業", href: "/services/assembly" },
                    { name: "事務局代行", href: "/services/secretariat" },
                    { name: "在庫管理・受発注業務", href: "/services/inventory" },
                    { name: "データ処理・オーバープリント", href: "/services/data-processing" },
                  ].map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => handleMenuClick(service.href, true)}
                      className="block py-1 px-6 text-gray-700 hover:text-blue-600 hover:underline"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/cases"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick("/cases", false);
                  }}
                  className="block py-2 px-4 text-gray-900 hover:text-blue-600 hover:underline"
                >
                  成功事例
                </Link>
                <div className="pl-4">
                  {[
                    { name: "成功事例TOP", href: "/cases" },
                    { name: "EC事業の効率化", href: "/cases/ec-efficiency" },
                    { name: "製造プロセスの最適化", href: "/cases/manufacturing-optimization" },
                    { name: "事務作業の自動化", href: "/cases/office-automation" },
                    { name: "在庫管理の改善", href: "/cases/inventory-improvement" },
                    { name: "データ処理の高速化", href: "/cases/data-processing-speedup" },
                  ].map((caseStudy) => (
                    <Link
                      key={caseStudy.href}
                      href={caseStudy.href}
                      onClick={() => handleMenuClick(caseStudy.href, false)}
                      className="block py-1 px-6 text-gray-700 hover:text-blue-600 hover:underline"
                    >
                      {caseStudy.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/columns"
                  onClick={() => handleMenuClick("/columns", false)}
                  className="block py-2 px-4 text-gray-900 hover:text-blue-600 hover:underline"
                >
                  コラム
                </Link>
                <Link
                  href="/faq"
                  onClick={() => handleMenuClick("/faq", false)}
                  className="block py-2 px-4 text-gray-900 hover:text-blue-600 hover:underline"
                >
                  FAQ
                </Link>
                <Link
                  href="/documents"
                  onClick={() => handleMenuClick("/documents", false)}
                  className="block py-2 px-4 text-gray-900 hover:text-blue-600 hover:underline"
                >
                  資料請求
                </Link>
              </Menu>
            </div>
          </div>
        </div>
        <div className="w-full bg-red-600 text-white text-center py-1">
          <p>こちらは2025年3月4日に公開されたサンプルサイトです。　サイト責任者：BPO・阿部　信行
          </p> 
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="bg-gray-200 py-2 px-8 text-sm text-gray-600 shadow-md">
        <div className="max-w-7xl mx-auto">
          {router.pathname === "/" && "Top"}
          {router.pathname === "/services" && "Top - 私たちについて - サービス一覧"}
          {router.pathname.startsWith("/services/") && router.pathname !== "/services" &&
            `Top - 私たちについて - サービス一覧 - ${services[router.pathname.split("/").pop()] || "詳細"}`}
          {router.pathname === "/cases" && "Top - 私たちについて - 成功事例"}
          {router.pathname.startsWith("/cases/") && "Top - 私たちについて - 成功事例 - " + (caseStudies[router.pathname.split("/").pop()]?.title || "詳細")}
          {router.pathname === "/columns" && "Top - 私たちについて - コラム"}
          {router.pathname.startsWith("/columns/") && "Top - 私たちについて - コラム - " + (articles[router.pathname.split("/").pop()]?.title || "詳細")}
          {router.pathname === "/faq" && "Top - 私たちについて - よくある質問"}
          {router.pathname === "/documents" && "Top - 私たちについて - 資料請求"}
          {router.pathname === "/quote" && "Top - 私たちについて - 無料見積"}
          {router.pathname === "/contact" && "Top - 私たちについて - お問い合わせ"}
          {router.pathname === "/environmental" && "Top - 私たちについて - 環境への取り組み"}
          {router.pathname === "/sitemap" && "Top - 私たちについて - サイトマップ"}
          {router.pathname === "/terms" && "Top - 私たちについて - サイトご利用上の注意"}
          {router.pathname === "/privacy" && "Top - 私たちについて - プライバシーポリシー"}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ダイオーミウラBPO</h3>
              <p className="text-sm text-gray-400">
                あなたのビジネスを加速する高品質BPOソリューション。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">サービス</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="text-sm text-gray-400 hover:text-blue-600">
                    サービス一覧
                  </Link>
                </li>
                <li>
                  <Link href="/cases" className="text-sm text-gray-400 hover:text-blue-600">
                    成功事例
                  </Link>
                </li>
                <li>
                  <Link href="/columns" className="text-sm text-gray-400 hover:text-blue-600">
                    コラム
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">サポート</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-sm text-gray-400 hover:text-blue-600">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-400 hover:text-blue-600">
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link href="/documents" className="text-sm text-gray-400 hover:text-blue-600">
                    資料請求
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">連絡先</h3>
              <p className="text-sm text-gray-400">
                <FaPhone className="inline-block mr-2" />
                0123-456-789
              </p>
              <p className="text-sm text-gray-400">
                <FaMailBulk className="inline-block mr-2" />
                dmpsBPO@daiogroup.com
              </p>
              <p className="text-sm text-gray-400 mt-2">
                受付時間：平日9:00〜18:00
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-2 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center"
            >
              <p className="text-sm font-medium text-white mb-4 sm:mb-0">
                © {new Date().getFullYear()} ダイオーミウラ株式会社. All Rights Reserved.
              </p>
              <div className="flex flex-col sm:flex-row text-white gap-4">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href="/environmental" className="text-sm hover:text-blue-600 hover:underline">
                    環境への取り組み
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href="/sitemap" className="text-sm hover:text-blue-600 hover:underline">
                    サイトマップ
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href="/terms" className="text-sm hover:text-blue-600 hover:underline">
                    サイトご利用上の注意
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href="/privacy" className="text-sm hover:text-blue-600 hover:underline">
                    プライバシーポリシー
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}