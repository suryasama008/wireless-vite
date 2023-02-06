import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge } from 'reactstrap';

const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};


const Brand = (cell) => {
    return cell.value ? cell.value : '';
};

const Model = (cell) => {
        return cell.value ? cell.value : '';
};

const New = (cell) => {
    return cell.value ? cell.value : 0;
};

const Used = (cell) => {
    return cell.value ? cell.value : 0;
};

const Total = (cell) => {
    return cell.value ? cell.value : '';
};
const Stores = (cell) => {
    return cell.value ? cell.value : '';
};

export {
    Brand,
    Model,
    New,
    Used,
    Total,
    Stores,
};