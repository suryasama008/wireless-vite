import React from 'react';
import { Badge } from 'reactstrap';

const Odate = (cell) => {
    //convert new Date(cell.value) to your 21/12/2019 format

    const date = new Date(cell.value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return '' + day + '/' + month + '/' + year + ' '
};

const Type = (cell) => {
    return cell.value ? cell.value : '';
};

const Model = (cell) => {
    return cell.value ? cell.value : '';
};

const Category = (cell) => {
    return cell.value ? cell.value : '';
};


const Remarks = (cell) => {
    return cell.value ? cell.value : '';
};

const Qty = (cell) => {
    return cell.value ? cell.value : '';
};


export {
    Odate,
    Type,
    Model,
    Category,
    Remarks,
    Qty
};