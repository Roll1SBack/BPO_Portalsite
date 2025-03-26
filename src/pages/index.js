import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Warehouse, Package, FileText, Printer, Box, Users, DollarSign, Rocket, Settings, Shield } from "lucide-react";
import BPOChatbot from "@/components/Chatbot";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const partnersRef = useRef(null);

  // Pause scrolling on hover
  useEffect(() => {
    const partnersContainer = partnersRef.current;
    if (!partnersContainer) return;

    const handleMouseEnter = () => {
      partnersContainer.style.animationPlayState = "paused";
    };

    const handleMouseLeave = () => {
      partnersContainer.style.animationPlayState = "running";
    };

    partnersContainer.addEventListener("mouseenter", handleMouseEnter);
    partnersContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      partnersContainer.removeEventListener("mouseenter", handleMouseEnter);
      partnersContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Placeholder partner data (replace with real data as needed)
  const partners = [
    {
      name: "Partner A",
      icon: <Warehouse className="w-12 h-12 text-[#1A2FA0]" />,
      keywords: ["Logistics", "Efficiency", "Global"],
    },
    {
      name: "Partner B",
      icon: <Package className="w-12 h-12 text-[#1A2FA0]" />,
      keywords: ["Packaging", "Innovation", "Sustainability"],
    },
    {
      name: "Partner C",
      icon: <FileText className="w-12 h-12 text-[#1A2FA0]" />,
      keywords: ["Data", "Accuracy", "Automation"],
    },
    {
      name: "Partner D",
      icon: <Printer className="w-12 h-12 text-[#1A2FA0]" />,
      keywords: ["Printing", "Quality", "Speed"],
    },
    {
      name: "Partner E",
      icon: <Box className="w-12 h-12 text-[#1A2FA0]" />,
      keywords: ["Assembly", "Precision", "Reliability"],
    },
    {
      name: "Partner F",
      icon: <Users className="w-12 h-12 text-[#1A2FA0]" />,
      keywords: ["Support", "Teamwork", "Expertise"],
    },
    {
      name: "Partner G",
      icon: <DollarSign className="w-12 h-12 text-[#1A2FA0]" />,
      keywords: ["Cost-Saving", "Efficiency", "Value"],
    },
    {
      name: "Partner H",
      icon: <Rocket className="w-12 h-12 text-[#1A2FA0]" />,
      keywords: ["Innovation", "Growth", "Technology"],
    },
  ];

  return (
    <>
      <Head>
        <title>ダイオーミウラBPOビジネスセンター | トップページ</title>
        <meta
          name="description"
          content="ダイオーミウラBPOビジネスセンターの公式サイト。ECフルフィルメント、在庫管理、データ処理などのBPOサービスを提供しています。無料見積シミュレーションで簡単に見積もりを取得できます。"
        />
      </Head>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-blue-100 to-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            効率的なBPOソリューションであなたのビジネスを加速
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            ECフルフィルメント、在庫管理、データ処理など、幅広いサービスを提供。無料見積シミュレーションで今すぐコストを試算！
          </p>
          <Link href="/quote">
            <button className="bg-[#1A2FA0] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
              無料見積シミュレーションを試す
            </button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">私たちのサービス</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service Card 1: EC Fulfillment */}
            <Link href="/services/ec-fulfillment">
              <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
                <Warehouse className="w-12 h-12 text-[#1A2FA0] mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-800 text-center mb-2">ECフルフィルメント</h4>
                <p className="text-gray-600 text-center">
                  オンラインストアの受注から配送まで、効率的なサービスを提供します。
                </p>
              </div>
            </Link>

            {/* Service Card 2: Inventory Management */}
            <Link href="/services/inventory">
              <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
                <Package className="w-12 h-12 text-[#1A2FA0] mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-800 text-center mb-2">在庫管理・受発注業務</h4>
                <p className="text-gray-600 text-center">
                  在庫の最適化とスムーズな受発注管理で、業務効率を向上させます。
                </p>
              </div>
            </Link>

            {/* Service Card 3: Data Processing */}
            <Link href="/services/data-processing">
              <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
                <FileText className="w-12 h-12 text-[#1A2FA0] mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-800 text-center mb-2">データ処理</h4>
                <p className="text-gray-600 text-center">
                  大量のデータを迅速かつ正確に処理し、ビジネスに活用します。
                </p>
              </div>
            </Link>

            {/* Service Card 4: Overprint */}
            <Link href="/services/data-processing">
              <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
                <Printer className="w-12 h-12 text-[#1A2FA0] mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-800 text-center mb-2">オーバープリント</h4>
                <p className="text-gray-600 text-center">
                  多様な資材に対応した高品質なオーバープリントサービスを提供します。
                </p>
              </div>
            </Link>

            {/* Service Card 5: Assembly/Set Operations */}
            <Link href="/services/assembly">
              <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
                <Box className="w-12 h-12 text-[#1A2FA0] mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-800 text-center mb-2">アセンブリ・セット作業</h4>
                <p className="text-gray-600 text-center">
                  商品のセット組みや梱包作業を効率的に代行します。
                </p>
              </div>
            </Link>

            {/* Service Card 6: Agency Services */}
            <Link href="/services/secretariat">
              <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
                <Users className="w-12 h-12 text-[#1A2FA0] mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-800 text-center mb-2">事務局代行</h4>
                <p className="text-gray-600 text-center">
                  事務作業やカスタマーサポート業務をアウトソーシングできます。
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features/Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">なぜダイオーミウラBPOを選ぶのか？</h3>
          <div className="space-y-12">
            {/* Feature 1: Cost Reduction */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">コスト削減</h4>
                <p className="text-gray-600">
                  効率的なBPOソリューションにより、運用コストを大幅に削減。無料見積シミュレーションでコストを簡単に試算できます。
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
                <DollarSign className="w-16 h-16 text-[#1A2FA0]" />
              </div>
            </div>
            {/* Feature 2: Efficient Operations */}
            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2 text-center md:text-right">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">効率的な運用</h4>
                <p className="text-gray-600">
                  最新の技術とプロセスを活用し、業務の効率化を実現。時間を節約し、生産性を向上させます。
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
                <Rocket className="w-16 h-16 text-[#1A2FA0]" />
              </div>
            </div>
            {/* Feature 3: Customizable Solutions */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">カスタマイズ可能</h4>
                <p className="text-gray-600">
                  各クライアントのニーズに合わせた柔軟なソリューションを提供。あなたのビジネスに最適なプランを構築します。
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
                <Settings className="w-16 h-16 text-[#1A2FA0]" />
              </div>
            </div>
            {/* Feature 4: Reliable Support */}
            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2 text-center md:text-right">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">信頼性の高いサポート</h4>
                <p className="text-gray-600">
                  専任のサポートチームが、いつでもあなたの質問や課題に対応。安心して業務をアウトソーシングできます。
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
                <Shield className="w-16 h-16 text-[#1A2FA0]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">私たちのパートナー</h3>
          <div className="overflow-hidden">
            <div
              ref={partnersRef}
              className="flex animate-scroll"
              style={{ animation: "scroll 30s linear infinite" }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 w-40 mx-4 group"
                >
                  <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg transition-transform transform group-hover:scale-110">
                    <div className="mb-2">{partner.icon}</div>
                    <p className="text-gray-800 font-semibold text-center">{partner.name}</p>
                    <div className="mt-2 hidden group-hover:flex flex-wrap justify-center gap-2">
                      {partner.keywords.map((keyword, i) => (
                        <span
                          key={i}
                          className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            display: flex;
            width: max-content;
          }
        `}</style>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">お客様の声</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
              <p className="text-gray-600 italic mb-4">
                "素晴らしいサービス！コストが大幅に削減できました。"
              </p>
              <p className="text-gray-800 font-semibold">長坂太郎</p>
              <p className="text-gray-500 text-sm">船橋工場株式会社</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
              <p className="text-gray-600 italic mb-4">
                "データ処理が迅速で正確。業務効率が向上しました。"
              </p>
              <p className="text-gray-800 font-semibold">長谷川花子</p>
              <p className="text-gray-500 text-sm">大阪支店商事</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
              <p className="text-gray-600 italic mb-4">
                "サポートチームの対応が素晴らしく、安心して利用できます。"
              </p>
              <p className="text-gray-800 font-semibold">田中一郎</p>
              <p className="text-gray-500 text-sm">仙台事務所カンパニー</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-50 text-center border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            今すぐコストを試算してみませんか？
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            無料見積シミュレーションで、あなたのビジネスに最適なBPOソリューションを見つけましょう。
          </p>
          <Link href="/quote">
            <button className="bg-[#1A2FA0] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
              見積シミュレーションへ
            </button>
          </Link>
        </div>
      </section>
      
      {/* Chatbot */}
      <BPOChatbot />
    </>
  );
}