//more or less redundant because it is not the main jbrowse script
import React from "react";
// import View from "../components/visualization/test_jbrowse";
import View from "../components/visualization/test_jbrowse";

const Contact = () => {
return(
    <div>
{/* <h2> Currently only one organism has been loaded in jbrowse </h2> */}
{/* <View name='Phyag_NZFS3770'/> */}
<h3> <i>Phytophthora melonis</i> genomes visualized using JBrowse2</h3>
<View />
{/* this was done because there are a lot of features which aren't available in the linear genome
view of JBrowse2 */}
{/*<iframe src="" width="100%" height="1000vh"/>*/}
</div>)
}
export default Contact
