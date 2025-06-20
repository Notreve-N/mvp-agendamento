import { useState } from 'react';

function FormAgendamento() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataConsulta: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const validarTelefone = (telefone) => {
    const soNumeros = telefone.replace(/\D/g, '');
    return soNumeros.length >= 10 && soNumeros.length <= 11;
  };

  const getDataAtual = () => {
    const agora = new Date();
    return agora.toISOString().slice(0, 16);
  };

  const validarDataHora = (dataHoraString) => {
    const dataHora = new Date(dataHoraString);
    const agora = new Date();

    // Impede datas passadas
    if (dataHora < agora) return false;

    const diaSemana = dataHora.getDay(); // 0 = domingo, 6 = sábado
    const hora = dataHora.getHours();
    const minutos = dataHora.getMinutes();

    // Domingo: fechado
    if (diaSemana === 0) return false;

    // Sábado: 09:00 às 15:00
    if (diaSemana === 6) {
      if (hora < 9 || hora > 15 || (hora === 15 && minutos > 0)) {
        return false;
      }
    }

    // Segunda a Sexta: 09:00 às 17:30
    if (diaSemana >= 1 && diaSemana <= 5) {
      if (hora < 9 || hora > 17 || (hora === 17 && minutos > 30)) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nome, email, telefone, dataConsulta } = formData;

    if (!nome || !email || !telefone || !dataConsulta) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (!validarEmail(email)) {
      alert('E-mail inválido.');
      return;
    }

    if (!validarTelefone(telefone)) {
      alert('Telefone inválido.');
      return;
    }

    if (!validarDataHora(dataConsulta)) {
      alert('Data ou horário inválido. Funcionamos de segunda a sexta das 09h às 17h30 e aos sábados das 09h às 15h. Não atendemos aos domingos.');
      return;
    }

    localStorage.setItem('agendamento', JSON.stringify(formData));
    window.location.href = '/pagamento';
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[45%] max-w-sm bg-white p-4 rounded-lg shadow-md space-y-3"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Agende sua consulta</h2>
      <p className="text-sm text-gray-600 mt-1">
        * Funcionamos de <strong>segunda a sexta das 09h às 17h30</strong> e <strong>sábados das 09h às 15h</strong>. Não atendemos aos domingos.
      </p>
      {/* Nome */}
      <div>
        <label className="block mb-1 font-medium">Nome</label>
        <input
          name="nome"
          type="text"
          placeholder="Digite seu nome completo"
          value={formData.nome}
          onChange={handleChange}
          className="w-full px-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 font-medium">E-mail</label>
        <input
          name="email"
          type="email"
          placeholder="exemplo@email.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full h-12 px-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Telefone */}
      <div>
        <label className="block mb-1 font-medium">Telefone</label>
        <input
          name="telefone"
          type="tel"
          placeholder="11999998888"
          value={formData.telefone}
          onChange={handleChange}
          className="w-full h-12 px-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Data e Hora */}
      <div>
        <label className="block mb-1 font-medium">Data e Hora da Consulta</label>
        <input
          name="dataConsulta"
          type="datetime-local"
          min={getDataAtual()}
          value={formData.dataConsulta}
          onChange={handleChange}
          className="w-full h-12 px-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="w-full h-10 mt-6 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-md transition duration-200"
      >
        Agendar e Pagar
      </button>
    </form>
  );
}

export default FormAgendamento;
