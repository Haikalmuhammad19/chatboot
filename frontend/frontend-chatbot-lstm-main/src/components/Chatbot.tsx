import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, AlertCircle, Brain } from 'lucide-react';
import { Message } from '../types/mentalHealth';
import { predictMentalHealth } from '../services/api';
import { getResponse } from '../utils/responseTemplates';
import ChatMessage from './ChatMessage';

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Halo, saya adalah asisten kesehatan mental. Saya di sini untuk mendengarkan Anda. Ceritakan bagaimana perasaan Anda hari ini atau hal apa yang sedang Anda alami. Semua yang Anda bagikan akan dijaga kerahasiaannya.',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setError(null);

    try {
      const prediction = await predictMentalHealth(inputText);

      const responseText = getResponse(
        prediction.predicted_subreddit,
        prediction.confidence
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: responseText,
        timestamp: new Date(),
        prediction: {
          condition: prediction.predicted_subreddit,
          confidence: prediction.confidence,
        },
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Kesalahan API: ${errorMessage}. Pastikan backend berjalan di http://localhost:8000`);

      const botErrorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `Maaf, saya mengalami kesulitan teknis. Error: ${errorMessage}. Mohon coba lagi nanti atau pastikan server backend berjalan dengan baik.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Asisten Kesehatan Mental</h1>
              <p className="text-sm text-teal-50">Kami di sini untuk mendengarkan Anda</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-3 justify-start mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pesan Anda di sini... (Tekan Enter untuk mengirim)"
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-teal-400 resize-none transition-colors"
                rows={2}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center hover:from-teal-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Informasi ini bersifat edukatif. Untuk diagnosis dan perawatan yang akurat, konsultasikan dengan profesional kesehatan mental.
          </p>
        </div>
    </div>
  );
}
