'use client';

import { useState } from 'react';

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    email: '',
    whatsapp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aqui você pode adicionar a lógica para enviar os dados para seu backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulação de envio
      setSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-4">
        <p className="text-[#9FE870] font-medium">
          Ótimo! Você está na lista de espera.
        </p>
        <p className="text-[#A1A1A1] text-sm mt-2">
          Entraremos em contato em breve com mais informações.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          className="w-full h-12 px-4 bg-black text-white placeholder-[#A1A1A1] border border-[#333333] rounded-md focus:outline-none focus:border-[#9FE870]"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>
      
      <div>
        <input
          type="tel"
          placeholder="Seu WhatsApp"
          className="w-full h-12 px-4 bg-black text-white placeholder-[#A1A1A1] border border-[#333333] rounded-md focus:outline-none focus:border-[#9FE870]"
          value={formData.whatsapp}
          onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 border-[#333333] bg-black text-[#9FE870] rounded"
          required
        />
        <label htmlFor="terms" className="text-sm text-[#A1A1A1]">
          Concordo em receber atualizações sobre a Comunidade Codebye
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-[#9FE870] text-black font-medium rounded-md hover:bg-[#8FD860] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Enviando...' : 'Entrar na lista de espera'}
      </button>
    </form>
  );
} 