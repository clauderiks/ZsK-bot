const patterns = [
  {
    match: /^(hi|hello|chào|hey|xin chào|alo)/i,
    responses: [
      "Chào bạn! Tôi là ZsK AI agent chạy local. Bạn cần mình hỗ trợ gì hôm nay?",
      "Xin chào! Mình là ZsK Free Agent. Hãy hỏi mình về code, dự án, hoặc các lệnh shell." 
    ]
  },
  {
    match: /(code|lệnh|terminal|shell|command|script)/i,
    responses: [
      "Mình có thể giúp bạn viết mã hoặc gợi ý lệnh shell cơ bản. Hãy gửi yêu cầu cụ thể nhé.",
      "Nếu bạn cần gợi ý về code hoặc terminal, cứ nói rõ mục tiêu và mình sẽ trả lời." 
    ]
  },
  {
    match: /(zsk|project|dự án|bot|agent)/i,
    responses: [
      "ZsK AI agent này đang chạy local như một dịch vụ free. Nó có thể trả lời câu hỏi đơn giản và hỗ trợ demo.",
      "Đây là phiên bản agent free của ZsK. Nếu bạn muốn mở rộng thành AI mạnh hơn, hãy nối với dịch vụ model bên ngoài." 
    ]
  },
  {
    match: /(help|giúp|hỗ trợ|cách|như nào)/i,
    responses: [
      "Bạn có thể hỏi mình bằng tiếng Việt hoặc tiếng Anh. Nếu cần hướng dẫn deploy, mình cũng có thể tư vấn.",
      "Nói rõ bạn muốn làm gì: chat, chạy model local, deploy, hay tích hợp provider nữa." 
    ]
  }
];

const fallbackResponses = [
  "Đây là ZsK AI Free Agent. Mình đang chạy local và sẽ trả lời những câu hỏi cơ bản.",
  "Mình hiện không có model lớn bên trong, nhưng bạn có thể dùng làm demo agent free hoặc kết nối với endpoint AI khác.",
  "Nếu bạn muốn agent thật sự thông minh, hãy nối `OHMABA_URL` tới một endpoint model hoặc self-host một dịch vụ AI." 
];

function chooseResponse(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function generateFreeAgentResponse(prompt) {
  const cleaned = (prompt || "").toString().trim();
  if (!cleaned) {
    return "Nói gì đó đi, mình đang chờ câu hỏi của bạn.";
  }

  for (const entry of patterns) {
    if (entry.match.test(cleaned)) {
      return chooseResponse(entry.responses);
    }
  }

  return `${chooseResponse(fallbackResponses)}\n
---\nĐầu vào của bạn: "${cleaned}"`;
}
