import React, { useState } from "react";
import axios from "axios";
import { isAuth } from '../../../helpers/Auth'
import Pdf from "react-to-pdf"

import { ThreeCircles } from 'react-loader-spinner';

/// Bootstrap
import { Row, Card, Modal, Button } from "react-bootstrap";
import { set } from "js-cookie";

const ref = React.createRef();

const PasteAnalysis = () => {
    const [pasteModal, setPasteModal] = useState(false);
    const [resultModal, setResultModal] = useState(false);
    const [loader, setloader] = useState(false);
    const [analysisName, setAnalysisName] = useState('');
    const [result, setResult] = useState([]);
    const [file, setFile] = useState([]);
    const [tools, setTools] = useState(['slither']);
    let errorObj = { name: '', file: '' };
    let current = new Date();
    let scanPeriod = current.toLocaleDateString();
    const fileType = 'SOL';
    let toolUsed = tools;
    const [noOfVulns, setNoOfVulns] = useState(0)
    const [errors, setErrors] = useState(null);
    const [save, setSave] = useState(null);
    const [output, setOutput] = useState(null)

    const postData = {
        tools,
        file,
    };
    const visible = 100;


    /* FUNCTION TO RUN ANALYSIS*/
    async function onRunAnalysis(e) {
        e.preventDefault();
        let error = false;
        if (analysisName === '') {
            errorObj.name = 'Analysis name not included';
            error = true;
        }
        if (file.length === 0) {
            errorObj.file = 'Solidity code not included';
            error = true;
        }
        setErrors(errorObj);
        if (error) {
            return;
        }
        setloader(true);
        axios
            .post(`https://5000-alyyashar-scal2024-zyixncvobqi.ws-eu115.gitpod.io/api/file-input`, postData)
            .then((res) => {
                setResult(res);
                setOutput(res.data[0].analysis);
                console.log(res.data)
                console.log(output)
                setloader(false);
                setPasteModal(false);
                setResultModal(true);

                if (res.data[0].tool === "mythril") {
                    console.log('Mythril analysis')
                    const vuln = res.data[0].analysis.issues.length;
                    setNoOfVulns(vuln);
                }

                res.data?.map((res) => {
                    if (res.tool === 'slither') {
                        if (res.analysis.length === 0 || res.analysis === null) {
                            setNoOfVulns(0)
                        } else {
                            setNoOfVulns(res.analysis.length)
                        }
                    }

                    if (res.tool === 'solhint') {
                        if (res.analysis.length === 0) {
                            setNoOfVulns(0)
                        } else {
                            setNoOfVulns(res.analysis.length)
                        }
                    }

                    if (res.tool === 'smartcheck') {
                        if (res.analysis.length === 0) {
                            setNoOfVulns(0)
                        } else {
                            setNoOfVulns(res.analysis.length)
                        }
                    }

                    if (res.tool === 'manticore') {
                        if (res.analysis[0].length === 0) {
                            setNoOfVulns(0)
                        } else {
                            ///setNoOfVulns(res.analysis[0].length)
                            setNoOfVulns(0)
                        }
                    }

                    if (res.tool === 'oyente') {
                        if (res.analysis.length === 0 || res.analysis[0].errors.length === 0) {
                            setNoOfVulns(0)
                        } else {
                            setNoOfVulns(res.analysis[0].errors.length)
                        }
                    }

                    if (res.tool === 'honeybadger') {
                        if (res.analysis.length === 0 || res.analysis[0].errors.length === 0) {
                            setNoOfVulns(0)
                        } else {
                            setNoOfVulns(res.analysis[0].errors.length)
                        }
                    }

                    if (res.tool === 'osiris') {
                        if (res.analysis.length === 0 || res.analysis[0].errors.length === 0) {
                            setNoOfVulns(0)
                        } else {
                            setNoOfVulns(res.analysis[0].errors.length)
                        }
                    }

                    if (res.tool === 'maian') {
                        let vulns = 0;
                        if (res.analysis.is_lock_vulnerable) {
                            vulns = vulns + 1;
                        }
                        if (res.analysis.is_suicidal_vulnerable) {
                            vulns = vulns + 1;
                        }
                        if (res.analysis.is_prodigal_vulnerable) {
                            vulns = vulns + 1;
                        }
                        setNoOfVulns(vulns);
                    }

                    if (res.tool === 'securify') {
                        let vulns = 0;
                        if (res.analysis == null) {
                            setNoOfVulns(0);
                        } else {
                            if (res.analysis.toAnalyze.results.MissingInputValidation.hasViolations) {
                                vulns = vulns + 1;
                            }
                            if (res.analysis.toAnalyze.results.UnrestrictedEtherFlow.hasViolations) {
                                vulns = vulns + 1;
                            }
                            if (res.analysis.toAnalyze.results.UnhandledException.hasViolations) {
                                vulns = vulns + 1;
                            }
                            if (res.analysis.toAnalyze.results.TODTransfer.hasViolations) {
                                vulns = vulns + 1;
                            }
                            if (res.analysis.toAnalyze.results.TODReceiver.hasViolations) {
                                vulns = vulns + 1;
                            }
                            if (res.analysis.toAnalyze.results.TODAmount.hasViolations) {
                                vulns = vulns + 1;
                            }
                            if (res.analysis.toAnalyze.results.DAOConstantGas.hasViolations) {
                                vulns = vulns + 1;
                            }
                            if (res.analysis.toAnalyze.results.DAO.hasViolations) {
                                vulns = vulns + 1;
                            }
                            setNoOfVulns(vulns)
                        }
                    }

                })

            })
            .catch((err) => {
                console.log(err);
            })
    }

    /*FUNCTION TO SAVE ANALYSIS RESULT*/
    async function saveAnalysis() {
        const saveData = {
            analysisName,
            noOfVulns,
            output,
            scanPeriod,
            fileType,
            toolUsed
        }

        axios
            .post(`https://5000-alyyashar-scal2024-zyixncvobqi.ws-eu115.gitpod.io/api/user/updatescan/${isAuth()._id}`, saveData)
            .then((res) => {
                console.log("Saved Successfully")
                setSave("Analysis Saved Successfully");
            })
            .catch((err) => {
                console.log(err);
                setSave("Analysis not saved");
            })
    }

     //ANALYSIS RESULT FORMATTING
     const analysisData = result.data?.map((place) => {
        {/*======= SLITHER =========*/ }
        if (place.tool === 'slither') {
            return (
                <div>
                    {place.analysis.length === 0 || place.analysis === null ?
                        <h4>
                            No Vulnerabilities detected
                        </h4>
                        :
                        <Row>
                            {place.analysis?.slice(0, visible).map((analysis) => (
                                <div className="col-xl-12">
                                    <Card>
                                        <Card.Header className=" border-0 pb-0">
                                            <Card.Title>{analysis.check}</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                {analysis.description.replaceAll("//workspace/scal-server/api/scal/toAnalyze/toAnalyze.sol", "Line ")}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className=" border-0 pt-0">
                                            <Card.Text className=" d-inline">Vulnerability Impact: {analysis.impact}</Card.Text>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            ))}
                        </Row>
                    }
                </div>
            )
        } else if (place.tool === 'manticore') {
            return (
                <div>
                    {place.analysis[0].length === 0 ?
                        <h4>
                            No Vulnerabilities detected
                        </h4>
                        :
                        <Row>
                            {place.analysis?.slice(0, visible).map((analysis) => (
                                <div className="col-xl-12">
                                    <Card>
                                        <Card.Header className=" border-0 pb-0">
                                            <Card.Title>{analysis.error.name}</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                Code:
                                                {analysis.error.code}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className=" border-0 pt-0">
                                            <Card.Text className=" d-inline">At Line: {analysis.error.line}</Card.Text>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            ))}
                        </Row>
                    }
                </div>
            )
        } else if (place.tool === 'solhint') {
            return (
                <div>
                    {place.analysis.length === 0 ?
                        <h4>
                            No Vulnerabilities detected
                        </h4>
                        :
                        <Row>
                            {place.analysis?.slice(0, visible).map((analysis) => (
                                <div className="col-xl-12">
                                    <Card>
                                        <Card.Body>
                                            <Card.Text>
                                                {analysis.message}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className=" border-0 pt-0">
                                            <Card.Text className=" d-inline">At Line: {analysis.line}</Card.Text>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            ))}
                        </Row>
                    }
                </div>
            )
        } else if (place.tool === 'mythril') {
            return (
                <div>
                    {place.analysis.issues.length === 0 ?
                        <h4>
                            No Issues Detected
                        </h4>
                        :
                        <Row>
                            {place.analysis.issues?.slice(0, visible).map((issue) => (
                                <div className="col-xl-12">
                                    <Card>
                                        <Card.Header className=" border-0 pb-0">
                                            <Card.Title>{issue.title}</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                {issue.description}
                                                <br />
                                                <h5>Type: <i>{issue.type}</i></h5>

                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className=" border-0 pt-0">
                                            <Card.Text className=" d-inline">
                                                <h5>
                                                    Code:
                                                    <i class="text-warning"> {issue.code}</i> at line:
                                                    <i class="text-warning"> {issue.lineno}</i>
                                                </h5>
                                            </Card.Text>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            ))}
                        </Row>
                    }
                </div>
            )
        } else if (place.tool === 'oyente') {
            return (
                <div>
                    {place.analysis.length === 0 || place.analysis[0].errors.length === 0 ?
                        <h4>
                            No Vulnerabilities detected
                        </h4>
                        :
                        <>
                            {place.analysis?.map((analysis) => (
                                <Row>
                                    {analysis.errors.map((display) => {
                                        return (
                                            <div className="col-xl-12">
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Text>
                                                            {display.message}
                                                            <br />
                                                            <h5>Type: <i>{display.level}</i></h5>
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Footer className=" border-0 pt-0">
                                                        <Card.Text className=" d-inline">
                                                            At Line:
                                                            <i className="text-warning"> {display.line}</i>
                                                        </Card.Text>
                                                    </Card.Footer>
                                                </Card>
                                            </div>
                                        );
                                    })}
                                </Row>
                            ))}
                        </>
                    }
                </div>
            )
        } else if (place.tool === 'smartcheck') {
            return (
                <div>
                    {place.analysis.length === 0 ?
                        <h4>
                            No Vulnerabilities detected
                        </h4>
                        :
                        <Row>
                            {place.analysis?.slice(0, visible).map((analysis) => (
                                <div className="col-xl-12">
                                    <Card>
                                        <Card.Header className=" border-0 pb-0">
                                            <Card.Title>{analysis.name}</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                {analysis.content}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className=" border-0 pt-0">
                                            <Card.Text className=" d-inline">At line: {analysis.line}</Card.Text>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            ))}
                        </Row>
                    }
                </div>
            )
        } else if (place.tool === 'osiris') {
            return (
                <div>
                    {place.analysis.length === 0 || place.analysis[0].errors.length === 0 ?
                        <h4>
                            No Vulnerabilities detected
                        </h4>
                        :
                        <>
                            {place.analysis?.map((analysis) => (
                                <Row>
                                    {analysis.errors.map((display) => {
                                        return (
                                            <div className="col-xl-12">
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Text>
                                                            {display.message}
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Footer className=" border-0 pt-0">
                                                        <Card.Text className=" d-inline">
                                                            <p>
                                                                At Line:
                                                                <i className="text-warning"> {display.line}</i>
                                                            </p>
                                                        </Card.Text>
                                                    </Card.Footer>
                                                </Card>
                                            </div>
                                        );
                                    })}
                                </Row>
                            ))}
                        </>
                    }
                </div>
            )
        } else if (place.tool === 'honeybadger') {
            return (
                <div>
                    {place.analysis.length === 0 || place.analysis[0].errors.length === 0 ?
                        <h4>
                            No Vulnerabilities detected
                        </h4>
                        :
                        <>
                            {place.analysis?.map((analysis) => (
                                <Row>
                                    {analysis.errors.map((display) => {
                                        return (
                                            <div className="col-xl-12">
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Text>
                                                            {display.message}
                                                            <br />
                                                            <h5>Type: <i>{display.level}</i></h5>
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Footer className=" border-0 pt-0">
                                                        <Card.Text className=" d-inline">
                                                            <h5>
                                                                At Line:
                                                                <i class="text-warning"> {display.line}</i>
                                                            </h5>
                                                        </Card.Text>
                                                    </Card.Footer>
                                                </Card>
                                            </div>
                                        );
                                    })}
                                </Row>
                            ))}
                        </>
                    }
                </div>
            )
        } else if (place.tool === 'maian') {
            return (
                <div>
                    {!place.analysis.is_lock_vulnerable && !place.analysis.is_suicidal_vulnerable && !place.analysis.is_prodigal_vulnerable ?
                        <h4>
                            No Vulnerabilities detected
                        </h4>
                        :
                        <Row>
                            <div className="col-xl-12">
                                <Card>
                                    {place.analysis.is_lock_vulnerable ?
                                        <>
                                            <Card.Header className=" border-0 pb-0">
                                                <Card.Title>Lock Vulnerability</Card.Title>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    The smart contract has a payable function but misses out on the withdrawal function. It implies that there is only a payment option in the smart contract, and if you are a sender in case of a transaction, your funds are bound to get locked in your contract.
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer className=" border-0 pt-0">
                                                <Card.Text className=" d-inline">Vulnerability Impact: High</Card.Text>
                                            </Card.Footer>
                                        </>
                                        :
                                        <> </>
                                    }
                                    {
                                        place.analysis.is_prodigal_vulnerable ?
                                            <>
                                                <Card.Header className=" border-0 pb-0">
                                                    <Card.Title>Prodigal Vulnerability</Card.Title>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Text>
                                                        The smart contract can send Ether to any address, without any restrictions
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer className=" border-0 pt-0">
                                                    <Card.Text className=" d-inline">Vulnerability Impact: High</Card.Text>
                                                </Card.Footer>
                                            </>
                                            :
                                            <></>
                                    }

                                    {
                                        place.analysis.is_suicidal_vulnerable ?
                                            <>
                                                <Card.Header className=" border-0 pb-0">
                                                    <Card.Title>Suicidal Vulnerability</Card.Title>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Text>
                                                        The smart contract can be killed by anyone
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer className=" border-0 pt-0">
                                                    <Card.Text className=" d-inline">Vulnerability Impact: High</Card.Text>
                                                </Card.Footer>
                                            </>
                                            :
                                            <></>
                                    }
                                </Card>


                            </div>
                        </Row>
                    }
                </div>
            )
        } else if (place.tool === 'securify') {
            return (
                <div>
                    {place.analysis === null || Object.keys(place.analysis.toAnalyze.results).length === 0 && place.analysis.toAnalyze.results.constructor === Object
                        ?
                        <h4>
                            No Vulnerabilities detected
                        </h4>
                        :
                        <>
                            {!place.analysis.toAnalyze.results.MissingInputValidation.hasViolations && !place.analysis.toAnalyze.results.DAOConstantGas.hasViolations && !place.analysis.toAnalyze.results.DAO.hasViolations && !place.analysis.toAnalyze.results.TODAmount.hasViolations && !place.analysis.toAnalyze.results.TODReceiver.hasViolations && !place.analysis.toAnalyze.results.TODTransfer.hasViolations && !place.analysis.toAnalyze.results.UnhandledException.hasViolations && !place.analysis.toAnalyze.results.UnrestrictedEtherFlow.hasViolations
                                ?
                                <h4>
                                    No Vulnerabilities detected
                                </h4>
                                :
                                <Row>
                                    <div className="col-xl-12">
                                        <Card>
                                            {place.analysis.toAnalyze.results.MissingInputValidation.hasViolations ?
                                                <>
                                                    <Card.Header className=" border-0 pb-0">
                                                        <Card.Title>Missing Input Validation</Card.Title>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Card.Text>
                                                            This vulnerability is raised when a contract function takes an argument which is assumed to satisfy some pre-conditions but do not check that these preconditions are met.
                                                        </Card.Text>

                                                    </Card.Body>
                                                    <Card.Footer className=" border-0 pt-0">
                                                        <Card.Text className=" d-inline">Vulnerability Impact: High</Card.Text>
                                                    </Card.Footer>
                                                </>
                                                :
                                                <></>
                                            }{
                                                place.analysis.toAnalyze.results.DAOConstantGas.hasViolations ?
                                                    <>
                                                        <Card.Header className=" border-0 pb-0">
                                                            <Card.Title>DAO Constant Gas</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>

                                                            <Card.Text>
                                                                Reports the possibility where changes to state after executing an ether transfer may be vulnerable to a reentrancy attack. An example, a variable holding the remaining ethers held being updated only after sending Ethers. In most cases should be avoided using transfer() or send(), but a better practice is to utilise Checks-Effects-Interactions pattern
                                                            </Card.Text>
                                                        </Card.Body>
                                                        <Card.Footer className=" border-0 pt-0">
                                                            <Card.Text className=" d-inline">Vulnerability Impact: High</Card.Text>
                                                        </Card.Footer>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                            {place.analysis.toAnalyze.results.DAO.hasViolations ?
                                                <>
                                                    <Card.Header className=" border-0 pb-0">
                                                        <Card.Title>DAO</Card.Title>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Card.Text>
                                                            Reports the possibility of reentrancy attacks (similar to the DAO case), and more precisely this pattern checks if all gas is forwarded. Could be avoided by using the transfer() or send() operations which forwards only 2300 gas stipend.
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Footer className=" border-0 pt-0">
                                                        <Card.Text className=" d-inline">Vulnerability Impact: High</Card.Text>
                                                    </Card.Footer>
                                                </>
                                                :
                                                <></>
                                            }
                                            {
                                                place.analysis.toAnalyze.results.TODAmount.hasViolations ?
                                                    <>
                                                        <Card.Header className=" border-0 pb-0">
                                                            <Card.Title>TOD Amount</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Card.Text>
                                                                Reports the possibility where the amount of a transfer may be changed due to transaction ordering within a block. Similar to TODReceiver, but in this case, the amount being transferred may change. An example, during a crowdsale where the token multiplier * ethers received = tokens to send, where the token multipler is a variable which could be changed prior to the actual sending occurs.
                                                            </Card.Text>
                                                        </Card.Body>
                                                        <Card.Footer className=" border-0 pt-0">
                                                            <Card.Text className=" d-inline">Vulnerability Impact: Critical</Card.Text>
                                                        </Card.Footer>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                            {
                                                place.analysis.toAnalyze.results.TODReceiver.hasViolations ?
                                                    <>
                                                        <Card.Header className=" border-0 pb-0">
                                                            <Card.Title>TOD Receiver</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Card.Text>
                                                                Reports the possibility where the receiver of a transfer may be changed due to transaction ordering with a block. An example, if the intended recipient address is stored as a storage variable and a transfer is to execute based off this address, there is a chance the address may be changed or overwritten if there exists such a transaction prior to the transfer.
                                                            </Card.Text>
                                                        </Card.Body>
                                                        <Card.Footer className=" border-0 pt-0">
                                                            <Card.Text className=" d-inline">Vulnerability Impact: Critical</Card.Text>
                                                        </Card.Footer>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                            {
                                                place.analysis.toAnalyze.results.TODTransfer.hasViolations ?
                                                    <>
                                                        <Card.Header className=" border-0 pb-0">
                                                            <Card.Title>TOD Transfer</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>

                                                            <Card.Text>
                                                                Reports the possibility where the order of a transfer may be changed due to transaction ordering with a block.
                                                            </Card.Text>
                                                        </Card.Body>
                                                        <Card.Footer className=" border-0 pt-0">
                                                            <Card.Text className=" d-inline">Vulnerability Impact: Critical</Card.Text>
                                                        </Card.Footer>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                            {
                                                place.analysis.toAnalyze.results.UnhandledException.hasViolations ?
                                                    <>
                                                        <Card.Header className=" border-0 pb-0">
                                                            <Card.Title>Unhandled Exception</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>

                                                            <Card.Text>
                                                                Reports the possibility of whereupon using call() or send(), the return value is not being handled. For example, if a send() operation takes place where the receiving contract runs a fallback function which results in an out of gas error, the send() operation would not revert, but instead return false. Unlike transfer(), which acts like require(send()) and would revert the entire transaction.
                                                            </Card.Text>
                                                        </Card.Body>
                                                        <Card.Footer className=" border-0 pt-0">
                                                            <Card.Text className=" d-inline">Vulnerability Impact: Medium</Card.Text>
                                                        </Card.Footer>
                                                    </>
                                                    :
                                                    <> </>
                                            }
                                            {
                                                place.analysis.toAnalyze.results.UnrestrictedEtherFlow.hasViolations ?
                                                    <>
                                                        <Card.Header className=" border-0 pb-0">
                                                            <Card.Title>Unrestricted Ether Flow</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Card.Text>
                                                                Reports the possibility where issues may arise when the contract allows ether to be received indiscriminately, especially to prevent the possibility where Ethers may be locked up due to a missing transfer operation.
                                                            </Card.Text>
                                                        </Card.Body>
                                                        <Card.Footer className=" border-0 pt-0">
                                                            <Card.Text className=" d-inline">Vulnerability Impact: Medium</Card.Text>
                                                        </Card.Footer>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                        </Card>

                                    </div>
                                </Row>
                            }
                        </>

                    }
                </div>
            )
        } else {
            <h4>
                No Vulnerabilities detected
            </h4>
        }
    });

    return (
        <Row>
            <div className="col-xl-12">
                <Card>
                    <Card.Header>
                        <Card.Title>Analysis #2</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Paste a solidity smart contract code  to analyze.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
                        <Card.Text className=" text-dark d-inline">
                            **Only solidity code can be analyzed
                        </Card.Text>

                        {/* <!-- modal --> */}
                        <Button
                            variant="primary"
                            className="mb-2 me-2"
                            onClick={() => setPasteModal(true)}
                        >
                            Paste Code

                        </Button>
                        {/* Import Modal */}
                        <Modal
                            className="fade bd-example-modal-lg"
                            show={pasteModal}
                            size="lg"
                        >
                            <Modal.Header>
                                <Modal.Title>Paste Solidity Code</Modal.Title>
                                <Button
                                    variant=""
                                    className="btn-close"
                                    onClick={() => {
                                        setPasteModal(false)
                                        setloader(false)
                                        setErrors(null)
                                        setAnalysisName('')
                                        setFile('')
                                        setTools(['slither'])
                                    }}
                                >
                                </Button>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="card-body">
                                    <div className="basic-form">
                                        <form>
                                            <label>Analysis Name</label>
                                            <div className="form-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control input-default "
                                                    placeholder="Give this analysis a name..."
                                                    value={analysisName}
                                                    onChange={(e) => setAnalysisName(e.target.value)}
                                                />
                                            </div>
                                            <label>Paste your solidity code in the textbox</label>
                                            <div className="form-group mb-3">
                                                <textarea
                                                    className="form-control form-control-sp"
                                                    rows="10"
                                                    id="comment"
                                                    value={file}
                                                    onChange={(e) => setFile(e.target.value)}
                                                ></textarea>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label>Select Audit tool:</label>

                                                <select
                                                    onChange={(e) => {
                                                        setTools(e.target.value.toLowerCase().split(" "));
                                                    }}
                                                    className="form-control"
                                                    id="sel1"
                                                >
                                                    <option>Slither</option>
                                                    <option>Manticore</option>
                                                    <option>Solhint</option>
                                                    <option>Oyente</option>
                                                    <option>Osiris</option>
                                                    <option>Honeybadger</option>
                                                    <option>Securify</option>
                                                    <option>Mythril</option>
                                                    <option>Maian</option>
                                                    <option>SmartCheck</option>
                                                </select>

                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>
                                {!loader ?
                                    <>
                                        {errors !== null ?
                                            <h5 className="text-danger">{errors.file}. {errors.name}</h5>
                                            :
                                            <></>
                                        }
                                        <Button
                                            variant="danger light"
                                            onClick={() => {
                                                setPasteModal(false)
                                                setAnalysisName('')
                                                setErrors(null)
                                                setFile('')
                                                setTools(['slither'])
                                            }}
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            variant=""
                                            className="btn btn-primary"
                                            onClick={onRunAnalysis}
                                        >
                                            Run Analysis
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <h5>Analysing your contract. This might take a while...</h5>
                                        <Button
                                            variant=""
                                            className="btn btn-primary"
                                        >
                                            <ThreeCircles
                                                height="20"
                                                width="20"
                                                color="white"
                                                visible={true}
                                                ariaLabel="three-circles-rotating"
                                            />
                                        </Button>
                                    </>

                                }
                            </Modal.Footer>
                        </Modal>
                        {/* Result Modal */}
                        <Modal
                            className="fade bd-example-modal-lg"
                            show={resultModal}
                            size="lg"
                        >
                            <Modal.Header>
                                <Modal.Title>Analysis Result</Modal.Title>
                                <Button
                                    variant=""
                                    className="btn-close"
                                    onClick={() => {
                                        setResultModal(false)
                                        setAnalysisName('')
                                        setFile('')
                                        setSave('')
                                        setTools(['slither'])
                                        setNoOfVulns(0)
                                        setOutput(null)
                                    }}
                                >
                                </Button>
                            </Modal.Header>
                            <Modal.Body ref={ref}>
                                <h4>Analysis Name: {analysisName}</h4>
                                <h4>Tool Used: {tools}</h4>
                                <h4>Analysis Result: </h4>
                                {analysisData}
                            </Modal.Body>
                            <Modal.Footer>
                                {save !== null ?
                                    <h5>{save}</h5>
                                    :
                                    <></>
                                }
                                <Button
                                    variant="danger light"
                                    onClick={() => {
                                        setResultModal(false)
                                        setAnalysisName('')
                                        setFile('')
                                        setTools(['slither'])
                                        setSave('')
                                        setNoOfVulns(0)
                                        setOutput(null)
                                    }
                                    }
                                >
                                    Close
                                </Button>
                                <Button
                                    variant=""
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={saveAnalysis}
                                >
                                    <i className="fa fa-save me-1"
                                    ></i>
                                    Save Analysis
                                </Button>
                                <Pdf targetRef={ref} filename="scal-analysis.pdf">
                                    {({ toPdf }) => <button variant=""
                                        type="button"
                                        className="btn btn-primary" onClick={toPdf}> <i className="fa fa-download me-1"></i>
                                        Download Analysis</button>
                                    }
                                </Pdf>
                            </Modal.Footer>
                        </Modal>
                    </Card.Footer>
                </Card>
            </div>
        </Row>
    )
}

export default PasteAnalysis