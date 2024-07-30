import React, { useState } from "react";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

/// Bootstrap
import { Row, Card, Modal, Button } from "react-bootstrap";

const TestAnalysis = () => {
    const [testModal, setTestModal] = useState(false);
    const [resultModal, setResultModal] = useState(false);
  return (
    <Row>
        <div className="col-xl-12">
          <Card>
            <Card.Header>
              <Card.Title>Analysis #3</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Test SCAL using one of our available smart contract
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
              <Card.Text className=" text-dark d-inline">
                **All smart contracts have been deployed to the blockchain
              </Card.Text>

               {/* <!-- modal --> */}
               <Button
                            variant="primary"
                            className="mb-2 me-2"
                            onClick={() => setTestModal(true)}
                        >
                            Paste Code
                        </Button>
                        {/* Import Modal */}
                        <Modal
                            className="fade bd-example-modal-lg"
                            show={testModal}
                            size="lg"
                        >
                            <Modal.Header>
                                <Modal.Title>Paste Solidity Code</Modal.Title>
                                <Button
                                    variant=""
                                    className="btn-close"
                                    onClick={() => setTestModal(false)}
                                >

                                </Button>
                            </Modal.Header>
                            <Modal.Body>



                                <div className="card-body">
                                    <div className="basic-form">
                                        <form onSubmit={(e) => e.preventDefault()}>
                                            <label>Analysis Name</label>
                                            <div className="form-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control input-default "
                                                    placeholder="Give this analysis a name..."
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                    <label>Select a contract to analyze:</label>
                    <select
                      defaultValue={"option"}
                      className="form-control"
                      id="sel1"
                    >
                      <option>BoredApe.sol</option>
                      <option>CryptoPunk.sol</option>
                      <option>RedWave.sol</option>
                      <option>WBTC.sol</option>
                    </select>
                  </div>
                                            <div className="form-group mb-3">

                                                <label>Select Audit tool:</label>

                                                <div className="form-group">

                                                    <div id="multiselect">
                                                        <DropdownMultiselect
                                                            options={["Slither", "Manticore", "Solhint", "Oyente", "Osiris", "Securify", "Honeybadger", "Mythril", "Maian", "Conkas"]}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="danger light"
                                    onClick={() => setTestModal(false)}
                                >
                                    Close
                                </Button>
                                <Button
                                    variant=""
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setResultModal(true)
                                        setTestModal(false)
                                    }
                                    }
                                >
                                    Run Analysis
                                </Button>
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
                                    onClick={() => setResultModal(false)}
                                >

                                </Button>
                            </Modal.Header>
                            <Modal.Body>
                                <p>
                                    "contract": "contracts/bectoken.hex",<br />
                                    "tool": "ethbmc",<br />
                                    "start": 1659179464.7845469,<br />
                                    "end": 1659179465.4309509,<br />
                                    "exit_code": 0,<br />
                                    "duration": 0.6464040279388428,<br />
                                    "findings": none,<br />
                                    "messages": none,<br />
                                    "errors": none,<br />
                                    "fails": none,<br />
                                    "analysis":<br />
                                    <br />

                                    "exploit": none,<br />
                                    "coverage": "3.98%"<br />
                                    <br />
                                    ,
                                    "parser":<br />
                                    "name": "ethbmc",<br />
                                    "version": "2022/07/22"<br />
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="danger light"
                                    onClick={() => setResultModal(false)}
                                >
                                    Close
                                </Button>
                                <Button
                                    variant=""
                                    type="button"
                                    className="btn btn-primary"

                                >
                                    <i className="fa fa-download me-1"></i>
                                    Download Analysis
                                </Button>
                            </Modal.Footer>
                        </Modal>
            </Card.Footer>
          </Card>
        </div>
      </Row>
  )
}

export default TestAnalysis