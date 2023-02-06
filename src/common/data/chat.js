//import Images
import avatar02 from "../../assets/images/users/avatar-2.jpg";
import avatar03 from "../../assets/images/users/avatar-3.jpg";
import avatar04 from "../../assets/images/users/avatar-4.jpg";
import avatar06 from "../../assets/images/users/avatar-6.jpg";
import avatar07 from "../../assets/images/jobs.png";
const chats = [
  {
    id: 1,
    roomId: 1,
    status: "offline",
    image: avatar07,
    name: "BCC LL",
    description: "Hey! there I'm available",
    time: "05 min",
  },
  {
    id: 2,
    roomId: 2,
    status: "online",
    image: avatar07,
    name: "BCC UL",
    description: "I've finished it! See you so",
    time: "12 min",
  },
  {
    id: 3,
    roomId: 3,
    status: "online",
    name: "SQUARE ONE",
    description: "This theme is awesome!",
    time: "24 min",
    isImg: true,
    profile: "S",
  },
  {
    id: 4,
    roomId: 4,
    status: "intermediate",
    image: avatar07,
    name: "Amin",
    description: "Nice to meet you",
    time: "1 hr",
  },
  // {
  //   id: 5,
  //   roomId: 5,
  //   status: "offline",
  //   name: "Mitchel Givens",
  //   description: "Hey! there I'm available",
  //   time: "3 hrs",
  //   isImg: true,
  //   profile: "M",
  // },
  // {
  //   id: 6,
  //   roomId: 6,
  //   status: "online",
  //   image: avatar06,
  //   name: "Stephen Hadley",
  //   description: "I've finished it! See you so",
  //   time: "5 hrs",
  // },
  // {
  //   id: 7,
  //   roomId: 7,
  //   status: "online",
  //   name: "SQUARE ONE",
  //   description: "This theme is awesome!",
  //   time: "24 min",
  //   isImg: true,
  //   profile: "K",
  // },
]

const groups = [
  { id: 1, image: "G", name: "Wireless +" },
  { id: 2, image: "R", name: "Group" },
  { id: 3, image: "M", name: "Suggestions" },
  { id: 4, image: "A", name: "Managers" },
  // { id: 5, image: "B", name: "Project B" },
]

const contacts = [
  {
    category: 'Stores',
    child: [
      { id: 1, name: 'BCC UL' },
      { id: 2, name: 'BCC LL' },
      { id: 3, name: 'SQUARE ONE' },
    ],
  },
  {
    category: 'Managers',
    child: [{
      id: 1,
      name: 'Amin',
    }, {
      id: 2,
      name: 'Sohil',
    }],
  },
  {
    category: 'Employees',
    child: [
      { id: 1, name: 'Ashish' },
      { id: 2, name: 'Amisha' },
      { id: 3, name: 'Gurmandeep' },
      { id: 1, name: 'Hafiz' },
      { id: 2, name: 'Jateen' },
      { id: 3, name: 'Nimroj' },
      { id: 3, name: 'Nikhil' },
    ],
  },
  
]

const messages = [
  {
    id: 1,
    roomId: 1,
    sender: "BCC LL",
    message: "Are there any Iphone 11 available.!",
    time: "10:00",
  },
  {
    id: 2,
    roomId: 1,
    sender: "BCC LL",
    message: "Hi, How are you? What about our next meeting?",
    time: "10:02",
  },
  {
    id: 3,
    roomId: 1,
    sender: "BCC LL",
    message: "Yeah everything is fine",
    time: "10:06",
  },
  {
    id: 4,
    roomId: 1,
    sender: "BCC LL",
    message: "& Next meeting tomorrow 10.00AM",
    time: "10:06",
  },
  {
    id: 5,
    roomId: 1,
    sender: "BCC LL",
    message: "Wow that's great",
    time: "10:07",
  },
  {
    id: 6,
    roomId: 2,
    sender: "BCC UL",
    message: "Are there any Iphone 11 available.!",
    time: "11:00",
  },
  {
    id: 7,
    roomId: 3,
    sender: "SQUARE ONE",
    message: "Are there any Iphone 11 available.!",
    time: "11:02",
  },
  {
    id: 8,
    roomId: 4,
    sender: "SQUARE ONE",
    message: "Are there any Iphone 11 available.!",
    time: "1 hr",
  },
  {
    id: 9,
    roomId: 5,
    sender: "Amin",
    message: "Are there any Iphone 11 available.!",
    time: "11:05",
  },
  {
    id: 10,
    roomId: 6,
    sender: "Sohil",
    message: "Are there any Iphone 11 available.!",
    time: "1 hr",
  },
  {
    id: 11,
    roomId: 7,
    sender: "Amin",
    message: "Are there any Iphone 11 available.!",
    time: "1 hr",
  },
];
export { chats, messages, contacts, groups }
