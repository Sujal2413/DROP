'use client';

import { useState } from 'react';

export type FieldType = 'text' | 'email' | 'select';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: readonly string[];
  colSpan?: 1 | 2;
}

export interface LeadFormConfig {
  endpoint: string;
  fields: FieldConfig[];
  submitText: string;
  submitLoadingText: string;
  successTitle: string;
  buttonTheme?: 'primary' | 'outline';
  layout?: 'stack' | 'grid';
  selectBgColor?: string;
}

export default function LeadForm({ config }: { config: LeadFormConfig }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setFormData({});
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-16 px-8 border border-[#C9A84C]/20 rounded-3xl bg-[#C9A84C]/[0.03]">
        <div className="w-16 h-16 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-[#C9A84C] text-2xl font-black tracking-tight mb-3 uppercase">{config.successTitle}</h3>
        <p className="text-white/60 font-medium text-sm">{message}</p>
      </div>
    );
  }

  const formClassName = config.layout === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 gap-5' 
    : 'space-y-5';

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      {config.fields.map((field) => {
        const wrapperClass = field.colSpan === 2 ? 'md:col-span-2' : '';
        const inputClass = "w-full py-4 bg-transparent border-b border-white/20 text-white text-sm font-medium placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C] transition-all rounded-none";
        
        return (
          <div key={field.name} className={wrapperClass}>
            <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
              {field.label} {field.required && '*'}
            </label>
            
            {field.type === 'select' ? (
              <select
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="" style={{ backgroundColor: config.selectBgColor || '#000' }}>Select an option</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt} style={{ backgroundColor: config.selectBgColor || '#000' }}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                placeholder={field.placeholder}
                className={inputClass}
              />
            )}
          </div>
        );
      })}

      {status === 'error' && (
        <p className={`${config.layout === 'grid' ? 'md:col-span-2 ' : ''}text-red-400 text-xs font-medium text-center`}>
          {message}
        </p>
      )}

      <div className={config.layout === 'grid' ? 'md:col-span-2' : ''}>
        {config.buttonTheme === 'outline' ? (
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-transparent border-2 border-[#C9A84C] hover:bg-[#C9A84C]/10 disabled:opacity-50 disabled:cursor-not-allowed text-[#C9A84C] font-black tracking-[0.2em] text-xs rounded-full transition-all duration-300 uppercase active:scale-95 cursor-pointer"
          >
            {status === 'loading' ? config.submitLoadingText : config.submitText}
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === 'loading'}
            className="group relative w-full py-4 bg-[#C9A84C] hover:bg-[#B0913B] disabled:opacity-50 disabled:cursor-not-allowed text-black font-black tracking-[0.2em] text-xs rounded-full shadow-lg shadow-[#C9A84C]/10 hover:shadow-[#C9A84C]/25 transition-all duration-300 uppercase active:scale-95 cursor-pointer overflow-hidden flex items-center justify-center"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-8">
              {status === 'loading' ? config.submitLoadingText : config.submitText}
            </span>
            <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 translate-y-8 transition-transform duration-300 group-hover:translate-y-0 text-black">
              <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
              <span className="w-2 h-2 bg-black rounded-full animate-pulse delay-75" />
            </span>
          </button>
        )}
      </div>
    </form>
  );
}
