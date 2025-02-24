import Head from "next/head";
import Link from "next/link";

// Debug: Site map page in light mode only, in /pages/sitemap.js, with footer at bottom via Layout.js.
export default function Sitemap() {
  return (
    <>
      <Head>
        <title>サイトマップ - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
        <meta
          name="description"
          content="ダイオーミウラBPOビジネスセンターのサイトマップをご覧ください。"
        />
        <meta property="og:title" content="サイトマップ - ダイオーミウラBPOビジネスセンター" />
        <meta
          property="og:description"
          content="ダイオーミウラBPOビジネスセンターのサイトマップをご覧ください。"
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com/sitemap" />
      </Head>
      <main className="flex-grow"> {/* Ensure content fills viewport for footer via Layout.js */}
        <section className="py-12 px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">サイトマップ</h1>
          <p className="text-lg mb-8 text-center">
            こちらはダイオーミウラBPOビジネスセンターのサイトマップページです。詳細は後で追加されます。
          </p>
          <ul className="list-disc pl-6 space-y-4">
            <li><Link href="/" className="hover:underline">私たちについて</Link></li>
            <li><Link href="/services" className="hover:underline">サービス一覧</Link></li>
            <li><Link href="/cases" className="hover:underline">成功事例</Link></li>
            <li><Link href="/columns" className="hover:underline">コラム</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/documents" className="hover:underline">資料請求</Link></li>
            <li><Link href="/quote" className="hover:underline">無料見積</Link></li>
            <li><Link href="/contact" className="hover:underline">お問い合わせ</Link></li>
            <li><Link href="/environmental" className="hover:underline">環境への取り組み</Link></li>
            <li><Link href="/sitemap" className="hover:underline">サイトマップ</Link></li>
            <li><Link href="/terms" className="hover:underline">サイトご利用上の注意</Link></li>
            <li><Link href="/privacy" className="hover:underline">プライバシーポリシー</Link></li>
          </ul>
        </section>
      </main>
    </>
  );
}