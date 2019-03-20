import moment from "moment";
import axios from 'axios'

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

async function fetchDataForDays(days) {
  const res = await axios.get('/api/getData', {
    startDate: '2019-03-07',
    range: 14
  })
  return transform(res.data);
}

export default fetchDataForDays;
