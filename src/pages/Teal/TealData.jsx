// TealData.jsx
import React,{useState, useEffect} from 'react';

import {   
    Col,
    Row,
    Card,
    CardBody,
    Table,
    CardTitle,
    Button} from 'reactstrap';

const TealData = ({ tealData, onTealDataChange, onSave }) => {
    const [total, setTotal] = useState(0)
   

    const handleInputChange = (e) => {
      const { name, value } = e.target

      if (value === '' || /^[0-9]+(\.[0-9]{0,2})?$/.test(value)) {
        onTealDataChange({
          ...tealData,
          [name]: value ? parseFloat(value) : 0,
        })
      } else {
        e.target.value = tealData[name] ?? '' // Revert to last valid value if invalid input
      }
    }


  useEffect(() => {
    const totalCount =
      tealData &&
      tealData.hundred * 100 +
        tealData.fifty * 50 +
        tealData.twenty * 20 +
        tealData.five * 5 +
        tealData.one * 1 +
        tealData.two * 2 +
        tealData.twentyFiveCents * 0.25 +
        tealData.tenCents * 0.1 +
        tealData.fiveCents * 0.05
    setTotal(totalCount)
  }, [tealData])
  
  const handleWheel = (event) => {
    event.preventDefault() // Prevents scrolling the number input
    event.stopPropagation()
  }

  return (
    <>
      <Card className='mb-2'>
        <CardTitle className='mb-0 p-3 border-bottom bg-light'>
          <h5 className='mb-0'>Till</h5>
        </CardTitle>
        <CardBody>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td className='text-start col-sm-3'>Store Cash</td>
                <td className='text-center col-sm-3'>
                  <input
                    className='form-control text-center'
                    name='storeCash'
                    value={tealData?.storeCash}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td className='text-start'>$100</td>

                <td className='text-start col-sm-3'>
                  <input
                    type='text'
                    className='form-control'
                    name='hundred'
                    placeholder='100 $'
                    value={tealData.hundred}
                    onChange={handleInputChange}

                  />
                </td>
                <td className='text-center col-sm-2'>
                  {tealData?.hundred * 100 + ' $'}
                </td>
              </tr>
              <tr>
                <td className='text-start'>$50</td>
                <td className='text-center'>
                  <input
                    className='form-control'
                    type='text'
                    name='fifty'
                    placeholder='50 $'
                    value={tealData?.fifty}
                    onChange={handleInputChange}
                  />
                </td>
                <td className='text-center'>{tealData?.fifty * 50 + ' $'}</td>
              </tr>
              <tr>
                <td className='text-start'>$20</td>
                <td className='text-center'>
                  <input
                    className='form-control'
                    type='text'
                    name='twenty'
                    placeholder='20 $'
                    value={tealData?.twenty}
                    onChange={handleInputChange}
                  />
                </td>
                <td className='text-center'>{tealData?.twenty * 20 + ' $'}</td>
              </tr>
              <tr>
                <td className='text-start'>$10</td>
                <td className='text-center'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='10 $'
                    name='ten'
                    value={tealData?.ten}
                    onChange={handleInputChange}
                  />
                </td>
                <td className='text-center'>{tealData?.ten * 10 + ' $'}</td>
              </tr>
              <tr>
                <td className='text-start'>$5</td>
                <td className='text-center'>
                  <input
                    className='form-control'
                    type='text'
                    name='five'
                    value={tealData?.five}
                    placeholder='5 $'
                    onChange={handleInputChange}
                  />
                </td>
                <td className='text-center'>{tealData?.five * 5 + ' $'}</td>
              </tr>
              <tr>
                <td className='text-start'>$2</td>
                <td className='text-center'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='2 $'
                    name='two'
                    value={tealData?.two}
                    onChange={handleInputChange}
                  />
                </td>
                <td className='text-center'>{tealData?.two * 2 + ' $'}</td>
              </tr>
              <tr>
                <td className='text-start'>$1</td>
                <td className='text-center'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='1 $'
                    name='one'
                    value={tealData?.one}
                    onChange={handleInputChange}
                  />
                </td>
                <td className='text-center'>{tealData?.one * 1 + ' $'}</td>
              </tr>
              <tr>
                <td className='text-start'>$0.25</td>
                <td className='text-center'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='0.25 $'
                    name='twentyFiveCents'
                    value={tealData?.twentyFiveCents}
                    onChange={handleInputChange}
                  />
                </td>
                <td className='text-center'>
                  {tealData?.twentyFiveCents * 0.25 + ' $'}
                </td>
              </tr>
              <tr>
                <td className='text-start'>$0.10</td>
                <td className='text-center'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='0.10 $'
                    name='tenCents'
                    value={tealData?.tenCents}
                    onChange={handleInputChange}
                  />
                </td>
                <td className='text-center'>
                  {tealData?.tenCents * 0.1 + ' $'}
                </td>
              </tr>
              <tr>
                <td className='text-start'>$0.05</td>
                <td className='text-center'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='0.05 $'
                    name='fiveCents'
                    value={tealData?.fiveCents}
                    onChange={handleInputChange}
                  />
                </td>
                <td className='text-center'>
                  {(tealData?.fiveCents * 0.05).toFixed(2) + ' $'}
                </td>
              </tr>
            </tbody>
          </Table>
          <Table>
            <tbody>
              <tr>
                <td className='text-start'>Total</td>
                <td className='text-end'>$ {parseFloat(total).toFixed(2)}</td>
              </tr>
              <tr>
                <td className='text-start'>Last Updated At</td>
                <td className='text-end'>{tealData?.date} </td>
              </tr>
            </tbody>
          </Table>
          <div className='text-center'>
            <Button className='mt-4' color='primary' onClick={onSave}>
              Submit
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  )
};

export default TealData;
