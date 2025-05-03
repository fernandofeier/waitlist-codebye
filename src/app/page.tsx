'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Função para formatar o número de telefone como (DDD) 99999-9999
  const formatPhoneNumber = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a formatação
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  // Função para lidar com a mudança no campo de WhatsApp
  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove caracteres não numéricos para validação
    const numbersOnly = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (DDD + 9 dígitos)
    if (numbersOnly.length <= 11) {
      setFormData({
        ...formData,
        whatsapp: formatPhoneNumber(numbersOnly)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Preparar os dados para envio (remover formatação do telefone)
      const whatsappClean = formData.whatsapp.replace(/\D/g, '');
      
      const response = await fetch('https://n8n.codebye.com.br/webhook/f41d55b3-e6bd-45b0-bc1c-c0eaa5bbfcc7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: whatsappClean
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Verificar se o link foi retornado na resposta
      if (data && data.link) {
        // Redirecionar para o link retornado
        window.location.href = data.link;
      } else {
        throw new Error('Link não encontrado na resposta');
      }
    } catch (err) {
      console.error('Erro ao enviar dados:', err);
      setError('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="content">
          <div className="logo-container">
            {/* Substitua "URLDASUALOGO" pela URL da sua logo */}
            <img src="https://i.ibb.co/JDbyLH9/Design-sem-nome.png" alt="Logo" className="logo" />
          </div>
          <h1 className="title">
            Entre na lista de espera
          </h1>
          <p className="description">
            Faça parte da Comunidade Codebye e tenha acesso a conteúdos exclusivos sobre no-code, aulas práticas e uma rede de profissionais dedicados ao desenvolvimento sem código.
          </p>
          
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Nome completo"
              required
              className="input"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              required
              className="input"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="tel"
              placeholder="Seu WhatsApp (DDD) 99999-9999"
              required
              className="input"
              value={formData.whatsapp}
              onChange={handleWhatsAppChange}
              maxLength={15} // Tamanho máximo para o formato (99) 99999-9999
              pattern="\([0-9]{2}\)\s[0-9]{5}-?[0-9]{0,4}" // Padrão para validação
            />
            <button
              type="submit"
              className="button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Entrar na lista de espera'}
            </button>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
