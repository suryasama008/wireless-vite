import React, { useRef } from 'react';
import { Card, CardBody, CardTitle, Row, Col, Button, Table } from 'reactstrap';
import html2canvas from 'html2canvas';
import moment from 'moment';
import axios from 'axios';


const ModelDisplay = ({ orders, showTotals }) => {
    const groupByStoreAndCase = (orders) => {
        const grouped = {};
        orders.forEach(order => {
            Object.keys(order).forEach(store => {
                if (store !== 'date' && store !== 'id' && store !== 'remarks') {
                    if (!grouped[store]) {
                        grouped[store] = {};
                    }
                    order[store].cases.forEach(item => {
                        const caseKey = item.case;
                        const model = item.model;
                        const qty = item.qty;
    
                        if (!grouped[store][caseKey]) {
                            grouped[store][caseKey] = [];
                        }
                        grouped[store][caseKey].push({ model, qty });
                    });
                }
            });
        });
        return grouped;
    };

    const groupedByStore = groupByStoreAndCase(orders);
    const numberOfStores = Object.keys(groupedByStore).length;
    const lgSize = Math.max(1, Math.floor(12 / Math.min(numberOfStores, 12)));

    const capitalizeFirstLetter = (string) => {
        return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <>
            <div className='m-2'>
                <Row>
                    {Object.keys(groupedByStore).map(store => (
                        <Col md={6} lg={lgSize} key={store}>
                            <Card>
                                <CardTitle className='mb-0 p-2 border-bottom bg-light'>
                                    <h5 className='mb-0'>{store}:</h5>
                                </CardTitle>
                                <CardBody>
                                    {Object.entries(groupedByStore[store]).map(([caseType, items], index) => (
                                        <div key={index}>
                                            <h6 style={{ paddingTop: "10px", fontWeight: "bold" }}>{caseType}:</h6>
                                            <Table>
                                                <tbody>
                                                    {items.map((item, itemIndex) => (
                                                        <tr key={itemIndex}>
                                                            <td style={{ paddingLeft: "10px" }}>{capitalizeFirstLetter(item.model)}</td>
                                                            <td>{item.qty}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    ))}
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};

export default ModelDisplay;





