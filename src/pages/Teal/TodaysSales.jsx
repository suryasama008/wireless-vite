// TodaysSales.jsx
import React, { memo } from 'react';
import { Button, 
  Table, 
  Card,
  CardBody,
  CardTitle,
  InputGroup
 } from 'reactstrap';
  import Flatpickr from 'react-flatpickr'
  import 'flatpickr/dist/themes/material_blue.css'
  import moment from 'moment'
const TodaysSales = memo(({ items, onItemRemove, summary, onSummaryChange, onPaymentMethodChange, onDateChange, onSave, onSendEmail }) => {
  // Function to handle the change of any summary input
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    onSummaryChange({ ...summary, [name]: value, totalPhoneSale : calculateTotalSales() });
  };

  // Function to calculate the total sales
  const calculateTotalSales = () => {
    return items.reduce((total, item) => total + parseFloat(item.soldPrice || 0), 0).toFixed(2);
  };

  // Function to handle the removal of an item from today's sales
  const handleRemoveItem = (itemId) => {
    onItemRemove(itemId);
  };

console.log(summary)
  return (
    <div>
      <Card className='mb-2'>
        <CardTitle className='mb-0 p-3 border-bottom bg-light'>
          <h5 className='mb-0'>Today's Sales</h5>
        </CardTitle>
        <CardBody>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td className='text-start col-sm-3'>Date</td>
                <td className='text-center col-sm-3'>
                  <div className='d-flex'>
                    <InputGroup>
                      <Flatpickr
                        className='form-control d-block text-center'
                        placeholder='dd/mm/yyyy'
                        disabled
                        defaultValue={moment().format('DD-MM-YYYY')}
                        onChange={(selectedDates, dateStr, instance) => {
                          onDateChange(dateStr) // Pass the selected date as a string
                        }}
                        options={{
                          altInput: true,
                          altFormat: 'd/m/Y',
                          dateFormat: 'd/m/Y',
                        }}
                      />
                    </InputGroup>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='text-start col-sm-3'>Card</td>
                <td className='text-center col-sm-3'>
                  <input
                    className='form-control text-center'
                    // type='number'
                    placeholder='0'
                    name='card'
                    value={summary?.card}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className='text-start col-sm-3'>Cash</td>
                <td className='text-center col-sm-3'>
                  <input
                    className='form-control text-center'
                    value={summary?.cash}
                    placeholder='0'
                    name='cash'
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className='text-start col-sm-3'>Today's Sale</td>
                <td className='text-center col-sm-3 '>
                  <input
                    className='form-control text-center'
                    disabled
                    value={(
                      parseFloat(summary?.card) + parseFloat(summary?.cash)
                    ).toFixed(2)}
                  />
                </td>
              </tr>
              <tr>
                <td>Phone sales</td>
                <td>
                  <input
                    className='form-control text-center'
                    type='text'
                    value={calculateTotalSales()}
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td className='text-start col-sm-3'>Sales By Model</td>
                <td className='text-center col-sm-3'>
                  <input
                    className='form-control text-center'
                    type='number'
                    placeholder='0'
                    value={summary?.itemsSold}
                    name='itemsSold'
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className='text-start col-sm-3'>Phones & Accessories</td>
                <td className='text-center col-sm-3'>
                  <input
                    className='form-control text-center'
                    type='number'
                    placeholder='0'
                    value={summary?.phones}
                    name='phones'
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className='text-start col-sm-3'>Repairs</td>
                <td className='text-center col-sm-3'>
                  <input
                    className='form-control text-center'
                    type='number'
                    placeholder='0'
                    value={summary?.repairs}
                    name='repairs'
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className='text-start col-sm-3'>Expenses</td>
                <td className='text-center col-sm-3'>
                  <input
                    className='form-control text-center'
                    type='number'
                    placeholder='0'
                    value={summary?.expenses}
                    name='expenses'
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Remarks</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
          <textarea
            className='form-control'
            placeholder = "Expenses - Repairs"
            value={summary.expensesList}
            rows='3'
            name='expensesList'
            onChange={handleChange}
          />
          <h5>Phones:</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Model</th>
                <th>Sold Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.model}</td>
                  <td>{item.soldPrice}</td>
                  <td>
                    <select
                      className='form-control'
                      value={item.paymentMethod}
                      onChange={(e) =>
                        onPaymentMethodChange(item.id, e.target.value)
                      }
                    >
                      <option value=''>Payment</option>
                      <option value='cash'>Cash</option>
                      <option value='card'>Card</option>
                    </select>
                  </td>
                  <td>
                    <Button
                      color='danger'
                      className='btn-sm'
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className='text-center d-flex justify-content-between px-4'>
            <Button color='primary' onClick={onSave}>
              Submit
            </Button>
            <Button color='success' onClick={onSendEmail}>
              Send Report
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
});

export default TodaysSales;
