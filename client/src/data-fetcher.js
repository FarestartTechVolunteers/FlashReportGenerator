import moment from "moment";

const stubResponse = {
  // weeks start on monday
  data: [
    {
      date: "3/14/2019",
      locations: [
        {
          // each location toggles between guest and check count
          name: "Maslows",
          netSales: 8419,
          budget: null,
          guestCount: 178,
          checkCount: 0
        },
        {
          name: "2100 Cafe",
          netSales: 439,
          budget: null,
          guestCount: 0,
          checkCount: 86
        },
        {
          name: "Catering",
          netSales: 3576,
          budget: 10660,
          guestCount: 0,
          checkCount: 0
        } // + 7 more
      ]
    },
    {
      date: "3/15/2019",
      locations: [
        {
          // each location toggles between guest and check count
          name: "Maslows",
          netSales: 4845,
          budget: null,
          guestCount: 238,
          checkCount: 0
        },
        {
          name: "2100 Cafe",
          netSales: 577,
          budget: null,
          guestCount: 0,
          checkCount: 127
        },
        {
          name: "Catering",
          netSales: 12186,
          budget: 10660,
          guestCount: 0,
          checkCount: 0
        } // + 7 more
      ]
    },
    {
      date: "3/21/2019",
      locations: [
        {
          // each location toggles between guest and check count
          name: "Maslows",
          netSales: 4138,
          budget: null,
          guestCount: 164,
          checkCount: 0
        },
        {
          name: "2100 Cafe",
          netSales: null, // if sales AND counts are null, undefined, or 0, that means location was closed - BUDGET could be non-0 yet location is closed
          budget: null,
          guestCount: null,
          checkCount: null
        },
        {
          name: "Catering",
          netSales: 2033,
          budget: 10660,
          guestCount: 0,
          checkCount: 0
        } // + 7 more
      ]
    },
    {
      date: "3/22/2019",
      locations: [
        {
          name: "Maslows",
          netSales: 3722,
          budget: null,
          guestCount: 132,
          checkCount: 0
        },
        {
          name: "2100 Cafe",
          netSales: 648,
          budget: null,
          guestCount: 0,
          checkCount: 130
        },
        {
          name: "Catering",
          netSales: 8696,
          budget: 10660,
          guestCount: 0,
          checkCount: 0
        } // + 7 more
      ]
    }
  ]
};

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
  const res = transform(stubResponse);
  return res;
}

export default fetchDataForDays;
