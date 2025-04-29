import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { ko } from 'date-fns/locale'; // 한국어 로케일
import { addDays, isSameDay, isAfter, isBefore } from 'date-fns';
import 'react-date-range/dist/styles.css'; // 메인 스타일 시트
import 'react-date-range/dist/theme/default.css'; // 테마 CSS 파일
import './DatePickerModal.css';

const DatePickerModal = () => {
  // 오늘 날짜 (시간 00:00으로 초기화)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 캘린더에 표시할 월 (현재 월)
  const [displayMonth, setDisplayMonth] = useState(today);

  // 날짜 상태 관리 - 초기에는 오늘 선택
  const [state, setState] = useState([
    {
      startDate: today,
      endDate: today,
      key: 'selection'
    }
  ]);

  // 날짜 선택 상태 (처음 클릭, 두번째 클릭 구분)
  const [selectionStep, setSelectionStep] = useState(0); // 0: 미선택, 1: 시작일 선택, 2: 종료일 선택

  // 선택 가능한 최대 날짜 (시작일 + 10일)
  const [maxDate, setMaxDate] = useState(null);

  // 월 변경 이벤트 핸들러
  const handleMonthChange = (date) => {
    setDisplayMonth(date);
  };

  // 날짜 선택 처리 함수
  const handleSelect = (ranges) => {
    // ranges가 undefined이거나 selection이 없으면 무시
    if (!ranges || !ranges.selection) return;

    const { startDate, endDate } = ranges.selection;

    // 케이스 1: 아무것도 선택되지 않은 상태에서 첫 클릭 (시작일 선택)
    if (selectionStep === 0) {
      setState([
        {
          startDate,
          endDate: startDate,
          key: 'selection'
        }
      ]);
      setMaxDate(addDays(startDate, 9));
      setSelectionStep(1);
      return;
    }

    // 케이스 2: 시작일 선택 후 같은 날짜 다시 클릭 (선택 취소)
    if (selectionStep === 1 && state[0].startDate && isSameDay(startDate, state[0].startDate) && isSameDay(startDate, endDate)) {
      setSelectionStep(0);
      setMaxDate(null);
      return;
    }

    // 케이스 3: 시작일 선택 후 다른 날짜 클릭 (범위 선택)
    if (selectionStep === 1 && state[0].startDate) {
      if (isAfter(endDate, state[0].startDate) || isSameDay(endDate, state[0].startDate)) {    
        setState([
          {
            startDate: state[0].startDate,
            endDate,
            key: 'selection'
          }
        ]);
        setSelectionStep(2);
        setMaxDate(null);
      }
      return;
    }

    // 케이스 4: 이미 범위가 선택된 상태에서 클릭
    if (selectionStep === 2) {
      setState([
        {
          startDate,
          endDate: startDate,
          key: 'selection'
        }
      ]);
      setMaxDate(addDays(startDate, 9));
      setSelectionStep(1);
      return;
    }
  };

  // 날짜 비활성화 함수
  const isDateDisabled = (date) => {
    // 오늘 이전 날짜는 항상 비활성화
    if (isBefore(date, today) && !isSameDay(date, today)) {
      return true;
    }

    // 시작일이 선택된 경우 10일 제한 적용
    if (selectionStep === 1 && state[0].startDate) {
      if (isBefore(date, state[0].startDate) && !isSameDay(date, state[0].startDate)) {
        return true;
      }
      if (maxDate && isAfter(date, maxDate)) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className="date-picker-container">
      <button className="close-button" >×</button>

      <h2 className="date-picker-title">여행 기간이 어떻게 되시나요?</h2>
      <p className="date-picker-subtitle">여행 일자는 최대 10일까지 선택 가능합니다</p>

      <DateRange
        editableDateInputs={false}            // 날짜 입력을 직접 수정하지 못하게 설정
        onChange={handleSelect}               // 날짜가 변경될 때 호출
        moveRangeOnFirstSelection={false}     // 첫 번째 선택 시 범위 이동을 비활성화
        ranges={state}                        // 선택된 날짜 범위 
        months={2}                            // 2달치 캘린더 표시
        direction="horizontal"
        locale={ko}
        weekdayDisplayFormat="EEEEE"
        showMonthAndYearPickers={false}       // 월과 연도 선택기 비활성화
        showDateDisplay={false}               // 날짜 표시 비활성화
        className="date-range-calendar"
        disabledDay={isDateDisabled}          // 특정 날짜를 비활성화할 조건 함수
        shownDate={displayMonth}              // 현재 표시할 월
        onShownDateChange={handleMonthChange} // 사용자가 달을 이동할 때 호출되는 이벤트 핸들러
        selectionType={selectionStep === 2 ? 'single' : 'range'}  // 선택 모드 설정 
        preventSnapRefocus={true}             // 날짜 선택 후 자동으로 포커스 이동 방지
        rangeColors={['#4F9DDE']}             // 선택된 날짜 범위 색상
      />

      <div className="date-picker-footer">
        <button className="select-button">선택</button>
      </div>
    </div>
  );
};

export default DatePickerModal;
