import React, { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';

const AddMedicationForm = ({ onAddMedication }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('아침');
  const [details, setDetails] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && (showDetails ? details : true)) {
      onAddMedication({ name, time, details });
      setName('');
      setTime('아침');
      setDetails('');
      setShowDetails(false);
    } else {
      alert('모든 값을 입력해 주세요!');
    }
  };

  return (
    <form className="add-medication-form" onSubmit={handleSubmit}>
      <h3>약 추가</h3>
      <input
        type="text"
        placeholder="약 이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={time} onChange={(e) => setTime(e.target.value)}>
        <option value="아침">아침</option>
        <option value="점심">점심</option>
        <option value="저녁">저녁</option>
      </select>
      <textarea
        placeholder="약 세부 정보"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        required
      />
      <button type="submit" className="submit-btn">
        <DoneIcon />
      </button>
    </form>
  );
};

export default AddMedicationForm;
