import React, { useState, useContext } from "react";
import TableView from "../viewTypes/tableview";
import { DataContext } from '../context_provider/Datafetcher';

const SearchPage = () => {
  const [name, setName] = useState("");
  const [organismdata, setOrganismdata] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { data, loading } = useContext(DataContext);  
  

  const handleInputChange = (event) => {
    setIsButtonClicked(false);
    setName(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/querypage_calls/gene_name?id=${name}`);
      const data = await response.json();
      console.log("gene name data:", data, data.data);
      setOrganismdata(data.data);
      setIsButtonClicked(true); // Set the flag indicating that the button is clicked

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2> Search for gene by gene name: </h2>
      <h4> List of organisms </h4>
      <select >  
          <option value=''>Select an organism</option>
          {data.map((item) => (
            <option key={item.id} value={item.taxon_id}>
              {item.species} {item.strain}
            </option>
          ))}
        </select>
        <p></p>
     <h4>Name of the gene :</h4>   
     
     <form onSubmit={handleFormSubmit}>
        <input type="text" value={name} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
<br></br>

{isButtonClicked ? (
  organismdata !== undefined ? (
    organismdata.length > 0 ? (
      <TableView data={organismdata} />
    ) : (
      <p>Data not available. Probably an invalid gene ID was entered</p>
    )
  ) : (
    <p>Enter a valid gene ID.</p>
  )
) : null}

<h5> Input Format : gene_prefix+geneId e.g: Albla_Nc14125180 </h5>
  {console.log(organismdata)}

  <table id="customers">
						<tr><th>Name of the Organism</th>		<th>Gene Prefix</th> <th>Examples</th></tr>

						<tr><td>Aphanomyces invadans</td>			<td>Aphin_</td> <td>Aphin_H310_13904</td></tr>
						<tr><td>Aphanomyces astacii</td>			<td>Aphas_</td> <td>Aphas_H257_00053</td></tr>
						<tr><td>Hyaloperonospora arabidopsidis (Emoy2)</td>	<td>Hyaar_Emoy2</td> <td>Hyaar_Emoy2800014</td></tr>
						<tr><td>Albugo laibachii</td>				<td>Albla_Nc14</td> <td>Albla_Nc14000370</td></tr>
						<tr><td>Phytophthora cinnamomi</td>			<td>Phyci_</td> <td>Phyci_331428</td></tr>
						<tr><td>Phytophthora infestans T30-4</td>		<td>Phyin_T30-4</td> <td>Phyin_T30-4PITG_00006</td></tr>
						<tr><td>Phytophthora parasitica INRA-310</td>		<td>Phypa_INRA-310</td> <td>Phypa_INRA-310PPTG_00014</td></tr>
						<tr><td>Saprolegnia parasitica CBS223.65</td>		<td>Sappa_CBS223.65</td> <td>Sappa_CBS223.65SPRG_00054</td></tr>
						<tr><td>Phytophthora ramorum</td>			<td>Phyra_</td> <td>Phyra_93231</td></tr>
						<tr><td>Phytophthora sojae</td>				<td>Physo_</td> <td>Physo_127034</td></tr>
						<tr><td>Phytophthora capsici LT1534</td>		<td>Phyca_LT1534</td> <td>Phyca_LT1534524845</td></tr>
						<tr><td>Saprolegnia diclina VS20</td>			<td>Sapdi_VS20</td> <td>Sapdi_VS20SDRG_00040</td></tr>
						<tr><td>Pythium ultimum DAOMBR144</td>			<td>Pytul_DAOMBR144</td> <td>Pytul_DAOMBR144PYU1_G000552</td></tr>
						<tr><td>Pythium iwayamai DAOM 242034</td>		<td>Pytiw_DAOMBR242034</td> <td>Pytiw_DAOMBR242034maker-piw_contig_1-fgenesh-gene-0.12</td></tr>
						<tr><td>P. ultimum var. sporangiiferum</td>		<td>Pytul_var.sporangiiferum</td> <td>Pytul_var.sporangiiferummaker-pug3_contig_1-fgenesh-gene-0.38</td></tr>
						<tr><td>Pythium arrhenomanes ATCC 12531</td>		<td>Pytar_ATCC12531</td> <td>Pytar_ATCC12531maker-par_contig_1-snap-gene-1.7</td></tr>
						<tr><td>Pythium aphanidermatum DAOM BR444</td>		<td>Pytap_DAOMBR444</td> <td>Pytap_DAOMBR444maker-pag1_scaffold_1-snap-gene-0.65</td></tr>
						<tr><td>Pythium irregulare DAOM BR486</td>		<td>Pytir_DAOMBR486</td> <td>Pytir_DAOMBR486maker-pir_contig_1-snap-gene-1.28</td></tr>
						<tr><td>Pythium vexans DAOM BR484</td>			<td>Pytve_DAOMBR484</td> <td>Pytve_DAOMBR484maker-pve_contig_1-snap-gene-1.28</td></tr>
						<tr><td>Phytophthora agathidicida</td>                       <td>Phyag_</td> <td>Phyag_g16</td></tr>
						<tr><td>Phytophthora kernoviae</td>                       <td>Phyke_</td> <td>Phyke_g158</td></tr>
						<tr><td>Phytophthora pluvialis</td>                       <td>Phypl_</td> <td>Phypl_g12</td></tr>
						<tr><td>Phytophthora multivora</td>                       <td>Phymu_</td> <td>Phymu_g6</td></tr>
						<tr><td>Phytophthora taxon totara</td>                       <td>Phyta_to_</td> <td>Phyta_totarag5</td></tr>
						<tr><td>Plasmopara halstedii</td>                       <td>Plaha_</td> <td>Plaha_PHALS_12045</td></tr>
					</table>
    </div>
  );};

export default SearchPage;