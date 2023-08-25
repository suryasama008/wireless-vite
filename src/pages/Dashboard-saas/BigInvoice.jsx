import {
    Row,
    Col
  } from "reactstrap";
  import "bootstrap/dist/css/bootstrap.min.css";
  // import "./styles.css";
import moment from 'moment'
  import wireless from '../../assets/images/logo-light.png'
  
  export default function BigInvoice({item, toggleSwitchSize, sellPrice, remark, store, stores, condition , invoice}) {
    return (
      <div className="App container">
        <div className="m-3 pb-3 d-flex justify-content-between" style={{borderBottom: '0.5px solid gray'}}>
            <div className="col-sm-6">
                <img src={wireless} alt="wireless" width="300px" />
            </div>
          <h4 className="m-4 bg-dark text-white p-2">INVOICE</h4>
        </div>
        <div className="mx-4 m-3 d-flex justify-content-between">
          <i className="text-italic">
            <h6>{store[0].address} </h6>
            <h6>{store[0].mall} </h6>
            <h6>{store[0].city}</h6>
            <h6>{store[0].phone}</h6>
          </i>
          <div>
            <h6>Invoice Number: # {invoice}</h6>
            <h6> Date: {item?.soldDate ? item.soldDate : moment().format('DD MMMM YYYY')}</h6>
          </div>
        </div>
        <div className="py-2 px-3 d-flex justify-content-between  bg-dark text-white">
            <h6>Product Description</h6>
            <h6>Product Price</h6>
        </div>
        <div className="d-flex justify-content-between m-3">
          <div className="col-sm-6 d-flex">
            <div className="mx-3">
              <h6>Brand</h6>
              <h6>Model</h6>
              <h6>Color</h6>
              <h6>Storage</h6>
              <h6>Imei</h6>
            </div>
            <div className="mx-3">
              <h6>{item?.brand}</h6>
              <h6>{item?.model}</h6>
              <h6>{item?.color}</h6>
              <h6>{item?.storage}</h6>
              <h6>{item?.imei}</h6>
            </div>
          </div>
          <div className="m-3">
            <h6>${sellPrice}</h6>
          </div>
        </div>
        <div className="d-flex justify-content-between mx-3 py-3" style={{borderBottom: '0.5px solid gray', borderTop: '0.5px solid gray'}} >
          <div className="">
            <h6>Gross Total:</h6>
            <h6>Tax:</h6>
            <h6>HST#:</h6>
            <h6>Net Total:</h6>
          </div>
          <div className="">
          <h6> {!toggleSwitchSize  ? sellPrice : (sellPrice / 1.13).toFixed(2)}</h6>
                <h6>{!toggleSwitchSize
                  ? (sellPrice * 0.13).toFixed(2)
                  : (sellPrice - sellPrice / 1.13).toFixed(2)}</h6>
                <h6>819582198</h6>
                <h6>{toggleSwitchSize ? sellPrice : (sellPrice * 1.13).toFixed(2)}</h6>
          </div>
        </div>
        <div className="m-3">
            <i>
              {condition(item.condition)}
            </i>
        </div>
        <div className="d-flex justify-content-between mx-3 py-4" style = {{borderTop:'0.5px solid gray'}}>
          <h6 className="col-sm-8">{remark}</h6>
            <h6>
              <i>Sign:</i> _________________________
            </h6>
        </div>
        <Row className="bg-dark text-white py-2">
          <Col className="col-sm-12 text-center">
            <h6>Our stores</h6>
          </Col>
        </Row>
        <div className="d-flex justify-content-equal m-4">
            {stores.map((store) => {
                {if(store.id > 4) return (null)}
                return (
          <Col xs='3' key={store.id}>
            <b className="text-xs"><i>
              <h6 >{store?.mall}</h6>
              <h6>{store?.address}</h6>
              <h6>{store?.city}</h6>
              <h6>{store?.phone}</h6>
              </i></b>
          </Col>
                )
            }
            )}

        </div>
        <div className="d-flex justify-content-center mx-3 py-4" style = {{borderTop:'0.5px solid gray'}}>
            <h6>*** Thank you for shopping with us! ****</h6>
            </div>

      </div>
    );
  }
  