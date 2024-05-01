import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, CardBody, CardTitle , Button,  Input, InputGroup, Table,   Modal,
    Container,
    ModalHeader,
    ModalBody,
    ModalFooter,} from 'reactstrap';
import ProductAddForm from './ProductAddForm';
import moment from 'moment'
import { db } from '../../../helpers/firebase';
import { collection, getDocs, where, query, doc, updateDoc, addDoc } from 'firebase/firestore';
const ProductAdd = ({modal_standard, setmodal_standard, fetchProducts, product, setProduct}) => {
  // const [product, setProduct] = useState({
  //   category: 'MOBILES',
  //   brand: 'APPLE',
  //   model: '',
  //   condition: '',
  //   color: '',
  //   storage: '',
  //   battery: '',
  //   price: '',
  //   sellingPrice: '',
  //   supplier: '',
  //   contact: '',
  //   remarks: '',
  // });
  const [imeis, setIMEIs] = useState([product.imei]);
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.users.user);
  console.log(errors)
  
  useEffect(()=>{
    const temp = []
    temp.push(product.imei)
    setIMEIs(temp)
  },product)

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};
  
    // Validate model
    if (!product.model || product.model.trim() === '') {
      newErrors.model = 'Select Model';
      isValid = false;
    }
  
    // Validate condition
    if (!product.condition || product.condition.trim() === '') {
      newErrors.condition = 'Select Condition';
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  const prodCollectionRef = collection(db, 'products');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const promises = imeis.map(async (imei) => {
        const newProduct = {
          ...product,
          imei, 
          store: user.store, 
          status: 'IN STOCK',
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedDate: moment().format('DD-MM-YYYY')
        };
  
        try {
          if (product.id) {
            // Update the existing product
            const docRef = doc(db, 'products', product.id);
            await updateDoc(docRef, newProduct);
            console.log('Product updated successfully:', newProduct);
          } else {
            // Add a new product
            await addDoc(prodCollectionRef, newProduct);
            console.log('Product added successfully:', newProduct);
          }
        } catch (error) {
          console.error('Error adding product:', error);
          throw error; // Rethrow the error to be caught by Promise.all
        }
      });
  
      try {
        await Promise.all(promises);
        console.log('All products added successfully');
        // Additional success handling here, such as resetting the form or closing the modal
      } catch (error) {
        console.error('Error while adding products:', error);
        // Additional error handling here, such as displaying an error message to the user
      }
    } else {
      console.log('Form is invalid');
      // Handle form validation failure here, such as displaying a message to the user
      return
    }

    setIMEIs([''])
    setProduct({  category: 'MOBILES',
    brand: 'APPLE',
    model: '',
    condition: '',
    color: '',
    storage: '',
    battery: '',
    costPrice: '',
    sellingPrice: '',
    supplier: '',
    contact: '',
    remarks: '',})
    fetchProducts()
    setmodal_standard(false)
    
  };
  

    function tog_standard() {
        setmodal_standard(!modal_standard);
      }
  return (
        <Modal
                      isOpen={modal_standard}
                      toggle={() => {
                        tog_standard();
                      }}
                    >
                      <div className="modal-header">
                        <h5 className="modal-title mt-0" id="myModalLabel">
                          Modal Heading
                        </h5>
                        <button
                          type="button"
                          onClick={() => {
                            setmodal_standard(false);
                          }}
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                     <ProductAddForm product = {product} setProduct={setProduct}
                     user = {user}
                     imeis = {imeis} 
                     setIMEIs ={setIMEIs}
                     />
                     <div>
                        
                     <div className="text-danger">
                        {Object.values(errors).map((error, index) => (
                        <h6 key={index}>
                            *** {error} ***
                            <br />
                        </h6>
                        ))}
                    </div>
                     </div>
                     
                      </div>
                      
                      <div className="modal-footer">
                        <button
                          type="button"
                          onClick={() => {
                            tog_standard();
                          }}
                          className="btn btn-secondary "
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary "
                          onClick={handleSubmit}
                        >
                          Save changes
                        </button>
                      </div>
                    </Modal>
  )
}

export default ProductAdd