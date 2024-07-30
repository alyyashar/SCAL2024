import React, { Fragment } from "react";
import ImportAnalysis from "./BytecodeScan/ImportAnalysis"
import PasteAnalysis from "./BytecodeScan/PasteAnalysis";
import TestAnalysis from "./BytecodeScan/TestAnalysis";

const BytecodeScan = () => {
  return (
    <Fragment>
      {/* ANALYSIS 1 */}
      <ImportAnalysis />
      {/* ANALYSIS 2 */}
      <PasteAnalysis />
      {/* ANALYSIS 3 */}
      <TestAnalysis />
    </Fragment>
  )
}

export default BytecodeScan