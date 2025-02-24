import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

// Debug: Documents request page in light mode only, in /pages/documents.js, with form, direct PDF download from public, and success message, footer at bottom via Layout.js.
export default function Documents() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.company) {
      setError("名前、メールアドレス、会社名は必須です。");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("有効なメールアドレスを入力してください。");
      return;
    }
    setError("");

    // Trigger direct download of public/xx.pdf
    try {
      const url = "/test.pdf"; // Path to the PDF in the public directory
      const link = document.createElement("a");
      link.href = url;
      link.download = "bpo_document.pdf"; // Name of the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up

      setIsSubmitted(true);
    } catch (err) {
      setError("資料のダウンロードにエラーが発生しました: " + err.message);
      setIsSubmitted(false);
    }
  };

  // Clean up any potential issues (though not strictly necessary for direct download)
  useEffect(() => {
    return () => {
      // No cleanup needed for direct URL downloads, but included for consistency
    };
  }, []);

  return (
    <>
      <Head>
        <title>資料請求 - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
        <meta
          name="description"
          content="ダイオーミウラBPOビジネスセンターの資料を請求するフォームをご利用ください。"
        />
        <meta property="og:title" content="資料請求 - ダイオーミウラBPOビジネスセンター" />
        <meta
          property="og:description"
          content="ダイオーミウラBPOビジネスセンターの資料を請求するフォームをご利用ください。"
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com/documents" />
      </Head>
      <main className="flex-grow"> {/* Ensure content fills viewport for footer via Layout.js */}
        <section className="py-12 px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">資料請求</h1>
          {isSubmitted ? (
            <div className="text-center">
              <p className="text-lg text-green-600 mb-4">
                資料が正常にダウンロードされました。ご確認ください。
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                トップページに戻る
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-600 text-center">{error}</p>}
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                  名前（必須）
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                  メールアドレス（必須）
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-lg font-medium text-gray-700 mb-2">
                  会社名（必須）
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                  メッセージ（任意）
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-transform transform hover:scale-105"
                >
                  資料を請求する
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </>
  );
}