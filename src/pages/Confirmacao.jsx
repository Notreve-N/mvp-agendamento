import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

function Confirmacao() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const agendamento = JSON.parse(localStorage.getItem('agendamento'));

    if (agendamento) {
      setDados(agendamento);

      const formattedDate = new Date(agendamento.dataConsulta).toLocaleString();

      emailjs.send(
        'service_gxf2dv9',
        'template_4sykyga',
        {
          nome: agendamento.nome,
          email: agendamento.email,
          telefone: agendamento.telefone,
          dataConsulta: formattedDate,
        },
        'fhLfyNk0O2ul1nVbS'
      )
      .then(() => console.log('E-mail enviado com sucesso'))
      .catch((error) => {
        console.error('Erro ao enviar e-mail:', error);
        alert('Erro ao enviar o e-mail de confirmação.');
      });
    } else {
      alert('Nenhuma consulta encontrada. Faça o agendamento novamente.');
      window.location.href = '/';
    }
  }, []);

  if (!dados) return null;

  const formattedDate = new Date(dados.dataConsulta).toLocaleString();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center text-gray-800">
        
        {/* Cabeçalho */}
        <h1 className="text-2xl font-bold mb-4">Consulta Confirmada!✅
        </h1>
        {/* Mensagem */}
        <p className="text-gray-600 mb-6">
          Um e-mail de confirmação foi enviado com os detalhes do agendamento.
        </p>

        {/* Detalhes */}
        <div className="space-y-3 text-base">
          <p><span className="font-semibold">👤 Nome:</span> {dados.nome}</p>
          <p><span className="font-semibold">📧 E-mail:</span> {dados.email}</p>
          <p><span className="font-semibold">📞 Telefone:</span> {dados.telefone}</p>
          <p><span className="font-semibold">📅 Data da Consulta:</span> {formattedDate}</p>
        </div>

        {/* Rodapé */}
        <div className="mt-6 text-sm text-gray-500 italic">
          Obrigado por agendar com a <span className="font-semibold text-green-700">CliniDental</span> 💙
        </div>
      </div>
    </div>
  );
}

export default Confirmacao;
