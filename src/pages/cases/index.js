import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Using react-icons for navigation icons

// Debug: Case Studies list page in light mode only, in /pages/cases/index.js, with taller, elegant sliding carousel, beautiful icon navigation, aligned IDs, new content, animations, and hover effects, fixed Link error.
export default function Cases() {
  // Case study data aligned with getStaticPaths IDs
  const caseStudies = [
    { 
      id: "ec-efficiency", 
      title: "EC事業の効率化", 
      service: "EC・フルフィルメント", 
      href: "/cases/ec-efficiency", 
      description: "オンライン注文処理を50%高速化し、顧客満足度を向上。" 
    },
    { 
      id: "manufacturing-optimization", 
      title: "製造プロセスの最適化", 
      service: "アセンブリ・セット作業", 
      href: "/cases/manufacturing-optimization", 
      description: "生産ラインの効率を30%改善し、納期を10%短縮。" 
    },
    { 
      id: "office-automation", 
      title: "事務作業の自動化", 
      service: "事務局代行", 
      href: "/cases/office-automation", 
      description: "事務作業時間を70%削減し、エラー率を0.1%未満に抑制。" 
    },
    { 
      id: "inventory-improvement", 
      title: "在庫管理の改善", 
      service: "在庫管理・受発注業務", 
      href: "/cases/inventory-improvement", 
      description: "在庫精度を95%に向上させ、運用コストを15%削減。" 
    },
    { 
      id: "data-processing-speedup", 
      title: "データ処理の高速化", 
      service: "データ処理・オーバープリント", 
      href: "/cases/data-processing-speedup", 
      description: "データ処理速度を3倍に加速し、正確性98%を達成。" 
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Track current carousel position
  const [hoveredCase, setHoveredCase] = useState(null); // Track hovered case for showing content
  const [filter, setFilter] = useState(""); // State for filter

  // Filter case studies based on service
  const filteredCases = filter
    ? caseStudies.filter((caseStudy) => caseStudy.service === filter)
    : caseStudies;

  // Animation variants for the section entrance
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.1, // Stagger children for a cascading effect
      },
    },
  };

  // Animation variants for case study cards (carousel items)
  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15, 
        duration: 0.6,
      },
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
  };

  // Animation variants for hover description
  const descriptionVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 150, 
        damping: 10, 
        duration: 0.4,
      },
    },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.3 } },
  };

  // Animation variants for filter dropdown
  const filterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Animation variants for navigation buttons
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
      },
    },
    hover: { 
      scale: 1.1, 
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)", 
      transition: { 
        duration: 0.3, 
        ease: "easeInOut",
      },
    },
  };

  // Handle navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredCases.length) % filteredCases.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCases.length);
  };

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredCases.length);
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [filteredCases.length]);

  return (
    <>
      <Head>
        <title>成功事例 - ダイオーミウラBPOビジネスセンター</title>
        <meta
          name="description"
          content="ダイオーミウラBPOビジネスセンターの成功事例をご覧ください。業務効率化とコスト削減の実績をご確認いただけます。"
        />
        <meta property="og:title" content="成功事例 - ダイオーミウラBPOビジネスセンター" />
        <meta
          property="og:description"
          content="ダイオーミウラBPOビジネスセンターの成功事例をご覧ください。業務効率化とコスト削減の実績をご確認いただけます。"
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com/cases" />
      </Head>
      <main className="flex-grow">
        <motion.section
          className="py-12 px-8 max-w-6xl mx-auto" // Maintained max-width, increased padding for taller slides
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.h1
            className="text-4xl font-bold mb-10 text-center" // Increased margin for taller layout
            variants={cardVariants}
          >
            成功事例
          </motion.h1>
          <motion.p
            className="text-lg mb-12 text-center" // Increased margin for taller layout
            variants={cardVariants}
          >
            ダイオーミウラBPOビジネスセンターがお客様の業務効率化とコスト削減をどのようにサポートしたかをご覧ください。
          </motion.p>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: `-${currentIndex * 100}%`, // Slide horizontally based on current index
              }}
              transition={{
                type: "tween",
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              {filteredCases.map((caseStudy) => (
                <motion.div
                  key={caseStudy.id}
                  className="w-full flex-shrink-0 bg-white rounded-xl shadow-lg p-12 border border-gray-200 hover:shadow-2xl transition-shadow duration-300" // Increased padding (p-12) and height
                  style={{ height: "600px" }} // Increased height for taller slides
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.1, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)" }} // Enhanced hover with larger scale and deeper shadow
                  onMouseEnter={() => setHoveredCase(caseStudy.id)}
                  onMouseLeave={() => setHoveredCase(null)}
                >
                  <Link href={caseStudy.href} legacyBehavior>
                    <a className="block h-full flex flex-col justify-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-8 hover:text-blue-600 transition-colors duration-300"> {/* Larger title, increased margin */}
                        {caseStudy.title}
                      </h2>
                      <p className="text-xl text-gray-600 mb-10 hover:text-gray-800 transition-colors duration-300"> {/* Larger service text, increased margin */}
                        {caseStudy.service}
                      </p>
                      <p className="text-lg text-gray-700 mb-10 line-clamp-4"> {/* Larger description, limited to 4 lines for taller layout, increased margin */}
                        {caseStudy.description}
                      </p>
                      <AnimatePresence>
                        {hoveredCase === caseStudy.id && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={descriptionVariants}
                            className="absolute inset-0 bg-white bg-opacity-90 rounded-xl p-10 flex items-center justify-center text-xl text-gray-700 shadow-inner" // Larger description with increased padding
                          >
                            {caseStudy.description}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </a>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            {/* Navigation Buttons with Icons */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 flex justify-between px-6 transform -translate-y-1/2"
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              <motion.button
                onClick={handlePrev}
                className="bg-blue-600 text-white rounded-full p-6 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" // Larger button with increased padding
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowLeft className="text-3xl" /> {/* Larger icon */}
              </motion.button>
              <motion.button
                onClick={handleNext}
                className="bg-blue-600 text-white rounded-full p-6 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" // Larger button with increased padding
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowRight className="text-3xl" /> {/* Larger icon */}
              </motion.button>
            </motion.div>
          </div>
          {/* Animated filter dropdown */}
          <motion.div
            className="mt-12 text-center" // Increased margin for taller layout
            initial="hidden"
            animate="visible"
            variants={filterVariants}
          >
            <label htmlFor="filter" className="mr-2 text-lg font-medium text-gray-700"> {/* Larger text */}
              サービスでフィルタ:
            </label>
            <motion.select
              id="filter"
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-6 py-4 text-xl transition-all duration-300 hover:bg-gray-50" // Larger select with increased padding and text size
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <option value="">すべて</option>
              <option value="EC・フルフィルメント">EC・フルフィルメント</option>
              <option value="アセンブリ・セット作業">アセンブリ・セット作業</option>
              <option value="事務局代行">事務局代行</option>
              <option value="在庫管理・受発注業務">在庫管理・受発注業務</option>
              <option value="データ処理・オーバープリント">データ処理・オーバープリント</option>
            </motion.select>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}