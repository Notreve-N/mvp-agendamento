import { useEffect } from 'react';

function Pagamento() {
  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('agendamento'));

    if (!dados) {
      alert('Nenhum agendamento encontrado. Preencha o formulário primeiro.');
      window.location.href = '/';
      return;
    }

    // Simulação: Redirecionar para Bolt com delay
    setTimeout(() => {
      window.location.href = 'https://incredible-swan-62a1bc.netlify.app';
    }, 2000); // espera 2 segundos para simular processamento
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h2 className="text-2xl font-bold mb-4">Redirecionando para o pagamento...</h2>
      <p>Aguarde enquanto preparamos seu checkout.</p>
    </div>
  );
}

export default Pagamento;
