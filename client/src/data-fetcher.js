import moment from "moment";
import axios from 'axios'

const api = axios.create({
  baseURL: ''
})

const transform = response => {
  let locations = {}
  response.data.forEach((day) => {
    day.locations.forEach((loc) => {
      const { name } = loc
      locations[name] = {
        name: name,
        days: ((locations[name] || {}).days || []).concat({
          ...loc,
          date: moment(day.date).toDate()
        })
      }
    }, {})
  }, [])

  return {
    locations: Object.keys(locations).reduce((acc, k) => [...acc, locations[k]], []),
    data: response.data.map(item => {
      return {
        ...item,
        date: moment(item.date).toDate()
      };
    })
  };
};

async function fetchData(firstDay) {
  // TODO: clean this up
  const startDate = moment(firstDay).format('MM-DD-YYYY')
  const previousMonday = moment(firstDay).subtract(7, 'days').format('MM-DD-YYYY')

  const res1 = await api.get('/api/getData', { params: { startDate: previousMonday, range: 7 } })
  const res2 = await api.get('/api/getData', { params: { startDate, range: 7 } })

  const transformed1 = transform(res1.data)
  const transformed2 = transform(res2.data)

  return {
    locations: transformed1.locations.map((loc, index) => ({
      name: loc.name,
      days: loc.days.concat(transformed2.locations[index].days)
    })),
    data: transformed1.data.concat(transformed2.data)
  }
}

export default fetchData
