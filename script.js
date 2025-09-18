// script.js
const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";
const API_TOKEN = "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"; // replace with Hugging Face token

const chatHeader = document.getElementById("chatbot-header");
const chatBox = document.getElementById("chatbot");
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function toggleChat() {
  chatBox.classList.toggle("hidden");
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function queryHuggingFace(message) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: message }),
    });

    const result = await response.json();
    return result.generated_text || "⚠️ AI did not return a response.";
  } catch {
    return "⚠️ Error connecting to AI service.";
  }
}

async function handleSend() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  const botReply = await queryHuggingFace(message);
  addMessage(botReply, "bot");
}

chatHeader.addEventListener("click", toggleChat);
sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSend());

