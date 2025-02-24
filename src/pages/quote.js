import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

// Debug: Quote Simulator page in light mode only, with footer at bottom.
export default function Quote() {
  const [formData, setFormData] = useState({
    service: "",
    volume: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a random "lucky number" price in Japanese yen based on current time (milliseconds)
    const randomPrice = Math.floor(Date.now() % 1000000) + 500000; // Random between 500,000 and 1,499,999 yen
    setResult({
      service: formData.service,
      price: randomPrice,
    });
  };

  return (
    <>
      <Head>
        <title>無料見積 - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
        <meta
          name="description"
          content="ダイオーミウラBPOビジネスセンターの無料見積シミュレーションで、業務効率化のコストを簡単に確認。"
        />
        <meta property="og:title" content="無料見積 - ダイオーミウラBPOビジネスセンター" />
        <meta
          property="og:description"
          content="ダイオーミウラBPOビジネスセンターの無料見積シミュレーションで、業務効率化のコストを簡単に確認。"
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com/quote" />
      </Head>
      <main className="flex-grow"> {/* Ensure content fills viewport */}
        <section className="py-12 px-8 max-w-4xl mx-auto">
          {result ? (
            // Result Page
            <div className="bg-white shadow rounded p-6 text-center">
              <h1 className="text-4xl font-bold mb-6">見積結果</h1>
              <p className="text-lg mb-4">
                サービス: {result.service || "選択されていません"}
              </p>
              <p className="text-2xl font-bold mb-6 text-green-600">
                総額: ￥{result.price.toLocaleString()} 円
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                詳細見積のお問い合わせ
              </Link>
              <p className="text-center mt-4 text-sm text-gray-600">
                より詳細な見積やご質問はこちらからどうぞ。
              </p>
            </div>
          ) : (
            // Form Page
            <>
              <h1 className="text-4xl font-bold mb-6 text-center">無料見積</h1>
              <p className="text-lg mb-8 text-center">
                選択式のシミュレーションで、貴社のニーズに合わせたBPOソリューションの概算見積を取得してください。
              </p>
              <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6">
                <div className="mb-4">
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700"
                  >
                    必要なサービス
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="ec-fulfillment">EC・フルフィルメント</option>
                    <option value="assembly">アセンブリ・セット作業</option>
                    <option value="secretariat">事務局代行</option>
                    <option value="inventory">在庫管理・受発注業務</option>
                    <option value="data-processing">データ処理・オーバープリント</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="volume"
                    className="block text-sm font-medium text-gray-700"
                  >
                    作業量（月間）
                  </label>
                  <input
                    type="number"
                    id="volume"
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  見積を取得
                </button>
              </form>
            </>
          )}
        </section>
      </main>
    </>
  );
}