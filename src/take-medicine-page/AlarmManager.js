import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import DeleteIcon from '@mui/icons-material/Delete';

import './AlarmManager.css';

const AlarmManager = () => {
  const [alarms, setAlarms] = useState([]); //알람 리스트
  const [newAlarm, setNewAlarm] = useState(''); //사용자가 추가할 알람 시간
  const [alertMessage, setAlertMessage] = useState(''); //알림 메시지 (약을 복용할 시간이에요!)
  const [isInputVisible, setIsInputVisible] = useState(false); //알람 추가 버튼 클릭시 input창 뜨도록
  const [swipeIndex, setSwipeIndex] = useState(null);
  const [startX, setStartX] = useState(0);

  //알람 추가
  const handleAddAlarm = () => {
    if (!newAlarm) return;
    setAlarms((prev) => [...prev, { time: newAlarm, isActive: false }]);
    setNewAlarm('');
    setIsInputVisible(false);
  };

  //on/off 스위치 버튼
  const toggleAlarm = (index) => {
    setAlarms((prev) =>
      prev.map((alarm, i) =>
        i === index ? { ...alarm, isActive: !alarm.isActive } : alarm
      )
    );
  };

  const handleDeleteAlarm = (index) => {
    setAlarms((prev) => prev.filter((_, i) => i !== index));
    setSwipeIndex(null);
  };

  const handleTouchStart = (e, index) => {
    setStartX(e.touches[0].clientX);
    setSwipeIndex(index);
  };

  const handleTouchMove = (e, index) => {
    const moveX = e.touches[0].clientX;
    if (startX - moveX > 50) {
      setSwipeIndex(index);
    } else if (moveX - startX > 50) {
      setSwipeIndex(null);
    }
  };

  //실시간 복용 알림 확인창 (수정 예정)
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString('en-US', {
        hour12: false,
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
        {alarms.length > 0 ? (
          alarms.map((alarm, index) => (
            <div
              key={index}
              className={`alarm-item ${swipeIndex === index ? 'swiped' : ''}`}
              onTouchStart={(e) => handleTouchStart(e, index)}
              onTouchMove={(e) => handleTouchMove(e, index)}
              onTouchEnd={() => setSwipeIndex(null)}
            >
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
              {swipeIndex === index && (
                <button
                  className="delete-alarm-btn"
                  onClick={() => handleDeleteAlarm(index)}
                >
                  <DeleteIcon />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="empty-message">복용 알람을 설정해 보세요!</p>
        )}
      </div>

      <div className="add-alarm-section">
        {isInputVisible ? (
          <div className="add-alarm-input-box">
            <input
              type="time"
              value={newAlarm}
              onChange={(e) => setNewAlarm(e.target.value)}
              className="new-alarm-input"
            />
            <button className="save-alarm-btn" onClick={handleAddAlarm}>
              저장
            </button>
            <button
              className="cancel-alarm-btn"
              onClick={() => setIsInputVisible(false)}
            >
              취소
            </button>
          </div>
        ) : (
          <button
            className="add-alarm-btn"
            onClick={() => setIsInputVisible(true)}
          >
            <AddIcon />
          </button>
        )}
      </div>

      {alertMessage && <div className="alert-message">{alertMessage}</div>}
    </div>
  );
};

export default AlarmManager;
