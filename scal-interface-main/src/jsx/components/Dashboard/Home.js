import React, { useContext, useEffect, useState, useRef } from 'react';
import "react-calendar/dist/Calendar.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from 'axios';
import { isAuth, isTheme } from "../../helpers/Auth";
import TableData from './Home/TableData';


import { Line } from "react-chartjs-2";

const Home = () => {

  const id = isAuth()?._id;
  
  const [totalProj, setTotalProj] = useState(0)
  const [totalSol, setTotalSol] = useState(0)
  const [totalByte, setTotalByte] = useState(0)
  const [totalVulns, setTotalVulns] = useState(0)
  const [graphData, setGraphData] = useState([])
  const [tableValue, setTableValue] = useState(null)
  const [lastVuln, setLastVuln] = useState(0)

  //======== LOADING USER DATA ========//
  useEffect(() => {
    if (id) {
      axios
        .get(`https://5009-alyyashar-scal2024-zyixncvobqi.ws-us115.gitpod.io/api/user/${id}`)
        .then(res => {
          return res.data;
        })
        .then(data => {
          setTableValue(data.scan)
          setTotalProj(data.scan.length)
          setTotalSol(data.scan.length)

          let sum = 0
          let arr = []
          let newDataArray = data.scan.forEach((scan) => {
            arr.push(parseInt(scan.noOfVulns))
            sum += parseInt(scan.noOfVulns);
            setTotalVulns(sum)

          })
          setGraphData(arr);
          setLastVuln(graphData[graphData.length - 1]);

        })
        .catch((err) => console.log(err));
    }
  }, []);

  const motherChackBox = document.querySelector(".product_order_single");
  const chackbox = document.querySelectorAll(".product_order");
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };

  //=======  GRAPH DATA AND OPTIONS  ========//
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    ...graphData,
    datasets: [
      {
        label: "Analysis",
        data: graphData,
        backgroundColor: "#fff",
        borderColor: "rgba(167, 43, 117)",
        borderWidth: 2,
        strokeColor: "rgba(167, 43, 117)",
        capBezierPoints: !0,
        pointColor: "#fff",
        pointBorderColor: "rgba(167, 43, 117)",
        pointBackgroundColor: "rgba(167, 43, 117)",
        pointBorderWidth: 3,
        pointRadius: 1.5,
        pointHoverBackgroundColor: "rgba(167, 43, 117)",
        pointHoverBorderColor: "rgba(167, 43, 117)",
        pointHoverRadius: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: false,
      },
    },
    scales: {
      xAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawBorder: false,
          },
          scaleLabel: {
            display: false,
            labelString: "Month",
          },
        },
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawBorder: false,
          },
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
        },
      ],
    },
    elements: {
      line: {
        tension: 0,
      },
      point: {
        radius: 0,
        borderWidth: 0,
      },
    },
    title: {
      display: false,
    },
  };


  return (
    <>
      {/*======== NUMBER DISPLAY ROW =========*/}
      <div className="row">
        <div className="col-xl-3 col-sm-6">
          <div className="card gradient-1 card-bx">
            <div className="card-body d-flex align-items-center">
              <div className="me-auto text-white">
                <h2 className="text-white">{totalProj}</h2>
                <span className="fs-18">Total Projects Audited</span>
              </div>
              <span className="ms-1 fs-1 text-white fas fa-shield-virus" />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card gradient-2 card-bx">
            <div className="card-body d-flex align-items-center">
              <div className="me-auto text-white">
                <h2 className="text-white">{totalVulns}</h2>
                <span className="fs-18">Total Vulnerabilities Found</span>
              </div>
              <span className="ms-1 fs-ultimate text-white fas fa-bug" />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card gradient-3 card-bx">
            <div className="card-body d-flex align-items-center">
              <div className="me-auto text-white">
                <h2 className="text-white">{totalSol}</h2>
                <span className="fs-18">Total Solidity Audited</span>
              </div>
              <span className="ms-1 fs-ultimate text-white fas fa-code" />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card gradient-4 card-bx">
            <div className="card-body d-flex align-items-center">
              <div className="me-auto text-white">
                <h2 className="text-white">{totalByte}</h2>
                <span className="fs-18">Total Bytecode Audited</span>
              </div>
              <span className="ms-1 fs-ultimatum text-white fab fa-ethereum" />
            </div>
          </div>
        </div>
      </div>
      {/*======== LINE CHART N HACK LIST ROW =========*/}
      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <div className="card">
            <div className="card-body pb-0">
              <h4 className="card-title text-uppercase font-weight-normal">
                Vulnerabilty Analysis
              </h4>
              <h2 className="font-weight-normal text-danger">
                <span>
                  <i className="fa fa-caret-up"></i>
                </span>
                <span className="px-1">{totalVulns}</span>
              </h2>
              <div className="row mt-5">
                <div className="col text-center">
                  <h5 className="font-weight-normal">All Time</h5>
                  <span className="text-normal">{totalVulns}</span>
                </div>
                <div className="col text-center">
                  <h5 className="font-weight-normal">Last Analysis</h5>
                  <span className="text-danger">{lastVuln}</span>
                </div>
              </div>
            </div>
            <div className="chart-wrapper mb-5 mx-5 my-5">
              <div style={{ height: 255 }}>
                <Line data={data} options={options} height={255} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-xxl-6 col-lg-6">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title text-uppercase">Recent Exploits</h4>
            </div>
            <div className="card-body">
              <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_TimeLine"
                className="widget-timeline dz-scroll height370 ps ps--active-y"
              >
                <ul className="timeline">
                  <li>
                    <div className="timeline-badge primary"></div>
                    <span
                      className="timeline-panel"
                    >
                      <span>February 3, 2022</span>
                      <h6 className="mb-0">
                        Wormhole Protocol hacked for {" "}
                        <strong className="text-primary">$325M</strong>.
                      </h6>
                    </span>
                  </li>
                  <li>
                    <div className="timeline-badge primary"></div>
                    <span
                      className="timeline-panel"
                    >
                      <span>March 23, 2022</span>
                      <h6 className="mb-0">
                        Axie Ronin Network hacked for {" "}
                        <strong className="text-primary">$540M</strong>.
                      </h6>
                    </span>
                  </li>
                  <li>
                    <div className="timeline-badge primary"></div>
                    <span
                      className="timeline-panel"
                    >
                      <span>June 8, 2022</span>
                      <h6 className="mb-0">
                        Osmosis DEX hacked for {" "}
                        <strong className="text-primary">$5M</strong>.
                      </h6>
                    </span>
                  </li>
                  <li>
                    <div className="timeline-badge primary"></div>
                    <span
                      className="timeline-panel"
                    >
                      <span>June 10, 2022</span>
                      <h6 className="mb-0">
                        ApolloX hacked for {" "}
                        <strong className="text-primary">$2.8M</strong>.
                      </h6>
                    </span>
                  </li>
                  <li>
                    <div className="timeline-badge primary"></div>
                    <span
                      className="timeline-panel"
                    >
                      <span>June 24, 2022</span>
                      <h6 className="mb-0">
                        Harmony Horizon Bridge hacked for {" "}
                        <strong className="text-primary">$100M</strong>.
                      </h6>
                    </span>
                  </li>
                  <li>
                    <div className="timeline-badge primary"></div>
                    <span
                      className="timeline-panel"
                    >
                      <span>July 28, 2022</span>
                      <h6 className="mb-0">
                        Nirvana Finance hacked for {" "}
                        <strong className="text-primary">$3.5M</strong>.
                      </h6>
                    </span>
                  </li>
                  <li>
                    <div className="timeline-badge primary"></div>
                    <span
                      className="timeline-panel"
                    >
                      <span>August 2, 2022</span>
                      <h6 className="mb-0">
                        Nomad Bridge hacked for {" "}
                        <strong className="text-primary">$190M</strong>.
                      </h6>
                    </span>
                  </li>
                  <li>
                    <div className="timeline-badge primary"></div>
                    <span
                      className="timeline-panel"
                    >
                      <span>October 6, 2022</span>
                      <h6 className="mb-0">
                        BSC Token Hub hacked for {" "}
                        <strong className="text-primary">$100M</strong>.
                      </h6>
                    </span>
                  </li>
                  <li>
                    <div className="timeline-badge primary"></div>
                    <span
                      className="timeline-panel"
                    >
                      <span>October 11, 2022</span>
                      <h6 className="mb-0">
                        TempleDAO hacked for {" "}
                        <strong className="text-primary">$2.34M</strong>.
                      </h6>
                    </span>
                  </li>
                  <li>
                    <div className="timeline-badge primary"></div>
                    <span
                      className="timeline-panel"
                    >
                      <span>October 11, 2022</span>
                      <h6 className="mb-0">
                        QANX Bridge Wallet hacked for {" "}
                        <strong className="text-primary">$1.1M</strong>.
                      </h6>
                    </span>
                  </li>
                  <li>
                    <div className="timeline-badge primary"></div>
                    <span
                      className="timeline-panel"
                    >
                      <span>October 11, 2022</span>
                      <h6 className="mb-0">
                        Rabby Swap hacked for {" "}
                        <strong className="text-primary">$200K</strong>.
                      </h6>
                    </span>
                  </li>
                  <li>
                    <div className="timeline-badge primary"></div>
                    <span
                      className="timeline-panel"
                    >
                      <span>October 12, 2022</span>
                      <h6 className="mb-0">
                        Mango Markets hacked for {" "}
                        <strong className="text-primary">$112M</strong>.
                      </h6>
                    </span>
                  </li>
                 
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
      {/*======== ANALYSIS DISPLAY TABLE ROW =========*/}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title text-uppercase font-weight-normal">
                Scan History</h4>
            </div>
            {tableValue && tableValue.length !== 0 ?
                <TableData props={tableValue} />
              :
              <h4 className="mt-5 mb-5 text-center">No Analysis Saved Yet</h4>
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default Home;