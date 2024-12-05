import { Routes, Route } from 'react-router-dom';
import TakeMedicine from './take-medicine-page/TakeMedicine';
import AddMedicationForm from './take-medicine-page/AddMedicationForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TakeMedicine />} />
      <Route path="/add-medication" element={<AddMedicationForm />} />
    </Routes>
  );
}

export default App;
