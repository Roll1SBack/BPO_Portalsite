import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

// Debug: FAQ page in light mode only, in /pages/faq.js.
export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  // Placeholder FAQ data (to be expanded with real questions)
  const faqs = [
    {
      question: "BPOとは何ですか？",
      answer: "BPO（Business Process Outsourcing）は、業務プロセスを外部企業に委託するサービスです。ダイオーミウラBPOビジネスセンターは、EC運営やデータ処理などの業務を効率化します。",
    },
    {
      question: "見積もりはどのように取得できますか？",
      answer: <p>無料見積は当社の
        {" "}
        < Link href="/quote" className="text-blue-600 underline font-bold" >
          見積シミュレーション
        </Link >
        {" "}
        で簡単に取得できます。また、詳細な見積は
        {" "}
        < Link href="/contact" className="text-blue-600 underline font-bold" >
          お問い合わせ
        </Link >
        {" "}
        ページからリクエスト可能です。</p>,
    },
    {
      question: "サービス料金はどのくらいかかりますか？",
      answer: <p>料金はサービス内容と作業量によって異なります。無料見積ページで概算をシミュレーションできます。詳細は
        {" "}
        < Link href="/contact" className="text-blue-600 underline font-bold" >
          お問い合わせ
        </Link >
        {" "}
        よりご相談ください。</p>,
    },
    {
      question: "対応時間はいつですか？",
      answer: "営業時間は月曜〜金曜の9:00〜18:00です。緊急の場合は、0123-456-789までお電話ください。",
    },
    {
      question: "プライバシーポリシーはどうなっていますか？",
      answer: <p>当社のプライバシーポリシーは
        {" "}
        < Link href="/privacy" className="text-blue-600 underline font-bold" >
          プライバシーポリシー
        </Link >
        {" "}
        ページでご確認いただけます。お問い合わせ内容は厳格に管理されます。</p>,
    },
  ];

  // Filter FAQs by search term
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>FAQ - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
        <meta
          name="description"
          content="ダイオーミウラBPOビジネスセンターのよくある質問（FAQ）をご覧ください。BPOサービスに関する疑問を解決します。"
        />
        <meta property="og:title" content="FAQ - ダイオーミウラBPOビジネスセンター" />
        <meta
          property="og:description"
          content="ダイオーミウラBPOビジネスセンターのよくある質問（FAQ）をご覧ください。BPOサービスに関する疑問を解決します。"
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com/faq" />
      </Head>
      <main className="flex-grow"> {/* Ensure content fills viewport for footer */}
        <section className="py-12 px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">よくある質問（FAQ）</h1>
          <p className="text-lg mb-8 text-center">
            BPOサービスに関するご質問をこちらで解決します。詳細は
            {" "}
            < Link href="/privacy" className="text-blue-600 underline font-bold" >
              お問い合わせ
            </Link >
            {" "}よりご連絡ください。
          </p>
          {/* Search Input */}
          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="キーワードで検索..."
              className="w-full max-w-md p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-white shadow rounded p-4">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left text-xl font-semibold text-gray-900 focus:outline-none"
                >
                  {faq.question}
                  <span className="float-right">+</span>
                </button>
                {openFaq === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
          {/* Phone Options */}
          <div className="mt-8 text-center">
            <p className="text-lg mb-4">緊急の場合は、直接お電話ください：</p>
            <p className="text-xl font-bold text-blue-600">
              0123-456-789
            </p>
            <p className="text-sm text-gray-600">
              営業時間：月曜〜金曜 9:00〜18:00
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              詳細なご質問はこちら
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}