import { Row, Card } from "react-bootstrap";

const AnalysisResult = ({ props }) => {
    const visible = 500;
    console.log(props)
    console.log(props.output)
    return (
        <>
            {props.toolUsed == 'slither' ?
                <div>
                    {props.output.length === 0 || props.output === null ?
                        <>
                            <h4>Analysis Name: {props.analysisName}</h4>
                            <h4>Tool Used: {props.toolUsed}</h4>
                            <h4>Analysis Result: </h4>
                            {/*Analysis result goes here */}
                            <h4>
                                No Vulnerabilities detected
                            </h4>

                        </>

                        :
                        <Row>
                            <h4>Analysis Name: {props.analysisName}</h4>
                            <h4>Tool Used: {props.toolUsed}</h4>
                            <h4>Analysis Result: </h4>
                            {/*Analysis result goes here */}
                            {props.output?.slice(0, visible).map((analysis) => (
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
                :
                <>
                    {props.toolUsed == 'manticore' ?
                        <div>
                            {props.output[0].length === 0 ?
                                <>
                                    <h4>Analysis Name: {props.analysisName}</h4>
                                    <h4>Tool Used: {props.toolUsed}</h4>
                                    <h4>Analysis Result: </h4>
                                    {/*Analysis result goes here */}
                                    <h4>
                                        No Vulnerabilities detected
                                    </h4>

                                </>
                                :
                                <Row>
                                    <h4>Analysis Name: {props.analysisName}</h4>
                                    <h4>Tool Used: {props.toolUsed}</h4>
                                    <h4>Analysis Result: </h4>
                                    {/*Analysis result goes here */}
                                    {props.output?.slice(0, visible).map((analysis) => (
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
                        :
                        <>
                            {props.toolUsed == 'solhint' ?
                                <div>
                                    {props.output.length === 0 ?
                                        <>
                                            <h4>Analysis Name: {props.analysisName}</h4>
                                            <h4>Tool Used: {props.toolUsed}</h4>
                                            <h4>Analysis Result: </h4>
                                            {/*Analysis result goes here */}
                                            <h4>
                                                No Vulnerabilities detected
                                            </h4>

                                        </>
                                        :
                                        <Row>
                                            <h4>Analysis Name: {props.analysisName}</h4>
                                            <h4>Tool Used: {props.toolUsed}</h4>
                                            <h4>Analysis Result: </h4>
                                            {/*Analysis result goes here */}
                                            {props.output?.slice(0, visible).map((analysis) => (
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
                                :
                                <>
                                    {props.toolUsed == 'mythril' ?
                                        <div>
                                            {props.output[0].issues.length === 0 ?
                                                <>
                                                    <h4>Analysis Name: {props.analysisName}</h4>
                                                    <h4>Tool Used: {props.toolUsed}</h4>
                                                    <h4>Analysis Result: </h4>
                                                    {/*Analysis result goes here */}
                                                    <h4>
                                                        No Vulnerabilities detected
                                                    </h4>

                                                </>
                                                :
                                                <Row>
                                                    <h4>Analysis Name: {props.analysisName}</h4>
                                                    <h4>Tool Used: {props.toolUsed}</h4>
                                                    <h4>Analysis Result: </h4>
                                                    {/*Analysis result goes here */}

                                                    {props.output[0].issues?.slice(0, visible).map((issue) => (
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
                                        :
                                        <>
                                            {props.toolUsed == 'oyente' ?
                                                <div>
                                                    {props.output.length === 0 || props.output[0].errors.length === 0 ?
                                                        <>
                                                            <h4>Analysis Name: {props.analysisName}</h4>
                                                            <h4>Tool Used: {props.toolUsed}</h4>
                                                            <h4>Analysis Result: </h4>
                                                            {/*Analysis result goes here */}
                                                            <h4>
                                                                No Vulnerabilities detected
                                                            </h4>

                                                        </>
                                                        :
                                                        <>
                                                            <h4>Analysis Name: {props.analysisName}</h4>
                                                            <h4>Tool Used: {props.toolUsed}</h4>
                                                            <h4>Analysis Result: </h4>
                                                            {/*Analysis result goes here */}
                                                            {props.output?.map((analysis) => (
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
                                                :
                                                <>
                                                    {props.toolUsed == 'smartcheck' ?
                                                        <div>
                                                            {props.output.length === 0 ?
                                                                <>
                                                                    <h4>Analysis Name: {props.analysisName}</h4>
                                                                    <h4>Tool Used: {props.toolUsed}</h4>
                                                                    <h4>Analysis Result: </h4>
                                                                    {/*Analysis result goes here */}
                                                                    <h4>
                                                                        No Vulnerabilities detected
                                                                    </h4>

                                                                </>
                                                                :
                                                                <Row>
                                                                    <h4>Analysis Name: {props.analysisName}</h4>
                                                                    <h4>Tool Used: {props.toolUsed}</h4>
                                                                    <h4>Analysis Result: </h4>
                                                                    {/*Analysis result goes here */}
                                                                    {props.output?.slice(0, visible).map((analysis) => (
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
                                                        :
                                                        <>
                                                            {props.toolUsed == 'osiris' ?
                                                                <div>
                                                                    {props.output.length === 0 ?
                                                                        <>
                                                                            <h4>Analysis Name: {props.analysisName}</h4>
                                                                            <h4>Tool Used: {props.toolUsed}</h4>
                                                                            <h4>Analysis Result: </h4>
                                                                            {/*Analysis result goes here */}
                                                                            <h4>
                                                                                No Vulnerabilities detected
                                                                            </h4>

                                                                        </>
                                                                        :
                                                                        <>
                                                                            <h4>Analysis Name: {props.analysisName}</h4>
                                                                            <h4>Tool Used: {props.toolUsed}</h4>
                                                                            <h4>Analysis Result: </h4>
                                                                            {/*Analysis result goes here */}
                                                                            {props.output?.map((analysis) => (
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
                                                                :
                                                                <>
                                                                    {props.toolUsed == 'honeybadger' ?
                                                                        <div>
                                                                            {props.output.length === 0 || props.output[0].errors.length === 0 ?
                                                                                <>
                                                                                    <h4>Analysis Name: {props.analysisName}</h4>
                                                                                    <h4>Tool Used: {props.toolUsed}</h4>
                                                                                    <h4>Analysis Result: </h4>
                                                                                    {/*Analysis result goes here */}
                                                                                    <h4>
                                                                                        No Vulnerabilities detected
                                                                                    </h4>

                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <h4>Analysis Name: {props.analysisName}</h4>
                                                                                    <h4>Tool Used: {props.toolUsed}</h4>
                                                                                    <h4>Analysis Result: </h4>
                                                                                    {/*Analysis result goes here */}
                                                                                    {props.output?.map((analysis) => (
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
                                                                        :
                                                                        <>
                                                                            {props.toolUsed == 'maian' ?
                                                                                <div>
                                                                                    {!props.output[0].is_lock_vulnerable && !props.output[0].is_suicidal_vulnerable && !props.output[0].is_prodigal_vulnerable ?
                                                                                        <>
                                                                                            <h4>Analysis Name: {props.analysisName}</h4>
                                                                                            <h4>Tool Used: {props.toolUsed}</h4>
                                                                                            <h4>Analysis Result: </h4>
                                                                                            {/*Analysis result goes here */}
                                                                                            <h4>
                                                                                                No Vulnerabilities detected
                                                                                            </h4>

                                                                                        </>
                                                                                        :
                                                                                        <Row>
                                                                                            <h4>Analysis Name: {props.analysisName}</h4>
                                                                                            <h4>Tool Used: {props.toolUsed}</h4>
                                                                                            <h4>Analysis Result: </h4>
                                                                                            {/*Analysis result goes here */}
                                                                                            <div className="col-xl-12">
                                                                                                <Card>
                                                                                                    {props.output[0].is_lock_vulnerable ?
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
                                                                                                        props.output[0].is_prodigal_vulnerable ?
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
                                                                                                        props.output[0].is_suicidal_vulnerable ?
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
                                                                                :
                                                                                <>
                                                                                    {props.toolUsed == 'securify' ?
                                                                                        <div>
                                                                                            {props.output === null || !props.output[0].toAnalyze.results.MissingInputValidation.hasViolations && !props.output[0].toAnalyze.results.DAOConstantGas.hasViolations && !props.output[0].toAnalyze.results.DAO.hasViolations && !props.output[0].toAnalyze.results.TODAmount.hasViolations && !props.output[0].toAnalyze.results.TODReceiver.hasViolations && !props.output[0].toAnalyze.results.TODTransfer.hasViolations && !props.output[0].toAnalyze.results.UnhandledException.hasViolations && !props.output[0].toAnalyze.results.UnrestrictedEtherFlow.hasViolations ?
                                                                                                <>
                                                                                                    <h4>Analysis Name: {props.analysisName}</h4>
                                                                                                    <h4>Tool Used: {props.toolUsed}</h4>
                                                                                                    <h4>Analysis Result: </h4>
                                                                                                    {/*Analysis result goes here */}
                                                                                                    <h4>
                                                                                                        No Vulnerabilities detected
                                                                                                    </h4>

                                                                                                </>
                                                                                                :
                                                                                                <Row>
                                                                                                    <h4>Analysis Name: {props.analysisName}</h4>
                                                                                                    <h4>Tool Used: {props.toolUsed}</h4>
                                                                                                    <h4>Analysis Result: </h4>
                                                                                                    {/*Analysis result goes here */}
                                                                                                    <div className="col-xl-12">
                                                                                                        <Card>
                                                                                                            {props.output[0].toAnalyze.results.MissingInputValidation.hasViolations ?
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
                                                                                                                props.output[0].toAnalyze.results.DAOConstantGas.hasViolations ?
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
                                                                                                            {props.output[0].toAnalyze.results.DAO.hasViolations ?
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
                                                                                                                props.output[0].toAnalyze.results.TODAmount.hasViolations ?
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
                                                                                                                props.output[0].toAnalyze.results.TODReceiver.hasViolations ?
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
                                                                                                                props.output[0].toAnalyze.results.TODTransfer.hasViolations ?
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
                                                                                                                props.output[0].toAnalyze.results.UnhandledException.hasViolations ?
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
                                                                                                                props.output[0].toAnalyze.results.UnrestrictedEtherFlow.hasViolations ?
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
                                                                                        </div>
                                                                                        :
                                                                                        <h4>
                                                                                            No Vulnerabilities detected
                                                                                        </h4>
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
    )
}

export default AnalysisResult;