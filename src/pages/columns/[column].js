import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Debug: Columns detail page in light mode only, in /pages/columns/[column].js.
export default function ArticleDetail() {
  const router = useRouter();
  const { column } = router.query; // Matches the file name [column].js

  // Placeholder data (to be expanded with real content)
  const articles = {
    article1: {
      title: "BPOの最新トレンド2025",
      date: "2025-02-01",
      content: "2025年のBPO業界は、AIと自動化の進化により、業務効率がさらに向上することが予測されます。ダイオーミウラBPOビジネスセンターは最新技術を活用し、コスト削減と品質向上を実現します。",
      image: "/office.png",
    },
    article2: {
      title: "EC業務の効率化Tips",
      date: "2025-01-15",
      content: "EC運営の効率化には、在庫管理の最適化とデータ分析が鍵です。ダイオーミウラBPOビジネスセンターのフルフィルメントサービスで、納期短縮とコスト削減を達成できます。",
      image: "/office.png",
    },
    article3: {
      title: "データ処理のベストプラクティス",
      date: "2025-01-10",
      content: "データ処理の高速化には、最新のツールとプロセス設計が不可欠です。ダイオーミウラBPOビジネスセンターのソリューションで、正確性と効率を両立します。",
      image: "/office.png",
    },
    article4: {
      title: "在庫管理の課題と解決策",
      date: "2025-01-05",
      content: "在庫管理の課題には過剰在庫や不足が含まれます。ダイオーミウラBPOビジネスセンターの受発注業務で、これらの問題を解決し、精度を向上させます。",
      image: "/office.png",
    },
    article5: {
      title: "事務作業の自動化事例",
      date: "2024-12-20",
      content: "事務作業の自動化により、作業時間を70%削減した事例をご紹介します。ダイオーミウラBPOビジネスセンターのソリューションで効率化を実現しました。",
      image: "/office.png",
    },
  };

  const articleData = articles[column] || {
    title: "記事が見つかりません",
    date: new Date().toISOString().split("T")[0],
    content: "指定された記事は存在しません。",
    image: "/office.png",
  };

  return (
    <>
      <Head>
        <title>{articleData.title} - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
        <meta
          name="description"
          content={`${articleData.title}：ダイオーミウラBPOビジネスセンターのコラム。BPO業界のトレンド、Tips、事例をご確認ください。`}
        />
        <meta property="og:title" content={`${articleData.title} - ダイオーミウラBPOビジネスセンター`} />
        <meta
          property="og:description"
          content={`${articleData.title}：ダイオーミウラBPOビジネスセンターのコラム。BPO業界のトレンド、Tips、事例をご確認ください。`}
        />
        <meta property="og:image" content={articleData.image} />
        <meta property="og:url" content={`https://yourwebsite.com/columns/${column}`} />
      </Head>
      <main className="flex-grow"> {/* Ensure content fills viewport for footer */}
        <section className="py-12 px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">{articleData.title}</h1>
          <p className="text-sm text-gray-600 text-center mb-4">
            {new Date(articleData.date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {articleData.image && (
            <img
              src={articleData.image}
              alt={`${articleData.title}のイメージ`}
              className="w-full h-auto rounded mb-6 object-cover"
            />
          )}
          <div className="prose max-w-none">
            <p className="text-lg">{articleData.content}</p>
          </div>
          <Link
            href="/columns"
            className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            コラム一覧に戻る
          </Link>
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = [
    { params: { column: "article1" } },
    { params: { column: "article2" } },
    { params: { column: "article3" } },
    { params: { column: "article4" } },
    { params: { column: "article5" } },
  ];
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: {} };
}