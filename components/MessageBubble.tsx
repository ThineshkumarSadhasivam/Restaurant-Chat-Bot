
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.role === 'model';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-6 group`}>
      <div 
        className={`max-w-[85%] lg:max-w-[75%] px-6 py-4 rounded-3xl shadow-sm text-sm transition-all ${
          isBot 
            ? 'bg-white text-stone-800 border border-stone-100 rounded-bl-none' 
            : 'bg-stone-900 text-white rounded-br-none shadow-xl shadow-stone-900/10'
        }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">
          {message.content}
        </p>
        <div className={`text-[9px] mt-2 font-medium tracking-widest uppercase opacity-40 ${isBot ? 'text-stone-500' : 'text-stone-300'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
