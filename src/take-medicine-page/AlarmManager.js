import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import './AlarmManager.css';

const AlarmManager = () => {
  const [alarms, setAlarms] = useState([]); //알람 리스트
  const [newAlarm, setNewAlarm] = useState(''); //사용자가 추가할 알람 시간
  const [alertMessage, setAlertMessage] = useState(''); //알림 메시지 (약을 복용할 시간이에요!)

  //알람 추가
  const handleAddAlarm = () => {
    if (!newAlarm) return;
    setAlarms((prev) => [...prev, { time: newAlarm, isActive: false }]);
    setNewAlarm('');
  };

  //on/off 버튼
  const toggleAlarm = (index) => {
    setAlarms((prev) =>
      prev.map((alarm, i) =>
        i === index ? { ...alarm, isActive: !alarm.isActive } : alarm
      )
    );
  };

  //실시간 복용 알림 확인창 (수정 예정)
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const activeAlarm = alarms.find(
        (alarm) => alarm.time === currentTime && alarm.isActive
      );

      if (activeAlarm) {
        setAlertMessage('약을 복용할 시간이에요!');
        setTimeout(() => setAlertMessage(''), 5000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms]);

  return (
    <div className="alarm-manager">
      {/* 알람 내역 */}
      <div className="alarm-list">
        {alarms.map((alarm, index) => (
          <div key={index} className="alarm-item">
            <p>
              {alarm.time} <AccessAlarmsIcon className="alarm-icon" />
            </p>
            <div className="switch">
              <input
                type="checkbox"
                id={`switch-${index}`}
                checked={alarm.isActive}
                onChange={() => toggleAlarm(index)}
              />
              <label htmlFor={`switch-${index}`}></label>
            </div>
          </div>
        ))}
      </div>

      {/* 알람 추가 section */}
      <div className="add-alarm-section">
        <input
          type="time"
          value={newAlarm}
          onChange={(e) => setNewAlarm(e.target.value)}
          className="new-alarm-input"
        />
        <div className="add-alarm-text-btn-box">
          <p> 알람 추가</p>
          <button className="add-alarm-btn" onClick={handleAddAlarm}>
            <AddIcon />
          </button>
        </div>
      </div>

      {alertMessage && <div className="alert-message">{alertMessage}</div>}
    </div>
  );
};

export default AlarmManager;
