import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

// Debug: Case Studies list page in light mode only, in /pages/cases/cases.js, with circling circular layout, hover effects, and navigation, footer at bottom via Layout.js.
export default function Cases() {
  // Case study data, using paths from Layout.js dropdown (成功事例)
  const caseStudies = [
    { id: "ec-efficiency", title: "EC事業の効率化", service: "EC・フルフィルメント", href: "/cases/ec-efficiency", description: "作業効率50%向上、コスト20%削減。" },
    { id: "manufacturing-optimization", title: "製造プロセスの最適化", service: "アセンブリ・セット作業", href: "/cases/manufacturing-optimization", description: "生産性30%向上、納期短縮10%。" },
    { id: "office-automation", title: "事務作業の自動化", service: "事務局代行", href: "/cases/office-automation", description: "作業時間70%削減、エラー率0.1%。" },
    { id: "inventory-improvement", title: "在庫管理の改善", service: "在庫管理・受発注業務", href: "/cases/inventory-improvement", description: "在庫精度95%、コスト15%削減。" },
    { id: "data-processing-speedup", title: "データ処理の高速化", service: "データ処理・オーバープリント", href: "/cases/data-processing-speedup", description: "処理速度3倍、正確性98%。" },
  ];

  const [rotation, setRotation] = useState(0); // Current rotation angle in degrees
  const [hoveredCase, setHoveredCase] = useState(null); // Track hovered case for stopping rotation and showing content

  // Handle continuous rotation with debug logging
  useEffect(() => {
    let animationFrameId;
    console.log("Starting rotation animation...");
    const rotate = () => {
      if (!hoveredCase) {
        setRotation((prev) => {
          const newRotation = (prev + 1) % 360;
          console.log(`Rotating to: ${newRotation} degrees`);
          return newRotation;
        });
      }
      animationFrameId = requestAnimationFrame(rotate);
    };
    animationFrameId = requestAnimationFrame(rotate);

    return () => {
      console.log("Cleaning up rotation animation...");
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredCase]);

  // Calculate position for each case in a circle (5 cases, evenly spaced)
  const radius = 150; // Radius of the circle in pixels
  const containerSize = 500; // Size of the container in pixels
  const centerX = containerSize / 2; // Center X of the circle
  const centerY = containerSize / 2; // Center Y of the circle

  return (
    <>
      <Head>
        <title>成功事例 - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
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
      <main className="flex-grow"> {/* Ensure content fills viewport for footer via Layout.js */}
        <section className="py-12 px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">成功事例</h1>
          <p className="text-lg mb-8 text-center">
            ダイオーミウラBPOビジネスセンターがお客様の業務効率化とコスト削減をどのようにサポートしたかをご覧ください。
          </p>
          <div className="relative w-[500px] h-[500px] mx-auto overflow-hidden"> {/* Container for the circle, with overflow hidden */}
            <div
              className="absolute w-full h-full origin-center"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: hoveredCase ? "transform 0.3s ease-out" : "transform 20s linear", // Slow rotation, stop on hover
              }}
            >
              {caseStudies.map((caseStudy, index) => {
                const angle = (360 / caseStudies.length) * index; // Evenly space cases around the circle
                const rad = (angle + rotation) * (Math.PI / 180); // Convert to radians for positioning
                const defaultSize = 60; // Default size in pixels (w-24 = 96px, but adjust for smaller circle)
                const hoverSize = 90; // Enlarged size on hover (scale-150 of default, approximately 144px)
                const x = centerX + radius * Math.cos(rad) - (hoveredCase === caseStudy.id ? hoverSize / 2 : defaultSize / 2);
                const y = centerY + radius * Math.sin(rad) - (hoveredCase === caseStudy.id ? hoverSize / 2 : defaultSize / 2);

                return (
                  <Link
                    key={caseStudy.id}
                    href={caseStudy.href}
                    className={`absolute text-center cursor-pointer bg-white rounded-full shadow-md p-2 border border-gray-300 hover:bg-gray-100 transition-all duration-300 ${
                      hoveredCase === caseStudy.id
                        ? "scale-150 z-10 bg-blue-100 border-blue-500" // Enlarge and highlight on hover
                        : ""
                    }`}
                    style={{
                      width: hoveredCase === caseStudy.id ? `${hoverSize}px` : `${defaultSize}px`,
                      height: hoveredCase === caseStudy.id ? `${hoverSize}px` : `${defaultSize}px`,
                      left: `${x}px`,
                      top: `${y}px`,
                    }}
                    onMouseEnter={() => {
                      console.log(`Hovering over: ${caseStudy.title} at ${caseStudy.href}`);
                      setHoveredCase(caseStudy.id);
                    }}
                    onMouseLeave={() => {
                      console.log(`Leaving hover on: ${caseStudy.title}`);
                      setHoveredCase(null);
                    }}
                  >
                    <span className="block text-xs font-semibold text-gray-900 truncate">
                      {caseStudy.title}
                    </span>
                    {hoveredCase === caseStudy.id && (
                      <div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded p-2 text-sm text-gray-700 border border-gray-300">
                        {caseStudy.service} - {caseStudy.description}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Optional filter (placeholder, can be removed or styled differently) */}
          <div className="mt-8 text-center">
            <label htmlFor="filter" className="mr-2 text-sm font-medium text-gray-700">
              サービスでフィルタ:
            </label>
            <select
              id="filter"
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => console.log("Filter applied:", e.target.value)}
            >
              <option value="">すべて</option>
              <option value="ec-fulfillment">EC・フルフィルメント</option>
              <option value="assembly">アセンブリ・セット作業</option>
              <option value="secretariat">事務局代行</option>
              <option value="inventory">在庫管理・受発注文業務</option>
              <option value="data-processing">データ処理・オーバープリント</option>
            </select>
          </div>
        </section>
      </main>
    </>
  );
}