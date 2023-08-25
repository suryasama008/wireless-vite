import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { Card, CardBody, Col } from 'reactstrap'
import Breadcrumbs from '../../components/Common/Breadcrumb'
import { auth, db } from '../../helpers/firebase'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy
} from 'firebase/firestore'
const AddModels = () => {
    const [store, setStore] = useState('')
    const [modelOptions, setModelOptions] = useState([])
    const [inputValues, setInputValues] = useState({});
    const [modelId, setModelId] = useState('')

const user = useSelector(state => state.users.user)
useEffect(() => {
    setStore(user.store)
}, [user]
)

const modelCollectionRef = collection(db, 'models')
const getModels = async () => {
  const data = await getDocs(modelCollectionRef)
  var models = []
  data.docs.map((doc) => {
    const temp = { ...doc.data(), id: doc.id }
    models.push(temp)
  })
  setModelOptions(models[0].models)
  setModelId(models[0].id)
  return models
}
const modelOptions1 = [
    {
      label: "Picnic",
      options: [
        { label: "Mustard", value: "Mustard" },
        { label: "Ketchup", value: "Ketchup" },
        { label: "Relish", value: "Relish" },
      ],
    },
    {
      label: "Camping",
      options: [
        { label: "Tent", value: "Tent" },
        { label: "Flashlight", value: "Flashlight" },
        { label: "Toilet Paper", value: "Toilet Paper" },
      ],
    },
    {
        label: "Picnic1",
        options: [
          { label: "Mustard", value: "Mustard" },
          { label: "Ketchup", value: "Ketchup" },
          { label: "Relish", value: "Relish" },
        ],
      },
      {
        label: "Camping1",
        options: [
          { label: "Tent", value: "Tent" },
          { label: "Flashlight", value: "Flashlight" },
          { label: "Toilet Paper", value: "Toilet Paper" },
        ],
      },
      {
        label: "Picnic2",
        options: [
          { label: "Mustard", value: "Mustard" },
          { label: "Ketchup", value: "Ketchup" },
          { label: "Relish", value: "Relish" },
        ],
      },
      {
        label: "Camping2",
        options: [
          { label: "Tent", value: "Tent" },
          { label: "Flashlight", value: "Flashlight" },
          { label: "Toilet Paper", value: "Toilet Paper" },
        ],
      },
  ];
useEffect(() => {
getModels()

const unsubscribe = () => {

  getModels()
}
return unsubscribe

}, [])

const handleAddOption = (label, newOption) => {
    const updatedOptions = modelOptions.map((group) => {
        if (group.label === label) {
          return {
            ...group,
            options: [...group.options, newOption],
          };
        }
        return group;
      });
      console.log(updatedOptions)
    setModelOptions(updatedOptions);
    const modelRef = doc(db, 'models', modelId)
    updateDoc(modelRef, {
        models: updatedOptions
    })
    
    setInputValues(prevState => ({ ...prevState, [label]: '' })); // reset input value after addition
  };


return (
    <div className="page-content">
      <div className="container-fluid">
        <Card><CardBody>
        <Breadcrumbs title={store} breadcrumbItem="Add Models" />
        </CardBody></Card>
          <Card><CardBody>
        <div className="row">
      
          {modelOptions.map((group) => (
        <div className="col-md-2" key={group.label}>
        <h5>{group.label}</h5>
        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            value = {inputValues[group.label] || ''} 
            onChange = {(e) => setInputValues(prevState => ({ ...prevState, [group.label]: e.target.value.toUpperCase() }))} 
            placeholder={`Add ${group.label}`} 
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button" onClick={() => handleAddOption(group.label, { label: inputValues[group.label], value: inputValues[group.label] })}>Add</button>
             </div>
            </div>
              <ul>
                {group.options.map((option) => (
                  <li key={option.value}>{option.label}</li>
                ))}
              </ul>
              
            </div>
          ))}
        
        </div>
        </CardBody></Card>
      </div>
    </div>
  );
}

export default AddModels