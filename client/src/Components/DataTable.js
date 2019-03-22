import React from 'react'
import round from 'lodash/round'
import isNil from 'lodash/isNil'
import classNames from 'classnames'
import moment from 'moment'

// TODO: fix this kludge of receiving 14 days in a row, change so that datatable receives primary week and comparison week
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

const Td = ({ className, numeric=false, children, ...restProps }) => {
  return (
    <td className={classNames(['pa2', numeric && 'tr', className])} {...restProps}>
      {numeric ? children.toLocaleString() : children}
    </td>
  )
}

const salesChangeForDay = (day, location, index) => {
  const lastNetSales = lastWeekDays(location)[index].netSales

  if (day.netSales && lastNetSales) {
    const change = day.netSales - lastNetSales
    return change
  } else {
    return null
  }
}

const countChangeForDay = (day, location, index) => {
  const countKey = 'guestCount' // TODO: or checkCount, based on business logic to-be-defined by maxx
  const count = day[countKey]
  const lastCount = (lastWeekDays(location)[index] || [])[countKey]

  if (!isNil(count) && !isNil(lastCount)) {
    const change = count - lastCount
    return change
  } else {
    return null
  }
}

const hueForChange = change => change > 0 ? 'bg-light-green' : (change < 0 ? 'bg-washed-red' : null)

const TotalCell = ({ change=false, value }) => {
  const hue = change && hueForChange(value)
  return (
    <Td numeric className={`b ${hue}`}>
      {value}
    </Td>
  )
}

const LocationInfoRows = ({ location }) => {
  return (
    <React.Fragment>
      <tr className='striped--light-gray'>
        <Td className='b'>{location.name}</Td>
        <Td className='b'>Net sales</Td>
        {thisWeekDays(location).map((day, index) => (
          <Td key={index} numeric>{round(day.netSales, 2)}</Td>
        ))}
        <TotalCell value={round(thisWeekDays(location).reduce((acc, day) => acc + day.netSales, 0), 2)} />
      </tr>
      <tr>
        <Td></Td>
        <Td>vs LW</Td>
        {thisWeekDays(location).map((day, index) => {
          const change = salesChangeForDay(day, location, index)
          const hue = hueForChange(change)
          return <Td key={index} className={hue} numeric>{round(change, 2)}</Td>
        })}
        <TotalCell change value={thisWeekDays(location).reduce((acc, day, index) => acc + salesChangeForDay(day, location, index), 0)} />
      </tr>
      <tr>
        <Td className='bg-white'></Td>
        <Td className='b'>Count</Td>
        {thisWeekDays(location).map((day, index) => (
          <Td key={index} numeric>{round(day.guestCount || day.checkCount, 2)}</Td>
        ))}
        <TotalCell value={round(thisWeekDays(location).reduce((acc, day) => acc + day.netSales, 0), 2)} />
      </tr>
      <tr>
        <Td></Td>
        <Td>vs LW</Td>
        {thisWeekDays(location).map((day, index) => {
          const change = countChangeForDay(day, location, index)
          const hue = hueForChange(change)
          return !isNil(change) ? <Td key={index} className={hue} numeric>{round(change, 2)}</Td> : <Td key={index} />
        })}
        <TotalCell change value={thisWeekDays(location).reduce((acc, day, index) => acc + countChangeForDay(day, location, index), 0)} />
      </tr>
    </React.Fragment>
  )
}

const DataTable = ({ locations=[], startDate }) => {
  return (
    <table className='w-100'>
      <thead>
        <tr className='tr v-top'>
          <Td />
          <Td />
          <Td>{moment(startDate).format('dddd M/D')}</Td>
          <Td>{moment(startDate).add(1, 'day').format('dddd M/D')}</Td>
          <Td>{moment(startDate).add(2, 'day').format('dddd M/D')}</Td>
          <Td>{moment(startDate).add(3, 'day').format('dddd M/D')}</Td>
          <Td>{moment(startDate).add(4, 'day').format('dddd M/D')}</Td>
          <Td>{moment(startDate).add(5, 'day').format('dddd M/D')}</Td>
          <Td>{moment(startDate).add(6, 'day').format('dddd M/D')}</Td>
          <Td className='b'>Total</Td>
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
