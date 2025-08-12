import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Do I need to replace the whole roof if it leaks?',
      answer: 'Usually not! Most leaks are localized issues affecting specific areas like roof tiles or gutter only. Complete roof replacement is rarely necessary for leak issues.'
    },
    {
      question: 'How much does roof repair cost in KL & Selangor?',
      answer: 'Costs depend on the affected area, materials needed, and site conditions. We provide free inspection and a quotation before any work begins, so you know exactly what you\'re paying for with no hidden charges.'
    },
    {
      question: 'How long will a leaking roof repair take?',
      answer: 'Small repairs typically take ½ to 1 day, while complex issues may require 1-3 days. Weather conditions may affect timing, but we never cut corners to rush a job.'
    },
    {
      question: 'Do you charge for inspection or estimates?',
      answer: 'No - our inspection and quotation are completely free. We come to your site, assess the problem, explain our findings clearly, and provide a detailed quotation at no cost to you.'
    },
    {
      question: 'What kind of warranty is included?',
      answer: 'We provide up to 5 years warranty on workmanship, written clearly on your invoice.'
    },
    {
      question: 'What if it leaks again?',
      answer: 'We return to diagnose and resolve any issues under our warranty terms at no additional cost. Our goal is a permanent fix, and we stand behind our work.'
    },
    {
      question: 'Which areas do you serve?',
      answer: 'We serve Kuala Lumpur and Selangor within approximately 1-hour drive from our base in Klang. This includes areas like Shah Alam, Puchong, Petaling Jaya, Subang Jaya, Kajang, Cheras, Ampang, and surrounding areas.'
    },
    {
      question: 'Do I need to be at home for inspection/repair?',
      answer: 'Inspection: preferably yes. Repair: not necessary if we have roof access; we’ll send photo/video updates.'
    },
    {
      question: 'Do you use middlemen or outsource?',
      answer: 'No—work is done by our in-house team for consistent quality.'
    },
    {
      question: 'Can you handle condos/high-rises?',
      answer: 'Yes, with management access approval. We’ll advise on permits and safety.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-9 md:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about roof leak repair
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-red-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-100 pt-4">
                      <div className="text-gray-700 leading-relaxed">
                        {typeof faq.answer === 'string' ? (
                          <p>{faq.answer}</p>
                        ) : (
                          faq.answer
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;