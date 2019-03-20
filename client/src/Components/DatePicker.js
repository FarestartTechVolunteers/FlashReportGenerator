import React from "react";
import moment from "moment";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import isEmpty from 'lodash/isEmpty'

function getWeekDays(weekStart) {
  const days = [weekStart];
  for (let i = 1; i < 7; i += 1) {
    days.push(
      moment(weekStart)
        .add(i, "days")
        .toDate()
    );
  }
  return days;
}

function getWeekRange(date) {
  return {
    from: moment(date)
      .startOf("week")
      .add(1, "days")
      .toDate(),
    to: moment(date)
      .endOf("week")
      .add(1, "days")
      .toDate()
  };
}

const DatePicker = ({ activeWeek, onSetWeek }) => {
  const [isPickerVisible, setPickerVisibility] = React.useState(false)

  const handleDayChange = date => {
    onSetWeek(getWeekDays(getWeekRange(date).from));
    setPickerVisibility(false)
  };

  const daysAreSelected = activeWeek.length > 0;

  const modifiers = {
    selectedRange: daysAreSelected && {
      from: activeWeek[0],
      to: activeWeek[6]
    },
    selectedRangeStart: daysAreSelected && activeWeek[0],
    selectedRangeEnd: daysAreSelected && activeWeek[6]
  };

  return (
    <div className='bg-light-gray pa2'>
      <div>
        {!isEmpty(activeWeek) ? (
          <React.Fragment>
            <span className='mr3'>{moment(activeWeek[0]).format("LL")} – {moment(activeWeek[6]).format("LL")}</span>
            <button type='button' onClick={() => setPickerVisibility(!isPickerVisible)}>
              {isPickerVisible ? 'Cancel' : 'Change'}
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button type='button' onClick={() => setPickerVisibility(true)}>
              Select a date range
            </button>
          </React.Fragment>
        )}
      </div>

      {isPickerVisible && (
        <div className='pa3'>
          <DayPicker
            selectedDays={activeWeek}
            showOutsideDays
            modifiers={modifiers}
            onDayClick={handleDayChange}
          />
        </div>
      )}
    </div>
  )
}

export default DatePicker;
