import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Debug: Case Study detail page in light mode only, in /pages/cases/[case].js, with footer at bottom via Layout.js.
export default function CaseDetail({ caseStudy }) {
  const router = useRouter();
  const { case: caseId } = router.query;

  if (!caseStudy) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{caseStudy.title} - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
        <meta
          name="description"
          content={`${caseStudy.title}：ダイオーミウラBPOビジネスセンターの成功事例。業務効率化とコスト削減の実績をご確認ください。`}
        />
        <meta property="og:title" content={`${caseStudy.title} - ダイオーミウラBPOビジネスセンター`} />
        <meta
          property="og:description"
          content={`${caseStudy.title}：ダイオーミウラBPOビジネスセンターの成功事例。業務効率化とコスト削減の実績をご確認ください。`}
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content={`https://yourwebsite.com/cases/${caseId}`} />
      </Head>
      <main className="flex-grow"> {/* Ensure content fills viewport for footer via Layout.js */}
        <section className="py-12 px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">{caseStudy.title}</h1>
          <p className="text-lg mb-4 text-center">
            サービス: {caseStudy.service}
          </p>
          <p className="text-lg mb-8">{caseStudy.description}</p>
          <p className="text-xl font-semibold mb-6 text-green-600">
            成果: {caseStudy.result}
          </p>
          <Link
            href="/cases"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            成功事例一覧に戻る
          </Link>
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = [
    { params: { case: "ec-efficiency" } },
    { params: { case: "manufacturing-optimization" } },
    { params: { case: "office-automation" } },
    { params: { case: "inventory-improvement" } },
    { params: { case: "data-processing-speedup" } },
  ];
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const caseStudies = {
    "ec-efficiency": {
      title: "EC事業の効率化",
      service: "EC・フルフィルメント",
      description: "当社がEC事業の効率化をどのようにサポートしたかをご紹介します。",
      result: "作業効率50%向上、コスト20%削減。",
    },
    "manufacturing-optimization": {
      title: "製造プロセスの最適化",
      service: "アセンブリ・セット作業",
      description: "製造プロセスの最適化事例をご覧ください。",
      result: "生産性30%向上、納期短縮10%。",
    },
    "office-automation": {
      title: "事務作業の自動化",
      service: "事務局代行",
      description: "事務作業の自動化による成果をご確認ください。",
      result: "作業時間70%削減、エラー率0.1%。",
    },
    "inventory-improvement": {
      title: "在庫管理の改善",
      service: "在庫管理・受発注文業務",
      description: "在庫管理の改善事例をご紹介。",
      result: "在庫精度95%、コスト15%削減。",
    },
    "data-processing-speedup": {
      title: "データ処理の高速化",
      service: "データ処理・オーバープリント",
      description: "データ処理の高速化事例をご覧ください。",
      result: "処理速度3倍、正確性98%。",
    },
  };

  const caseStudy = caseStudies[params.case] || {
    title: "ケースが見つかりません",
    service: "不明",
    description: "指定された成功事例は存在しません。",
    result: "",
  };

  return { props: { caseStudy } };
}