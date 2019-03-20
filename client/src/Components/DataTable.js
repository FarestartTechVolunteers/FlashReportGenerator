import React from 'react'
import round from 'lodash/round'
import classNames from 'classnames'

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

const Td = ({ className, ...restProps }) => {
  return <td className={classNames(['pa2', className])} {...restProps} />
}

const LocationInfoRows = ({ location }) => {
  return (
    <React.Fragment>
      <tr className='striped--light-gray'>
        <Td className='b'>{location.name}</Td>
        <Td className='b'>Net sales</Td>
        {thisWeekDays(location).map((day, index) => (
          <Td key={index} className='pa2'>{round(day.netSales, 2)}</Td>
        ))}
      </tr>
      <tr>
        <Td></Td>
        <Td>vs LW</Td>
        {thisWeekDays(location).map((day, index) => {
          const lastNetSales = lastWeekDays(location)[index].netSales

          if (day.netSales && lastNetSales) {
            const change = day.netSales - lastNetSales
            const hue = change > 0 ? 'bg-light-green' : 'bg-washed-red'
            return <Td key={index} className={hue}>{round(change, 2)}</Td>
          } else {
            return <Td key={index} />
          }
        })}
      </tr>
      <tr>
        <Td className='bg-white'></Td>
        <Td className='b'>Count</Td>
        {thisWeekDays(location).map((day, index) => (
          <Td key={index} className='pa2'>{round(day.guestCount || day.checkCount, 2)}</Td>
        ))}
      </tr>
      <tr>
        <Td></Td>
        <Td>vs LW</Td>
        {thisWeekDays(location).map((day, index) => {
          const countKey = 'guestCount' // or checkCount
          const count = day[countKey]
          const lastCount = (lastWeekDays(location)[index] || [])[countKey]

          if (count && lastCount) {
            const change = count - lastCount
            const hue = change > 0 ? 'bg-light-green' : 'bg-washed-red'
            return <Td key={index} className={hue}>{round(change, 2)}</Td>
          } else {
            return <Td key={index} />
          }
        })}
      </tr>
    </React.Fragment>
  )
}

const DataTable = ({ locations=[] }) => {
  return (
    <table className='w-100'>
      <thead>
        <tr>
          <Td />
          <Td />
          <Td>Monday</Td>
          <Td>Tuesday</Td>
          <Td>Wednesday</Td>
          <Td>Thursday</Td>
          <Td>Friday</Td>
          <Td>Saturday</Td>
          <Td>Sunday</Td>
        </tr>
      </thead>
      <tbody>
        {locations.map((location, index) => (
          <LocationInfoRows key={index} location={location} />
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
