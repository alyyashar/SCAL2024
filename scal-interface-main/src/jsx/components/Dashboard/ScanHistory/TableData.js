import React, { useState,useEffect, useRef } from "react";
import TagRender from './TagRender';
import { Modal, Button } from "react-bootstrap";
import { Dropdown } from 'react-bootstrap';
import AnalysisResult from './AnalysisResult';
import Pdf from "react-to-pdf"
import { Link } from "react-router-dom";

const TableData = ({ props }) => {
    const [historyModal, setHistoryModal] = useState(false)
    const [modalValue, setModalValue] = useState('')
    const ref = React.createRef();
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
        <div className="card">
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
                                    <React.Fragment>
                                        <tr key={value.id} id="scanValue" className="btn-reveal-trigger text-center">

                                            <td className="py-2">
                                                <strong>{value.analysisName}</strong>
                                            </td>
                                            <td className="py-2">{value.noOfVulns}</td>
                                            <td className="py-2">
                                                {value.fileType}
                                            </td>
                                            <td className="py-2">{value.scanPeriod}</td>
                                            <td className="py-2 text-right">
                                                <TagRender value={value} />
                                            </td>
                                            <td className="py-2 text-right">
                                                <Dropdown className="dropdown text-sans-serif">
                                                    <Dropdown.Toggle
                                                        variant=""
                                                        className="btn btn-primary i-false tp-btn-light sharp"
                                                        type="button"
                                                        id="order-dropdown-0"
                                                        data-toggle="dropdown"
                                                        data-boundary="viewport"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        <span>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                width="18px"
                                                                height="18px"
                                                                viewBox="0 0 24 24"
                                                                version="1.1"
                                                            >
                                                                <g
                                                                    stroke="none"
                                                                    strokeWidth={1}
                                                                    fill="none"
                                                                    fillRule="evenodd"
                                                                >
                                                                    <rect x={0} y={0} width={24} height={24} />
                                                                    <circle fill="#000000" cx={5} cy={12} r={2} />
                                                                    <circle
                                                                        fill="#000000"
                                                                        cx={12}
                                                                        cy={12}
                                                                        r={2}
                                                                    />
                                                                    <circle
                                                                        fill="#000000"
                                                                        cx={19}
                                                                        cy={12}
                                                                        r={2}
                                                                    />
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        className="dropdown-menu dropdown-menu-right border py-0"
                                                        aria-labelledby="order-dropdown-0"
                                                    >
                                                        <div className="py-2">
                                                            <p
                                                                className="dropdown-item text-danger"
                                                                onClick={() => {
                                                                    setModalValue(value)
                                                                    setHistoryModal(true)

                                                                }}
                                                            >View</p>
                                                            {historyModal &&
                                                                <Modal
                                                                    className="fade bd-example-modal-lg"
                                                                    show={historyModal}
                                                                    size="lg"
                                                                >
                                                                    <Modal.Header>
                                                                        <Modal.Title>Analysis Result</Modal.Title>
                                                                        <Button
                                                                            variant=""
                                                                            className="btn-close"
                                                                            onClick={() => {
                                                                                setHistoryModal(false)
                                                                                setModalValue('')
                                                                                window.location.reload()
                                                                            }}
                                                                        >
                                                                        </Button>
                                                                    </Modal.Header>
                                                                    <Modal.Body ref={ref}>
                                                                        <AnalysisResult props={modalValue} />
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <Button
                                                                            variant="danger light"
                                                                            onClick={() => {
                                                                                setHistoryModal(false)
                                                                                setModalValue('')
                                                                                window.location.reload()
                                                                            }}
                                                                        >
                                                                            Close
                                                                        </Button>
                                                                        <Pdf targetRef={ref} filename="ScalAnalysis.pdf">
                                                                            {({ toPdf }) => <button variant=""
                                                                                type="button"
                                                                                className="btn btn-primary" onClick={toPdf}> <i className="fa fa-download me-1"></i>
                                                                                Download Analysis</button>}
                                                                        </Pdf>
                                                                    </Modal.Footer>
                                                                </Modal>
                                                            }

                                                            {/*<div className="dropdown-divider" />
                                            <p
                                                className="dropdown-item text-danger"
                                                onClick={() => setHistoryModal(true)}
                                            >
                                                Delete
                                            </p>*/}
                                                        </div>
                                                        {/* Result Modal */}


                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    </React.Fragment>
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
        </div>
    )
}

export default TableData;