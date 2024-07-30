import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isAuth } from "../../helpers/Auth"
import TableData from './ScanHistory/TableData'


const ScanHistory = () => {

    const id = isAuth()?._id;
    const [tableValue, setTableValue] = useState([]);

    //Fetching scan data
    useEffect(() => {
        if (id) {
            axios
                .get(`https://5009-alyyashar-scal2024-zyixncvobqi.ws-us115.gitpod.io/api/user/${id}`)
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    setTableValue(data.scan)
                })
                .catch((err) => console.log(err));
        }
    }, []);


    return (
        <div className="row">
            <div className="col-lg-12">
                {tableValue && tableValue.length !== 0 ?
                    <TableData props={tableValue} />
                    :
                    <h3 className="text-center">No Analysis Saved</h3>
                }
            </div>
        </div>
    )
}

export default ScanHistory