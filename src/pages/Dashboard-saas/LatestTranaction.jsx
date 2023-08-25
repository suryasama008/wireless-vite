import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";

import {
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { getOrders as onGetOrders } from "../../store/actions"
import { getItems as onGetItems } from "../../store/actions"
import { items } from '../../common/data'
import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";

import { Brand, Model, New, Used, Total, Stores } from './LatestTranactionCol'

import TableContainer from "../../components/Common/TableContainer";

//redux
import { useSelector, useDispatch } from "react-redux";

const LatestTranaction = props => {
  const { itemList } = props
  const dispatch = useDispatch()
  const { items } = useSelector((state) => ({
    items: state.ItemReducer.items,
  }))

  useEffect(() => {
    dispatch(onGetItems())
  }, [dispatch])

  const [modal1, setModal1] = useState(false)
  const [itemsList, setItemList] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  const toggleViewModal = () => setModal1(!modal1)

  const columns = useMemo(
    () => [
      {
        Header: 'Model',
        accessor: 'model',
        filterable: true,
        Cell: (cellProps) => {
          return <Model {...cellProps} />
        },
      },
      {
        Header: 'New',
        accessor: 'new',
        filterable: true,
        Cell: (cellProps) => {
          return <New {...cellProps} />
        },
      },
      {
        Header: 'Used',
        accessor: 'used',
        filterable: true,
        Cell: (cellProps) => {
          return <Used {...cellProps} />
        },
      },
      {
        Header: 'Stores(New, Used)',
        accessor: 'store',
        filterable: true,
        Cell: (cellProps) => {
          return <Stores {...cellProps} />
        },
      },
      {
        Header: 'Total',
        accessor: 'total',
        filterable: true,
        Cell: (cellProps) => {
          return <Total {...cellProps} />
        },
      },
    ],
    []
  )


  useEffect(() => {
    if (!isEmpty(items) && !!isEdit) {
      setIsEdit(false)
    }
  }, [items])
  

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className='mb-4 h4 card-title'>ALL STORE PHONES</div>
          <TableContainer
            columns={columns}
            data={itemList}
            isGlobalFilter={true}
            isAddOptions={false}
            isItemListGlobalFilter={true}
            customPageSize={50}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  )
};

LatestTranaction.propTypes = {
  items: PropTypes.array,
  onGetItems: PropTypes.func,
};

export default withRouter(LatestTranaction);
