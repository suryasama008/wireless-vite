import React, { useState, useMemo, useEffect } from 'react'
import { Row, Col, Card, CardBody, CardTitle ,  Input, InputGroup, Button } from 'reactstrap';

import TableContainer from "../../../components/Common/TableContainer";
import {
  Store,
  Brand,
  Color,
  Model,
  Storage,
  Imei,
  Battery,
  SellingPrice,
  Status,
  Condition,
  Costprice,
  UpdatedAt,
  
} from './ItemCol'
import { connect } from 'react-redux'
import { db } from '../../../helpers/firebase'
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import SearchTable from './SearchTable'

const ItemSearch = () => {
  const [items, setItems] = useState([])
  const [itemsList, setItemList] = useState([])
  const [modelOptions, setModelOptions] = useState([]);
  const [selectedModel, setSelectedModel] = useState('IPHONE 14');
  const [model, setModel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [imeiSearch, setImeiSearch] = useState('');
  const [colorSearch, setColorSearch] = useState('');
  const [statusSearch, setStatusSearch] = useState('');
  const [conditionSearch, setConditionSearch] = useState('');
  
  
  const filterItems = () => {
    return items.filter(item => {
      return (
        item.imei.toLowerCase().includes(imeiSearch.toLowerCase()) &&
        item.color.toLowerCase().includes(colorSearch.toLowerCase()) &&
        item.status.toLowerCase().includes(statusSearch.toLowerCase()) &&
        item.condition.toLowerCase().includes(conditionSearch.toLowerCase())
      );
    });
  };

  useEffect(() => {
    const filteredItems = filterItems();
    setItemList(filteredItems);
  }, [imeiSearch, colorSearch, statusSearch, conditionSearch, items]);



const itemsCollectionRef = collection(db, 'products')
const getItems = async () => {
  const itemQuery = query(itemsCollectionRef,
    where('status', '==', 'IN STOCK'), where('model', '==',selectedModel )
  )
  const querySnapshot = await getDocs(itemQuery)
  let data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  const sortedData = data.sort((a, b) => a.store.localeCompare(b.store));
  setItemList(sortedData)
}

const modelCollectionRef = collection(db, 'models');
const fetchModels = async () => {
  const data = await getDocs(modelCollectionRef);
  const models = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  setModelOptions(models[0].models);
};
console.log(modelOptions)

const handleModelClick = (modelValue) => {
  setModel(modelValue);
  setSelectedModel(modelValue);
};

useEffect(()=> {
  getItems()
},[selectedModel])

useEffect(() => {
  fetchModels()
  const unsubscribe = () => {
    fetchModels()
  }
  return unsubscribe
}, [])


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredModelOptions = useMemo(() => {
    if (!searchTerm) return modelOptions;
    return modelOptions.map(brand => ({
      ...brand,
      options: brand.options.filter(option => option.value.toLowerCase().includes(searchTerm))
    })).filter(brand => brand.options.length > 0);
  }, [modelOptions, searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className='page-content'>
      <Row>
      <Col lg={2} >
            <Card className='mb-2'>
    <CardTitle className='mb-0 p-3 border-bottom bg-light'>
      <h5 className='mb-0'>Models</h5>
    </CardTitle>
    <CardBody>
    <InputGroup>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Search Model..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchTerm && (
                    <Button color="primary" onClick={handleClearSearch}>X</Button>
                )}
              </InputGroup>
        <div style={{ maxHeight: '100vh',overflowY: 'auto', 
            scrollbarWidth: 'none', cursor: "pointer" }} className='mt-4'>
               {filteredModelOptions.map((brand, brandIndex) => (
                  <div key={brandIndex}>
                    <h4>{brand.label}</h4>
                    {brand.options.map((option, optionIndex) => (
                      <div key={optionIndex} onClick={() => handleModelClick(option.value)} className='p-2' style={{ borderBottom: "1px solid #f9f9f9", backgroundColor: selectedModel === option.value ? '#556ee5' : 'transparent', color: selectedModel === option.value ? 'white' : 'black' }}>
                        {option.value}
                      </div>
                    ))}
                  </div>
                ))}
        </div>
            </CardBody>
       </Card>
       </Col>
      <Col lg={10}>
        <Card>
        <CardTitle className='mb-0 p-3 border-bottom bg-light'>
      <h5 className='mb-0'>In Stock Products</h5>
      
    </CardTitle>
          <CardBody>
<h5 className='mb-4'>{selectedModel} ({itemsList.length})</h5>

           
           {items  && <SearchTable items = {itemsList }/>}
          </CardBody>
        </Card>
        </Col>
        </Row>
    </div>
  )
}

export default ItemSearch

