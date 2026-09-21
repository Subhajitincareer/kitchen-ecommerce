'use client';

import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface ProductQuestionsProps {
  faqs?: FAQ[];
}

export default function ProductQuestions({ faqs }: ProductQuestionsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="py-8 md:py-12 border-t border-outline-variant">
      <h2 className="text-2xl font-bold text-on-surface mb-6 font-jakarta">Customer Q&A</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-surface-container rounded-2xl border border-outline-variant/50 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-4 md:p-5 text-left transition-colors hover:bg-surface/50"
            >
              <span className="font-bold text-on-surface pr-4">{faq.question}</span>
              <span className="material-symbols-outlined text-outline-variant shrink-0">
                {openIndex === idx ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="p-4 md:p-5 pt-0 border-t border-outline-variant/50">
                <p className="text-sm text-on-surface-variant leading-relaxed pt-4">
                  {faq.answer}
                </p>
                <div className="mt-4 text-xs font-medium text-outline flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#10B981]">verified</span>
                  Answered by Kitchora Experts
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
