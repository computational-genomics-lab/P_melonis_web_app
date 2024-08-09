//this code generates data for making a piechart out of all the gene products 
//present either in an organism or in a group of organisms


const generatePieData = (metadata) => {
    let counts = {
      'hypothetical protein': 0,
      protease: 0,
      kinase: 0,
      other: 0,
    };

    metadata.forEach((item) => {
      const description = item.description.toLowerCase();
      if (description.includes('hypothetical protein')) {
        counts['hypothetical protein']++;
      } else if (description.includes('protease')) {
        counts.protease++;
      } else if (description.includes('kinase')) {
        counts.kinase++;
      } else {
        counts.other++;
      }
    });

    const piedata = [
      { name: 'hypothetical protein', statistics: counts['hypothetical protein'] },
      { name: 'protease', statistics: counts.protease },
      { name: 'kinase', statistics: counts.kinase },
      { name: 'other', statistics: counts.other },
    ];

    return (piedata);
  };

  export default generatePieData;