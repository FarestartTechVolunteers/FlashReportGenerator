import React from 'react'
import round from 'lodash/round'

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
          <td className='pv2 ph3'>{/*Week of 3/11/2019*/}</td>
          <td></td>
          <td className='pa2'>Monday</td>
          <td className='pa2'>Tuesday</td>
          <td className='pa2'>Wednesday</td>
          <td className='pa2'>Thursday</td>
          <td className='pa2'>Friday</td>
          <td className='pa2'>Saturday</td>
          <td className='pa2'>Sunday</td>
        </tr>
      </thead>
      <tbody>
        {locations.map((location, index) => (
          <React.Fragment key={index}>
            <tr key={index+'-1'} className='striped--light-gray'>
              <td className='b pa2'>{location.name}</td>
              <td className='pa2 b'>Net sales</td>
              {thisWeekDays(location).map((day, index) => (
                <td key={index} className='pa2'>{round(day.netSales, 2)}</td>
              ))}
            </tr>
            <tr key={index+'-2'}>
              <td></td>
              <td className='pa2'>vs LW</td>
              {thisWeekDays(location).map((day, index) => {
                const lastNetSales = lastWeekDays(location)[index].netSales

                if (day.netSales && lastNetSales) {
                  const change = day.netSales - lastNetSales
                  const hue = change > 0 ? 'bg-light-green' : 'bg-washed-red'
                  return <td key={index} className={`${hue} pa2`}>{round(change, 2)}</td>
                } else {
                  return <td key={index} />
                }
              })}
            </tr>
            <tr key={index+'-3'} className='striped--light-gray'>
              <td className='bg-white pa2'></td>
              <td className='pa2 b'>Count</td>
              {thisWeekDays(location).map((day, index) => (
                <td key={index} className='pa2'>{round(day.guestCount || day.checkCount, 2)}</td>
              ))}
            </tr>
            <tr key={index+'-4'}>
              <td></td>
              <td className='pa2'>vs LW</td>
              {thisWeekDays(location).map((day, index) => {
                const countKey = 'guestCount' // or checkCount
                const count = day[countKey]
                const lastCount = (lastWeekDays(location)[index] || [])[countKey]

                if (count && lastCount) {
                  const change = count - lastCount
                  const hue = change > 0 ? 'bg-light-green' : 'bg-washed-red'
                  return <td key={index} className={`${hue} pa2`}>{round(change, 2)}</td>
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
