import React from 'react';

interface ProductSpecificationsProps {
  specifications?: Record<string, string>;
}

export default function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  if (!specifications || Object.keys(specifications).length === 0) return null;

  return (
    <div className="py-8 md:py-12 border-t border-outline-variant">
      <h2 className="text-2xl font-bold text-on-surface mb-6 font-jakarta">Technical Specifications</h2>
      <div className="bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/50">
        <table className="w-full text-left text-sm md:text-base">
          <tbody>
            {Object.entries(specifications).map(([key, value], idx) => (
              <tr key={key} className={idx % 2 === 0 ? 'bg-surface' : 'bg-surface-container'}>
                <td className="py-4 px-4 md:px-6 font-medium text-on-surface-variant w-1/3 border-r border-outline-variant/50">
                  {key}
                </td>
                <td className="py-4 px-4 md:px-6 font-bold text-on-surface">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
