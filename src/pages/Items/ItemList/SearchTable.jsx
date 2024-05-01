import React from 'react'
import { Row, Col, Card, CardBody, CardTitle , Button, Table} from 'reactstrap';
const SearchTable = ({items}) => {
    // console.log(items[0].model)
  return (
    <div>
        <Table striped bordered>
            <thead>
                <tr>
                    <th>
                        Store
                    </th>
                    <th>
                        Brand
                    </th>
                    <th>
                        Model
                    </th>
                    <th>
                        Color
                    </th>
                    <th>
                        Storage
                    </th>
                    <th>
                        IMEI
                    </th>
                    <th>
                    Battery
                    </th>
                    <th>
                    Selling Price
                    </th>
                    <th>
                    Condition
                    </th>
                    <th>
                    CP
                    </th>
                </tr>
            </thead>
            <tbody>
               { items.map(item => (
               <tr key={item.id}>
               <td>
                   {item.store}
               </td>
               <td>
                 {item.brand}
               </td>
               <td>
                   {item.model}
               </td>

               <td>
                     {item.color}
               </td>
               <td>
                  {item.storage}
               </td>
               <td>
                  {item.imei}
               </td>
               <td>
               {item.battery}
               </td>
               <td>
               {item.sellingPrice}
               </td>
               <td>
               {item.condition}
               </td>
               <td>
                 {item.price}
               </td>
           </tr>
               ))}
            </tbody>
        </Table>
    </div>
  )
}

export default SearchTable