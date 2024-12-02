import React from 'react';
import './MedicationList.css';

const MedicationList = ({ medications }) => {
  return (
    <div>
      {medications.length > 0 ? (
        medications.map((med) => (
          <div key={med.id} className="medicine-list">
            <img src={med.img} alt={med.name} />
            <p>{med.name}</p>
            <button
              onClick={() => alert(med.details)}
              className="medicine-details-btn"
            >
              자세히
            </button>
          </div>
        ))
      ) : (
        <p>해당 시간에 복용할 약이 없습니다.</p>
      )}
    </div>
  );
};

export default MedicationList;
