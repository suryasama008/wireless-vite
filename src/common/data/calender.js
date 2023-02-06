const events = [
  {
    id: 1,
    title: "Hafiz",
    start: new Date().setDate(new Date().getDate() + 1),
    className: "bg-success text-white",
  },
  {
    id: 2,
    title: "Amisha",
    start: new Date(),
    end: new Date(),
    className: "bg-success text-white",
  },
  {
    id: 3,
    title: "Amin",
    start: new Date().setDate(new Date().getDate() + 18),
    className: "bg-dark text-white",
  },
  {
    id: 4,
    title: "Rahil",
    start: new Date().setDate(new Date().getDate() - 9),
    className: "bg-primary text-white",
  },
  {
    id: 5,
    title: "Nimroj",
    start: new Date().setDate(new Date().getDate() - 3),
    className: "bg-info text-white",
  },
  {
    id: 6,
    title: "Sohil",
    start: new Date().setDate(new Date().getDate()),
    className: "bg-danger text-white",
  },
  {
    id: 7,
    title: "Harman",
    start: new Date().setDate(new Date().getDate() + 4),
    className: "bg-primary text-white",
  },
  {
    id: 8,
    title: "Zoya",
    start: new Date().setDate(new Date().getDate() - 5),
    end: new Date().setDate(new Date().getDate() - 3),
    className: "bg-warning text-white",
  },
];

const calenderDefaultCategories = [
  {
    id: 1,
    title: "BCC LL",
    type: "bg-success",
  },
  {
    id: 2,
    title: "BCC UL",
    type: "bg-info",
  },
  {
    id: 3,
    title: "EMTC",
    type: "bg-warning",
  },
  {
    id: 4,
    title: "SQUARE ONE",
    type: "bg-danger",
  },
]

export { calenderDefaultCategories, events }
