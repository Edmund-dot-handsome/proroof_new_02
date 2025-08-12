import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/60178897151?text=I%20am%20interested%20in%20Free%20Inspection%20/%20Roof%20Leaking%20Repair.%0Ahttps%3A%2F%2Fproroof.my%2F%0A%0AName%3A%0AProblem%3A%0ABest%20Time%20for%20Inspection%20%3A"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[18px] right-[14px] z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppFloat;