import FormAgendamento from './components/FormAgendamento';
import { Analytics } from "@vercel/analytics/next";

function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/imgFund.png")' }}
    >
      <FormAgendamento />
    </div>
  );
}

export default App;
