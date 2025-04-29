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

  // 선택가능한 최대 날짜 (시작일 + 10일)
  const [maxDate, setMaxDate] = useState(null);

  // 월 변경 이벤트 핸들러
  const handleMonthChange = (date) => {
    setDisplayMonth(date);
  };

  // 날짜 선택 처리 함수
  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    if (isAfter(endDate, startDate) || isSameDay(endDate, startDate)) {
      // 10일 제한 체크
      const daysDiff = differenceInDays(endDate, startDate);
      
      if (daysDiff > 9) {
        // 10일 초과시 최대 10일까지만 선택
        setState([
          {
            startDate: startDate,
            endDate: addDays(startDate, 9),
            key: 'selection'
          }
        ]);
      } else {
        // 10일 이내면 그대로 적용
        setState([
          {
            startDate: startDate,
            endDate: endDate,
            key: 'selection'
          }
        ]);
      }
      setMaxDate(null); // 구간 선택 완료 후 제한 해제
    }
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