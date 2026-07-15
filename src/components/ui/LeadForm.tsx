'use client';

import { useState } from 'react';

export type FieldType = 'text' | 'email' | 'select' | 'textarea';

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
  selectBgColor?: string; // Kept for backwards compatibility but not used in chip design
}

export default function LeadForm({ config }: { config: LeadFormConfig }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('Submitting your information...');

    try {
      const res = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Successfully submitted.');
        setFormData({});
      } else {
        setStatus('error');
        // Handle validation errors from the unified backend API response format
        if (data.error && data.error.fields) {
          const errors = Object.values(data.error.fields).join(', ');
          setMessage(`${data.error.message}: ${errors}`);
        } else {
          setMessage(data.error?.message || data.error || 'Something went wrong.');
        }
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-16 px-8 border border-[#C9A84C]/20 rounded-3xl bg-[#C9A84C]/[0.03]" aria-live="polite">
        <div className="w-16 h-16 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    ? 'grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8'
    : 'space-y-8';

  return (
    <form onSubmit={handleSubmit} className={formClassName} noValidate={false}>
      {/* Live region for accessibility announcements */}
      <div aria-live="polite" className="sr-only">
        {status === 'loading' ? 'Submitting...' : ''}
        {status === 'error' ? message : ''}
      </div>

      {/* Honeypot field for bot protection */}
      <input
        type="text"
        name="website"
        value={formData.website || ''}
        onChange={(e) => handleChange('website', e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {config.fields.map((field) => {
        const wrapperClass = field.colSpan === 2 ? 'md:col-span-2' : '';
        const fieldId = `field-${field.name}`;
        const isFocused = focusedField === field.name;
        const hasValue = !!formData[field.name];
        const isFloating = isFocused || hasValue;

        if (field.type === 'select') {
          return (
            <div key={field.name} className={`${wrapperClass} flex flex-col gap-4 mt-2`}>
              <label className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase">
                {field.label} {field.required && '*'}
              </label>
              <div className="flex flex-wrap gap-3">
                {field.options?.map((opt) => {
                  const isSelected = formData[field.name] === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => handleChange(field.name, opt)}
                      className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] ${
                        isSelected 
                          ? 'bg-[#8b5cf6] text-white border-[#8b5cf6] shadow-[0_0_15px_rgba(139,92,246,0.3)]' 
                          : 'bg-transparent text-white/60 border-white/20 hover:border-white/50 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {/* Hidden input to store value for native required validation */}
              <input 
                type="hidden" 
                name={field.name} 
                value={formData[field.name] || ''} 
                required={field.required} 
              />
            </div>
          );
        }

        return (
          <div key={field.name} className={`${wrapperClass} relative mt-2`}>
            <label 
              htmlFor={fieldId} 
              className={`absolute left-0 transition-all duration-300 pointer-events-none text-xs font-bold tracking-[0.2em] uppercase ${
                isFloating 
                  ? '-top-6 text-[#8b5cf6]' 
                  : 'top-4 text-white/40'
              }`}
            >
              {field.label} {field.required && '*'}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={fieldId}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                required={field.required}
                rows={4}
                className="w-full py-4 bg-transparent border-b border-white/20 text-white text-sm font-medium focus:outline-none focus:border-[#8b5cf6] transition-all rounded-none resize-none shadow-[0_1px_0_rgba(139,92,246,0)] focus:shadow-[0_1px_0_rgba(139,92,246,1)]"
                disabled={status === 'loading'}
              />
            ) : (
              <input
                id={fieldId}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                required={field.required}
                className="w-full py-4 bg-transparent border-b border-white/20 text-white text-sm font-medium focus:outline-none focus:border-[#8b5cf6] transition-all rounded-none shadow-[0_1px_0_rgba(139,92,246,0)] focus:shadow-[0_1px_0_rgba(139,92,246,1)]"
                disabled={status === 'loading'}
              />
            )}
          </div>
        );
      })}

      {status === 'error' && (
        <p className={`${config.layout === 'grid' ? 'md:col-span-2 ' : ''}text-red-400 text-xs font-medium text-center`} role="alert">
          {message}
        </p>
      )}

      <div className={config.layout === 'grid' ? 'md:col-span-2 pt-4' : 'pt-4'}>
        {config.buttonTheme === 'outline' ? (
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-transparent border-2 border-[#8b5cf6] hover:bg-[#8b5cf6]/10 disabled:opacity-50 disabled:cursor-not-allowed text-[#8b5cf6] font-black tracking-[0.2em] text-xs rounded-full transition-all duration-300 uppercase active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
          >
            {status === 'loading' ? config.submitLoadingText : config.submitText}
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === 'loading'}
            className="group relative w-full py-4 bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black tracking-[0.2em] text-xs rounded-full shadow-lg shadow-[#8b5cf6]/20 hover:shadow-[#8b5cf6]/40 transition-all duration-300 uppercase active:scale-95 cursor-pointer overflow-hidden flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-8">
              {status === 'loading' ? config.submitLoadingText : config.submitText}
            </span>
            <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 translate-y-8 transition-transform duration-300 group-hover:translate-y-0 text-white">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-75" />
            </span>
          </button>
        )}
      </div>
    </form>
  );
}
