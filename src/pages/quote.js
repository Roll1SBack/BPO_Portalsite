import Head from "next/head";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckSquare, FaSquare } from "react-icons/fa"; // For elegant checkmarks
import { NumericFormat } from "react-number-format"; // For formatting numbers
import Layout from "../components/Layout";

export default function Quote() {
  const [selectedUnit, setSelectedUnit] = useState("ec-fulfillment"); // Default to EC Fulfillment
  const [result, setResult] = useState(null);
  const resultRef = useRef(null); // Ref for scrolling to result

  // Pricing and form data for each business unit
  const quoteData = {
    "ec-fulfillment": {
      name: "EC・フルフィルメント",
      options: {
        basicFee: { value: 50000, label: "ランニング費用", fixed: true },
        ecEstablishment: { "あり": 1000000, "なし": 0 },
        ecOperation: { "あり": 200000, "なし": 0 },
        storageLocation: { "指定なし": 3500, "都市近郊エリア": 5000, "都市エリア": 6500 },
        storageTemperature: { "常温": 0, "冷蔵": 10000, "冷凍": 15000 },
        storageArea: 0,
        receivingQuantity: 0,
        shippingItems: {
          shipmentCount: 0,
          pickingCount: 0,
          insertCount: 0,
          material: 0,
          size: { "ゆうパケサイズ": 300, "60サイズ": 600, "80サイズ": 800 },
        },
      },
      calculateTotal: (options) => {
        let baseCost = options.basicFee.value; // Fixed ¥50,000
        let otherCosts = 0;

        // EC Establishment & Operation
        otherCosts += quoteData["ec-fulfillment"].options.ecEstablishment[options.ecEstablishment] ?? 0;
        otherCosts += quoteData["ec-fulfillment"].options.ecOperation[options.ecOperation] ?? 0;

        // Storage
        const storageLocationValue = quoteData["ec-fulfillment"].options.storageLocation[options.storageLocation] ?? 0;
        const storageTemperatureValue = quoteData["ec-fulfillment"].options.storageTemperature[options.storageTemperature] ?? 0;
        const storageAreaValue = parseFloat(options.storageArea.replace(/,/g, '')) || 0;
        otherCosts += (storageLocationValue + storageTemperatureValue) * storageAreaValue;

        // Receiving
        const receivingQuantityValue = parseFloat(options.receivingQuantity.replace(/,/g, '')) || 0;
        otherCosts += receivingQuantityValue * 80;

        // Shipping
        const shipmentCountValue = parseFloat(options.shippingItems.shipmentCount.replace(/,/g, '')) || 0;
        const pickingCountValue = parseFloat(options.shippingItems.pickingCount.replace(/,/g, '')) || 0;
        const insertCountValue = parseFloat(options.shippingItems.insertCount.replace(/,/g, '')) || 0;
        const materialValue = parseFloat(options.shippingItems.material.replace(/,/g, '')) || 0;
        const sizeValue = quoteData["ec-fulfillment"].options.shippingItems.size[options.shippingItems.size] ?? 0;
        otherCosts +=
          shipmentCountValue * 100 +
          pickingCountValue * 30 +
          insertCountValue * 20 +
          materialValue * 100 +
          sizeValue * shipmentCountValue;

        // Add 10% supplement of other costs
        const supplement = otherCosts * 0.1;
        return baseCost + otherCosts + supplement;
      },
    },
    "inventory": {
      name: "在庫管理・受発注業務",
      options: {
        basicFee: { value: 50000, label: "在庫管理基本費用", fixed: true },
        storageLocation: { "指定なし": 3500, "都市近郊エリア": 5000, "都市エリア": 6500 },
        storageTemperature: { "常温": 0, "冷蔵": 10000, "冷凍": 15000 },
        storageArea: 0,
        receivingQuantity: 0,
        shippingItems: {
          shipmentCount: 0,
          pickingCount: 0,
          size: { "ゆうパケサイズ": 300, "60サイズ": 600, "80サイズ": 800 },
        },
      },
      calculateTotal: (options) => {
        let baseCost = options.basicFee.value; // Fixed ¥50,000
        let otherCosts = 0;

        // Storage
        const storageLocationValue = quoteData["inventory"].options.storageLocation[options.storageLocation] ?? 0;
        const storageTemperatureValue = quoteData["inventory"].options.storageTemperature[options.storageTemperature] ?? 0;
        const storageAreaValue = parseFloat(options.storageArea.replace(/,/g, '')) || 0;
        otherCosts += (storageLocationValue + storageTemperatureValue) * storageAreaValue;

        // Receiving
        const receivingQuantityValue = parseFloat(options.receivingQuantity.replace(/,/g, '')) || 0;
        otherCosts += receivingQuantityValue * 80;

        // Shipping
        const shipmentCountValue = parseFloat(options.shippingItems.shipmentCount.replace(/,/g, '')) || 0;
        const pickingCountValue = parseFloat(options.shippingItems.pickingCount.replace(/,/g, '')) || 0;
        const sizeValue = quoteData["inventory"].options.shippingItems.size[options.shippingItems.size] ?? 0;
        otherCosts += shipmentCountValue * 100 + pickingCountValue * 30 + sizeValue * shipmentCountValue;

        // Add 10% supplement of other costs
        const supplement = otherCosts * 0.1;
        return baseCost + otherCosts + supplement;
      },
    },
    "assembly": {
      name: "アセンブリ・セット作業",
      options: {
        basicFee: { value: 50000, label: "アセンブリ基本費用", fixed: true },
        storageLocation: { "指定なし": 3500, "都市近郊エリア": 5000, "都市エリア": 6500 },
        storageTemperature: { "常温": 0, "冷蔵": 10000, "冷凍": 15000 },
        storageArea: 0,
        receivingQuantity: 0,
        shippingItems: {
          shipmentCount: 0,
          setCount: 0, // New: セット点数
          material: 0, // New: 発送資材有無
          size: {
            "4tチャーター（100㎞）": 50000,
            "10tチャーター（100㎞）": 100000,
            "100サイズ": 1000,
          },
        },
      },
      calculateTotal: (options) => {
        let baseCost = options.basicFee.value; // Fixed ¥50,000
        let otherCosts = 0;

        // Storage
        const storageLocationValue = quoteData["assembly"].options.storageLocation[options.storageLocation] ?? 0;
        const storageTemperatureValue = quoteData["assembly"].options.storageTemperature[options.storageTemperature] ?? 0;
        const storageAreaValue = parseFloat(options.storageArea.replace(/,/g, '')) || 0;
        otherCosts += (storageLocationValue + storageTemperatureValue) * storageAreaValue;

        // Receiving
        const receivingQuantityValue = parseFloat(options.receivingQuantity.replace(/,/g, '')) || 0;
        otherCosts += receivingQuantityValue * 80;

        // Shipping
        const shipmentCountValue = parseFloat(options.shippingItems.shipmentCount.replace(/,/g, '')) || 0;
        const setCountValue = parseFloat(options.shippingItems.setCount.replace(/,/g, '')) || 0;
        const materialValue = parseFloat(options.shippingItems.material.replace(/,/g, '')) || 0;
        const sizeValue = quoteData["assembly"].options.shippingItems.size[options.shippingItems.size] ?? 0;
        otherCosts +=
          shipmentCountValue * 100 +
          setCountValue * 100 + // ¥100 per set
          materialValue * 100 + // ¥100 per material unit
          sizeValue * materialValue; // Size cost multiplied by material count

        // Add 10% supplement of other costs
        const supplement = otherCosts * 0.1;
        return baseCost + otherCosts + supplement;
      },
    },
    "secretariat": { name: "事務局代行", options: {}, calculateTotal: () => 0 },
    "data-processing": { name: "データ処理・オーバープリント", options: {}, calculateTotal: () => 0 },
  };

  // State for form options
  const [selectedOptions, setSelectedOptions] = useState({
    basicFee: quoteData["ec-fulfillment"].options.basicFee,
    ecEstablishment: "",
    ecOperation: "",
    storageLocation: "",
    storageTemperature: "",
    storageArea: "",
    receivingQuantity: "",
    shippingItems: {
      shipmentCount: "",
      pickingCount: "",
      insertCount: "",
      material: "",
      size: "",
      setCount: "", // Added for assembly
    },
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (dataset?.category) {
      setSelectedOptions((prev) => ({
        ...prev,
        shippingItems: { ...prev.shippingItems, [dataset.category]: value },
      }));
    } else {
      setSelectedOptions((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Check if all required fields are filled
  const isFormComplete = () => {
    const isEcFulfillment = selectedUnit === "ec-fulfillment";
    const isAssembly = selectedUnit === "assembly";
    return (
      (isEcFulfillment ? selectedOptions.ecEstablishment !== "" && selectedOptions.ecOperation !== "" : true) &&
      selectedOptions.storageLocation !== "" &&
      selectedOptions.storageTemperature !== "" &&
      selectedOptions.storageArea !== "" &&
      selectedOptions.receivingQuantity !== "" &&
      selectedOptions.shippingItems.shipmentCount !== "" &&
      (isEcFulfillment || selectedUnit === "inventory" ? selectedOptions.shippingItems.pickingCount !== "" : true) &&
      (isEcFulfillment ? selectedOptions.shippingItems.insertCount !== "" : true) &&
      (isEcFulfillment || isAssembly ? selectedOptions.shippingItems.material !== "" : true) &&
      (isAssembly ? selectedOptions.shippingItems.setCount !== "" : true) &&
      selectedOptions.shippingItems.size !== ""
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete()) {
      setResult({ price: quoteData[selectedUnit].calculateTotal(selectedOptions) });
      // Ensure scroll happens after state update
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 0);
    }
  };

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <>
      <Head>
        <title>無料見積 | ダイオーミウラBPOビジネスセンター</title>
        <meta
          name="description"
          content="ダイオーミウラBPOビジネスセンターの無料見積シミュレーションで、業務効率化のコストを簡単に確認。"
        />
        <meta property="og:title" content="無料見積 | ダイオーミウラBPOビジネスセンター" />
        <meta
          property="og:description"
          content="ダイオーミウラBPOビジネスセンターの無料見積シミュレーションで、業務効率化のコストを簡単に確認。"
        />
        <meta property="og:image" content="/office.png" />
        <meta property="og:url" content="https://yourwebsite.com/quote" />
      </Head>
      <main className="flex-grow">
        <section className="py-12 px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900">無料見積</h1>
          <p className="text-xl mb-4 font-bold text-center text-red-500">たった10秒でお見積もり結果がわかります！</p>
          <p className="text-lg mb-8 text-center text-gray-600">
            選択式のシミュレーションで、<br />貴社のニーズに合わせたBPOソリューションの概算見積を取得してください。
          </p>

          {/* Fixed Selection Area */}
          <div className="sticky top-20 bg-white shadow-md rounded-lg p-4 z-10 mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2 text-center">事業ユニットを選択</label>
            <div className="flex space-x-4">
              {Object.keys(quoteData).map((unit) => (
                <button
                  key={unit}
                  onClick={() => {
                    setSelectedUnit(unit);
                    setResult(null);
                    // Reset selectedOptions based on the selected unit
                    setSelectedOptions({
                      basicFee: quoteData[unit].options.basicFee,
                      ...(unit === "ec-fulfillment"
                        ? {
                            ecEstablishment: "",
                            ecOperation: "",
                            storageLocation: "",
                            storageTemperature: "",
                            storageArea: "",
                            receivingQuantity: "",
                            shippingItems: {
                              shipmentCount: "",
                              pickingCount: "",
                              insertCount: "",
                              material: "",
                              size: "",
                              setCount: "",
                            },
                          }
                        : {
                            storageLocation: "",
                            storageTemperature: "",
                            storageArea: "",
                            receivingQuantity: "",
                            shippingItems: {
                              shipmentCount: "",
                              pickingCount: unit === "assembly" ? undefined : "",
                              setCount: unit === "assembly" ? "" : undefined,
                              material: unit === "assembly" ? "" : undefined,
                              size: "",
                            },
                          }),
                    });
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedUnit === unit
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } transition-colors duration-200`}
                >
                  {quoteData[unit].name}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Quote Form */}
          <AnimatePresence mode="wait">
            {selectedUnit && (
              <motion.div
                key={selectedUnit}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white shadow-lg rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">{quoteData[selectedUnit].name}見積シミュレーション</h2>
                {selectedUnit === "ec-fulfillment" && (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 1. Basic Usage Fee */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">1.</span>
                        <label className="block text-lg font-semibold text-gray-700">基本利用料</label>
                      </div>
                      <div className="mt-2 ml-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-md font-medium text-gray-600">ランニング費用</span>
                            <FaCheckSquare className="text-green-500" />
                          </div>
                          <span className="text-md text-gray-400">他の項目の費用の10%を基本利用料の一部として総額に加算されます</span>
                        </div>
                        <p className="text-md text-green-600 font-bold mt-2">
                          費用: ¥{selectedOptions.basicFee.value.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* 2. EC Establishment & Operation */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">2.</span>
                        <label className="block text-lg font-semibold text-gray-700">ECサイト設立・運営</label>
                      </div>
                      <div className="mt-2 ml-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">設立</label>
                            {selectedOptions.ecEstablishment === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">ECサイトの初期構築費用（必要に応じて選択）</p>
                        </div>
                        <select
                          name="ecEstablishment"
                          value={selectedOptions.ecEstablishment}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">選択してください</option>
                          {Object.entries(quoteData["ec-fulfillment"].options.ecEstablishment).map(([key, value]) => (
                            <option key={key} value={key}>
                              {key} - ¥{value.toLocaleString()}
                            </option>
                          ))}
                        </select>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">運営</label>
                            {selectedOptions.ecOperation === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">ECサイトの継続的な運営費用（必要に応じて選択）</p>
                        </div>
                        <select
                          name="ecOperation"
                          value={selectedOptions.ecOperation}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">選択してください</option>
                          {Object.entries(quoteData["ec-fulfillment"].options.ecOperation).map(([key, value]) => (
                            <option key={key} value={key}>
                              {key} - ¥{value.toLocaleString()}
                            </option>
                          ))}
                        </select>
                        <p className="text-md text-green-600 font-bold mt-2">
                          サイト関連費用: ¥
                          {(
                            (quoteData["ec-fulfillment"].options.ecEstablishment[selectedOptions.ecEstablishment] ?? 0) +
                            (quoteData["ec-fulfillment"].options.ecOperation[selectedOptions.ecOperation] ?? 0)
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* 3. Storage */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">3.</span>
                        <label className="block text-lg font-semibold text-gray-700">保管</label>
                      </div>
                      <div className="mt-2 ml-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">倉庫（作業）の場所</label>
                            {selectedOptions.storageLocation === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">倉庫の地理的立地のコスト</p>
                        </div>
                        <select
                          name="storageLocation"
                          value={selectedOptions.storageLocation}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">選択してください</option>
                          {Object.entries(quoteData["ec-fulfillment"].options.storageLocation).map(([key, value]) => (
                            <option key={key} value={key}>
                              {key} - ¥{value.toLocaleString()}
                            </option>
                          ))}
                        </select>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">倉庫の温度管理</label>
                            {selectedOptions.storageTemperature === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">商品の保管に必要な温度管理のコスト</p>
                        </div>
                        <select
                          name="storageTemperature"
                          value={selectedOptions.storageTemperature}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">選択してください</option>
                          {Object.entries(quoteData["ec-fulfillment"].options.storageTemperature).map(([key, value]) => (
                            <option key={key} value={key}>
                              {key} - ¥{value.toLocaleString()}
                            </option>
                          ))}
                        </select>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">倉庫の必要坪数</label>
                            {selectedOptions.storageArea === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">必要な倉庫の面積（坪単位で入力）</p>
                        </div>
                        <NumericFormat
                          name="storageArea"
                          value={selectedOptions.storageArea}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({ ...prev, storageArea: value }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="坪数を入力"
                        />
                        <p className="text-md text-green-600 font-bold mt-2">
                          保管費用: ¥
                          {(((quoteData["ec-fulfillment"].options.storageLocation[selectedOptions.storageLocation] ?? 0) +
                            (quoteData["ec-fulfillment"].options.storageTemperature[selectedOptions.storageTemperature] ?? 0)) *
                            (parseFloat(selectedOptions.storageArea.replace(/,/g, '')) || 0)
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* 4. Receiving */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">4.</span>
                        <label className="block text-lg font-semibold text-gray-700">入荷</label>
                      </div>
                      <div className="mt-2 ml-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">入荷数量（ケース）</label>
                            {selectedOptions.receivingQuantity === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">入荷する商品のケース数</p>
                        </div>
                        <NumericFormat
                          name="receivingQuantity"
                          value={selectedOptions.receivingQuantity}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({ ...prev, receivingQuantity: value }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="数量を入力"
                        />
                        <p className="text-md text-green-600 font-bold mt-2">
                          入荷費用: ¥{((parseFloat(selectedOptions.receivingQuantity.replace(/,/g, '')) || 0) * 80).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* 5. Shipping */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">5.</span>
                        <label className="block text-lg font-semibold text-gray-700">出荷</label>
                      </div>
                      <div className="mt-2 ml-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">出荷件数</label>
                            {selectedOptions.shippingItems.shipmentCount === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">出荷する注文の総件数</p>
                        </div>
                        <NumericFormat
                          name="shipmentCount"
                          value={selectedOptions.shippingItems.shipmentCount}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({
                              ...prev,
                              shippingItems: { ...prev.shippingItems, shipmentCount: value },
                            }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="件数を入力"
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">ピッキング数</label>
                            {selectedOptions.shippingItems.pickingCount === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">各注文でピッキングされる商品の数</p>
                        </div>
                        <NumericFormat
                          name="pickingCount"
                          value={selectedOptions.shippingItems.pickingCount}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({
                              ...prev,
                              shippingItems: { ...prev.shippingItems, pickingCount: value },
                            }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="数を入力"
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">同梱物（チラシ）の数</label>
                            {selectedOptions.shippingItems.insertCount === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">各注文に同梱するチラシの数</p>
                        </div>
                        <NumericFormat
                          name="insertCount"
                          value={selectedOptions.shippingItems.insertCount}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({
                              ...prev,
                              shippingItems: { ...prev.shippingItems, insertCount: value },
                            }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="数を入力"
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">発送資材の数</label>
                            {selectedOptions.shippingItems.material === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">発送に必要な資材の数</p>
                        </div>
                        <NumericFormat
                          name="material"
                          value={selectedOptions.shippingItems.material}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({
                              ...prev,
                              shippingItems: { ...prev.shippingItems, material: value },
                            }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="資材の数を入力。不要の場合は0"
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">発送サイズ</label>
                            {selectedOptions.shippingItems.size === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">発送パッケージのサイズ。それ以上のサイズも対応可能。お問い合わせください</p>
                        </div>
                        <select
                          data-category="size"
                          value={selectedOptions.shippingItems.size}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">選択してください</option>
                          {Object.entries(quoteData["ec-fulfillment"].options.shippingItems.size).map(([key, value]) => (
                            <option key={key} value={key}>
                              {key} - ¥{value.toLocaleString()}
                            </option>
                          ))}
                        </select>
                        <p className="text-md text-green-600 font-bold mt-2">
                          出荷費用: ¥
                          {(
                            (parseFloat(selectedOptions.shippingItems.shipmentCount.replace(/,/g, '')) || 0) * 100 +
                            (parseFloat(selectedOptions.shippingItems.pickingCount.replace(/,/g, '')) || 0) * 30 +
                            (parseFloat(selectedOptions.shippingItems.insertCount.replace(/,/g, '')) || 0) * 20 +
                            (parseFloat(selectedOptions.shippingItems.material.replace(/,/g, '')) || 0) * 100 +
                            (quoteData["ec-fulfillment"].options.shippingItems.size[selectedOptions.shippingItems.size] ?? 0) *
                            (parseFloat(selectedOptions.shippingItems.shipmentCount.replace(/,/g, '')) || 0)
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        type="submit"
                        className={`w-full px-6 py-3 rounded font-bold transition-colors ${isFormComplete()
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        disabled={!isFormComplete()}
                      >
                        見積を取得
                      </button>
                      {!isFormComplete() && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white text-gray-800 text-lg font-semibold px-4 py-2 rounded-full shadow-lg">
                          すべての項目を入力してください
                        </div>
                      )}
                    </div>
                  </form>
                )}
                {selectedUnit === "inventory" && (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 1. Basic Usage Fee */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">1.</span>
                        <label className="block text-lg font-semibold text-gray-700">基本利用料</label>
                      </div>
                      <div className="mt-2 ml-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-md font-medium text-gray-600">在庫管理基本費用</span>
                            <FaCheckSquare className="text-green-500" />
                          </div>
                          <span className="text-md text-gray-400">他の項目の費用の10%を基本利用料の一部として総額に加算されます</span>
                        </div>
                        <p className="text-md text-green-600 font-bold mt-2">
                          費用: ¥{selectedOptions.basicFee.value.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* 2. Storage */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">2.</span>
                        <label className="block text-lg font-semibold text-gray-700">保管</label>
                      </div>
                      <div className="mt-2 ml-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">倉庫（作業）の場所</label>
                            {selectedOptions.storageLocation === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">倉庫の地理的立地のコスト</p>
                        </div>
                        <select
                          name="storageLocation"
                          value={selectedOptions.storageLocation}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">選択してください</option>
                          {Object.entries(quoteData["inventory"].options.storageLocation).map(([key, value]) => (
                            <option key={key} value={key}>
                              {key} - ¥{value.toLocaleString()}
                            </option>
                          ))}
                        </select>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">倉庫の温度管理</label>
                            {selectedOptions.storageTemperature === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">商品の保管に必要な温度管理のコスト</p>
                        </div>
                        <select
                          name="storageTemperature"
                          value={selectedOptions.storageTemperature}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">選択してください</option>
                          {Object.entries(quoteData["inventory"].options.storageTemperature).map(([key, value]) => (
                            <option key={key} value={key}>
                              {key} - ¥{value.toLocaleString()}
                            </option>
                          ))}
                        </select>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">倉庫の必要坪数</label>
                            {selectedOptions.storageArea === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">必要な倉庫の面積（坪単位で入力）</p>
                        </div>
                        <NumericFormat
                          name="storageArea"
                          value={selectedOptions.storageArea}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({ ...prev, storageArea: value }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="坪数を入力"
                        />
                        <p className="text-md text-green-600 font-bold mt-2">
                          保管費用: ¥
                          {(((quoteData["inventory"].options.storageLocation[selectedOptions.storageLocation] ?? 0) +
                            (quoteData["inventory"].options.storageTemperature[selectedOptions.storageTemperature] ?? 0)) *
                            (parseFloat(selectedOptions.storageArea.replace(/,/g, '')) || 0)
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* 3. Receiving */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">3.</span>
                        <label className="block text-lg font-semibold text-gray-700">入荷</label>
                      </div>
                      <div className="mt-2 ml-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">入荷数量（ケース）</label>
                            {selectedOptions.receivingQuantity === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">入荷する商品のケース数</p>
                        </div>
                        <NumericFormat
                          name="receivingQuantity"
                          value={selectedOptions.receivingQuantity}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({ ...prev, receivingQuantity: value }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="数量を入力"
                        />
                        <p className="text-md text-green-600 font-bold mt-2">
                          入荷費用: ¥{((parseFloat(selectedOptions.receivingQuantity.replace(/,/g, '')) || 0) * 80).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* 4. Shipping */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">4.</span>
                        <label className="block text-lg font-semibold text-gray-700">出荷</label>
                      </div>
                      <div className="mt-2 ml-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">出荷件数</label>
                            {selectedOptions.shippingItems.shipmentCount === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">出荷する注文の総件数</p>
                        </div>
                        <NumericFormat
                          name="shipmentCount"
                          value={selectedOptions.shippingItems.shipmentCount}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({
                              ...prev,
                              shippingItems: { ...prev.shippingItems, shipmentCount: value },
                            }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="件数を入力"
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">ピッキング数</label>
                            {selectedOptions.shippingItems.pickingCount === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">各注文でピッキングされる商品の数</p>
                        </div>
                        <NumericFormat
                          name="pickingCount"
                          value={selectedOptions.shippingItems.pickingCount}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({
                              ...prev,
                              shippingItems: { ...prev.shippingItems, pickingCount: value },
                            }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="数を入力"
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">発送サイズ</label>
                            {selectedOptions.shippingItems.size === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">発送パッケージのサイズ。それ以上のサイズも対応可能。お問い合わせください</p>
                        </div>
                        <select
                          data-category="size"
                          value={selectedOptions.shippingItems.size}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">選択してください</option>
                          {Object.entries(quoteData["inventory"].options.shippingItems.size).map(([key, value]) => (
                            <option key={key} value={key}>
                              {key} - ¥{value.toLocaleString()}
                            </option>
                          ))}
                        </select>
                        <p className="text-md text-green-600 font-bold mt-2">
                          出荷費用: ¥
                          {(
                            (parseFloat(selectedOptions.shippingItems.shipmentCount.replace(/,/g, '')) || 0) * 100 +
                            (parseFloat(selectedOptions.shippingItems.pickingCount.replace(/,/g, '')) || 0) * 30 +
                            (quoteData["inventory"].options.shippingItems.size[selectedOptions.shippingItems.size] ?? 0) *
                            (parseFloat(selectedOptions.shippingItems.shipmentCount.replace(/,/g, '')) || 0)
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        type="submit"
                        className={`w-full px-6 py-3 rounded font-bold transition-colors ${isFormComplete()
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        disabled={!isFormComplete()}
                      >
                        見積を取得
                      </button>
                      {!isFormComplete() && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white text-gray-800 text-lg font-semibold px-4 py-2 rounded-full shadow-lg">
                          すべての項目を入力してください
                        </div>
                      )}
                    </div>
                  </form>
                )}
                {selectedUnit === "assembly" && (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 1. Basic Usage Fee */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">1.</span>
                        <label className="block text-lg font-semibold text-gray-700">基本利用料</label>
                      </div>
                      <div className="mt-2 ml-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-md font-medium text-gray-600">アセンブリ基本費用</span>
                            <FaCheckSquare className="text-green-500" />
                          </div>
                          <span className="text-md text-gray-400">他の項目の費用の10%を基本利用料の一部として総額に加算されます</span>
                        </div>
                        <p className="text-md text-green-600 font-bold mt-2">
                          費用: ¥{selectedOptions.basicFee.value.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* 2. Storage */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">2.</span>
                        <label className="block text-lg font-semibold text-gray-700">保管</label>
                      </div>
                      <div className="mt-2 ml-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">倉庫（作業）の場所</label>
                            {selectedOptions.storageLocation === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">倉庫の地理的立地のコスト</p>
                        </div>
                        <select
                          name="storageLocation"
                          value={selectedOptions.storageLocation}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">選択してください</option>
                          {Object.entries(quoteData["assembly"].options.storageLocation).map(([key, value]) => (
                            <option key={key} value={key}>
                              {key} - ¥{value.toLocaleString()}
                            </option>
                          ))}
                        </select>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">倉庫の温度管理</label>
                            {selectedOptions.storageTemperature === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">商品の保管に必要な温度管理のコスト</p>
                        </div>
                        <select
                          name="storageTemperature"
                          value={selectedOptions.storageTemperature}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">選択してください</option>
                          {Object.entries(quoteData["assembly"].options.storageTemperature).map(([key, value]) => (
                            <option key={key} value={key}>
                              {key} - ¥{value.toLocaleString()}
                            </option>
                          ))}
                        </select>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">倉庫の必要坪数</label>
                            {selectedOptions.storageArea === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">必要な倉庫の面積（坪単位で入力）</p>
                        </div>
                        <NumericFormat
                          name="storageArea"
                          value={selectedOptions.storageArea}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({ ...prev, storageArea: value }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="坪数を入力"
                        />
                        <p className="text-md text-green-600 font-bold mt-2">
                          保管費用: ¥
                          {(((quoteData["assembly"].options.storageLocation[selectedOptions.storageLocation] ?? 0) +
                            (quoteData["assembly"].options.storageTemperature[selectedOptions.storageTemperature] ?? 0)) *
                            (parseFloat(selectedOptions.storageArea.replace(/,/g, '')) || 0)
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* 3. Receiving */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">3.</span>
                        <label className="block text-lg font-semibold text-gray-700">入荷</label>
                      </div>
                      <div className="mt-2 ml-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">入荷数量（ケース）</label>
                            {selectedOptions.receivingQuantity === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">入荷する商品のケース数</p>
                        </div>
                        <NumericFormat
                          name="receivingQuantity"
                          value={selectedOptions.receivingQuantity}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({ ...prev, receivingQuantity: value }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="数量を入力"
                        />
                        <p className="text-md text-green-600 font-bold mt-2">
                          入荷費用: ¥{((parseFloat(selectedOptions.receivingQuantity.replace(/,/g, '')) || 0) * 80).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* 4. Shipping */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">4.</span>
                        <label className="block text-lg font-semibold text-gray-700">出荷</label>
                      </div>
                      <div className="mt-2 ml-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">出荷件数</label>
                            {selectedOptions.shippingItems.shipmentCount === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">出荷する注文の総件数</p>
                        </div>
                        <NumericFormat
                          name="shipmentCount"
                          value={selectedOptions.shippingItems.shipmentCount}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({
                              ...prev,
                              shippingItems: { ...prev.shippingItems, shipmentCount: value },
                            }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="件数を入力"
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">セット点数</label>
                            {selectedOptions.shippingItems.setCount === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">アセンブリするセットの点数</p>
                        </div>
                        <NumericFormat
                          name="setCount"
                          value={selectedOptions.shippingItems.setCount}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({
                              ...prev,
                              shippingItems: { ...prev.shippingItems, setCount: value },
                            }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="点数を入力"
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">発送資材の数</label>
                            {selectedOptions.shippingItems.material === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">発送に必要な資材の数</p>
                        </div>
                        <NumericFormat
                          name="material"
                          value={selectedOptions.shippingItems.material}
                          onValueChange={({ value }) => {
                            setSelectedOptions((prev) => ({
                              ...prev,
                              shippingItems: { ...prev.shippingItems, material: value },
                            }));
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="資材の数を入力。不要の場合は0"
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">発送サイズ</label>
                            {selectedOptions.shippingItems.size === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">他のサイズも対応可能です。詳細はお問い合わせください。</p>
                        </div>
                        <select
                          data-category="size"
                          value={selectedOptions.shippingItems.size}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">選択してください</option>
                          {Object.entries(quoteData["assembly"].options.shippingItems.size).map(([key, value]) => (
                            <option key={key} value={key}>
                              {key} - ¥{value.toLocaleString()}
                            </option>
                          ))}
                        </select>
                        <p className="text-md text-green-600 font-bold mt-2">
                          出荷費用: ¥
                          {(
                            (parseFloat(selectedOptions.shippingItems.shipmentCount.replace(/,/g, '')) || 0) * 100 +
                            (parseFloat(selectedOptions.shippingItems.setCount.replace(/,/g, '')) || 0) * 100 +
                            (parseFloat(selectedOptions.shippingItems.material.replace(/,/g, '')) || 0) * 100 +
                            (quoteData["assembly"].options.shippingItems.size[selectedOptions.shippingItems.size] ?? 0) *
                            (parseFloat(selectedOptions.shippingItems.material.replace(/,/g, '')) || 0)
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        type="submit"
                        className={`w-full px-6 py-3 rounded font-bold transition-colors ${isFormComplete()
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        disabled={!isFormComplete()}
                      >
                        見積を取得
                      </button>
                      {!isFormComplete() && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white text-gray-800 text-lg font-semibold px-4 py-2 rounded-full shadow-lg">
                          すべての項目を入力してください
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result Display */}
          {result && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow rounded p-6 mt-6 text-center"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">見積結果</h2>
              <p className="text-2xl mb-4 text-green-600 font-bold">総額: ¥{result.price.toLocaleString()} 円</p>
              <p className="text-sm text-gray-600 mb-4">
                ※この金額は概算です。詳細な見積が必要な場合、「お問い合わせ」からご連絡ください。
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full hover:from-emerald-700 hover:to-teal-700 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                詳細見積のお問い合わせ
              </Link>
            </motion.div>
          )}
        </section>
      </main>
    </>
  );
}