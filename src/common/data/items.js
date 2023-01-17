const items = [
  {
    id: '1',
    store: 'BCC LL',
    brand: 'Apple',
    model: 'iPhone 11',
    storage: '64GB',
    color: 'Black',
    status: 'In Stock',
    condition: 'New',
    date: '2022-01-01',
    battery: 100,
    imei: '012345678901234',
    sellingPrice: '$699',
  },
  {
    id: '2',
    store: 'BCC UL',
    brand: 'Samsung',
    model: 'Galaxy S21',
    storage: '128GB',
    color: 'White',
    status: 'In Stock',
    condition: 'New',
    date: '2022-02-01',
    battery: 90,
    imei: '012345678901235',
    sellingPrice: '$799',
  },
  {
    id: '3',
    store: 'EMTC',
    brand: 'Google',
    model: 'Pixel 5',
    storage: '64GB',
    color: 'Green',
    status: 'In Stock',
    condition: 'New',
    date: '2022-03-01',
    battery: 95,
    imei: '012345678901236',
    sellingPrice: '$699',
  },
  {
    id: '4',
    store: 'SQUARE ONE',
    brand: 'OnePlus',
    model: '9 Pro',
    storage: '256GB',
    color: 'Blue',
    status: 'Out of Stock',
    condition: 'Used',
    date: '2022-04-01',
    battery: 85,
    imei: '012345678901237',
    sellingPrice: '$649',
  },
  {
    id: '5',
    store: 'BCC LL',
    brand: 'Apple',
    model: 'iPad Pro',
    storage: '256GB',
    color: 'Space Gray',
    status: 'In Stock',
    condition: 'New',
    date: '2022-05-01',
    battery: 100,
    imei: '012345678901238',
    sellingPrice: '$799',
  },
  {
    id: '6',
    store: 'BCC UL',
    brand: 'Samsung',
    model: 'Galaxy Note 20',
    storage: '128GB',
    color: 'Aura Black',
    status: 'Out of Stock',
    condition: 'Used',
    date: '2022-06-01',
    battery: 90,
    imei: '012345678901239',
    sellingPrice: '$699',
  },
  {
    id: '7',
    store: 'EMTC',
    brand: 'Google',
    model: 'Nest Hub',
    storage: '2GB',
    color: 'Chalk',
    status: 'In Stock',
    condition: 'New',
    date: '2022-07-01',
    battery: null,
    imei: '012345678901240',
    sellingPrice: '$129',
  },
  {
    id: '8',
    store: 'SQUARE ONE',
    brand: 'OnePlus',
    model: 'Bullets Wireless Z',
    storage: 'N/A',
    color: 'Red',
    status: 'In Stock',
    condition: 'New',
    date: '2022-08-01',
    battery: null,
    imei: '012345678901241',
    sellingPrice: '$49',
  },
  {
    id: '9',
    store: 'BCC LL',
    brand: 'Apple',
    model: 'MacBook Pro',
    storage: '512GB',
    color: 'Silver',
    status: 'Out of Stock',
    condition: 'Used',
    date: '2022-09-01',
    battery: null,
    imei: '012345678901242',
    sellingPrice: '$1,199',
  },
  {
    id: '10',
    store: 'BCC UL',
    brand: 'Samsung',
    model: 'Galaxy Tab S7',
    storage: '256GB',
    color: 'Mystic Black',
    status: 'In Stock',
    condition: 'New',
    date: '2022-10-01',
    battery: null,
    imei: '012345678901243',
    sellingPrice: '$799',
  },
  {
    "id": "11",
    "store": "BCC LL",
    "brand": "Apple",
    "model": "iPhone 12",
    "storage": "128GB",
    "color": "Gold",
    "status": "In Stock",
    "condition": "New",
    "date": "2022-11-01",
    "battery": 100,
    "imei": "012345678901244",
    "sellingPrice": "$799"
  },
  {
    "id": "12",
    "store": "BCC UL",
    "brand": "Samsung",
    "model": "Galaxy S21 Ultra",
    "storage": "512GB",
    "color": "Phantom Black",
    "status": "In Stock",
    "condition": "New",
    "date": "2022-12-01",
    "battery": 95,
    "imei": "012345678901245",
    "sellingPrice": "$1,199"
  },
  {
    "id": "13",
    "store": "EMTC",
    "brand": "Google",
    "model": "Pixel 6",
    "storage": "128GB",
    "color": "White",
    "status": "In Stock",
    "condition": "New",
    "date": "2023-01-01",
    "battery": 98,
    "imei": "012345678901246",
    "sellingPrice": "$799"
  },
  {
    "id": "14",
    "store": "SQUARE ONE",
    "brand": "OnePlus",
    "model": "9T Pro",
    "storage": "256GB",
    "color": "Amber Red",
    "status": "In Stock",
    "condition": "New",
    "date": "2023-02-01",
    "battery": 98,
    "imei": "012345678901247",
    "sellingPrice": "$699"
  },
  {
    "id": "15",
    "store": "BCC LL",
    "brand": "Apple",
    "model": "iPad Air",
    "storage": "256GB",
    "color": "Rose Gold",
    "status": "In Stock",
    "condition": "New",
    "date": "2023-03-01",
    "battery": 100,
    "imei": "012345678901248",
    "sellingPrice": "$599"
  },
  {
    "id": "16",
    "store": "BCC UL",
    "brand": "Samsung",
    "model": "Galaxy Z Fold 2",
    "storage": "256GB",
    "color": "Mystic Bronze",
    "status": "In Stock",
    "condition": "New",
    "date": "2023-04-01",
    "battery": 95,
    "imei": "012345678901249",
    "sellingPrice": "$1,999"
  },
  {
        "id": "17",
    "store": "EMTC",
    "brand": "Google",
    "model": "Chromebook",
    "storage": "64GB",
    "color": "Silver",
    "status": "In Stock",
    "condition": "New",
    "date": "2023-05-01",
    "battery": 100,
    "imei": "012345678901250",
    "sellingPrice": "$449"
  },
  {
    "id": "18",
    "store": "SQUARE ONE",
    "brand": "OnePlus",
    "model": "Nord N10",
    "storage": "128GB",
    "color": "Midnight Ice",
    "status": "In Stock",
    "condition": "New",
    "date": "2023-06-01",
    "battery": 98,
    "imei": "012345678901251",
    "sellingPrice": "$349"
  },
  {
    "id": "19",
    "store": "BCC LL",
    "brand": "Apple",
    "model": "Mac mini",
    "storage": "256GB",
    "color": "Space Gray",
    "status": "In Stock",
    "condition": "New",
    "date": "2023-07-01",
    "battery": null,
    "imei": "012345678901252",
    "sellingPrice": "$699"
  },
  {
    "id": "20",
    "store": "BCC UL",
    "brand": "Samsung",
    "model": "Galaxy Book Flex",
    "storage": "512GB",
    "color": "Royal Silver",
    "status": "In Stock",
    "condition": "New",
    "date": "2023-08-01",
    "battery": 100,
    "imei": "012345678901253",
    "sellingPrice": "$1,499"
  }
]


   




export { items }