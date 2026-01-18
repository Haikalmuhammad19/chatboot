import { Message } from '../types/mentalHealth';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      <div className={`max-w-[75%] ${isBot ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-3 shadow-md ${
            isBot
              ? 'bg-white text-gray-800 rounded-tl-none'
              : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-tr-none'
          }`}
        >
          <div className="whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </div>
          {message.prediction && (
            <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-600">
              Deteksi: {message.prediction.condition} ({(message.prediction.confidence * 100).toFixed(1)}%)
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1 px-2">
          {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center shadow-lg order-2">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
}
