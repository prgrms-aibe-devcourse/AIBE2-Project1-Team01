import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // 메인 스타일 시트
import 'react-date-range/dist/theme/default.css'; // 테마 CSS 파일
import { ko } from 'date-fns/locale'; // 한국어 로케일
import { addDays, isSameDay, isAfter, isBefore, differenceInDays, format } from 'date-fns';

const DatePickerModal = () => {
  return (
    <div>
      <DateRange
        editableDateInputs={false}
        moveRangeOnFirstSelection={false}
        ranges={[
          {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
            color: '#000000'
          }
        ]}
        months={2}
        direction="horizontal"
        locale={ko}
        weekdayDisplayFormat="EEEEE"
        showMonthAndYearPickers={false}
        showDateDisplay={false}
        className="date-range-calendar"
        preventSnapRefocus={true}
      />
    </div>
  );
};

export default DatePickerModal;