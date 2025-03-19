import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

// Debug: Contact page in light mode only, in /pages/contact.js.
export default function Contact() {
  const [formData, setFormData] = useState({
    familyName: "",
    familyNameFurigana: "",
    name: "",
    nameFurigana: "",
    email: "",
    company: "",
    position: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value) && value) {
        setEmailError("有効なメールアドレスを入力してください。");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || emailError) {
      setEmailError("有効なメールアドレスを入力してください。");
      return;
    }
    // Placeholder for ListFinder integration (to be implemented later)
    console.log("Form submitted:", formData);
    setSubmitted(true);
    // Reset form
    setFormData({
      familyName: "",
      familyNameFurigana: "",
      name: "",
      nameFurigana: "",
      email: "",
      company: "",
      position: "",
      message: "",
    });
    setEmailError("");
  };

  const handleInvalid = (e) => {
    e.preventDefault();
    const fieldName = e.target.name;
    switch (fieldName) {
      case "familyName":
      case "familyNameFurigana":
      case "name":
      case "nameFurigana":
      case "email":
      case "company":
      case "position":
      case "message":
        e.target.setCustomValidity("このフィールドを入力してください。");
        break;
      default:
        e.target.setCustomValidity("");
    }
  };

  const handleInput = (e) => {
    e.target.setCustomValidity("");
  };

  return (
    <>
      <Head>
        <title>お問い合わせ - ダイオーミウラBPOビジネスセンター</title> {/* Updated brand name */}
        <meta
          name="description"
          content="ダイオーミウラBPOビジネスセンターにお問い合わせいただき、業務効率化やコスト削減のソリューションについてご相談ください。"
        />
        <meta property="og:title" content="お問い合わせ - ダイオーミウラBPOビジネスセンター" />
        <meta
          property="og:description"
          content="ダイオーミウラBPOビジネスセンターにお問い合わせいただき、業務効率化やコスト削減のソリューションについてご相談ください。"
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com/contact" />
      </Head>
      <main className="flex-grow flex items-center justify-center"> {/* Ensure content fills viewport for footer */}
        <section className="py-12 px-5 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">お問い合わせ</h1>
          {submitted ? (
            <div className="w-[60vw] bg-white shadow rounded p-6 text-center">
              <h2 className="text-2xl font-bold mb-4 text-green-600">
                ありがとうございます！
              </h2>
              <p className="text-lg mb-4">
                お問い合わせを送信しました。<br/>内容を慎重に取り扱い、できるだけ早くご連絡いたします。お待ちください。
              </p>
              <p className="text-lg mb-4">
                緊急の場合は、直接お電話ください：
              </p>
              <p className="text-xl font-bold text-blue-600">
                0123-456-789
              </p>
              <p className="text-sm text-gray-600">
                営業時間：月曜〜金曜 9:00〜18:00
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 mt-4"
              >
                トップページに戻る
              </Link>
            </div>
          ) : (
            <div className="w-full gap-8">
              <div className="w-[50vw] mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center underline">お問い合わせフォーム</h2>
                <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="familyName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        姓（家族名）<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="familyName"
                        name="familyName"
                        value={formData.familyName}
                        onChange={handleChange}
                        onInvalid={handleInvalid}
                        onInput={handleInput}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        placeholder="例: 山田"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="familyNameFurigana"
                        className="block text-sm font-medium text-gray-700"
                      >
                        せい（ふりがな）<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="familyNameFurigana"
                        name="familyNameFurigana"
                        value={formData.familyNameFurigana}
                        onChange={handleChange}
                        onInvalid={handleInvalid}
                        onInput={handleInput}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        placeholder="例: やまだ"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        名<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onInvalid={handleInvalid}
                        onInput={handleInput}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        placeholder="例: 太郎"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="nameFurigana"
                        className="block text-sm font-medium text-gray-700"
                      >
                        めい（ふりがな）<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="nameFurigana"
                        name="nameFurigana"
                        value={formData.nameFurigana}
                        onChange={handleChange}
                        onInvalid={handleInvalid}
                        onInput={handleInput}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        placeholder="例: たろう"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      メールアドレス<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                      placeholder="例: taro@example.com"
                    />
                    {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700"
                    >
                      会社名<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                      placeholder="例: ダイオーミウラ株式会社"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="position"
                      className="block text-sm font-medium text-gray-700"
                    >
                      役職<span className="text-red-500">*</span>
                    </label>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                    >
                      <option value="">選択してください</option>
                      <option value="executive">役員</option>
                      <option value="manager">他の管理職</option>
                      <option value="employee">一般社員</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      お問い合わせ内容<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                      rows="4"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                      placeholder="例: サービスについて知りたいです"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    お問い合わせを送信
                  </button>
                </form>

                <div>
                  <h2 className="text-2xl font-bold mt-8 mb-4 text-center underline">お電話でのお問い合わせ</h2>
                  <div className="bg-white shadow rounded p-6">
                    <p className="text-lg mb-4 text-center">
                      お急ぎの場合は、以下の電話番号に直接お問い合わせください。
                    </p>
                    <p className="text-xl font-bold text-center text-blue-600 mb-4">
                      0123-456-789
                    </p>
                    <p className="text-lg mb-4 text-center">
                      営業時間：月曜〜金曜 9:00〜18:00
                    </p>
                    <p className="text-lg mb-4 text-center">
                      担当者が迅速に対応いたします。
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </section>
      </main>
    </>
  );
}