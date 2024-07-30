import React, { Fragment } from "react";
import ImportAnalysis from "./LocalScan/ImportAnalysis"
import PasteAnalysis from "./LocalScan/PasteAnalysis";
import TestAnalysis from "./LocalScan/TestAnalysis";

const LocalScan = () => {

  return (
    <Fragment>
      {/* ANALYSIS 1 */}
      <ImportAnalysis />
      {/* ANALYSIS 2 */}
      <PasteAnalysis />
      {/* ANALYSIS 3 */}
     {/*  <TestAnalysis />  */}
    </Fragment>
  )
}

export default LocalScan