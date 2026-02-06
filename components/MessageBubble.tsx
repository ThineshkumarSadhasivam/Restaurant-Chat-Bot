
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.role === 'model';

  // Simple Markdown-style formatter for a clean, royal look
  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      let processedLine = line
        // Replace **text** with bold spans
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-amber-900">$1</strong>')
        // Replace * text or - text with elegant bullet points
        .replace(/^[\s]*[\*\-][\s]+(.*)/g, '<span class="inline-block mr-2 text-amber-600">◆</span> $1')
        // Replace *text* or _text_ with italicized spans
        .replace(/[\*_](.*?)[\*_]/g, '<em class="italic opacity-80">$1</em>');

      return (
        <div 
          key={i} 
          className="mb-1 last:mb-0"
          dangerouslySetInnerHTML={{ __html: processedLine }} 
        />
      );
    });
  };
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-6 group animate-in fade-in slide-in-from-bottom-2 duration-500`}>
      <div 
        className={`max-w-[85%] lg:max-w-[75%] px-7 py-5 rounded-3xl shadow-sm text-sm transition-all border ${
          isBot 
            ? 'bg-white text-stone-800 border-stone-100 rounded-bl-none' 
            : 'bg-stone-900 text-white border-stone-800 rounded-br-none shadow-xl shadow-stone-900/10'
        }`}
      >
        <div className="leading-relaxed space-y-1">
          {formatContent(message.content)}
        </div>
        <div className={`text-[9px] mt-3 font-bold tracking-[0.2em] uppercase opacity-30 ${isBot ? 'text-stone-500' : 'text-stone-300'}`}>
          {isBot ? 'Palace Concierge' : 'Guest'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
