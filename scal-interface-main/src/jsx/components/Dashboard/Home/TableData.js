import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';

const TagRender = ({ value }) => {

    const newValue = parseInt(value.noOfVulns);

    return (
        <>
            {newValue == 0 ?
                <span className="badge badge-success">
                    Safe
                    <span className="ms-1 fa fa-check" />
                </span>

                :
                <>
                    {newValue > 0 && newValue <= 3 ?
                        <span className="badge badge-warning">
                            Low
                            <span className="ms-1 fas fa-stream" />
                        </span>
                        :
                        <>
                            {newValue > 3 && newValue <= 7 ?
                                <span className="badge badge-primary">
                                    Medium
                                    <span className="ms-1 fa fa-redo" />
                                </span>
                                :
                                <>
                                    {newValue > 7 && newValue <= 11
                                        ?
                                        <span className="badge badge-primary">
                                            Medium
                                            <span className="ms-1 fa fa-redo" />
                                        </span>
                                        :
                                        <>
                                            {newValue > 11
                                                ?

                                                <span className="badge badge-danger">
                                                    Critical
                                                    <span className="ms-1 fa fa-ban" />
                                                </span>

                                                :
                                                <></>
                                            }
                                        </>
                                    }
                                </>

                            }

                        </>

                    }

                </>

            }
        </>
    );

}

const TableData = ({ props }) => {

    const sort = 15;
    const activePage = useRef(0);
    const [test, settest] = useState(0);
    const [data, setData] = useState(
        document.querySelectorAll("#scanTable tbody tr")
    );

    // Active data
    async function changeData(first, sec) {
        for (var i = 0; i < data.length; ++i) {
            if (i >= first && i < sec) {
                data[i].classList.remove("d-none");
            } else {
                data[i].classList.add("d-none");
            }
        }
    };

    useEffect(() => {
        setData(document.querySelectorAll("#scanTable tbody tr"));
    }, [test]);

    // Active pagination
    activePage.current === 0 && changeData(0, sort);
    // paggination
    let paggination = Array(Math.ceil(data.length / sort))
        .fill()
        .map((_, i) => i + 1);

    // Active pagination & change data
    const onClick = (i) => {
        activePage.current = i;
        changeData(activePage.current * sort, (activePage.current + 1) * sort);
        settest(i);
    };


    return (
        <>
            <div className="card-body " style={{ padding: "1.25rem" }}>
                <div id="scanTable" className="table-responsive dataTables_wrapper">
                    <table className="table table-sm mb-0 table-responsive-lg ">
                        <thead>
                            <tr>

                                <th className="align-middle text-center">Analysis Name</th>
                                <th className="align-middle text-center">Vulnerabilities</th>
                                <th className="align-middle text-center">File Type</th>
                                <th className="align-middle pr-7 text-center">Date</th>
                                <th className="align-middle text-center">Status</th>
                                <th className="no-sort" />
                            </tr>
                        </thead>
                        <tbody id="orders">
                            {props.map((value) => {
                                return (
                                    <tr className="btn-reveal-trigger text-center">

                                        <td className="py-3">
                                            <strong>{value.analysisName}</strong>
                                        </td>
                                        <td className="py-3">{value.noOfVulns}</td>
                                        <td className="py-3">
                                            {value.fileType}
                                        </td>
                                        <td className="py-3">{value.scanPeriod}</td>
                                        <td className="py-3 text-right">
                                            <TagRender value={value} />
                                        </td>

                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                        <div className="dataTables_info ">
                            Showing {activePage.current * sort + 1} to{" "}
                            {data.length > (activePage.current + 1) * sort
                                ? (activePage.current + 1) * sort
                                : data.length}{" "}
                            of {data.length} entries
                        </div>
                        <div
                            className="dataTables_paginate paging_simple_numbers"
                            id="example2_paginate"
                        >
                            <span
                                className="paginate_button previous disabled"
                                onClick={() =>
                                    activePage.current > 0 &&
                                    onClick(activePage.current - 1)
                                }
                            >
                                <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                            </span>
                            <span>
                                {paggination.map((number, i) => (
                                    <span
                                        key={i}
                                        className={`paginate_button  ${activePage.current === i ? "current" : ""
                                            } `}
                                        onClick={() => onClick(i)}
                                    >
                                        {number}
                                    </span>
                                ))}
                            </span>

                            <span
                                className="paginate_button next"
                                onClick={() =>
                                    activePage.current + 1 < paggination.length &&
                                    onClick(activePage.current + 1)
                                }
                            >
                                <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableData