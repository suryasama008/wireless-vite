import React, {useState} from 'react'
import {
  Col,
  Card,
  CardBody,
  InputGroup,
  Button,
  Label,
  Input,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Table,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  UncontrolledDropdown,
} from 'reactstrap'
const ProductSell = ({ searchResults, isOffCanvas }) => {
    const [sellPrice, setSellPrice] = useState(0)
     const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='text-start'>Store</td>
            <td className='text-start'>{searchResults?.store}</td>
          </tr>
          <tr>
            <td className='text-start'>Brand</td>
            <td className='text-start'>{searchResults?.brand}</td>
          </tr>
          <tr>
            <td className='text-start'>Model</td>
            <td className='text-start'>
              {searchResults?.model} - {searchResults?.storage} -{' '}
              {searchResults?.color} - ({searchResults?.condition})
            </td>
          </tr>
          <tr>
            <td className='text-start'>Imei</td>
            <td className='text-start'>{searchResults?.imei}</td>
          </tr>
          <tr>
            <td className='text-start'>Status</td>
            <td className='text-start'>{searchResults?.status}</td>
          </tr>
          {isOffCanvas === 'offCanvas' ? (
            <>
              <tr>
                <td className='text-start'>Cost Price</td>
                <td className='text-start'>{searchResults?.price}</td>
              </tr>
              <tr>
                <td className='text-start'>Selling Price</td>
                <td className='text-start'>{searchResults?.sellingPrice}</td>
              </tr>
            </>
          ) : null}
        </tbody>
        {isOffCanvas === 'offCanvas' ? (
          <tbody>
            <tr>
              <td className='text-start'>Sell</td>
              <td>
                <span>
                  <Input
                    type='text'
                    value={sellPrice}
                    //   defaultValue={searchResults?.sellingPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className='form-control'
                    id='formrow-firstname-Input'
                    placeholder='Selling Price'
                  />
                </span>
                <span>
                  <div className='form-check form-switch mb-3'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='customSwitchsizesm'
                      //   defaultChecked
                      onClick={(e) => {
                        settoggleSwitchSize(!toggleSwitchSize)
                      }}
                    />
                    <label
                      className='form-check-label'
                      htmlFor='customSwitchsizesm'
                    >
                      Tax-In
                    </label>
                  </div>
                </span>
              </td>
            </tr>
            <tr>
              <td className='text-start'>Gross Total</td>
              <td className='text-start'>
                {toggleSwitchSize ? sellPrice : (sellPrice / 1.13).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className='text-start'>Discount</td>
              <td className='text-start'>
                {!sellPrice
                  ? 0
                  : (sellPrice - searchResults?.sellingPrice).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className='text-start'>HST #:</td>
              <td className='text-start'>819582198</td>
            </tr>
            <tr>
              <td className='text-start'>Tax</td>
              <td className='text-start'>
                {toggleSwitchSize
                  ? (sellPrice * 0.13).toFixed(2)
                  : (sellPrice - sellPrice / 1.13).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className='text-start'>Net Total</td>
              <td className='text-start'>
                {!toggleSwitchSize ? sellPrice : (sellPrice * 1.13).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className='text-start'></td>
              <td>
                  <Button color='primary'>
                    Sell <i className='mdi mdi-arrow-right ms-1'></i>
                  </Button>
              </td>
            </tr>
          </tbody>
        ) : null}
      </Table>
    </div>
  )
}

export default ProductSell