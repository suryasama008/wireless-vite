import React , {useState,useEffect} from 'react'
// import { getAddValues as onGetAddValues } from '../../store/addValues/actions'
import { useSelector, useDispatch } from 'react-redux'
const AddValues = () => {
    const [products, setProducts] = useState([])
    //  const dispatch = useDispatch()
    //  const  addValues  = useSelector((state) => ({
    //    return: state,
    //  }))

    // console.log(addValues)
    //  useEffect(() => {
    //    dispatch(onGetAddValues())
    //  }, [dispatch])
  
     const brands = [
       {
         name: 'APPLE',
         models: [
           'IPHONE 14',
           'IPHONE 14 PRO',
           'IPHONE 14 PRO MAX',
           'IPHONE 13',
           'IPHONE 13 PRO',
           'IPHONE 13 PRO MAX',
           'IPHONE 13 MINI',
           'IPHONE 6',
           'IPHONE 6S',
           'IPHONE 7',
           'IPHONE 8',
           'IPHONE 11',
         ],
         accessories: [
           'AIRPODS',
           'AIRPODS 2',
           'AIRPODS PRO',
           'AIRPODS PRO 2',
           'AIRPODS 3',
           'WATCH',
         ],
       },
       {
         name: 'SAMSUNG',
         models: [
           'SAMSUNG S6',
           'SAMSUNG S7',
           'SAMSUNG S8',
           'SAMSUNG S9',
           'SAMSUNG S10',
         ],
         accessories: [],
       },
     ]
     const storage = ['256 GB', '128 GB', '64 GB', '32 GB', '16 GB', , '512 GB']
    const conditions = ['NEW', 'USED']
    useEffect(() => {
      const prod = []
      for (const brand of brands) {
        for (const model of brand.models) {
          for (const condition of conditions) {
            const product = {
              prodId: Math.floor(Math.random() * 1000000000),
              brand: brand.name,
              category: 'Mobiles',
              status: 'IN STOCK',
              model,
              condition,
            }
            prod.push(product)
          }
        }
      }
      for (const brand of brands) {
        for (const model of brand.accessories) {
            const product = {
              prodId: Math.floor(Math.random() * 1000000000),
              brand: brand.name,
              category: 'Accessories',
              status: 'IN STOCK',
              model,
              condition: 'NEW',
            }
          prod.push(product)
        }
      }
      setProducts(prod)
    }, [])
    console.log(products)
  return (
      <div>{ 
          products.map((product) => (
              <div key={product.prodId}>
                  <p>{product.brand}</p>
                  <p>{product.category}</p>
                  <p>{product.status}</p>
                  <p>{product.model}</p>
                  <p>{product.condition}</p>
              </div>
          ))
          
      }</div>
  )
}

export default AddValues