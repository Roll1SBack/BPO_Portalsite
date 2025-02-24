import Head from "next/head";
import Link from "next/link";

// Debug: Columns list page in light mode only, in /pages/columns/index.js.
export default function Columns() {
  // Placeholder data for 5 articles (to be expanded with real content)
  const articles = [
    { id: "article1", title: "BPOの最新トレンド2025", date: "2025-02-01", excerpt: "BPO業界の最新動向と未来予測をご紹介。" },
    { id: "article2", title: "EC業務の効率化Tips", date: "2025-01-15", excerpt: "EC運営を効率化するための実践的なアドバイス。" },
    { id: "article3", title: "データ処理のベストプラクティス", date: "2025-01-10", excerpt: "データ処理を高速化・正確化する手法を解説。" },
    { id: "article4", title: "在庫管理の課題と解決策", date: "2025-01-05", excerpt: "在庫管理の共通問題とダイオーミウラBPOビジネスセンターのソリューション。" },
    { id: "article5", title: "事務作業の自動化事例", date: "2024-12-20", excerpt: "事務作業自動化の成功事例とその効果。" },
  ];

  return (
    <>
      <Head>
        <title>コラム - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
        <meta
          name="description"
          content="ダイオーミウラBPOビジネスセンターのコラムをご覧ください。BPO業界のトレンド、Tips、事例をご紹介しています。"
        />
        <meta property="og:title" content="コラム - ダイオーミウラBPOビジネスセンター" />
        <meta
          property="og:description"
          content="ダイオーミウラBPOビジネスセンターのコラムをご覧ください。BPO業界のトレンド、Tips、事例をご紹介しています。"
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com/columns" />
      </Head>
      <main className="flex-grow"> {/* Ensure content fills viewport for footer */}
        <section className="py-12 px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">コラム</h1>
          <p className="text-lg mb-8 text-center">
            BPO業界のトレンド、Tips、成功事例をダイオーミウラBPOビジネスセンターがご紹介します。
          </p>
          <ul className="list-disc pl-6 space-y-4">
            {articles.map((article) => (
              <li key={article.id}>
                <Link
                  href={`/columns/${article.id}`}
                  className="hover:underline text-gray-900"
                >
                  <span className="font-semibold">{article.title}</span> - 
                  <span className="text-sm text-gray-600">
                    {new Date(article.date).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <p className="text-gray-600 mt-1 line-clamp-2">
                    {article.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              トップページに戻る
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}