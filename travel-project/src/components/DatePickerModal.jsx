import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // 메인 스타일 시트
import 'react-date-range/dist/theme/default.css'; // 테마 CSS 파일
import { ko } from 'date-fns/locale'; // 한국어 로케일
import { addDays, isSameDay, isAfter, isBefore, differenceInDays, format } from 'date-fns';

const DatePickerModal = () => {
  const today = new Date();

  // 캘린더에 표시할 월 (현재 월)
  const [displayMonth, setDisplayMonth] = useState(today);

  // 날짜 상태 관리
  const [state, setState] = useState([
    {
      startDate: today,
      endDate: today,
      key: 'selection'
    }
  ]);

  // 월 변경 이벤트 핸들러
  const handleMonthChange = (date) => {
    setDisplayMonth(date);
  };

  // 날짜 선택 처리 함수
  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setState([
      {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
      }
    ]);

    return;
  };

  return (
    <div>
      <DateRange
        editableDateInputs={false}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={state}
        months={2}
        direction="horizontal"
        locale={ko}
        weekdayDisplayFormat="EEEEE"
        showMonthAndYearPickers={false}
        showDateDisplay={false}
        className="date-range-calendar"
        shownDate={displayMonth}
        onShownDateChange={handleMonthChange}
        preventSnapRefocus={true}
      />
    </div>
  );
};

export default DatePickerModal;
