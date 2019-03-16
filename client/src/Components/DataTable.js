import React from 'react'

const bothWeekDays = (location) => {
  const firstHalf = location.days.slice(0, location.days.length / 2)
  const secondHalf = location.days.slice(location.days.length / 2)

  const firstHalfDays = {
    monday: firstHalf[0] || {},
    tuesday: firstHalf[1] || {},
    wednesday: firstHalf[2] || {},
    thursday: firstHalf[3] || {},
    friday: firstHalf[4] || {},
    saturday: firstHalf[5] || {},
    sunday: firstHalf[6] || {},
  }

  const secondHalfDays = {
    monday: secondHalf[0] || {},
    tuesday: secondHalf[1] || {},
    wednesday: secondHalf[2] || {},
    thursday: secondHalf[3] || {},
    friday: secondHalf[4] || {},
    saturday: secondHalf[5] || {},
    sunday: secondHalf[6] || {},
  }

  return { firstHalfDays, secondHalfDays }
}

const lastWeekDays = (location) => {
  const { firstHalfDays } = bothWeekDays(location)

  return [
    firstHalfDays.monday,
    firstHalfDays.tuesday,
    firstHalfDays.wednesday,
    firstHalfDays.thursday,
    firstHalfDays.friday,
    firstHalfDays.saturday,
    firstHalfDays.sunday
  ]
}

const thisWeekDays = (location) => {
  const { secondHalfDays } = bothWeekDays(location)

  return [
    secondHalfDays.monday,
    secondHalfDays.tuesday,
    secondHalfDays.wednesday,
    secondHalfDays.thursday,
    secondHalfDays.friday,
    secondHalfDays.saturday,
    secondHalfDays.sunday
  ]
}

const DataTable = ({ locations=[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Week of 3/11/2019</td>
          <td></td>
          <td>Monday</td>
          <td>Tuesday</td>
          <td>Wednesday</td>
          <td>Thursday</td>
          <td>Friday</td>
          <td>Saturday</td>
          <td>Sunday</td>
        </tr>
      </thead>
      <tbody>
        {locations.map((location, index) => (
          <React.Fragment key={index}>
            <tr key={index+'-1'} className='striped--light-gray'>
              <td className='b'>{location.name}</td>
              <td>Net sales</td>
              {thisWeekDays(location).map((day, index) => (
                <td key={index}>{day.netSales}</td>
              ))}
            </tr>
            <tr key={index+'-2'}>
              <td></td>
              <td>vs LW</td>
              {thisWeekDays(location).map((day, index) => {
                const lastNetSales = lastWeekDays(location)[index].netSales
                if (day.netSales && lastNetSales) {
                  const change = day.netSales - lastNetSales
                  const hue = change > 0 ? 'bg-light-green' : 'bg-washed-red'
                  return <td key={index} className={hue}>{change}</td>
                } else {
                  return <td key={index} />
                }
              })}
            </tr>
            <tr key={index+'-3'} className='striped--light-gray'>
              <td className='bg-white'></td>
              <td>Count</td>
              {thisWeekDays(location).map((day, index) => (
                <td key={index}>{day.guestCount || day.checkCount}</td>
              ))}
            </tr>
            <tr key={index+'-4'}>
              <td></td>
              <td>vs LW</td>
              {thisWeekDays(location).map((day, index) => {
                const countKey = 'guestCount' // or checkCount
                const count = day[countKey]
                const lastCount = (lastWeekDays(location)[index] || [])[countKey]
                if (count && lastCount) {
                  const change = count - lastCount
                  const hue = change > 0 ? 'bg-light-green' : 'bg-washed-red'
                  return <td key={index} className={hue}>{change}</td>
                } else {
                  return <td key={index} />
                }
              })}
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
