// summary.jsx
import React, { memo, useRef } from 'react';
import { Card, CardBody, CardTitle, Button, Table } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment'
const summary = memo(({ summary, isSendSummary, onSummaryChange, store, todaysItems }) => {
  const componentRef = useRef();
console.log(todaysItems)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Assuming summary is an object with keys: cash, card, itemsSold, phones, repairs, expenses, expensesList
  const handleChange = (e) => {
    const { name, value } = e.target;
    onSummaryChange({
      ...summary,
      [name]: value
    });
  };

  // Generate the total sales by adding cash and card sales
  const totalSales = parseFloat(summary.cash || 0) + parseFloat(summary.card || 0);
  const expensesListLines = summary.expensesList.split('\n');
  return (
    <Card className='mb-2'>
    <CardTitle className='mb-0 p-3 border-bottom bg-light'>
      <h5 className='mb-0'>Sales Summary</h5>
    </CardTitle>
    <CardBody>
      <div ref={componentRef} className='m-4'>
        <div className='text-center'>
          <h2>Wireless+</h2>
          <h4>{store}</h4>
        </div>
        <div className='row'>
          <div className='col'>
            {/* This column is for names */}
            <p>Date</p>
            <p>Card</p>
            <p>Cash</p>
            <p>Today's Sale</p>
            <p>Phone Sales</p>
            <p>Sales By Model</p>
            <p>Phones Sold</p>
            <p>Repairs</p>
            <p>Expenses</p>
            <p>Expenses Description</p>
          </div>
          <div className='col text-end'>
            {/* This column is for values */}
            <p>{moment().format('DD-MM-YYYY')}</p>
            <p>{summary.card || '-'}</p>
            <p>{summary.cash || '-'}</p>
            <p>{summary.card && summary.cash ? (parseFloat(summary.card) + parseFloat(summary.cash)).toFixed(2) : '-'}</p>
            <p>{summary.totalPhoneSale || '-'}</p>
            <p>{summary.itemsSold || '-'}</p>
            <p>{summary.phones || '-'}</p>
            <p>{summary.repairs || '-'}</p>
            <p>{summary.expenses || '-'}</p>
            {expensesListLines.map((line, index) => (
              <div key={index}>{line}</div>  // Each line of expenses is rendered as a paragraph
            ))} 
          </div>
        </div>
        <h4>Phones:</h4>
        <Table>
          <thead>
            <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Payment</th>
            </tr>
          </thead>
          <tbody>
          {todaysItems.length > 0 ? todaysItems.map((item) => (
          <tr key={item.id}>
              <td >{item.model}- {item.color} ({item.condition})</td>
              <td>{!item.taxIn ? (item?.soldPrice / 1.13).toFixed(2) : item.soldPrice}</td>
              <td>{item.paymentMethod}</td>
              </tr>
            )) : <td>No phones sold today.</td>}
          </tbody>
        </Table>
      </div>
      <div className='text-center'>
        <Button color='primary' className='m-4' onClick={handlePrint} disabled = {!isSendSummary}>
          Print
        </Button>
      </div>
    </CardBody>
  </Card>
  );
});

export default summary;
