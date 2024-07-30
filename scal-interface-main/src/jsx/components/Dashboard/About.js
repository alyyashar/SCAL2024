import React, { Fragment, useState } from "react";

import { Row, Card, Col, Accordion, ListGroup } from "react-bootstrap";


const About = () => {
  const [activeAccordionHeaderBg, setActiveAccordionHeaderBg] = useState(0);

  const defaultAccordion = [
    {
      title: "What is SCAL?",
      text:
        "SCAL, also reffered to as Smart Contract Audit Lab is a set of tools accumulated by Frontal to ensure the safety of your smart contract via analysis. You can audit your smart contracts habitually with an interactive UI, and get the results within a couple of minutes.",
      bg: "primary",
    },
    {
      title: "How do I use SCAL?",
      text:
        "To use SCAL, once you have a login access, simply click on the 'Scan Solidity' tab, add your smart contract via import or paste select the required tool and click on 'Run Analysis'.",

      bg: "primary",
    },
    {
      title: "What chains are supported by SCAL?",
      text:
        "SCAL perform audit on solidity smart contracts, therefore works with any chain that uses solidity programming language for its smart contracts. For example, Ethereum, Binance Smart Chain, Polygon, among others.",

      bg: "primary",
    },
  ];

  const listItem = [
    "TOD(Front-running)",
    "Random Number",
    "Timestamp Dependence",
    "Unpredictable State",
    "Denial of Service",
    "Reentrancy",
    "Unchecked call",
    "Tx.origin",
    "Unchecked math",
    "Self destruct",
    "Unchecked call(With low-level calls like call() delegatecall() and send())",
    "Depreciations... and many more",
  ];

  return (
    <Fragment>

      <Row>
        <div className="col-xl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title className="text-center"><h1>SCAL</h1></Card.Title>
              <Card.Text className="text-center m-0 subtitle">
                SMART CONTRACT AUDIT LAB
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <h3>SCAL is a framework used for analysing smart contracts for threats and vulnerabilities through automation. It integrates several smart contract auditing libraries and packages with formal verification and embedded static and dynamic analysis capabilities to scan smart contract code and detect vulnerabilities and promote a streamlined and easy-to-use platform.
                </h3>
                <hr />
                <h5>SCAL as an entire framework, with different tools running on it has various level of vulnerability detection. With regards to the current state of the framework, the following vulnerabilities can be detected:</h5>
                <ListGroup as="ul" variant="flush">
                  {listItem.map((list, i) => (
                    <Fragment key={i}>
                      <ListGroup.Item as="li">{list}</ListGroup.Item>
                    </Fragment>
                  ))}
                </ListGroup>
                <ul>

                </ul>
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" border-0 pt-0">
              <Card.Text className=" d-inline"><i>SCAL is also available as a Command-Line Interface(CLI) with a framework with smart contract analysis capabilities and another framework that can analyse Bytecode.</i></Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <Col xl="12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title className="text-center">SCAL FAQs</Card.Title>

            </Card.Header>
            <Card.Body>
              <Accordion
                className="accordion accordion-header-bg accordion-bordered accordion-primary-solid"
                defaultActiveKey="0"
              >
                {defaultAccordion.map((d, i) => (
                  <div className="accordion-item" key={i}>
                    <Accordion.Toggle
                      as={Card.Text}
                      eventKey={`${i}`}
                      className={`accordion-header ${activeAccordionHeaderBg === i ? "" : "collapsed"
                        } accordion-header-${d.bg}`}
                      onClick={() =>
                        setActiveAccordionHeaderBg(
                          activeAccordionHeaderBg === i ? -1 : i
                        )
                      }
                    >
                      <span className="accordion-header-icon"></span>
                      <span className="accordion-header-text">{d.title}</span>
                      <span className="accordion-header-indicator"></span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`${i}`} >
                      <div className="accordion-body-text">{d.text}</div>
                    </Accordion.Collapse>
                  </div>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default About