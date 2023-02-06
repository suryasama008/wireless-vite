const items = [
  {
    id: '1',
    store: 'EMTC',
    brand: 'Apple',
    category: 'Mobile',
    model: 'Iphone 12 Pro',
    storage: '64GB',
    color: 'Silver',
    status: 'In Stock',
    condition: 'New',
    date: '2021-01-01',
    battery: 100,
    imei: '012345678901282',
    costPrice: '399',
    sellingPrice: '449',
    soldPrice: '449',
  },
];
const stores = ['EMTC', 'BCC LL', 'BCC UL', 'SQUARE ONE']
const brands = ['APPLE', 'SAMSUNG']
const categories = ['MOBILE', 'TABLET', 'LAPTOP']
const models = ['IPHONE 12 PRO', 'IPHONE 12', 'IPHONE 11 PRO', 'IPHONE 11', 'IPHONE 10', 'IPHONE 11 PRO MAX', 'IPHONE 8', 'IPHONE 7', 'IPHONE 13', 'IPHONE 13 PRO', 'IPHONE 13 PRO MAX', 'IPHONE XR', 'IPHONE XS', 'IPHONE ', 'SAMSUNG S21', 'SAMSUNG S20',  'SAMSUNG S10', 'SAMSUNG S9',  'SAMSUNG S6', 'SAMSUNG S5', 'SAMSUNG S20 FE', 'SAMSUNG 21 FE', 'SAMSUNG S2', 'SAMSUNG S22 ULTRA']

for (let i = 2; i <= 150; i++) {
  let randomStore = randomItemFromArray(stores);
  let randomBrand = randomItemFromArray(brands);
  let randomCategory = randomItemFromArray(categories);
  let randomModel = randomItemFromArray(models);
  let randomStorage = randomItemFromArray(storage);
  let randomColor = randomItemFromArray(colors);
  let randomStatus = randomItemFromArray(status);
  let randomCondition = randomItemFromArray(condition);
  let randomDate = randomDateInRange('2022-11-28', '2023-01-30');
  let randomBattery = Math.floor(Math.random() * 100);
  let randomImei = Math.random().toString(36).slice(2, 18);
  let randomCostPrice = Math.floor(Math.random() * 1000);
  let randomSellingPrice = Math.floor(Math.random() * 1000);
  let randomSoldPrice = Math.floor(Math.random() * 1000);
  
  items.push({
    id: i.toString(),
    store: randomStore,
    brand: randomBrand,
    category: randomCategory,
    model: randomModel,
    storage: randomStorage,
    color: randomColor,
    status: randomStatus,
    condition: randomCondition,
    date: randomDate,
    battery: randomBattery,
    imei: randomImei,
    costPrice: randomCostPrice,
    sellingPrice: randomSellingPrice,
    soldPrice: randomSoldPrice
  });
}

