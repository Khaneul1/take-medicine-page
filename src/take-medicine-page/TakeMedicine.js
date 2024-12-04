import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MedicationList from './MedicationList';
import './TakeMedicine.css';
import AlarmManager from './AlarmManager';
import AddMedicationForm from './AddMedicationForm';
import AddIcon from '@mui/icons-material/Add';

//1. 날짜 설정
//2. 아침/점심/저녁 버튼 + state 값으로 각 시간대별 복용 약 렌더링
//3. 약 api 끌고 와서 복용해야 할 약 img 및 이름 렌더링
//>> '자세히' 버튼 클릭시 복용해야 할 약 관련한 세부 정보 뜨도록
//4. 약 알람 기능 >> 사용자가 시간 설정할 수 있도록 밑에 '알람 추가' 기능 추가
//>> 버튼 통해 알람 on/off 할 수 있도록
//5. 복용 체크 on/off 버튼 추가

const TakeMedicine = () => {
  const today = new Date();
  const formattedDate = `${today.getMonth() + 1}. ${today.getDate()}`;

  //우선 약 정보 초기값 설정
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: '약A',
      time: '아침',
      img: 'img-url-a',
      details: '세부 정보 A',
    },
    {
      id: 2,
      name: '약B',
      time: '점심',
      img: 'img-url-b',
      details: '세부 정보 B',
    },
    {
      id: 3,
      name: '약C',
      time: '저녁',
      img: 'img-url-c',
      details: '세부 정보 C',
    },
    {
      id: 4,
      name: '약D',
      time: '아침',
      img: 'img-url-d',
      details: '세부 정보 D',
    },
  ]);

  const [selectedTime, setSelectedTime] = useState('아침');
  const [showAddForm, setShowAddForm] = useState(false);
  const filteredMedications = medications.filter(
    (medication) => medication.time === selectedTime
  );

  const AddMedication = (newMedication) => {
    setMedications((prev) => [
      ...prev,
      { id: prev.length + 1, ...newMedication },
    ]);
    setShowAddForm(false);
  };

  return (
    <div className="take-medicine-page">
      <div className="today-take-medicine-list">
        <h2 className="today-date">
          {formattedDate} 오늘{' '}
          <KeyboardArrowDownIcon className="today-date-underArrow" />
        </h2>
        {['아침', '점심', '저녁'].map((time) => (
          <button
            key={time}
            className={`selectedTime-btn ${
              selectedTime === time ? 'active' : ''
            }`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </button>
        ))}
      </div>
      <div>
        <MedicationList medications={filteredMedications} />
      </div>
      <div className="add-medication-form">
        {!showAddForm && (
          <button
            className="add-medication-btn"
            onClick={() => setShowAddForm(true)}
          >
            <AddIcon />
          </button>
        )}
        {showAddForm && <AddMedicationForm onAddMedication={AddMedication} />}
      </div>
      <div>
        <AlarmManager />
      </div>
    </div>
  );
};

export default TakeMedicine;
