import React from 'react'
import round from 'lodash/round'
import isNil from 'lodash/isNil'
import classNames from 'classnames'
import moment from 'moment'
import { LocationCountMapping } from '../Constants/LocationCountMapping.js'
import { LocationDisplay } from '../Constants/LocationDisplayTypeMapping.js'

const NETSALES_VS_LAST_WEEK = "netsalesVsLastWeek";
const COUNT = "count";
const COUNT_VS_LAST_WEEK = "countVsLastWeek";
const BUDGET = "budget";
const NETSALES_VS_BUDGET = "netssalesVsBudget";

const bothWeekDays = (location) => {
  // We receieve 42 days of data in a row, we're interested in the last 14 days of the set, 
  // splitting into first and second week's data
  const firstHalf = location.days.slice(-14, -7);
  const secondHalf = location.days.slice(-7);

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

  if (day.netSales && lastNetSales && lastNetSales !== 0) {
    const change = Math.round((day.netSales - lastNetSales) / lastNetSales * 100.0);
    return change
  } else {
    return null
  }
}

const salesChangeForWeek = (location) => {
  let thisWeekSalesTotal = thisWeekDays(location).reduce((acc, day) => acc + day.netSales, 0);
  let lastWeekSalesTotal = lastWeekDays(location).reduce((acc, day) => acc + day.netSales, 0);

  if (lastWeekSalesTotal === 0) {
    return null;
  }
  return round((((thisWeekSalesTotal - lastWeekSalesTotal) / lastWeekSalesTotal) * 100), 0);
}

const countChangeForDay = (day, location, index) => {
  
  let countKey = LocationCountMapping[location.name] || "guestCount";

  const count = day[countKey]
  const lastCount = (lastWeekDays(location)[index] || [])[countKey]

  if (!isNil(count) && !isNil(lastCount) && lastCount !== 0) {
    const change = Math.round((count - lastCount) / lastCount * 100.0);
    return change
  } else {
    return null
  }
}

const countChangeForWeek = (location) => {
  let countKey = LocationCountMapping[location.name] || "guestCount";

  let thisWeekCountTotal = thisWeekDays(location).reduce((acc, day) => acc + day[countKey], 0);
  let lastWeekCountTotal = lastWeekDays(location).reduce((acc, day) => acc + day[countKey], 0);

  if (lastWeekCountTotal === 0) {
    return null;
  }

  return round((((thisWeekCountTotal - lastWeekCountTotal) / lastWeekCountTotal) * 100), 0);
}

const salesVsBudgetForDay = (day, location, index) => {
  let daySales = day.netSales;
  let dayBudget = day.budget;

  if (dayBudget === 0) {
    return null
  }
  return round((((daySales - dayBudget) / dayBudget) * 100), 0);
}

const salesVsBudgetForWeek = (location) => {
  let thisWeekSalesTotal = thisWeekDays(location).reduce((acc, day) => acc + day.netSales, 0);
  let thisWeekBudgetTotal = thisWeekDays(location).reduce((acc, day) => acc + day.budget, 0);

  if (thisWeekBudgetTotal === 0) {
    return null;
  }

  return round((((thisWeekSalesTotal - thisWeekBudgetTotal) / thisWeekBudgetTotal) * 100), 0);
}

const hueForChange = change => change > 0 ? 'bg-light-green' : (change < 0 ? 'bg-washed-red' : null)

const TotalCell = ({ change=false, value, }) => {
  const hue = change && hueForChange(value)
  return (
    <Td numeric className={`b ${hue}`}>
      {value}
    </Td>
  )
}

const TotalCellPercentage =  ({ change=false, value, }) => {
  const hue = change && hueForChange(value)
  return (
    <Td className={`b tr ${hue}`}>
      {value}{value ? "%" : ""}
    </Td>
  )
}

const countForLocation = (location, day) => {
  // TODO: this should toggle on business logic that maxx will specify
  let countKey = LocationCountMapping[location.name] || "guestCount";
  return day[countKey];
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

      <tr className={LocationDisplay[location.name][NETSALES_VS_LAST_WEEK] ? '' : 'dn'}>
        <Td></Td>
        <Td>vs LW</Td>
        {thisWeekDays(location).map((day, index) => {
          const change = salesChangeForDay(day, location, index)
          const hue = hueForChange(change)
          return <Td key={index} className={`tr ${hue}`}>{change} {change ? "%": ""}</Td>
        })}
        <TotalCellPercentage change value={ salesChangeForWeek(location) } />
      </tr>
      <tr className={LocationDisplay[location.name][COUNT] ? '' : 'dn'}>
        <Td className='bg-white'></Td>
        <Td className='b'>Count</Td>
        {thisWeekDays(location).map((day, index) => (
          <Td key={index} numeric>{round(countForLocation(location, day), 2)}</Td>
        ))}
        <TotalCell value={round(thisWeekDays(location).reduce((acc, day) => acc + countForLocation(location, day), 0), 2)} />
      </tr>

      <tr className={LocationDisplay[location.name][COUNT_VS_LAST_WEEK] ? '' : 'dn'}>
        <Td></Td>
        <Td>vs LW</Td>
        {thisWeekDays(location).map((day, index) => {
          const change = countChangeForDay(day, location, index)
          const hue = hueForChange(change)
          return !isNil(change) ? <Td key={index} className={`tr ${hue}`}>{change} {change ? "%": ""}</Td> : <Td key={index} />
        })}
        <TotalCellPercentage change value={countChangeForWeek(location)} />
      </tr>
      <tr className={LocationDisplay[location.name][BUDGET] ? '' : 'dn'}>
        <Td></Td>
        <Td >Budget</Td>
        {thisWeekDays(location).map((day, index) => (
          <Td key={index} numeric>{round(day.budget, 2)}</Td>
        ))}
        <TotalCell value={round(thisWeekDays(location).reduce((acc, day) => acc + day.budget, 0), 2)} />
      </tr>
      <tr className={LocationDisplay[location.name][NETSALES_VS_BUDGET] ? '' : 'dn'}>
        <Td></Td>
        <Td>Sales vs Budget</Td>
        {thisWeekDays(location).map((day, index) => {
          const change = salesVsBudgetForDay(day, location, index)
          const hue = hueForChange(change)
          return !isNil(change) ? <Td key={index} className={`tr ${hue}`}>{change} {change ? "%": ""}</Td> : <Td key={index} />
        })}
        <TotalCellPercentage change value={salesVsBudgetForWeek(location)} />
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
