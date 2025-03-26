import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Slider from "react-slick";
import ProgressBar from "@ramonak/react-progress-bar";
import Collapsible from "react-collapsible";
import CountUp from "react-countup";
import { Users, FileText, Settings, Truck, CheckCircle, DollarSign, Package, Wrench, File, Box, CircuitBoard, Star, Clock, Shield, BarChart, Award } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Debug: Services detail page in light mode only, in /pages/services/[service].js, with footer at bottom via Layout.js.
export default function ServiceDetail() {
  const router = useRouter();
  const { service } = router.query;

  // Service-specific data with enriched content
  const services = {
    "ec-fulfillment": {
      title: "EC・フルフィルメント",
      slogan: "EC運営を効率化！迅速な配送で顧客満足度アップ！",
      overview: "EC・フルフィルメントサービスでは、オンラインストアの注文処理から配送までを一貫してサポートします。ダイオーミウラBPOビジネスセンターは、最新の物流技術と全国配送ネットワークを活用し、納期短縮とコスト削減を実現します。EC事業の成長を加速させるパートナーとして、迅速かつ効率的な物流ソリューションを提供します。私たちは、顧客満足度を最優先に考え、注文から配送までをシームレスに管理します。",
      team: [
        { name: "山田太郎", role: "物流マネージャー", quote: "迅速な配送で顧客満足度を向上させるのが私の使命です！" },
        { name: "佐藤花子", role: "在庫管理スペシャリスト", quote: "在庫の最適化でコストを削減し、貴社の成長を支えます！" },
      ],
      problemsSolved: [
        { title: "注文処理の遅延", description: "ピーク時の注文増加による処理遅延で、顧客からのクレームが多発していませんか？当社の自動化システムで、注文処理時間を50%短縮します。" },
        { title: "在庫管理のミス", description: "在庫管理のミスによる欠品や過剰在庫で、機会損失やコスト増大が発生していませんか？リアルタイム在庫追跡で、精度95%を保証します。" },
        { title: "配送コストの高騰", description: "非効率な物流による配送コストの高騰が課題ではありませんか？全国配送ネットワークで、配送コストを30%削減します。" },
      ],
      keyBenefits: [
        { title: "注文処理時間を50%短縮", icon: <Clock className="w-8 h-8 text-green-600" /> },
        { title: "配送コストを30%削減", icon: <DollarSign className="w-8 h-8 text-green-600" /> },
        { title: "顧客満足度を20%向上", icon: <Star className="w-8 h-8 text-green-600" /> },
      ],
      strengths: [
        { title: "迅速な注文処理で納期を短縮！", description: "注文から発送までを最短時間で処理し、顧客の待ち時間を最小限に抑えます。ピーク時でも遅延ゼロを実現します。", metric: "処理時間50%削減" },
        { title: "効率的な在庫管理でコスト削減！", description: "リアルタイムの在庫管理で過剰在庫や欠品を防ぎ、コストを最適化します。精度95%の在庫管理を保証します。", metric: "在庫精度95%" },
        { title: "全国配送ネットワークでスムーズな物流！", description: "全国に広がる配送ネットワークで、迅速かつ確実な配送を実現します。配送コストを30%削減し、顧客満足度を向上させます。", metric: "配送コスト30%削減" },
      ],
      whyChooseUs: "ダイオーミウラBPOのEC・フルフィルメントサービスは、迅速性、効率性、信頼性を兼ね備えています。貴社のEC事業を次のレベルに引き上げるために、私たちが全力でサポートします。",
      caseStudies: [
        {
          title: "EC事業者A社の成功事例",
          description: "EC事業者A社（アパレル業界）は、急増する注文に対応できず、配送遅延が頻発していました。当社のEC・フルフィルメントサービスを導入後、注文処理時間を50%短縮し、配送コストを30%削減。年間1,000万円以上のコスト削減を実現しました。さらに、配送スピードの向上により、顧客満足度が20%向上しました。",
          testimonial: "ダイオーミウラBPOのおかげで、配送スピードが劇的に向上し、顧客からの評価が上がりました。コスト削減も大きな魅力です！",
          client: "EC事業者A社 代表",
        },
        {
          title: "オンライン小売業F社の成功事例",
          description: "オンライン小売業F社（家電業界）は、在庫管理のミスによる欠品が課題でした。当社のサービス導入後、在庫精度が95%に向上し、欠品率がゼロに。年間500万円のコスト削減を実現し、売上も15%増加しました。",
          testimonial: "在庫管理が劇的に改善し、欠品がなくなりました。売上アップにもつながり、大満足です！",
          client: "オンライン小売業F社 経営者",
        },
      ],
      costSavings: 70, // Percentage for the progress bar
      process: [
        {
          step: "注文受付",
          description: "オンラインストアからの注文をリアルタイムで受付し、即座に対応を開始します。",
          substeps: ["注文データの自動取得", "注文内容の確認", "処理ステータスの更新"],
          icon: <Users className="w-12 h-12 text-green-600" />,
        },
        {
          step: "在庫確認",
          description: "最新の在庫管理システムで在庫状況を即座に確認し、欠品リスクを最小限に抑えます。",
          substeps: ["在庫データのリアルタイム更新", "欠品アラートの設定", "在庫補充の提案"],
          icon: <Package className="w-12 h-12 text-green-600" />,
        },
        {
          step: "梱包・発送",
          description: "迅速かつ丁寧に商品を梱包し、全国配送ネットワークを通じて発送します。",
          substeps: ["商品のピッキング", "丁寧な梱包作業", "配送ラベルの作成"],
          icon: <Settings className="w-12 h-12 text-green-600" />,
        },
        {
          step: "配送追跡",
          description: "配送状況をリアルタイムで追跡し、顧客に安心を提供します。",
          substeps: ["配送状況のモニタリング", "顧客への通知", "配送完了の確認"],
          icon: <Truck className="w-12 h-12 text-green-600" />,
        },
      ],
      features: [
        { title: "自動化された注文処理", description: "注文処理を自動化し、人的ミスを排除します。", icon: <Settings className="w-8 h-8 text-green-600" /> },
        { title: "リアルタイム在庫管理", description: "在庫状況をリアルタイムで把握し、欠品を防ぎます。", icon: <Package className="w-8 h-8 text-green-600" /> },
        { title: "全国配送ネットワーク", description: "全国に広がるネットワークで、迅速な配送を実現します。", icon: <Truck className="w-8 h-8 text-green-600" /> },
      ],
      testimonials: [
        { quote: "配送スピードが劇的に向上しました。顧客からの評価も上がっています！", client: "EC事業者A社 代表" },
        { quote: "在庫管理が改善され、欠品がなくなりました。売上が15%増加しました！", client: "オンライン小売業F社 経営者" },
      ],
      stats: [
        { label: "注文処理時間削減", value: 50, suffix: "%" },
        { label: "配送コスト削減", value: 30, suffix: "%" },
        { label: "顧客満足度向上", value: 20, suffix: "%" },
      ],
      faqs: [
        { question: "EC・フルフィルメントサービスの料金は？", answer: "料金は貴社のニーズに応じてカスタマイズされます。無料見積シミュレーションで詳細をご確認ください。" },
        { question: "どのくらいの期間で導入できますか？", answer: "通常、1ヶ月以内に導入が可能です。詳細なスケジュールはヒアリング時にご案内します。" },
      ],
      accentColor: "green-600",
      heroBackground: "/ec-fulfillment-hero.jpg",
    },
    assembly: {
      title: "アセンブリ・セット作業",
      slogan: "精密なアセンブリで生産性向上！品質を保証！",
      overview: "アセンブリ・セット作業で、製造プロセスの最適化をサポートします。ダイオーミウラBPOビジネスセンターは、精密な技術と厳格な品質管理を通じて、生産性向上と高品質な製品提供を実現します。製造業の課題を解決し、効率的な生産ラインを構築します。私たちは、貴社の製品が最高の品質で市場に出るよう、全工程でサポートします。",
      team: [
        { name: "田中一郎", role: "アセンブリ技術者", quote: "精密な技術で、最高品質の製品をお届けします！" },
        { name: "鈴木美咲", role: "品質管理責任者", quote: "不良品ゼロを目指し、厳格な検査を行っています！" },
      ],
      problemsSolved: [
        { title: "アセンブリ工程でのミス", description: "手作業によるアセンブリミスで、不良品率が上昇していませんか？当社の熟練技術者がミスをゼロにします。" },
        { title: "品質管理の不徹底", description: "品質管理が不十分で、不良品が市場に出てしまっていませんか？多段階検査で不良品を徹底排除します。" },
        { title: "生産スケジュールの遅れ", description: "生産スケジュールの遅れで納期が守れていませんか？柔軟なスケーリングで納期遵守率98%を実現します。" },
      ],
      keyBenefits: [
        { title: "不良品率を40%削減", icon: <Shield className="w-8 h-8 text-gray-600" /> },
        { title: "生産効率を25%向上", icon: <BarChart className="w-8 h-8 text-gray-600" /> },
        { title: "納期遵守率を98%に", icon: <Clock className="w-8 h-8 text-gray-600" /> },
      ],
      strengths: [
        { title: "精密なアセンブリ技術で品質向上！", description: "熟練の技術者が精密なアセンブリを行い、製品の品質を保証します。不良品率を40%削減します。", metric: "不良品率40%削減" },
        { title: "柔軟なスケーリングで急な需要に対応！", description: "生産量の変動にも迅速に対応し、スケジュールを守ります。納期遵守率98%を達成します。", metric: "納期遵守率98%" },
        { title: "厳格な品質管理体制で安心！", description: "多段階の検査プロセスで不良品を徹底的に排除します。品質基準を満たした製品のみを出荷します。", metric: "品質基準100%遵守" },
      ],
      whyChooseUs: "ダイオーミウラBPOのアセンブリ・セット作業サービスは、精密さ、柔軟性、信頼性を提供します。貴社の製造プロセスを最適化し、最高品質の製品をお届けします。",
      caseStudies: [
        {
          title: "製造業B社の成功事例",
          description: "製造業B社（電子機器製造）は、アセンブリ工程でのミスが多く、不良品率が課題でした。当社のアセンブリ・セット作業サービスを導入後、不良品率を40%削減し、生産効率を25%向上させました。年間800万円のコスト削減を実現し、納期遵守率も98%に向上しました。",
          testimonial: "ダイオーミウラBPOの精密なアセンブリ技術のおかげで、不良品が激減しました。信頼できるパートナーです！",
          client: "製造業B社 生産部長",
        },
        {
          title: "製造業G社の成功事例",
          description: "製造業G社（自動車部品製造）は、生産スケジュールの遅れが課題でした。当社のサービス導入後、納期遵守率が98%に向上し、生産効率が20%向上。年間600万円のコスト削減を実現しました。",
          testimonial: "納期が守れるようになり、クライアントからの信頼が向上しました。素晴らしいサービスです！",
          client: "製造業G社 工場長",
        },
      ],
      costSavings: 65,
      process: [
        {
          step: "部品準備",
          description: "必要な部品を正確に準備し、生産ラインのスムーズな稼働を確保します。",
          substeps: ["部品リストの確認", "部品の品質チェック", "生産ラインへの供給"],
          icon: <Users className="w-12 h-12 text-gray-600" />,
        },
        {
          step: "アセンブリ",
          description: "熟練の技術者が精密なアセンブリ作業を行い、製品を組み立てます。",
          substeps: ["部品の組み立て", "工程ごとの確認", "作業記録の作成"],
          icon: <Wrench className="w-12 h-12 text-gray-600" />,
        },
        {
          step: "検査",
          description: "多段階の品質検査を実施し、不良品を徹底的に排除します。",
          substeps: ["初期検査", "最終検査", "品質レポートの作成"],
          icon: <Settings className="w-12 h-12 text-gray-600" />,
        },
        {
          step: "出荷",
          description: "完成品を丁寧に梱包し、迅速に出荷します。",
          substeps: ["梱包作業", "出荷ラベルの作成", "配送手配"],
          icon: <Truck className="w-12 h-12 text-gray-600" />,
        },
      ],
      features: [
        { title: "精密なアセンブリ技術", description: "熟練の技術者が高品質なアセンブリを行います。", icon: <Wrench className="w-8 h-8 text-gray-600" /> },
        { title: "多段階品質検査", description: "厳格な検査で不良品を排除します。", icon: <Shield className="w-8 h-8 text-gray-600" /> },
        { title: "柔軟なスケーリング", description: "生産量の変動に迅速に対応します。", icon: <BarChart className="w-8 h-8 text-gray-600" /> },
      ],
      testimonials: [
        { quote: "不良品が激減し、品質が向上しました。信頼できるパートナーです！", client: "製造業B社 生産部長" },
        { quote: "納期が守れるようになり、クライアントからの信頼が向上しました！", client: "製造業G社 工場長" },
      ],
      stats: [
        { label: "不良品率削減", value: 40, suffix: "%" },
        { label: "生産効率向上", value: 25, suffix: "%" },
        { label: "納期遵守率", value: 98, suffix: "%" },
      ],
      faqs: [
        { question: "アセンブリ・セット作業の品質はどのように保証されますか？", answer: "多段階の品質検査を実施し、品質基準を満たした製品のみを出荷します。" },
        { question: "急な生産量の増加に対応できますか？", answer: "はい、柔軟なスケーリングで急な需要にも迅速に対応可能です。" },
      ],
      accentColor: "gray-600",
      heroBackground: "/assembly-hero.jpg",
    },
    secretariat: {
      title: "事務局代行",
      slogan: "事務作業を自動化！効率化で時間を節約！",
      overview: "事務局代行サービスで、日常業務の自動化と効率化を支援します。ダイオーミウラBPOビジネスセンターは、最新の自動化技術を活用し、作業時間削減とデータ精度の向上を実現します。煩雑な事務作業から解放され、貴社のコア業務に集中できます。私たちは、貴社の業務プロセスを最適化し、効率的な運用をサポートします。",
      team: [
        { name: "高橋健太", role: "自動化スペシャリスト", quote: "最新技術で、貴社の事務作業を効率化します！" },
        { name: "中村彩", role: "データ処理エキスパート", quote: "データ精度99%を保証し、ミスをゼロにします！" },
      ],
      problemsSolved: [
        { title: "事務作業の負担", description: "事務作業の負担で従業員が疲弊していませんか？自動化ソリューションで作業時間を60%削減します。" },
        { title: "データ入力ミス", description: "データ入力ミスによる業務遅延が課題ではありませんか？データ精度99%を保証します。" },
        { title: "カスタマーサポートの非効率", description: "非効率なカスタマーサポートで顧客満足度が低下していませんか？満足度を20%向上させます。" },
      ],
      keyBenefits: [
        { title: "事務作業時間を60%削減", icon: <Clock className="w-8 h-8 text-blue-600" /> },
        { title: "データ精度を99%に", icon: <Shield className="w-8 h-8 text-blue-600" /> },
        { title: "カスタマーサポート満足度を20%向上", icon: <Star className="w-8 h-8 text-blue-600" /> },
      ],
      strengths: [
        { title: "自動化ソリューションで作業時間を大幅削減！", description: "最新の自動化ツールで、繰り返し作業を効率化します。作業時間を60%削減します。", metric: "作業時間60%削減" },
        { title: "データ入力精度99%でミスを防止！", description: "高精度なデータ処理で、ミスによるトラブルを防ぎます。データ精度99%を保証します。", metric: "データ精度99%" },
        { title: "カスタム対応で柔軟なサポート！", description: "貴社のニーズに合わせた柔軟なサービスを提供します。カスタマーサポート満足度を20%向上させます。", metric: "満足度20%向上" },
      ],
      whyChooseUs: "ダイオーミウラBPOの事務局代行サービスは、自動化、精度、柔軟性を提供します。貴社の事務作業を効率化し、コア業務に集中できる環境を整えます。",
      caseStudies: [
        {
          title: "企業C社の成功事例",
          description: "企業C社（ITサービス業）は、事務作業の負担が大きく、従業員の残業が増えていました。当社の事務局代行サービスを導入後、事務作業時間を60%削減し、カスタマーサポートの満足度を20%向上させました。年間500万円のコスト削減を実現し、従業員の働き方改革にも貢献しました。",
          testimonial: "ダイオーミウラBPOの自動化ソリューションで、事務作業が劇的に効率化しました。従業員の負担が減り、満足しています！",
          client: "企業C社 人事部長",
        },
        {
          title: "企業H社の成功事例",
          description: "企業H社（金融業）は、データ入力ミスによるトラブルが課題でした。当社のサービス導入後、データ精度が99%に向上し、ミスがゼロに。年間400万円のコスト削減を実現しました。",
          testimonial: "データ精度が向上し、トラブルがなくなりました。素晴らしいサービスです！",
          client: "企業H社 経理部長",
        },
      ],
      costSavings: 60,
      process: [
        {
          step: "業務分析",
          description: "現在の業務フローを詳細に分析し、効率化のポイントを特定します。",
          substeps: ["業務プロセスのマッピング", "非効率ポイントの特定", "改善案の提案"],
          icon: <Users className="w-12 h-12 text-blue-600" />,
        },
        {
          step: "システム導入",
          description: "自動化システムを導入し、業務プロセスを最適化します。",
          substeps: ["システムの選定", "カスタマイズと設定", "従業員トレーニング"],
          icon: <File className="w-12 h-12 text-blue-600" />,
        },
        {
          step: "運用サポート",
          description: "スムーズな運用を確保するための継続的なサポートを提供します。",
          substeps: ["運用状況のモニタリング", "問題の迅速な解決", "定期的なフィードバック"],
          icon: <Settings className="w-12 h-12 text-blue-600" />,
        },
        {
          step: "レポート提供",
          description: "定期的なレポートで業務の進捗や成果を確認できます。",
          substeps: ["データ収集と分析", "レポート作成", "改善提案"],
          icon: <Truck className="w-12 h-12 text-blue-600" />,
        },
      ],
      features: [
        { title: "自動化ソリューション", description: "繰り返し作業を自動化し、効率を向上させます。", icon: <Settings className="w-8 h-8 text-blue-600" /> },
        { title: "高精度データ処理", description: "データ精度99%を保証し、ミスを防ぎます。", icon: <Shield className="w-8 h-8 text-blue-600" /> },
        { title: "カスタム対応", description: "貴社のニーズに合わせた柔軟なサポートを提供します。", icon: <Star className="w-8 h-8 text-blue-600" /> },
      ],
      testimonials: [
        { quote: "事務作業が劇的に効率化しました。従業員の負担が減りました！", client: "企業C社 人事部長" },
        { quote: "データ精度が向上し、トラブルがなくなりました。素晴らしいサービスです！", client: "企業H社 経理部長" },
      ],
      stats: [
        { label: "作業時間削減", value: 60, suffix: "%" },
        { label: "データ精度", value: 99, suffix: "%" },
        { label: "満足度向上", value: 20, suffix: "%" },
      ],
      faqs: [
        { question: "事務局代行サービスの導入にはどのくらい時間がかかりますか？", answer: "通常、2週間から1ヶ月程度で導入可能です。詳細はヒアリング時にご案内します。" },
        { question: "カスタマーサポートも代行してもらえますか？", answer: "はい、カスタマーサポート業務も代行可能です。貴社のニーズに合わせて対応します。" },
      ],
      accentColor: "blue-600",
      heroBackground: "/secretariat-hero.jpg",
    },
    inventory: {
      title: "在庫管理・受発注業務",
      slogan: "在庫管理を最適化！コストと時間を節約！",
      overview: "在庫管理・受発注業務で、精度と効率を向上させます。ダイオーミウラBPOビジネスセンターは、最新の在庫管理システムを活用し、在庫精度95%を保証します。過剰在庫や欠品を防ぎ、コストと時間を大幅に節約します。私たちは、貴社の在庫管理を最適化し、ビジネス成長を支えるパートナーとして全力でサポートします。",
      team: [
        { name: "松本翔", role: "在庫管理エキスパート", quote: "在庫の最適化で、貴社のコストを削減します！" },
        { name: "林優子", role: "物流コーディネーター", quote: "スムーズな物流で、貴社のビジネスを加速します！" },
      ],
      problemsSolved: [
        { title: "在庫過多や欠品", description: "在庫過多や欠品による機会損失が発生していませんか？在庫精度95%で、適切な在庫管理を実現します。" },
        { title: "手動発注のミス", description: "手動発注によるミスや遅延が課題ではありませんか？自動発注システムでミスをゼロにします。" },
        { title: "在庫管理コストの高騰", description: "在庫管理コストの高騰で利益が圧迫されていませんか？コストを30%削減します。" },
      ],
      keyBenefits: [
        { title: "在庫精度を95%に向上", icon: <Shield className="w-8 h-8 text-orange-600" /> },
        { title: "発注ミスをゼロに", icon: <CheckCircle className="w-8 h-8 text-orange-600" /> },
        { title: "在庫管理コストを30%削減", icon: <DollarSign className="w-8 h-8 text-orange-600" /> },
      ],
      strengths: [
        { title: "リアルタイム在庫追跡で精度95%！", description: "最新システムで在庫状況をリアルタイムに把握し、精度を確保します。在庫精度95%を保証します。", metric: "在庫精度95%" },
        { title: "自動発注システムでミスをゼロに！", description: "自動化された発注プロセスで、人的ミスを完全に排除します。発注ミスゼロを実現します。", metric: "発注ミス0%" },
        { title: "コスト最適化で大幅な節約！", description: "効率的な在庫管理で、コストを大幅に削減します。在庫管理コストを30%削減します。", metric: "コスト30%削減" },
      ],
      whyChooseUs: "ダイオーミウラBPOの在庫管理・受発注業務サービスは、精度、効率、コスト削減を提供します。貴社の在庫管理を最適化し、ビジネス成長を加速させます。",
      caseStudies: [
        {
          title: "小売業D社の成功事例",
          description: "小売業D社（食品業界）は、在庫過多と欠品が頻発し、機会損失が課題でした。当社の在庫管理・受発注業務サービスを導入後、在庫精度を95%に向上させ、発注ミスをゼロにしました。年間600万円のコスト削減を実現し、売上も10%増加しました。",
          testimonial: "ダイオーミウラBPOの在庫管理サービスで、欠品がなくなり、売上が伸びました。コスト削減も素晴らしいです！",
          client: "小売業D社 経営者",
        },
        {
          title: "小売業I社の成功事例",
          description: "小売業I社（アパレル業界）は、手動発注によるミスが課題でした。当社のサービス導入後、発注ミスがゼロになり、在庫管理コストが25%削減。年間400万円のコスト削減を実現しました。",
          testimonial: "発注ミスがなくなり、在庫管理が楽になりました。コスト削減効果も大きいです！",
          client: "小売業I社 店長",
        },
      ],
      costSavings: 60,
      process: [
        {
          step: "在庫モニタリング",
          description: "在庫状況をリアルタイムで監視し、異常を即座に検知します。",
          substeps: ["在庫データの収集", "異常検知アラートの設定", "在庫状況の可視化"],
          icon: <Users className="w-12 h-12 text-orange-600" />,
        },
        {
          step: "発注計画",
          description: "需要予測に基づく発注計画を作成し、過剰在庫を防ぎます。",
          substeps: ["需要予測の分析", "発注量の決定", "発注スケジュールの作成"],
          icon: <Box className="w-12 h-12 text-orange-600" />,
        },
        {
          step: "物流調整",
          description: "効率的な物流スケジュールを調整し、配送を最適化します。",
          substeps: ["配送ルートの最適化", "物流パートナーとの連携", "配送スケジュールの管理"],
          icon: <Settings className="w-12 h-12 text-orange-600" />,
        },
        {
          step: "レポート",
          description: "詳細な在庫レポートを提供し、データに基づく意思決定を支援します。",
          substeps: ["データ分析", "レポート作成", "改善提案"],
          icon: <Truck className="w-12 h-12 text-orange-600" />,
        },
      ],
      features: [
        { title: "リアルタイム在庫追跡", description: "在庫状況をリアルタイムで把握し、精度を確保します。", icon: <Box className="w-8 h-8 text-orange-600" /> },
        { title: "自動発注システム", description: "発注プロセスを自動化し、ミスを排除します。", icon: <CheckCircle className="w-8 h-8 text-orange-600" /> },
        { title: "コスト最適化", description: "効率的な在庫管理でコストを削減します。", icon: <DollarSign className="w-8 h-8 text-orange-600" /> },
      ],
      testimonials: [
        { quote: "欠品がなくなり、売上が伸びました。コスト削減も素晴らしいです！", client: "小売業D社 経営者" },
        { quote: "発注ミスがなくなり、在庫管理が楽になりました。コスト削減効果も大きいです！", client: "小売業I社 店長" },
      ],
      stats: [
        { label: "在庫精度", value: 95, suffix: "%" },
        { label: "発注ミス削減", value: 100, suffix: "%" },
        { label: "コスト削減", value: 30, suffix: "%" },
      ],
      faqs: [
        { question: "在庫管理システムの導入にはどのくらい時間がかかりますか？", answer: "通常、2週間から1ヶ月程度で導入可能です。詳細はヒアリング時にご案内します。" },
        { question: "在庫データのセキュリティはどのように確保されますか？", answer: "最新のセキュリティ技術を活用し、データの安全性を確保します。" },
      ],
      accentColor: "orange-600",
      heroBackground: "/inventory-hero.jpg",
    },
    "data-processing": {
      title: "データ処理・オーバープリント",
      slogan: "高速データ処理！正確性で業務を加速！",
      overview: "データ処理・オーバープリントで、高速かつ正確な処理を提供します。ダイオーミウラBPOビジネスセンターは、最新技術を活用し、処理速度3倍、精度98%を達成します。大量のデータを効率的に処理し、ビジネスを加速させます。私たちは、貴社のデータ処理ニーズに柔軟に対応し、最高品質の成果物をお届けします。",
      team: [
        { name: "石川亮", role: "データ処理エンジニア", quote: "高速かつ正確なデータ処理で、貴社の業務を加速します！" },
        { name: "小林真由", role: "オーバープリントスペシャリスト", quote: "多様なフォーマットに対応し、最高品質の成果物をお届けします！" },
      ],
      problemsSolved: [
        { title: "データ処理の遅延", description: "データ処理の遅延で業務が停滞していませんか？処理速度を3倍に向上させます。" },
        { title: "処理ミス", description: "処理ミスによるデータ品質の低下が課題ではありませんか？精度98%を保証します。" },
        { title: "フォーマット対応不足", description: "多様なフォーマットへの対応が不足していませんか？カスタムフォーマットに対応します。" },
      ],
      keyBenefits: [
        { title: "処理速度を3倍に向上", icon: <Clock className="w-8 h-8 text-purple-600" /> },
        { title: "データ精度を98%に", icon: <Shield className="w-8 h-8 text-purple-600" /> },
        { title: "多様なフォーマットに対応", icon: <Star className="w-8 h-8 text-purple-600" /> },
      ],
      strengths: [
        { title: "高速データ処理で処理速度3倍！", description: "最新技術で、大量のデータを迅速に処理します。処理速度を3倍に向上させます。", metric: "処理速度3倍" },
        { title: "精度98%保証で信頼性抜群！", description: "高精度な処理で、データの信頼性を確保します。精度98%を保証します。", metric: "精度98%" },
        { title: "カスタムフォーマット対応で柔軟性抜群！", description: "多様なフォーマットに対応し、ニーズに柔軟に応えます。カスタム対応で満足度を向上させます。", metric: "満足度100%" },
      ],
      whyChooseUs: "ダイオーミウラBPOのデータ処理・オーバープリントサービスは、速度、精度、柔軟性を提供します。貴社のデータ処理を効率化し、ビジネスを加速させます。",
      caseStudies: [
        {
          title: "印刷業E社の成功事例",
          description: "印刷業E社（パッケージ印刷）は、データ処理の遅延とミスが課題でした。当社のデータ処理・オーバープリントサービスを導入後、処理速度を3倍に向上させ、ミス率を1%未満に抑えました。年間700万円のコスト削減を実現し、クライアントからの信頼も向上しました。",
          testimonial: "ダイオーミウラBPOのデータ処理サービスで、業務が劇的に効率化しました。ミスが減り、クライアントからの評価も上がりました！",
          client: "印刷業E社 代表",
        },
        {
          title: "印刷業J社の成功事例",
          description: "印刷業J社（商業印刷）は、多様なフォーマットへの対応が課題でした。当社のサービス導入後、カスタムフォーマット対応が可能になり、処理速度が2.5倍に向上。年間500万円のコスト削減を実現しました。",
          testimonial: "多様なフォーマットに対応できるようになり、業務がスムーズになりました。素晴らしいサービスです！",
          client: "印刷業J社 経営者",
        },
      ],
      costSavings: 65,
      process: [
        {
          step: "データ収集",
          description: "多様なソースからデータを効率的に収集します。",
          substeps: ["データソースの特定", "データ収集の自動化", "データの初期検証"],
          icon: <Users className="w-12 h-12 text-purple-600" />,
        },
        {
          step: "処理・変換",
          description: "高速かつ正確にデータを処理・変換し、必要な形式に整えます。",
          substeps: ["データのクリーニング", "フォーマット変換", "処理の最適化"],
          icon: <CircuitBoard className="w-12 h-12 text-purple-600" />,
        },
        {
          step: "検証",
          description: "データの正確性を厳格に検証し、品質を確保します。",
          substeps: ["データ整合性のチェック", "エラー検出", "品質レポートの作成"],
          icon: <Settings className="w-12 h-12 text-purple-600" />,
        },
        {
          step: "出力",
          description: "指定されたフォーマットでデータを最終出力します。",
          substeps: ["出力フォーマットの確認", "最終データの生成", "クライアントへの納品"],
          icon: <Truck className="w-12 h-12 text-purple-600" />,
        },
      ],
      features: [
        { title: "高速データ処理", description: "処理速度を3倍に向上させ、業務を加速します。", icon: <Clock className="w-8 h-8 text-purple-600" /> },
        { title: "高精度処理", description: "データ精度98%を保証し、信頼性を確保します。", icon: <Shield className="w-8 h-8 text-purple-600" /> },
        { title: "カスタムフォーマット対応", description: "多様なフォーマットに対応し、柔軟性を提供します。", icon: <Star className="w-8 h-8 text-purple-600" /> },
      ],
      testimonials: [
        { quote: "業務が劇的に効率化しました。ミスが減り、クライアントからの評価も上がりました！", client: "印刷業E社 代表" },
        { quote: "多様なフォーマットに対応できるようになり、業務がスムーズになりました！", client: "印刷業J社 経営者" },
      ],
      stats: [
        { label: "処理速度向上", value: 3, suffix: "倍" },
        { label: "データ精度", value: 98, suffix: "%" },
        { label: "コスト削減", value: 700, suffix: "万円" },
      ],
      faqs: [
        { question: "データ処理の速度はどのくらい向上しますか？", answer: "当社のサービスで、処理速度を3倍に向上させることが可能です。" },
        { question: "どのようなフォーマットに対応できますか？", answer: "PDF、CSV、XMLなど、多様なフォーマットに対応可能です。詳細はご相談ください。" },
      ],
      accentColor: "purple-600",
      heroBackground: "/data-processing-hero.jpg",
    },
  };

  const serviceData = services[service] || {
    title: "サービスが見つかりません",
    slogan: "",
    overview: "指定されたサービスは存在しません。",
    team: [],
    problemsSolved: [],
    keyBenefits: [],
    strengths: [],
    whyChooseUs: "",
    caseStudies: [],
    costSavings: 0,
    process: [],
    features: [],
    testimonials: [],
    stats: [],
    faqs: [],
    accentColor: "gray-600",
    heroBackground: "/default-hero.jpg",
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3, duration: 0.5 },
    }),
  };

  // Slider settings for carousels
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Contact form handling
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("お問い合わせありがとうございます！後ほどご連絡いたします。");
  };

  return (
    <>
      <Head>
        <title>{serviceData.title} - ダイオーミウラBPOビジネスセンター</title>
        <meta
          name="description"
          content={`${serviceData.title}：ダイオーミウラBPOビジネスセンターのBPOサービス。詳細と利点をご確認ください。`}
        />
        <meta property="og:title" content={`${serviceData.title} - ダイオーミウラBPOビジネスセンター`} />
        <meta
          property="og:description"
          content={`${serviceData.title}：ダイオーミウラBPOビジネスセンターのBPOサービス。詳細と利点をご確認ください。`}
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content={`https://yourwebsite.com/services/${service}`} />
      </Head>
      <main className="flex-grow">
        {/* 従業員やる気満々顔出し及びスローガン (Motivated Employees with Faces and Slogan) */}
        <motion.section
          className="py-32 bg-cover bg-center text-center text-white relative"
          style={{ backgroundImage: `url('${serviceData.heroBackground}')` }}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative max-w-5xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{serviceData.title}</h1>
            <p className="text-3xl font-semibold mb-6">{serviceData.slogan}</p>
            <p className="text-lg mb-8">{serviceData.overview}</p>
            <div className="max-w-3xl mx-auto">
              <Slider {...sliderSettings}>
                {serviceData.team.map((member, index) => (
                  <div key={index} className="p-4">
                    <p className="text-xl italic mb-2">"{member.quote}"</p>
                    <p className="text-lg font-semibold">{member.name}</p>
                    <p className="text-md">{member.role}</p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </motion.section>

        {/* 何か解決できるか (What We Can Solve) */}
        <motion.section
          className="py-16 bg-gradient-to-b from-gray-50 to-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">解決できる課題</h2>
            <div className="space-y-8 mb-12">
              {serviceData.problemsSolved.map((problem, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className={`w-8 h-8 text-${serviceData.accentColor} mr-4 mt-1`} />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{problem.title}</h3>
                    <p className="text-gray-600">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">主なメリット</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {serviceData.keyBenefits.map((benefit, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-lg text-center">
                  {benefit.icon}
                  <p className="text-lg font-semibold text-gray-800 mt-4">{benefit.title}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 我々の強み (Our Strengths) */}
        <motion.section
          className="py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">我々の強み</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {serviceData.strengths.map((strength, index) => (
                <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
                  <CheckCircle className={`w-12 h-12 text-${serviceData.accentColor} mx-auto mb-4`} />
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{strength.title}</h4>
                  <p className="text-gray-600 mb-4">{strength.description}</p>
                  <p className="text-sm font-semibold text-gray-800">{strength.metric}</p>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-600 text-center">{serviceData.whyChooseUs}</p>
          </div>
        </motion.section>

        {/* Service Features */}
        <motion.section
          className="py-16 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">サービスの特徴</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {serviceData.features.map((feature, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-lg text-center">
                  {feature.icon}
                  <h4 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 導入事例みつ (Case Studies with Cost Simulation) */}
        <motion.section
          className="py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">導入事例</h2>
            <div className="space-y-12 mb-12">
              {serviceData.caseStudies.map((caseStudy, index) => (
                <div key={index} className="p-8 bg-gray-100 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">{caseStudy.title}</h3>
                  <p className="text-gray-600 mb-4">{caseStudy.description}</p>
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4">
                    "{caseStudy.testimonial}" - {caseStudy.client}
                  </blockquote>
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">コスト削減シミュレーション</h3>
              <p className="text-gray-600 mb-4">当社のサービスで、どれだけコストを削減できるか試算してみましょう！</p>
              <div className="max-w-md mx-auto mb-6">
                <ProgressBar completed={serviceData.costSavings} bgColor={`#${serviceData.accentColor.replace("text-", "").replace("-600", "")}`} height="20px" />
                <p className="text-gray-600 mt-2">平均コスト削減率: {serviceData.costSavings}%</p>
              </div>
              <Link href="/quote">
                <button className={`flex items-center mx-auto px-6 py-3 bg-${serviceData.accentColor} text-white rounded-full font-semibold hover:bg-${serviceData.accentColor.replace("600", "700")} transition-colors`}>
                  <DollarSign className="w-5 h-5 mr-2" />
                  無料見積シミュレーションでコストを試算
                </button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* 作業の流れ（アニメ） (Work Process with Animation) */}
        <motion.section
          className="py-16 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">作業の流れ</h2>
            <div className="relative">
              {serviceData.process.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-center mb-12 relative"
                  variants={stepVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <div className={`flex items-center justify-center w-16 h-16 bg-${serviceData.accentColor} text-white rounded-full mr-6`}>
                    <span className="text-2xl font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {step.icon}
                      <h4 className="text-xl font-semibold text-gray-800 ml-4">{step.step}</h4>
                    </div>
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    <ul className="list-disc pl-6 text-gray-600">
                      {step.substeps.map((substep, subIndex) => (
                        <li key={subIndex}>{substep}</li>
                      ))}
                    </ul>
                  </div>
                  {index < serviceData.process.length - 1 && (
                    <div className="absolute left-8 top-16 h-12 w-0.5 bg-gray-300"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Client Testimonials */}
        <motion.section
          className="py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">お客様の声</h2>
            <Slider {...sliderSettings}>
              {serviceData.testimonials.map((testimonial, index) => (
                <div key={index} className="p-4">
                  <p className="text-xl italic text-gray-600 mb-4">"{testimonial.quote}"</p>
                  <p className="text-lg font-semibold text-gray-800">{testimonial.client}</p>
                </div>
              ))}
            </Slider>
          </div>
        </motion.section>

        {/* Stats and Metrics */}
        <motion.section
          className="py-16 bg-gradient-to-b from-gray-50 to-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">私たちの実績</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {serviceData.stats.map((stat, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-lg text-center">
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} className="text-4xl font-bold text-gray-800" />
                  <p className="text-lg text-gray-600 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* お問い合わせ (Contact Us) & 無料見積 (Free Quote) */}
        <motion.section
          className="py-16 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">今すぐお問い合わせください</h2>
            <p className="text-lg text-gray-600 text-center mb-8">ご質問やご相談がございましたら、お気軽にご連絡ください。24時間以内に迅速に対応いたします！</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="p-8 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">お問い合わせフォーム</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-gray-600 mb-2">お名前</label>
                    <input
                      type="text"
                      {...register("name", { required: "お名前を入力してください" })}
                      className="w-full p-3 border rounded-lg"
                      placeholder="お名前"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-2">メールアドレス</label>
                    <input
                      type="email"
                      {...register("email", { required: "メールアドレスを入力してください" })}
                      className="w-full p-3 border rounded-lg"
                      placeholder="メールアドレス"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-2">お問い合わせ内容</label>
                    <textarea
                      {...register("message", { required: "お問い合わせ内容を入力してください" })}
                      className="w-full p-3 border rounded-lg"
                      placeholder="お問い合わせ内容"
                      rows="4"
                    />
                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" className={`w-full px-6 py-3 bg-${serviceData.accentColor} text-white rounded-full font-semibold hover:bg-${serviceData.accentColor.replace("600", "700")} transition-colors`}>
                    送信する
                  </button>
                </form>
              </div>
              {/* FAQs */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">よくある質問</h3>
                <div className="space-y-4">
                  {serviceData.faqs.map((faq, index) => (
                    <Collapsible key={index} trigger={faq.question} className="bg-white p-4 rounded-lg shadow-md">
                      <p className="text-gray-600 mt-2">{faq.answer}</p>
                    </Collapsible>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link href="/quote">
                    <button className={`px-6 py-3 bg-${serviceData.accentColor} text-white rounded-full font-semibold hover:bg-${serviceData.accentColor.replace("600", "700")} transition-colors`}>
                      無料見積シミュレーション
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Back to Services Link */}
        <motion.section
          className="py-8 bg-white text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <Link
            href="/services"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            事業内容TOPに戻る
          </Link>
        </motion.section>
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
