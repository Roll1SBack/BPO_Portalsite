import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BPOChatbot from "@/components/Chatbot";

// Debug: Homepage content only (no header/footer, as Layout.js handles them).
export default function Home() {
  return (
    <>
      <Head>
        <title>ダイオーミウラBPO</title>
        <meta name="description" content="あなたのビジネスを加速するBPOソリューション" />
        <meta property="og:title" content="ダイオーミウラBPO" />
        <meta property="og:description" content="あなたのビジネスを加速するBPOソリューション" />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com" />
      </Head>
      <main>
        {/* Debug: Hero Section with Animation */}
        <section className="relative bg-gradient-to-b from-blue-700 to-blue-900 text-white py-24 text-center dark:bg-blue-900 z-0">
          <Image
            src="/office.png"
            alt="ダイオーミウラBPOのオフィス"
            width={1400}
            height={700}
            className="absolute inset-0 w-full h-full object-cover opacity-20 z-[-1]"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-4xl mx-auto px-4"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
              あなたのビジネスを加速する<br />高品質BPOソリューション
            </h2>
            <p className="text-xl mb-10 leading-relaxed">
              EC運営からデータ処理まで、業務効率化とコスト削減を<br />プレミアムなサービスで実現します。
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/quote"
                className="px-8 py-4 bg-gold-400 text-blue-900 rounded-lg font-semibold hover:bg-gold-500 shadow-md dark:bg-gray-200 dark:text-blue-800 dark:hover:bg-gray-300 transition-all duration-300"
              >
                無料見積もり
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Debug: Service Previews with Animation */}
        <section className="py-16 px-8 max-w-7xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 text-center mb-12"
          >
            私たちのプレミアムサービス
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "EC・フルフィルメント", href: "/services/ec-fulfillment", img: "/ec.png" },
              { name: "アセンブリ・セット作業", href: "/services/assembly", img: "/assembly.png" },
              { name: "事務局代行", href: "/services/secretariat", img: "/secretariat.png" },
              { name: "在庫管理・受発注業務", href: "/services/inventory", img: "/inventory.png" },
              { name: "データ処理・オーバープリント", href: "/services/data-processing", img: "/data.png" },
            ].map((service, index) => (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }} // Staggered animation
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 dark:bg-gray-800 dark:shadow-gray-700"
              >
                <Link href={service.href} className="block">
                  <Image
                    src={service.img}
                    alt={`${service.name}のイメージ`}
                    width={400}
                    height={225}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-2xl font-semibold text-gray-900 mb-4 dark:text-gray-100">
                      {service.name}
                    </h4>
                    <p className="text-gray-600 text-lg dark:text-gray-400">詳細を見る</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <BPOChatbot />
    </>
  );
}