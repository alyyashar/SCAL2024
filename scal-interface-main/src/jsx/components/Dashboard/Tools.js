import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { Row, Card, Button, Modal } from "react-bootstrap";

const Tools = () => {
  const [modalManticore, setModalManticore] = useState(false);
  const [modalSlither, setModalSlither] = useState(false);
  const [modalHoneybadger, setModalHoneybadger] = useState(false);
  const [modalMythril, setModalMythril] = useState(false);
  const [modalOsiris, setModalOsiris] = useState(false);
  const [modalMaian, setModalMaian] = useState(false);
  const [modalSecurify, setModalSecurify] = useState(false);
  const [modalOyente, setModalOyente] = useState(false);
  const [modalSmartcheck, setModalSmartcheck] = useState(false);
  const [modalSolhint, setModalSolhint] = useState(false);

  return (
    <Fragment>

      <Row>
        {/* <!-- Manticore --> */}
        <Modal className="fade" show={modalManticore}>
          <Modal.Header>
            <Modal.Title>MANTICORE</Modal.Title>
            <Button
              onClick={() => setModalManticore(false)}
              variant=""
              className="btn-close"
            >

            </Button>
          </Modal.Header>
          <Modal.Body>
            <p>
              Manticore is a symbolic execution tool for the analysis of smart contracts and binaries.
            </p>
            <h5 className="mt-1">Features</h5>
            <ul>
              <li>Program Exploration: Manticore can execute a program with symbolic inputs and explore all the possible states it can reach
              </li>
              <hr />
              <li>Input Generation: Manticore can automatically produce concrete inputs that result in a given program state</li>
              <hr />
              <li>Error Discovery: Manticore can detect crashes and other failure cases in binaries and smart contracts</li>
              <hr />
              <li>Instrumentation: Manticore provides fine-grained control of state exploration via event callbacks and instruction hooks</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setModalManticore(false)}
              variant="danger light"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-xl-12">
          <Card>
            <Card.Header>
              <Card.Title>MANTICORE</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Developed by Trail Of Bits, uses symbolic execution to find execution paths in EVM bytecode that lead to reentrancy vulnerabilities and reachable self-destruct operations.
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
              <Card.Text className=" text-dark d-inline">
                Symbolic Execution Tool
              </Card.Text>
              <Button
                variant="primary"
                type="button"
                className="mb-2 me-2"
                onClick={() => setModalManticore(true)}
              >
                Read More
              </Button>
            </Card.Footer>
          </Card>
        </div>
        {/* <!-- Slither --> */}
        <Modal className="fade" show={modalSlither}>
          <Modal.Header>
            <Modal.Title>SLITHER</Modal.Title>
            <Button
              onClick={() => setModalSlither(false)}
              variant=""
              className="btn-close"
            >
            </Button>
          </Modal.Header>
          <Modal.Body>
            <p>
              Slither is a Solidity static analysis framework written in Python 3. It runs a suite of vulnerability detectors, prints visual information about contract details, and provides an API to easily write custom analyses. Slither enables developers to find vulnerabilities, enhance their code comprehension, and quickly prototype custom analyses.
              <h5 className="mt-1">Features</h5>
              <ul>
                <li>Detects vulnerable Solidity code with low false positives (see the list of trophies)</li>
                <hr />
                <li>Identifies where the error condition occurs in the source code</li>
                <hr />
                <li>Easily integrates into continuous integration and Truffle builds</li>
                <hr />
                <li>Built-in 'printers' quickly report crucial contract information</li>
                <hr />
                <li>Ability to analyze contracts written with Solidity 0.4</li>
                <hr />
                <li>Intermediate representation (SlithIR) enables simple, high-precision analyses</li>
                <hr />
                <li>Average execution time of less than 1 second per contract</li>
              </ul>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setModalSlither(false)}
              variant="danger light"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-xl-12">
          <Card>
            <Card.Header>
              <Card.Title>SLITHER</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Developed by Trail Of Bits, is a static analysis framework that converts Solidity smart contracts into an intermediate representation called SlithIR and applies known program analysis techniques such as dataflow and taint tracking to extract and refine information.
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
              <Card.Text className=" text-dark d-inline">
                Static Analysis Tool
              </Card.Text>
              <Button
                variant="primary"
                type="button"
                className="mb-2 me-2"
                onClick={() => setModalSlither(true)}
              >
                Read More
              </Button>
            </Card.Footer>
          </Card>
        </div>
        {/* <!-- HoneyBadger --> */}
        <Modal className="fade" show={modalHoneybadger}>
          <Modal.Header>
            <Modal.Title>HONEYBADGER</Modal.Title>
            <Button
              onClick={() => setModalHoneybadger(false)}
              variant=""
              className="btn-close"
            >
            </Button>
          </Modal.Header>
          <Modal.Body>
            <p>
              Honeybadger consists of three main components: symbolic
              analysis, cash flow analysis and honeypot analysis. The symbolic analysis component constructs the control flow graph
              (CFG) and symbolically executes its different paths. The result of the symbolic analysis is afterwards propagated to the
              cash flow analysis component as well as the honeypot analysis component. The cash flow analysis component uses the
              result of the symbolic analysis to detect whether the contract
              is capable to receive as well as transfer funds. Finally, the
              honeypot analysis component aims at detecting the different
              honeypots techniques using a combination of heuristics and the results of the symbolic analysis.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setModalHoneybadger(false)}
              variant="danger light"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-xl-12">
          <Card>
            <Card.Header>
              <Card.Title>HONEYBADGER</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                It is an Oyente-based tool that employs symbolic execution and a set of heuristics to pinpoint honeypots in smart contracts. Honeypots are smart contracts that appear to have an obvious flaw in their design, which allows an arbitrary user to drain Ether from the contract, given that the user transfers a certain amount of Ether to the contract. When HoneyBadger detects that a contract appears to be vulnerable, it means that the developer of the contract wanted to make the contract look vulnerable, but is not vulnerable
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
              <Card.Text className=" text-dark d-inline">
                Honeypot Detection Tool
              </Card.Text>
              <Button
                variant="primary"
                type="button"
                className="mb-2 me-2"
                onClick={() => setModalHoneybadger(true)}
              >
                Read More
              </Button>
            </Card.Footer>
          </Card>
        </div>
        {/* <!-- Mythril --> */}
        <Modal className="fade" show={modalMythril}>
          <Modal.Header>
            <Modal.Title>MYTHRIL</Modal.Title>
            <Button
              onClick={() => setModalMythril(false)}
              variant=""
              className="btn-close"
            >
            </Button>
          </Modal.Header>
          <Modal.Body>
            <p>
              Mythril is a security analysis tool for Ethereum smart contracts. It detects a range of security issues, including integer underflows, owner-overwrite-to-Ether-withdrawal, and others. Note that Mythril is targeted at finding common vulnerabilities, and is not able to discover issues in the business logic of an application. Furthermore, Mythril and symbolic executors are generally unsound, as they are often unable to explore all possible states of a program.

              <h5 className="mt-1">Mythril is capable detecting:</h5>
              <ul>
                <li>Delegate Call To Untrusted Contract</li>
                <hr />
                <li>Dependence on Predictable Variables</li>
                <hr />
                <li>Ether Thief</li>
                <hr />
                <li>Exceptions</li>
                <hr />
                <li>External Calls</li>
                <hr />
                <li>Integer</li>
                <hr />
                <li>Multiple Sends</li>
                <hr />
                <li>Suicide</li>
                <hr />
                <li>State Change External Calls</li>
                <hr />
                <li>Unchecked Retval</li>
                <hr />
                <li>User Supplied assertion</li>
                <hr />
                <li>Arbitrary Storage Write</li>
                <hr />
                <li>Arbitrary Jump</li>
              </ul>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setModalMythril(false)}
              variant="danger light"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-xl-12">
          <Card>
            <Card.Header>
              <Card.Title>MYTHRIL</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Mythril is a security analysis tool for EVM bytecode. It detects security vulnerabilities in smart contracts built for Ethereum, Hedera, Quorum, Vechain, Roostock, Tron and other EVM-compatible blockchains. It uses symbolic execution, SMT solving and taint analysis to detect a variety of security vulnerabilities.
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
              <Card.Text className=" text-dark d-inline">
                Security Analysis Tool
              </Card.Text>
              <Button
                variant="primary"
                type="button"
                className="mb-2 me-2"
                onClick={() => setModalMythril(true)}
              >
                Read More
              </Button>
            </Card.Footer>
          </Card>
        </div>
        {/* <!-- Osiris --> */}
        <Modal className="fade" show={modalOsiris}>
          <Modal.Header>
            <Modal.Title>OSIRIS</Modal.Title>
            <Button
              onClick={() => setModalOsiris(false)}
              variant=""
              className="btn-close"
            >
            </Button>
          </Modal.Header>
          <Modal.Body>
            <p>
              Osiris is a framework that combines symbolic execution and taint analysis, in order to accurately find integer bugs in Ethereum smart contracts. Osiris detects a greater range of bugs than existing tools, while providing a better specificity of its detection. Besides being able to identify several vulnerabilities, it is also able to identify a yet unknown critical vulnerability in a couple of smart contracts that are currently deployed on the Ethereum blockchain.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setModalOsiris(false)}
              variant="danger light"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-xl-12">
          <Card>
            <Card.Header>
              <Card.Title>OSIRIS</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                An analysis tool to detect integer bugs in Ethereum smart contracts. Osiris is based on Oyente.
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
              <Card.Text className=" text-dark d-inline">
                Integer Bug Detection Tool
              </Card.Text>
              <Button
                variant="primary"
                type="button"
                className="mb-2 me-2"
                onClick={() => setModalOsiris(true)}
              >
                Read More
              </Button>
            </Card.Footer>
          </Card>
        </div>
        {/* <!-- Maian --> */}
        <Modal className="fade" show={modalMaian}>
          <Modal.Header>
            <Modal.Title>MAIAN</Modal.Title>
            <Button
              onClick={() => setModalMaian(false)}
              variant=""
              className="btn-close"
            >
            </Button>
          </Modal.Header>
          <Modal.Body>
            <p>
              Maian is a tool for precisely specifying and reasoning about trace properties, which employs inter-procedural symbolic analysis and concrete validator for exhibiting real exploits. It finds exploits for the infamous Parity bug that indirectly locked 200 million dollars worth in Ether, which previous analyses failed to capture.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setModalMaian(false)}
              variant="danger light"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-xl-12">
          <Card>
            <Card.Header>
              <Card.Title>MAIAN</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                An Oyente-based tool for automatic detection of buggy Ethereum smart contracts of three different types: prodigal, suicidal and greedy. Maian processes contract's bytecode and tries to build a trace of transactions to find and confirm bugs
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
              <Card.Text className=" text-dark d-inline">
                Trace Vulnerability Detection Tool
              </Card.Text>
              <Button
                variant="primary"
                type="button"
                className="mb-2 me-2"
                onClick={() => setModalMaian(true)}
              >
                Read More
              </Button>
            </Card.Footer>
          </Card>
        </div>
        {/* <!-- Securify --> */}
        <Modal className="fade" show={modalSecurify}>
          <Modal.Header>
            <Modal.Title>SECURIFY 2.0</Modal.Title>
            <Button
              onClick={() => setModalSecurify(false)}
              variant=""
              className="btn-close"
            >
            </Button>
          </Modal.Header>
          <Modal.Body>
            <p>
              Securify is a security analyzer for Ethereum smart contracts that is scalable, fully automated,
              and able to prove contract behaviors as safe/unsafe with respect to
              a given property. Securify’s analysis consists of two steps. First, it
              symbolically analyzes the contract’s dependency graph to extract
              precise semantic information from the code. Then, it checks compliance and violation patterns that capture sufficient conditions
              for proving if a property holds or not.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setModalSecurify(false)}
              variant="danger light"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-xl-12">
          <Card>
            <Card.Header>
              <Card.Title>SECURIFY 2.0</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Securify 2.0 is a security scanner for Ethereum smart contracts supported by the Ethereum Foundation and ChainSecurity. The core research behind Securify was conducted at the Secure, Reliable, and Intelligent Systems Lab at ETH Zurich.
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
              <Card.Text className=" text-dark d-inline">
                Static Analysis Tool
              </Card.Text>
              <Button
                variant="primary"
                type="button"
                className="mb-2 me-2"
                onClick={() => setModalSecurify(true)}
              >
                Read More
              </Button>
            </Card.Footer>
          </Card>
        </div>
        {/* <!-- Oyente --> */}
        <Modal className="fade" show={modalOyente}>
          <Modal.Header>
            <Modal.Title>OYENTE</Modal.Title>
            <Button
              onClick={() => setModalOyente(false)}
              variant=""
              className="btn-close"
            >
            </Button>
          </Modal.Header>
          <Modal.Body>
            <p>
              Oyente is a symbolic execution tool capable of detecting various smart contract vulnerabilities that exists in the Solidity programming language.</p>
              <h5 className="mt-1">Oyente is capable detecting:</h5>
              <ul>
                <li>Transaction-Ordering Dependence</li>
                <hr />
                <li>Timestamp Dependence</li>
                <hr />
                <li>Mishandled Exceptions</li>
                <hr />
                <li>Reentrancy Vulnerability</li>
              </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setModalOyente(false)}
              variant="danger light"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-xl-12">
          <Card>
            <Card.Header>
              <Card.Title>OYENTE</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
              Developed by Melonport AG, is one of the first smart contract analysis tools. It is also used as a basis for several other approaches like Maian and Osiris. Oyente uses symbolic execution on EVM bytecode to identify vulnerabilities
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
              <Card.Text className=" text-dark d-inline">
              Symbolic Execution Tool
              </Card.Text>
              <Button
                variant="primary"
                type="button"
                className="mb-2 me-2"
                onClick={() => setModalOyente(true)}
              >
                Read More
              </Button>
            </Card.Footer>
          </Card>
        </div>
        {/* <!-- Smartcheck--> */}
        <Modal className="fade" show={modalSmartcheck}>
          <Modal.Header>
            <Modal.Title>SMARTCHECK</Modal.Title>
            <Button
              onClick={() => setModalSmartcheck(false)}
              variant=""
              className="btn-close"
            >
            </Button>
          </Modal.Header>
          <Modal.Body>
            <p>SmartCheck is an extensible static analysis tool that detects them. SmartCheck translates Solidity source code into an XML-based intermediate representation and checks it against XPath patterns.</p>
            <p>SmartCheck has its limitations, as detection of some bugs requires more sophisticated techniques such as taint analysis or even manual audit</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setModalSmartcheck(false)}
              variant="danger light"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-xl-12">
          <Card>
            <Card.Header>
              <Card.Title>SMARTCHECK</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
              It is an extensible static analysis tool for discovering vulnerabilities and other code issues in Ethereum smart contracts written in the Solidity programming language.
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
              <Card.Text className=" text-dark d-inline">
              Static Analysis Tool
              </Card.Text>
              <Button
                variant="primary"
                type="button"
                className="mb-2 me-2"
                onClick={() => setModalSmartcheck(true)}
              >
                Read More
              </Button>
            </Card.Footer>
          </Card>
        </div>
        {/* <!-- Solhint--> */}
        <Modal className="fade" show={modalSolhint}>
          <Modal.Header>
            <Modal.Title>SOLHINT</Modal.Title>
            <Button
              onClick={() => setModalSolhint(false)}
              variant=""
              className="btn-close"
            >
            </Button>
          </Modal.Header>
          <Modal.Body>
            <p>Solhint provides security and style guide validations for solidity smart contracts</p>
            <p>For example, visibility modifiers orders and naming, variable naming among others. </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setModalSolhint(false)}
              variant="danger light"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-xl-12">
          <Card>
            <Card.Header>
              <Card.Title>SOLHINT</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
              This is an open source project for linting Solidity code. This project provides both Security and Style Guide validations.
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
              <Card.Text className=" text-dark d-inline">
              Security Linting Tool
              </Card.Text>
              <Button
                variant="primary"
                type="button"
                className="mb-2 me-2"
                onClick={() => setModalSolhint(true)}
              >
                Read More
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </Fragment >
  )
}

export default Tools