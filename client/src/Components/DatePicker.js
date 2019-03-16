import React, { Component } from "react";
import moment from "moment";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

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

class DatePicker extends Component {
  handleDayChange = date => {
    const { handleSetWeek } = this.props;
    handleSetWeek(getWeekDays(getWeekRange(date).from));
  };

  render() {
    const { activeWeek } = this.props;

    const daysAreSelected = activeWeek.length > 0;

    const modifiers = {
      // hoverRange,
      selectedRange: daysAreSelected && {
        from: activeWeek[0],
        to: activeWeek[6]
      },
      // hoverRangeStart: hoverRange && hoverRange.from,
      // hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && activeWeek[0],
      selectedRangeEnd: daysAreSelected && activeWeek[6]
    };

    return (
      <div className="SelectedWeekExample">
        <DayPicker
          selectedDays={activeWeek}
          showWeekNumbers
          showOutsideDays
          modifiers={modifiers}
          onDayClick={this.handleDayChange}
        />
      </div>
    );
  }
}

export default DatePicker;
