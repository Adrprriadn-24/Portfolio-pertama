document.addEventListener("DOMContentLoaded", function () {
  // Chat elements
  const chatToggle = document.querySelector(".chat-widget-toggle");
  const chatWindow = document.querySelector(".chat-window");
  const chatClose = document.querySelector(".chat-close");
  const chatInput = document.querySelector("#chat-input");
  const sendBtn = document.querySelector(".send-btn");
  const chatMessages = document.querySelector(".chat-messages");
  const quickReplies = document.querySelectorAll(".quick-reply");

  // Auto responses
  const autoResponses = {
    pendidikan: [
      "Saya lulusan SMK Negeri 1 Pringgabaya jurusan TKJ dan sekarang sedang menempuh pendidikan S1 Teknik Informatika di Universitas Teknologi Digital Indonesia.",
      "Selama pendidikan, saya aktif mengikuti berbagai pelatihan pengembangan web dan mobile development."
    ],
    keahlian: [
      "Saya memiliki keahlian dalam pengembangan web menggunakan HTML, CSS, JavaScript, React, dan PHP. Saya juga menguasai mobile development dengan React Native dan Flutter.",
      "Selain programming, saya juga memiliki kemampuan dalam UI/UX design menggunakan Figma dan Adobe XD."
    ],
    pengalaman: [
      "Saya memiliki pengalaman sebagai freelance web developer sejak 2022 dan pernah magang sebagai UI/UX Designer di Digital Creative Agency.",
      "Saya telah mengerjakan berbagai proyek website dan aplikasi mobile untuk berbagai klien."
    ],
    kontak: [
      "Anda bisa menghubungi saya melalui email di adiapriadin@email.com atau telepon/WA di +62 123 4567 890.",
      "Untuk melihat portfolio saya, silakan kunjungi profil GitHub atau LinkedIn saya yang terdapat di bagian kontak."
    ],
    lokasi: [
      "Saya berdomisili di Lombok Timur, NTB, Indonesia.",
      "Saya bisa bekerja secara remote dan terbuka untuk kolaborasi dari mana saja."
    ],
    default: [
      "Terima kasih atas pertanyaannya. Ada yang ingin ditanyakan lebih lanjut?",
      "Baik, ada hal lain yang ingin Anda ketahui tentang saya?",
      "Silakan tanyakan hal lain yang ingin Anda ketahui."
    ]
  };

  // Toggle chat window
  chatToggle.addEventListener("click", () => {
    chatWindow.classList.toggle("active");
    chatToggle.style.animation = "none";
    const badge = document.querySelector(".notification-badge");
    if (badge) badge.style.display = "none";
  });

  chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("active");
  });

  // Send message function
  function sendMessage(message, isUser = true) {
    if (!message.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    const messageHTML = `
            <div class="message ${isUser ? "user" : "admin"}">
                <div class="message-bubble">
                    <div class="message-content">
                        <p>${message}</p>
                        <span class="message-time">${time}</span>
                    </div>
                </div>
            </div>
        `;

    chatMessages.insertAdjacentHTML("beforeend", messageHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (isUser) {
      showTypingIndicator();
      setTimeout(() => {
        const response = getAutoResponse(message);
        sendMessage(response, false);
        hideTypingIndicator();
      }, 1000);
    }
  }

  function getAutoResponse(message) {
    const lowerMessage = message.toLowerCase();
    let responseCategory = "default";

    if (
      lowerMessage.includes("pendidikan") ||
      lowerMessage.includes("sekolah") ||
      lowerMessage.includes("kuliah")
    ) {
      responseCategory = "pendidikan";
    } else if (
      lowerMessage.includes("keahlian") ||
      lowerMessage.includes("skill") ||
      lowerMessage.includes("kemampuan")
    ) {
      responseCategory = "keahlian";
    } else if (
      lowerMessage.includes("pengalaman") ||
      lowerMessage.includes("kerja") ||
      lowerMessage.includes("proyek")
    ) {
      responseCategory = "pengalaman";
    } else if (
      lowerMessage.includes("kontak") ||
      lowerMessage.includes("hubungi") ||
      lowerMessage.includes("email")
    ) {
      responseCategory = "kontak";
    } else if (
      lowerMessage.includes("lokasi") ||
      lowerMessage.includes("alamat") ||
      lowerMessage.includes("tinggal")
    ) {
      responseCategory = "lokasi";
    }

    const responses = autoResponses[responseCategory];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Handle send button click
  sendBtn.addEventListener("click", () => {
    const message = chatInput.value;
    if (message.trim()) {
      sendMessage(message);
      chatInput.value = "";
    }
  });

  // Handle enter key press
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const message = chatInput.value;
      if (message.trim()) {
        sendMessage(message);
        chatInput.value = "";
      }
    }
  });

  // Handle quick replies
  quickReplies.forEach((button) => {
    button.addEventListener("click", () => {
      const message = button.textContent;
      sendMessage(message);
      button.parentElement.style.display = "none";
    });
  });

  function showTypingIndicator() {
    const typingStatus = document.querySelector(".typing-status");
    if (typingStatus) typingStatus.style.display = "flex";
  }

  function hideTypingIndicator() {
    const typingStatus = document.querySelector(".typing-status");
    if (typingStatus) typingStatus.style.display = "none";
  }
});
