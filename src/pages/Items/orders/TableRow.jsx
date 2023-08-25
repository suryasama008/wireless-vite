import { useState } from 'react'
import { useCart } from './CartContext'

const TableRow = ({ model, accessory, siliconeColor }) => {
  const { addItem, removeItem } = useCart()
  const [quantity, setQuantity] = useState(0)
  const [isChecked, setIsChecked] = useState(false)

  const id = `${model}-${accessory}${siliconeColor ? `(${siliconeColor})` : ''}`

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked)

    if (e.target.checked) {
      addItem({ id, model, accessory, siliconeColor, quantity })
    } else {
      removeItem(id)
    }
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value)
  }

  return (
    <tr>
      <td>{model}</td>
      <td>{accessory}</td>
      <td>{siliconeColor}</td>
      <td>
        <input
          type='number'
          value={quantity}
          onChange={handleQuantityChange}
          min={0}
          className='form-control'
        />
      </td>
      <td>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </td>
    </tr>
  )
}
