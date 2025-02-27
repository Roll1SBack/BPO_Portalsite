import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion"; // Import Framer Motion
import { slide as Menu } from "react-burger-menu"; // Import React Burger Menu for mobile
import { FaCalculator, FaEnvelope } from "react-icons/fa"; // Import SVG icons from react-icons

// Debug: Site-wide Layout in light mode only, with static ribbon, circular scrolling text (8 cm text in 10 cm ribbon), dropdowns closing on menu clicks, clickable サービス一覧 and 成功事例, and SVG icons for buttons.
export default function Layout({ children, extraContact = null }) {
  const [dropdownOpen, setDropdownOpen] = useState({ services: false, cases: false }); // Use object for multiple dropdowns
  const timeoutRef = useRef(null);
  const caseTimeoutRef = useRef(null);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  // Set isClient to true on client-side mount
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

  // Service data for breadcrumbs (matching the dropdown in the menu)
  const services = {
    "ec-fulfillment": "EC・フルフィルメント",
    assembly: "アセンブリ・セット作業",
    secretariat: "事務局代行",
    inventory: "在庫管理・受発注業務",
    "data-processing": "データ処理・オーバープリント",
  };

  // Close dropdowns and mobile menu when navigating to list pages
  const handleMenuClick = (path, isService) => {
    setDropdownOpen({ services: false, cases: false }); // Close all dropdowns
    setIsMenuOpen(false); // Close mobile menu
    router.push(path);
  };

  // Mobile menu styles
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
      background: "rgba(0, 0, 0, 0.9)",
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

  function Ribbon() {
    const router = useRouter();
    const isTopPage = router.pathname === "/";

    // Only render on client-side to prevent SSR issues
    if (!isClient) return null;

    return (
      <div className="relative w-full h-9 bg-red-600 overflow-hidden">
        {/* Static ribbon background */}
        <div className="flex inset-0 bg-red-600 flex items-center justify-center">
          { (
            <div className="absolute inset-y-0 flex items-center">
              <p className="ribbon-text text-white text-lg font-semibold italic tracking-wide">
                極限の効率と価値創造、ビジネスに革新を。
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Moved here to avoid re-rendering issues

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-lg py-2 px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between max-w-7xl mx-auto space-y-0"
        >
          <div className="mb-0 flex items-center justify-left w-full">
            <Link href="https://www.dmps.co.jp/" target="_blank" rel="noopener noreferrer">
              <div className="w-[300px]"> {/* Fixed width container for logo */}
                <Image
                  src="/logo.jpg"
                  alt="ダイオーミウラBPOビジネスセンターの公式ロゴ"
                  width={300}
                  height={300}
                />
              </div>
            </Link>

            <Link href="/">
              <h1 className="text-3xl font-extrabold tracking-wide ml-2 mt-1 text-black-600 hover:text-gold-900 transition-colors duration-500">
                ｜BPOビジネスセンター
              </h1>
            </Link>

            <div className="w-[300px] flex justify-end">
              {/* Mobile Menu Button */}
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

                {/* Main menu items */}
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

          <div className="flex items-end justify-between w-full"> {/* Menu and buttons on same line */}
            <nav role="navigation" className="hidden md:block">
              {isClient && <Ribbon />} {/* Render Ribbon only on client-side to prevent SSR issues */}
              <ul className="flex gap-4 items-end flex-nowrap"> {/* Prevent wrapping, reduced gap for more space */}
                {/* Main menu items */}
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
                      サービス一覧
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
            <div className="flex flex-col items-end gap-2">
              {/* Phone info */}
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-xl">📞</span>
                <span className="text-2xl font-bold">0123-456-789</span>
                <span className="text-sm">受付時間：平日9:00〜18:00</span>
              </div>
              {/* Buttons on same line as menu, enhanced styling with SVG icons */}
              <div className="flex items-end gap-4 mb-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link
                    href="/quote"
                    className="w-22 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 shadow-md flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300"
                  >
                    <FaCalculator className="text-white text-xl" /> {/* SVG calculator icon */}
                    無料見積もり
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link
                    href="/contact"
                    className="w-22 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-800 shadow-md flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300"
                  >
                    <FaEnvelope className="text-white text-xl" /> {/* SVG envelope icon */}
                    お問い合わせ
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Breadcrumb (Optional, simple version, can refine or remove later) */}
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

      <footer className="bg-blue-500 shadow-lg py-2 px-6 mt-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-sm font-medium text-gray-700 mb-4 sm:mb-0">
            © {new Date().getFullYear()} ダイオーミウラ株式会社. All Rights Reserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="/environmental" className="text-sm text-gray-700 hover:text-blue-600 hover:underline">
                環境への取り組み
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="/sitemap" className="text-sm text-gray-700 hover:text-blue-600 hover:underline">
                サイトマップ
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="/terms" className="text-sm text-gray-700 hover:text-blue-600 hover:underline">
                サイトご利用上の注意
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="/privacy" className="text-sm text-gray-700 hover:text-blue-600 hover:underline">
                プライバシーポリシー
              </Link>
            </motion.div>
          </div>
        </motion.div>
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