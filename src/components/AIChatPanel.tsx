import React, { useState } from 'react';

const MODEL_OPTIONS = [
  { value: 'zsk', label: 'ZsK Free Agent (local demo)' },
  { value: 'ohmaba', label: 'Ohmaba Agent (custom endpoint)' },
  { value: 'openai', label: 'OpenAI (API key required)' },
  { value: 'gemini', label: 'Google Gemini' },
  { value: 'qwen', label: 'Qwen' },
  { value: 'claude', label: 'Claude' }
];

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIChatPanelProps {
  selectedModel: string;
  onSelectModel: (model: string) => void;
}

export const AIChatPanel: React.FC<AIChatPanelProps> = ({
  selectedModel,
  onSelectModel
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: 'ZsK AI Free Agent đã sẵn sàng. Chọn provider và gửi câu hỏi của bạn.'
    }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<{ type: 'info' | 'error'; text: string } | null>({
    type: 'info',
    text: 'Mô hình local zsk đang chạy miễn phí. Đổi sang ohmaba nếu bạn có endpoint custom.'
  });
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);
    setStatus(null);

    try {
      const response = await fetch('/api/chat', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: trimmed, model: selectedModel })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const content = data.response || data.result || 'No response returned.';
      setMessages(prev => [...prev, { role: 'assistant', content }]);
      setStatus({ type: 'info', text: 'Đã nhận phản hồi từ agent.' });
    } catch (err) {
      setStatus({ type: 'error', text: err instanceof Error ? err.message : 'Lỗi khi gọi agent.' });
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lỗi: không thể nhận phản hồi từ agent.' }]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#020409]">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-neutral-800 bg-black">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-cyan-300 font-bold">ZsK AI Chat</div>
          <div className="text-[11px] text-neutral-400">Chọn provider và bắt đầu chat ngay.</div>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="ai-model" className="text-[11px] text-neutral-400 uppercase tracking-widest">Provider</label>
          <select
            id="ai-model"
            value={selectedModel}
            onChange={e => onSelectModel(e.target.value)}
            className="bg-black border border-neutral-700 text-white text-xs px-3 py-2 rounded-none focus:border-cyan-400 focus:outline-none"
          >
            {MODEL_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-none p-4 border-2 ${
              message.role === 'user'
                ? 'bg-cyan-950 border-cyan-700 text-cyan-100 ml-auto max-w-[85%]'
                : message.role === 'assistant'
                ? 'bg-neutral-900 border-neutral-700 text-slate-100 max-w-[85%]'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 max-w-[90%]'
            }`}
          >
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold mb-2">
              {message.role === 'user' ? 'Bạn' : message.role === 'assistant' ? 'Agent' : 'System'}
            </div>
            <div className="whitespace-pre-wrap text-sm leading-6">{message.content}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-neutral-800 bg-black p-4">
        {status && (
          <div
            className={`mb-3 rounded-none border px-3 py-2 text-sm ${
              status.type === 'error'
                ? 'border-rose-500 bg-rose-950 text-rose-200'
                : 'border-cyan-500 bg-cyan-950 text-cyan-100'
            }`}
          >
            {status.text}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập câu hỏi của bạn vào đây..."
            className="min-h-[96px] w-full resize-none rounded-none border border-neutral-700 bg-[#06080F] px-3 py-3 text-sm text-white outline-none focus:border-cyan-400"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isSending}
            className="h-[96px] rounded-none border-2 border-cyan-400 bg-cyan-400 text-black font-bold uppercase tracking-[0.2em] transition-all hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? 'Đang gửi...' : 'Gửi'}
          </button>
        </div>
      </div>
    </div>
  );
};
