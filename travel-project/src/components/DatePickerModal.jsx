import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // 메인 스타일 시트
import 'react-date-range/dist/theme/default.css'; // 테마 CSS 파일
import { ko } from 'date-fns/locale'; // 한국어 로케일
import { addDays, isSameDay, isAfter, isBefore, differenceInDays, format } from 'date-fns';

const DatePickerModal = () => {
  return (
    <div>
    </div>
  );
};

export default DatePickerModal;