"use client";
import { useState, useEffect } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

// Message Parser: Determines how to interpret user input
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("services") || lowerCaseMessage.includes("offer")) {
      this.actionProvider.handleFaqResponse("What services does ダイオーミウラBPOビジネスセンター offer?");
    } else if (lowerCaseMessage.includes("quote") || lowerCaseMessage.includes("simulation")) {
      this.actionProvider.handleFaqResponse("How do I use the free quote simulation?");
    } else if (lowerCaseMessage.includes("paper") || lowerCaseMessage.includes("overprinting")) {
      this.actionProvider.handleFaqResponse("What paper sizes are available for overprinting?");
    } else if (lowerCaseMessage.includes("storage") || lowerCaseMessage.includes("cost")) {
      this.actionProvider.handleFaqResponse("How is the storage cost calculated?");
    } else if (lowerCaseMessage.includes("set number") || lowerCaseMessage.includes("data processing")) {
      this.actionProvider.handleFaqResponse("What is the minimum set number for data processing?");
    } else {
      this.actionProvider.handleDefault();
    }
  }
}

// Action Provider: Defines the chatbot's responses
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.faqs = [];
  }

  async loadFaqs() {
    try {
      const res = await fetch("/faqs.json");
      const data = await res.json();
      this.faqs = data.faqs || [];
    } catch (err) {
      console.error("Error fetching FAQs:", err);
    }
  }

  findAnswer(question) {
    for (const category of this.faqs) {
      const matchedQuestion = category.questions.find(
        (q) => q.question.toLowerCase() === question.toLowerCase()
      );
      if (matchedQuestion) {
        return matchedQuestion.answer;
      }
    }
    return "申し訳ございません。ご質問に対する回答が見つかりませんでした。別の言い方でご質問いただくか、サポートチームにご連絡ください。";
  }

  async handleFaqResponse(question) {
    if (this.faqs.length === 0) {
      await this.loadFaqs();
    }
    const answer = this.findAnswer(question);
    const botMessage = this.createChatBotMessage(answer);
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  handleDefault() {
    const botMessage = this.createChatBotMessage(
      "ごめんなさい、その質問にはお答えできません。別の質問を試してみませんか？例えば、「見積シミュレーションの使い方は？」など。"
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }
}

// Config: Chatbot configuration
const config = {
  initialMessages: [
    {
      id: "welcome",
      message: "こんにちは！ダイオーミウラBPOビジネスセンターに関するご質問にお答えします。どのようなお話をしましょうか？",
      user: "bot",
    },
  ],
  botName: "BPO君",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#1A2FA0",
    },
    chatButton: {
      backgroundColor: "#1A2FA0",
    },
  },
};

// Chatbot Component
const BPOChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="チャットボットを開く"
        >
          💬 チャットで質問
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">BPOアシスタント</h3>
            <button onClick={() => setIsOpen(false)} className="text-white" aria-label="チャットボットを閉じる">
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BPOChatbot;
