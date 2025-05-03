import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { ko } from "date-fns/locale";
import { addDays, isSameDay, isAfter, isBefore } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./DatePickerModal.css";

const DatePickerModal = ({ onConfirm, onClose }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [displayMonth, setDisplayMonth] = useState(today);
  const [state, setState] = useState([{
    startDate: today,
    endDate: today,
    key: "selection",
  }]);
  const [selectionStep, setSelectionStep] = useState(0);
  const [maxDate, setMaxDate] = useState(null);

  const handleMonthChange = (date) => setDisplayMonth(date);

  const handleSelect = (ranges) => {
    if (!ranges?.selection) return;
    const { startDate, endDate } = ranges.selection;

    if (selectionStep === 0) {
      setState([{ startDate, endDate: startDate, key: "selection" }]);
      setMaxDate(addDays(startDate, 9));
      setSelectionStep(1);
      return;
    }

    if (
      selectionStep === 1 &&
      isSameDay(startDate, state[0].startDate) &&
      isSameDay(startDate, endDate)
    ) {
      setSelectionStep(0);
      setMaxDate(null);
      return;
    }

    if (selectionStep === 1 && isAfter(endDate, state[0].startDate)) {
      setState([{ startDate: state[0].startDate, endDate, key: "selection" }]);
      setSelectionStep(2);
      setMaxDate(null);
      return;
    }

    if (selectionStep === 2) {
      setState([{ startDate, endDate: startDate, key: "selection" }]);
      setMaxDate(addDays(startDate, 9));
      setSelectionStep(1);
      return;
    }
  };

  const isDateDisabled = (date) => {
    if (isBefore(date, today) && !isSameDay(date, today)) return true;
    if (
      selectionStep === 1 &&
      state[0].startDate &&
      (isBefore(date, state[0].startDate) || (maxDate && isAfter(date, maxDate)))
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="date-picker-container">
      <button className="close-button" onClick={onClose}>×</button>

      <h2 className="date-picker-title">여행 기간이 어떻게 되시나요?</h2>
      <p className="date-picker-subtitle">
        여행 일자는 최대 10일까지 선택 가능합니다
      </p>

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
        disabledDay={isDateDisabled}
        shownDate={displayMonth}
        onShownDateChange={handleMonthChange}
        selectionType={selectionStep === 2 ? "single" : "range"}
        preventSnapRefocus={true}
        rangeColors={["#4F9DDE"]}
      />

      <div className="date-picker-footer">
        <button
          className="select-button"
          onClick={() => {
            if (state[0].startDate && state[0].endDate && selectionStep === 2) {
              const start = state[0].startDate;
              const end = state[0].endDate;
              const formatted =
                `${start.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })} ~ ` +
                `${end.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })}`;
              const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
              onConfirm({ period: formatted, range: days });
            } else {
              alert("날짜를 선택해주세요.");
            }
          }}
        >
          선택
        </button>
      </div>
    </div>
  );
};

export default DatePickerModal;