import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Debug: Services detail page in light mode only, in /pages/services/[service].js, with footer at bottom via Layout.js.
export default function ServiceDetail() {
  const router = useRouter();
  const { service } = router.query; // Matches the file name [service].js

  // Placeholder data (to be expanded with real content)
  const services = {
    "ec-fulfillment": {
      title: "EC・フルフィルメント",
      description: "EC・フルフィルメントサービスでは、注文処理から配送までを一貫してサポートします。ダイオーミウラBPOビジネスセンターは、納期短縮とコスト削減を実現します。",
      strengths: [
        "迅速な注文処理",
        "効率的な在庫管理",
        "全国配送ネットワーク",
      ],
      process: "1. 注文受付 → 2. 在庫確認 → 3. 梱包・発送 → 4. 配送追跡",
    },
    assembly: {
      title: "アセンブリ・セット作業",
      description: "アセンブリ・セット作業で、製造プロセスの最適化をサポートします。ダイオーミウラBPOビジネスセンターは、生産性向上と品質確保を提供します。",
      strengths: [
        "精密なアセンブリ技術",
        "柔軟なスケーリング",
        "品質管理体制",
      ],
      process: "1. 部品準備 → 2. アセンブリ → 3. 検査 → 4. 出荷",
    },
    secretariat: {
      title: "事務局代行",
      description: "事務局代行サービスで、日常業務の自動化と効率化を支援します。ダイオーミウラBPOビジネスセンターは、作業時間削減を実現します。",
      strengths: [
        "自動化ソリューション",
        "データ入力精度",
        "カスタム対応",
      ],
      process: "1. 業務分析 → 2. システム導入 → 3. 運用サポート → 4. レポート提供",
    },
    inventory: {
      title: "在庫管理・受発注業務",
      description: "在庫管理・受発注業務で、精度と効率を向上させます。ダイオーミウラBPOビジネスセンターは、在庫精度95%を保証します。",
      strengths: [
        "リアルタイム在庫追跡",
        "自動発注システム",
        "コスト最適化",
      ],
      process: "1. 在庫モニタリング → 2. 発注計画 → 3. 物流調整 → 4. レポート",
    },
    "data-processing": {
      title: "データ処理・オーバープリント",
      description: "データ処理・オーバープリントで、高速かつ正確な処理を提供します。ダイオーミウラBPOビジネスセンターは、処理速度3倍を達成します。",
      strengths: [
        "高速データ処理",
        "精度98%保証",
        "カスタムフォーマット対応",
      ],
      process: "1. データ収集 → 2. 処理・変換 → 3. 検証 → 4. 出力",
    },
  };

  const serviceData = services[service] || {
    title: "サービスが見つかりません",
    description: "指定されたサービスは存在しません。",
    strengths: [],
    process: "",
  };

  return (
    <>
      <Head>
        <title>{serviceData.title} - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
        <meta
          name="description"
          content={`${serviceData.title}：ダイオーミウラBPOビジネスセンターのBPOサービス。詳細と利点ををご確認ください。`}
        />
        <meta property="og:title" content={`${serviceData.title} - ダイオーミウラBPOビジネスセンター`} />
        <meta
          property="og:description"
          content={`${serviceData.title}：ダイオーミウラBPOビジネスセンターのBPOサービス。詳細と利点をご確認ください。`}
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content={`https://yourwebsite.com/services/${service}`} />
      </Head>
      <main className="flex-grow"> {/* Ensure content fills viewport for footer via Layout.js */}
        <section className="py-12 px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">{serviceData.title}</h1>
          <p className="text-lg mb-8">{serviceData.description}</p>
          <h2 className="text-2xl font-semibold mb-4">強み</h2>
          <ul className="list-disc pl-6 mb-6">
            {serviceData.strengths.map((strength, index) => (
              <li key={index} className="text-gray-600">{strength}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mb-4">プロセス</h2>
          <p className="text-gray-600">{serviceData.process}</p>
          <Link
            href="/services"
            className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            事業内容TOPに戻る
          </Link>
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = [
    { params: { service: "ec-fulfillment" } },
    { params: { service: "assembly" } },
    { params: { service: "secretariat" } },
    { params: { service: "inventory" } },
    { params: { service: "data-processing" } },
  ];
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: {} };
}