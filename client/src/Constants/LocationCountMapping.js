// Data table's "count" value is based either on Guest count or Check count
// They are different for different locations

let GUEST_COUNT = "guestCount";
let CHECK_COUNT = "checkCount";

export const LocationCountMapping = {
    "PT Café": GUEST_COUNT,
    "Rise Coffee": GUEST_COUNT,
    "2100 Cafe": GUEST_COUNT,
    "FareStart Catering": GUEST_COUNT,
    "FS Restaurant": CHECK_COUNT,
    "Guest Chef Night": GUEST_COUNT,
    "Maslows": CHECK_COUNT
};