import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
    return (
        <>
            <Head>
                <title>私たちについて - ダイオーミウラBPOビジネスセンター</title>
                <meta
                    name="description"
                    content="業界トップのBPOサービスを提供するダイオーミウラBPOビジネスセンターの私たちについてのページです。"
                />
                <meta property="og:title" content="私たちについて - ダイオーミウラBPOビジネスセンター" />
                <meta
                    property="og:description"
                    content="業務プロセスの最適化とコスト削減を実現するためのBPOソリューションについてご紹介します。"
                />
                <meta property="og:image" content="/office.png" />
                <meta property="og:url" content="https://yourwebsite.com/about" />
            </Head>
            <main className="flex-grow w-[80vw] mx-auto py-12 px-8">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-purple-800 drop-shadow-lg">
                    私たちについて
                </h1>
                <section className="mx-auto pt-10 space-y-8">
                    {/* Rolling ticker effect for the first paragraph */}
                    <div className="overflow-hidden">
                        <motion.div
                            className="whitespace-nowrap"
                            animate={{ x: ["30%", "-1100%"] }}
                            transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
                        >
                            <p className="inline-block text-9xl md:text-9xl font-bold text-blue-700 leading-relaxed tracking-wide">
                                大王グループの総合印刷会社です。印刷領域にとどまらず、パッケージのデザイン、製造、広告、販促、デジタル領域への展開からアセンブリ、システム開発まで、総合印刷会社としてお客様の望むすべてにお応えします。
                            </p>
                        </motion.div>
                    </div>
                </section>

                <h1 className="text-4xl md:text-5xl font-extrabold mt-8 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-purple-800 drop-shadow-lg">
                    次はBPOチーム紹介です！
                </h1>
                <section className="mx-auto pt-10 space-y-8">
                    {/* Rolling ticker effect for the first paragraph */}
                    <div className="overflow-hidden">
                        <motion.div
                            className="whitespace-nowrap"
                            animate={{ x: ["30%", "-600%"] }}
                            transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
                        >
                            <p className="inline-block text-9xl md:text-9xl font-bold text-red-700 leading-relaxed tracking-wide">
                                BPO推進部推進課では何人いますか？ということですね。なんにんだろう？わからんけど、とりあえず書いてみるよ。とりあえず、3人
                            </p>
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    );
}