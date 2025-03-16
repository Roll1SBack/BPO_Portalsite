"use client";
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
  const [paperError, setPaperError] = useState(false); // Added for paper type validation in data-processing
  const resultRef = useRef(null); // Ref for scrolling to result

  // Add modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
    "secretariat": {
      name: "事務局代行", options: {}, calculateTotal: () => 0
    },
    "data-processing": {
      name: "データ処理・オーバープリント",
      options: {
        itemType: {
          "請求書・納品書 (長3封筒・セット無)": "invoice",
          "健康診断書 等 (角2封筒・セット有)": "health-check",
          "その他": "other",
        },
        setNumber: 0,
        setupRequired: { "あり": true, "なし": false },
        paperSizes: {
          a4_55kg_double_color: 0,
          a4_55kg_single_mono: 0,
          a4_90kg_double_color: 0,
          a4_90kg_single_mono: 0,
          a3_55kg_double_color: 0,
          a3_55kg_single_mono: 0,
          a3_90kg_double_color: 0,
          a3_90kg_single_mono: 0,
        },
      },
      calculateTotal: (options) => {
        let totalCost = 0;

        // 1. Setup Cost
        let setupCost = 0;
        const setNumber = parseFloat(options.setNumber.replace(/,/g, '')) || 0;
        const itemType = options.itemType;
        const setupRequired = options.setupRequired === "あり";

        if (itemType !== "請求書・納品書 (長3封筒・セット無)" && setupRequired) {
          // Base cost per set
          let baseCostPerSet = 0;
          if (setNumber <= 1000) {
            baseCostPerSet = 0.01;
          } else {
            const firstTier = 1000 * 0.01;
            const secondTier = setNumber > 2000 ? 1000 * 0.02 : (setNumber - 1000) * 0.02;
            const thirdTier = setNumber > 2000 ? (setNumber - 2000) * 0.04 : 0;
            baseCostPerSet = (firstTier + secondTier + thirdTier) / setNumber;
          }

          // Additional cost based on number of paper types
          const paperCounts = Object.values(options.paperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
          const numPaperTypes = paperCounts.filter(count => count > 0).length;
          let additionalCostPerSet = 0;
          if (numPaperTypes > 4) {
            const excess = numPaperTypes - 4;
            if (excess === 1) additionalCostPerSet = 0.01;
            else if (excess === 2) additionalCostPerSet = 0.02;
            else additionalCostPerSet = 0.04;
          }

          setupCost = setNumber * (baseCostPerSet + additionalCostPerSet);
        }
        totalCost += setupCost;

        // 2. Envelope and Postage Cost
        // Calculate total weight per set
        const weights = {
          a4_55kg_double_color: 6.88,
          a4_55kg_single_mono: 6.88,
          a4_90kg_double_color: 11.25,
          a4_90kg_single_mono: 11.25,
          a3_55kg_double_color: 13.75,
          a3_55kg_single_mono: 13.75,
          a3_90kg_double_color: 22.5,
          a3_90kg_single_mono: 22.5,
        };
        let totalWeightPerSet = 0;
        for (const [paperType, quantity] of Object.entries(options.paperSizes)) {
          const qty = parseFloat(quantity.replace(/,/g, '')) || 0;
          totalWeightPerSet += qty * weights[paperType];
        }

        // Postage cost per set
        const postageCostPerSet = totalWeightPerSet > 50 ? 200 : 100;

        // Envelope cost per set
        let envelopeCostPerSet = 0;
        if (setNumber <= 1000) {
          envelopeCostPerSet = 0.01;
        } else {
          const firstTier = 1000 * 0.01;
          const secondTier = setNumber > 2000 ? 1000 * 0.02 : (setNumber - 1000) * 0.02;
          const thirdTier = setNumber > 2000 ? (setNumber - 2000) * 0.04 : 0;
          envelopeCostPerSet = (firstTier + secondTier + thirdTier) / setNumber;
        }

        const envelopePostageCost = setNumber * (postageCostPerSet + envelopeCostPerSet);
        totalCost += envelopePostageCost;

        // 3. Other Costs
        const paperCounts = Object.values(options.paperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0); // Recompute paperCounts
        const totalPapers = paperCounts.reduce((sum, count) => sum + count, 0);
        let unitPrice = 0;
        if (setNumber <= 1000) unitPrice = 0.01;
        else if (setNumber <= 2000) unitPrice = 0.02;
        else unitPrice = 0.04;

        const otherCost = totalPapers * unitPrice;
        totalCost += otherCost;

        // 4. Additional Cost (横持ち運賃)
        const additionalCost = 15000;
        totalCost += additionalCost;

        return totalCost;
      },
    },
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
    itemType: "", // Ensure this is initialized
    setNumber: "", // Ensure this is initialized
    setupRequired: "", // Ensure this is initialized
    paperSizes: { // Ensure paperSizes is initialized with 0 or empty strings
      a4_55kg_double_color: "0",
      a4_55kg_single_mono: "0",
      a4_90kg_double_color: "0",
      a4_90kg_single_mono: "0",
      a3_55kg_double_color: "0",
      a3_55kg_single_mono: "0",
      a3_90kg_double_color: "0",
      a3_90kg_single_mono: "0",
    },
    shippingItems: {
      shipmentCount: "",
      pickingCount: "",
      insertCount: "",
      material: "",
      size: "",
      setCount: "",
    },
  });


  const Modal = ({ message, onClose }) => {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4 transform transition-all duration-300 ease-in-out"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-3 text-lg leading-6 font-medium text-gray-900">入力エラー</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-600">{message}</p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={onClose}
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Handle form changes
  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (dataset?.category) {
      if (dataset.category === "paperSizes") { // Added to handle paperSizes updates
        setSelectedOptions((prev) => ({
          ...prev,
          paperSizes: { ...prev.paperSizes, [name]: value },
        }));
      } else {
        setSelectedOptions((prev) => ({
          ...prev,
          shippingItems: { ...prev.shippingItems, [dataset.category]: value },
        }));
      }
    } else {
      setSelectedOptions((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Validate paper types for data-processing
  const validatePaperTypes = () => {
    const paperCounts = Object.values(selectedOptions.paperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
    const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
    if (totalPaperSum > 8) {
      setPaperError(true);
      return false;
    }
    setPaperError(false);
    return true;
  };

  // Check if all required fields are filled
  const isFormComplete = () => {
    const isEcFulfillment = selectedUnit === "ec-fulfillment";
    const isAssembly = selectedUnit === "assembly";
    const isDataProcessing = selectedUnit === "data-processing";

    if (isEcFulfillment) {
      return (
        selectedOptions.ecEstablishment !== "" &&
        selectedOptions.ecOperation !== "" &&
        selectedOptions.storageLocation !== "" &&
        selectedOptions.storageTemperature !== "" &&
        selectedOptions.storageArea !== "" &&
        selectedOptions.receivingQuantity !== "" &&
        selectedOptions.shippingItems.shipmentCount !== "" &&
        selectedOptions.shippingItems.pickingCount !== "" &&
        selectedOptions.shippingItems.insertCount !== "" &&
        selectedOptions.shippingItems.material !== "" &&
        selectedOptions.shippingItems.size !== ""
      );
    } else if (isAssembly) {
      return (
        selectedOptions.storageLocation !== "" &&
        selectedOptions.storageTemperature !== "" &&
        selectedOptions.storageArea !== "" &&
        selectedOptions.receivingQuantity !== "" &&
        selectedOptions.shippingItems.shipmentCount !== "" &&
        selectedOptions.shippingItems.setCount !== "" &&
        selectedOptions.shippingItems.material !== "" &&
        selectedOptions.shippingItems.size !== ""
      );
    } else if (isDataProcessing) {
      const setNumber = parseFloat(selectedOptions.setNumber.replace(/,/g, '')) || 0;
      const paperCounts = Object.values(selectedOptions.paperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
      const allPapersFilled = Object.values(selectedOptions.paperSizes).every(val => val !== ""); // All 8 fields must not be empty
      const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0); // Sum of all paper quantities
      return (
        selectedOptions.itemType !== "" &&
        setNumber >= 1000 &&
        setNumber <= 10000 &&
        (selectedOptions.itemType === "請求書・納品書 (長3封筒・セット無)" || selectedOptions.setupRequired !== "") &&
        allPapersFilled && // Ensure all 8 fields are filled (can be 0)
        totalPaperSum <= 8 && // Ensure the sum is not over 8
        !paperError
      );
    }
    return (
      selectedOptions.storageLocation !== "" &&
      selectedOptions.storageTemperature !== "" &&
      selectedOptions.storageArea !== "" &&
      selectedOptions.receivingQuantity !== "" &&
      selectedOptions.shippingItems.shipmentCount !== "" &&
      selectedOptions.shippingItems.pickingCount !== "" &&
      selectedOptions.shippingItems.size !== ""
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Unit:", selectedUnit);
    console.log("calculateTotal Function:", quoteData[selectedUnit].calculateTotal);
    if (isFormComplete()) {
      if (typeof quoteData[selectedUnit].calculateTotal === "function") {
        // Ensure selectedOptions has the required fields
        const safeOptions = {
          ...selectedOptions,
          setNumber: selectedOptions.setNumber || "0",
          itemType: selectedOptions.itemType || "",
          setupRequired: selectedOptions.setupRequired || "",
          paperSizes: selectedOptions.paperSizes || {
            a4_55kg_double_color: "0",
            a4_55kg_single_mono: "0",
            a4_90kg_double_color: "0",
            a4_90kg_single_mono: "0",
            a3_55kg_double_color: "0",
            a3_55kg_single_mono: "0",
            a3_90kg_double_color: "0",
            a3_90kg_single_mono: "0",
          },
        };
        setResult({ price: quoteData[selectedUnit].calculateTotal(safeOptions) });
        setTimeout(() => {
          if (resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 0);
      } else {
        console.error("calculateTotal is not a function for unit:", selectedUnit);
      }
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
                    setPaperError(false); // Reset paper error state
                    // Reset selectedOptions based on the selected unit
                    setSelectedOptions({
                      basicFee: quoteData[unit].options.basicFee,
                      // Fields specific to "ec-fulfillment"
                      ecEstablishment: unit === "ec-fulfillment" ? "" : undefined,
                      ecOperation: unit === "ec-fulfillment" ? "" : undefined,
                      // Fields for units that use storage (ec-fulfillment, inventory, assembly)
                      storageLocation: unit !== "data-processing" && unit !== "secretariat" ? "" : undefined,
                      storageTemperature: unit !== "data-processing" && unit !== "secretariat" ? "" : undefined,
                      storageArea: unit !== "data-processing" && unit !== "secretariat" ? "" : undefined,
                      receivingQuantity: unit !== "data-processing" && unit !== "secretariat" ? "" : undefined,
                      // Fields specific to "data-processing"
                      itemType: unit === "data-processing" ? "" : undefined,
                      setNumber: unit === "data-processing" ? "" : undefined,
                      setupRequired: unit === "data-processing" ? "" : undefined,
                      // Always include paperSizes to prevent undefined errors
                      paperSizes: {
                        a4_55kg_double_color: "",
                        a4_55kg_single_mono: "",
                        a4_90kg_double_color: "",
                        a4_90kg_single_mono: "",
                        a3_55kg_double_color: "",
                        a3_55kg_single_mono: "",
                        a3_90kg_double_color: "",
                        a3_90kg_single_mono: "",
                      },
                      // Fields for units that use shipping (ec-fulfillment, inventory, assembly)
                      shippingItems: unit !== "data-processing" && unit !== "secretariat" ? {
                        shipmentCount: "",
                        pickingCount: unit === "assembly" ? undefined : "",
                        insertCount: unit === "ec-fulfillment" ? "" : undefined,
                        material: unit === "ec-fulfillment" || unit === "assembly" ? "" : undefined,
                        size: "",
                        setCount: unit === "assembly" ? "" : undefined,
                      } : undefined,
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
                {selectedUnit === "data-processing" && (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 1. Item Type */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">1.</span>
                        <label className="block text-lg font-semibold text-gray-700">項目選択</label>
                      </div>
                      <div className="mt-2 ml-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">項目</label>
                            {selectedOptions.itemType === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">選択する項目によって封筒の種類が変わります</p>
                        </div>
                        <select
                          name="itemType"
                          value={selectedOptions.itemType}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">選択してください</option>
                          {Object.keys(quoteData["data-processing"].options.itemType).map((key) => (
                            <option key={key} value={key}>
                              {key}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* 2. Set Number */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">2.</span>
                        <label className="block text-lg font-semibold text-gray-700">セット数</label>
                      </div>
                      <div className="mt-2 ml-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="block text-md font-medium text-gray-600">セット数（1,000〜10,000セット）</label>
                            {selectedOptions.setNumber === "" ? (
                              <FaSquare className="text-gray-400" />
                            ) : (
                              <FaCheckSquare className="text-green-500" />
                            )}
                          </div>
                          <p className="text-gray-400">封入するセット数を入力してください</p>
                        </div>
                        <NumericFormat
                          name="setNumber"
                          value={selectedOptions.setNumber}
                          onValueChange={({ value }) => {
                            // Update the state with the current value while typing
                            setSelectedOptions((prev) => ({ ...prev, setNumber: value }));
                          }}
                          onBlur={() => {
                            // Validate the value when the user leaves the input field
                            const numValue = parseFloat(selectedOptions.setNumber.replace(/,/g, '')) || 0;
                            if (numValue < 1000 || numValue > 10000) {
                              // Reset to empty if the value is out of range
                              setSelectedOptions((prev) => ({ ...prev, setNumber: "" }));
                              alert("セット数は1,000〜10,000の範囲で入力してください。");
                            }
                          }}
                          isAllowed={(values) => {
                            // Allow all intermediate values while typing
                            // We'll validate the final value in onBlur
                            return true;
                          }}
                          thousandSeparator=","
                          decimalScale={0}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="セット数を入力 (1,000〜10,000)"
                        />
                      </div>
                    </div>

                    {/* 3. Setup Required */}
                    {selectedOptions.itemType !== "請求書・納品書 (長3封筒・セット無)" && (
                      <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-gray-800">3.</span>
                          <label className="block text-lg font-semibold text-gray-700">セット作業</label>
                        </div>
                        <div className="mt-2 ml-6 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <label className="block text-md font-medium text-gray-600">セット作業の有無</label>
                              {selectedOptions.setupRequired === "" ? (
                                <FaSquare className="text-gray-400" />
                              ) : (
                                <FaCheckSquare className="text-green-500" />
                              )}
                            </div>
                            <p className="text-gray-400">封入物のセット作業が必要か選択してください</p>
                          </div>
                          <select
                            name="setupRequired"
                            value={selectedOptions.setupRequired}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            <option value="">選択してください</option>
                            {Object.keys(quoteData["data-processing"].options.setupRequired).map((key) => (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* 4. Paper Sizes */}
                    <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">{selectedOptions.itemType === "請求書・納品書 (長3封筒・セット無)" ? "3." : "4."}</span>
                        <label className="block text-lg font-semibold text-gray-700">用紙選択</label>
                        {/* Grey/green icon: green when all 8 fields are not empty */}
                        {Object.values(selectedOptions.paperSizes).every(val => val !== "") ? (
                          <FaCheckSquare className="text-green-500" />
                        ) : (
                          <FaSquare className="text-gray-400" />
                        )}
                      </div>
                      <div className="mt-2 ml-6 space-y-3">
                        {/* Add a note to inform users they can input 0 */}
                        <p className="text-sm text-gray-500">各用紙の数量を入力してください（0も入力可能です）。合計数量は8を超えることはできません。</p>
                        {/* A4 Papers */}
                        <div className="space-y-2">
                          <h4 className="text-md font-semibold text-gray-700">A4用紙</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-600">55kg 両面カラー</label>
                              <NumericFormat
                                name="a4_55kg_double_color"
                                value={selectedOptions.paperSizes.a4_55kg_double_color}
                                onValueChange={({ value }) => {
                                  const updatedPaperSizes = { ...selectedOptions.paperSizes, a4_55kg_double_color: value };
                                  const paperCounts = Object.values(updatedPaperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum <= 8 || value === "") {
                                    handleChange({ target: { name: "a4_55kg_double_color", value, dataset: { category: "paperSizes" } } });
                                  } else {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                  }
                                }}
                                onBlur={() => {
                                  const paperCounts = Object.values(selectedOptions.paperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum > 8) {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                    handleChange({ target: { name: "a4_55kg_double_color", value: "0", dataset: { category: "paperSizes" } } });
                                  }
                                }}
                                thousandSeparator=","
                                decimalScale={0}
                                allowNegative={false} // Prevent negative numbers
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="数量を入力（0も可）"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600">55kg 片面モノクロ</label>
                              <NumericFormat
                                name="a4_55kg_single_mono"
                                value={selectedOptions.paperSizes.a4_55kg_single_mono}
                                onValueChange={({ value }) => {
                                  const updatedPaperSizes = { ...selectedOptions.paperSizes, a4_55kg_single_mono: value };
                                  const paperCounts = Object.values(updatedPaperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum <= 8 || value === "") {
                                    handleChange({ target: { name: "a4_55kg_single_mono", value, dataset: { category: "paperSizes" } } });
                                  } else {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                  }
                                }}
                                onBlur={() => {
                                  const paperCounts = Object.values(selectedOptions.paperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum > 8) {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                    handleChange({ target: { name: "a4_55kg_single_mono", value: "0", dataset: { category: "paperSizes" } } });
                                  }
                                }}
                                thousandSeparator=","
                                decimalScale={0}
                                allowNegative={false}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="数量を入力（0も可）"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600">90kg 両面カラー</label>
                              <NumericFormat
                                name="a4_90kg_double_color"
                                value={selectedOptions.paperSizes.a4_90kg_double_color}
                                onValueChange={({ value }) => {
                                  const updatedPaperSizes = { ...selectedOptions.paperSizes, a4_90kg_double_color: value };
                                  const paperCounts = Object.values(updatedPaperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum <= 8 || value === "") {
                                    handleChange({ target: { name: "a4_90kg_double_color", value, dataset: { category: "paperSizes" } } });
                                  } else {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                  }
                                }}
                                onBlur={() => {
                                  const paperCounts = Object.values(selectedOptions.paperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum > 8) {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                    handleChange({ target: { name: "a4_90kg_double_color", value: "0", dataset: { category: "paperSizes" } } });
                                  }
                                }}
                                thousandSeparator=","
                                decimalScale={0}
                                allowNegative={false}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="数量を入力（0も可）"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600">90kg 片面モノクロ</label>
                              <NumericFormat
                                name="a4_90kg_single_mono"
                                value={selectedOptions.paperSizes.a4_90kg_single_mono}
                                onValueChange={({ value }) => {
                                  const updatedPaperSizes = { ...selectedOptions.paperSizes, a4_90kg_single_mono: value };
                                  const paperCounts = Object.values(updatedPaperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum <= 8 || value === "") {
                                    handleChange({ target: { name: "a4_90kg_single_mono", value, dataset: { category: "paperSizes" } } });
                                  } else {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                  }
                                }}
                                onBlur={() => {
                                  const paperCounts = Object.values(selectedOptions.paperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum > 8) {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                    handleChange({ target: { name: "a4_90kg_single_mono", value: "0", dataset: { category: "paperSizes" } } });
                                  }
                                }}
                                thousandSeparator=","
                                decimalScale={0}
                                allowNegative={false}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="数量を入力（0も可）"
                              />
                            </div>
                          </div>
                        </div>

                        {/* A3 Papers */}
                        <div className="space-y-2 mt-4">
                          <h4 className="text-md font-semibold text-gray-700">A3用紙</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-600">55kg 両面カラー</label>
                              <NumericFormat
                                name="a3_55kg_double_color"
                                value={selectedOptions.paperSizes.a3_55kg_double_color}
                                onValueChange={({ value }) => {
                                  const updatedPaperSizes = { ...selectedOptions.paperSizes, a3_55kg_double_color: value };
                                  const paperCounts = Object.values(updatedPaperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum <= 8 || value === "") {
                                    handleChange({ target: { name: "a3_55kg_double_color", value, dataset: { category: "paperSizes" } } });
                                  } else {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                  }
                                }}
                                onBlur={() => {
                                  const paperCounts = Object.values(selectedOptions.paperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum > 8) {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                    handleChange({ target: { name: "a3_55kg_double_color", value: "0", dataset: { category: "paperSizes" } } });
                                  }
                                }}
                                thousandSeparator=","
                                decimalScale={0}
                                allowNegative={false}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="数量を入力（0も可）"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600">55kg 片面モノクロ</label>
                              <NumericFormat
                                name="a3_55kg_single_mono"
                                value={selectedOptions.paperSizes.a3_55kg_single_mono}
                                onValueChange={({ value }) => {
                                  const updatedPaperSizes = { ...selectedOptions.paperSizes, a3_55kg_single_mono: value };
                                  const paperCounts = Object.values(updatedPaperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum <= 8 || value === "") {
                                    handleChange({ target: { name: "a3_55kg_single_mono", value, dataset: { category: "paperSizes" } } });
                                  } else {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                  }
                                }}
                                onBlur={() => {
                                  const paperCounts = Object.values(selectedOptions.paperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum > 8) {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                    handleChange({ target: { name: "a3_55kg_single_mono", value: "0", dataset: { category: "paperSizes" } } });
                                  }
                                }}
                                thousandSeparator=","
                                decimalScale={0}
                                allowNegative={false}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="数量を入力（0も可）"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600">90kg 両面カラー</label>
                              <NumericFormat
                                name="a3_90kg_double_color"
                                value={selectedOptions.paperSizes.a3_90kg_double_color}
                                onValueChange={({ value }) => {
                                  const updatedPaperSizes = { ...selectedOptions.paperSizes, a3_90kg_double_color: value };
                                  const paperCounts = Object.values(updatedPaperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum <= 8 || value === "") {
                                    handleChange({ target: { name: "a3_90kg_double_color", value, dataset: { category: "paperSizes" } } });
                                  } else {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                  }
                                }}
                                onBlur={() => {
                                  const paperCounts = Object.values(selectedOptions.paperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum > 8) {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                    handleChange({ target: { name: "a3_90kg_double_color", value: "0", dataset: { category: "paperSizes" } } });
                                  }
                                }}
                                thousandSeparator=","
                                decimalScale={0}
                                allowNegative={false}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="数量を入力（0も可）"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600">90kg 片面モノクロ</label>
                              <NumericFormat
                                name="a3_90kg_single_mono"
                                value={selectedOptions.paperSizes.a3_90kg_single_mono}
                                onValueChange={({ value }) => {
                                  const updatedPaperSizes = { ...selectedOptions.paperSizes, a3_90kg_single_mono: value };
                                  const paperCounts = Object.values(updatedPaperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum <= 8 || value === "") {
                                    handleChange({ target: { name: "a3_90kg_single_mono", value, dataset: { category: "paperSizes" } } });
                                  } else {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                  }
                                }}
                                onBlur={() => {
                                  const paperCounts = Object.values(selectedOptions.paperSizes).map(val => parseFloat(val.replace(/,/g, '')) || 0);
                                  const totalPaperSum = paperCounts.reduce((sum, count) => sum + count, 0);
                                  if (totalPaperSum > 8) {
                                    setModalMessage("用紙の合計数量は8を超えることはできません。");
                                    setShowModal(true);
                                    handleChange({ target: { name: "a3_90kg_single_mono", value: "0", dataset: { category: "paperSizes" } } });
                                  }
                                }}
                                thousandSeparator=","
                                decimalScale={0}
                                allowNegative={false}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="数量を入力（0も可）"
                              />
                            </div>
                          </div>
                        </div>
                        {paperError && (
                          <p className="text-red-500 text-sm mt-2">
                            エラー: 用紙の合計数量は8を超えることはできません。数量を調整してください。
                          </p>
                        )}
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
                {selectedUnit === "secretariat" && (
                  <div className="text-center">
                    <p className="text-lg text-gray-600">
                      事務局代行の見積もりは個別対応となります。お問い合わせください。
                    </p>
                    <Link
                      href="/contact"
                      className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >お問い合わせ
                    </Link>
                  </div>
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