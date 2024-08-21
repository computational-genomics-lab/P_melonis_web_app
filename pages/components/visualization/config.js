//  //check this site for  reference : https://github.com/GMOD/jbrowse-react-app-nextjs-demo/blob/main/app/config.ts#L8 
//  const config =  {

//     assemblies: [
//       {
//         name: `Phytophthora_agathidicida`,
//         aliases: [`${props.name}.`],
//         sequence: {
//           type: `ReferenceSequenceTrack`,
//           trackId: `GRCh38-ReferenceSequenceTrack`,
//           adapter: {
//             type: `IndexedFastaAdapter`,
//             fastaLocation: {
//               uri: `http://10.0.0.234:3001/melonis_genomes/${props.name}..fna`,
  
//             },
//             faiLocation: {
//             uri: `http://10.0.0.234:3001/melonis_genomes/${props.name}..fna.fai`,
//             },
//           },    
//         },
//       },
//     ],
  
//     tracks: [
//       {
//         type: `FeatureTrack`,
//         trackId: `genes`,
//         name: `NCBI RefSeq Genes`,
//         assemblyNames: [`Phytophthora_agathidicida`],
//         category: [`Genes`],
//         adapter: {
//           type: `Gff3TabixAdapter`,
//           gffGzLocation: {
//             uri: `http://10.0.0.234:3001/melonis_genomes/${props.name}..sorted.gff3.gz`,
//           },
//           index: {
//             location: {
//               uri: `http://10.0.0.234:3001/melonis_genomes/${props.name}..sorted.gff3.gz.tbi`,
//             },
//           },
//         },
//       },
//       {
//         type: `QuantitativeTrack`,
//         trackId: `repeats_hg38`,
//         name: `SSR file`,
//         assemblyNames: [`Phytophthora_agathidicida`],
//         category: [`Annotation`],
//         adapter: {
//           type: `BigWigAdapter`,
//           bigWigLocation: {
//             uri: `http://10.0.0.234:3001/melonis_genomes/${props.name}..bw`,
//             locationType: `UriLocation`,
//           },
//         },
//       },
//     ],
//   defaultSession: {
//     name: `this session`,
//     margin: 0,
//     views: [
//       {
//         id: `linearGenomeView`,
//         minimized: false,
//         type: `LinearGenomeView`,
//         // offsetPx: 191980240,
//         // bpPerPx: 0.1554251851851852,
//         displayedRegions: [
//           {
//             //LGTS01000002.1:62,300..66,307 (-)


//             refName: `LGTS01000002.1`,
//             start: 6230,
//             end: 66307,
//             reversed: false,
//             assemblyName: `Phytophthora_agathidicida`,
//           },
//         ],
//         tracks: [
//           {
//             // id: `4aZAiE-A3`,
//             type: `ReferenceSequenceTrack`,
//             configuration: `GRCh38-ReferenceSequenceTrack`,
//             minimized: false,
//             displays: [
//               {
//                 // id: `AD3gqvG0_6`,
//                 type: `LinearReferenceSequenceDisplay`,
//                 height: 180,
//                 configuration:
//                   `GRCh38-ReferenceSequenceTrack-LinearReferenceSequenceDisplay`,
//                 showForward: true,
//                 showReverse: true,
//                 showTranslation: true,
//               },
//             ],
//           },
//           {
//             type: `FeatureTrack`,
//             height: 180,
//             configuration: `genes`,
//             displays: [
//               {
//                 type: `LinearBasicDisplay`,
//                 configuration: `genes-LinearBasicDisplay`,
//                 showLabels: true,

//               },
//             ],
//           },
//         ],
//         hideHeader: false,
//         hideHeaderOverview: false,
//         hideNoTracksActive: false,
//         trackSelectorType: `hierarchical`,
//         trackLabels: `overlapping`,
//         showCenterLine: false,
//         showCytobandsSetting: true,
//         showGridlines: true,
//       },
//     ],
//   },
// };

// export default config
// // module.exports = config;

// config.js

const getConfig = (props) => {

  return {
    assemblies: [
            {
              name: `${props.name}`,
              aliases: [`${props.name}`],
              sequence: {
                type: `ReferenceSequenceTrack`,
                trackId: `GRCh38-ReferenceSequenceTrack`,
                adapter: {
                  type: `IndexedFastaAdapter`,
                  fastaLocation: {
                    uri: `http://10.0.0.234:3001/melonis_genomes/${props.name}.fna`,
        
                  },
                  faiLocation: {
                  uri: `http://10.0.0.234:3001/melonis_genomes/${props.name}.fna.fai`,
                  },
                },    
              },
            },
          ],
    tracks: [
      {
        type: `FeatureTrack`,
        trackId: `genes`,
        name: `NCBI RefSeq Genes`,
        assemblyNames: [`${props.name}`],
        category: [`Genes`],
        adapter: {
          type: `Gff3TabixAdapter`,
          gffGzLocation: {
            uri: `http://10.0.0.234:3001/melonis_genomes/${props.name}_with_product_name.sorted.gff3.gz`,
          },
          index: {
            location: {
              uri: `http://10.0.0.234:3001/melonis_genomes/${props.name}_with_product_name.sorted.gff3.gz.tbi`,
            },
          },
        },
      },
      // {
      //   type: `QuantitativeTrack`,
      //   trackId: `repeats_hg38`,
      //   name: `SSR file`,
      //   assemblyNames: [`Phytophthora_agathidicida`],
      //   category: [`Annotation`],
      //   adapter: {
      //     type: `BigWigAdapter`,
      //     bigWigLocation: {
      //       uri: `http://10.0.0.234:3001/melonis_genomes/${props.name}.bw`,
      //       locationType: `UriLocation`,
      //     },
      //   },
      // },
    ],
     defaultSession: {
    name: `this session`,
    margin: 0,
    views: [
      {
        id: `linearGenomeView`,
        minimized: false,
        type: `LinearGenomeView`,
        // offsetPx: 191980240,
        bpPerPx: (props.end - props.start)/1500,
        displayedRegions: [
          {
            //LGTS01000002.1:62,300..66,307 (-)


            refName: `${props.scaffold}`,
            //refName: "JAMXKT010000007.1",
            // start: 6230,
            // end: 66307,
            start: props.start,
            //end: end,
            end: props.end,
            reversed: false,
            assemblyName: `${props.name}`,
          },
        ],
        tracks: [
          {
            // id: `4aZAiE-A3`,
            type: `ReferenceSequenceTrack`,
            configuration: `GRCh38-ReferenceSequenceTrack`,
            minimized: false,
            displays: [
              {
                // id: `AD3gqvG0_6`,
                type: `LinearReferenceSequenceDisplay`,
                height: 180,
                configuration:
                  `GRCh38-ReferenceSequenceTrack-LinearReferenceSequenceDisplay`,
                showForward: true,
                showReverse: true,
                showTranslation: true,
              },
            ],
          },
          {
            type: `FeatureTrack`,
            height: 1480,
            configuration: `genes`,
            displays: [
              {
                type: `LinearBasicDisplay`,
                configuration: `genes-LinearBasicDisplay`,
                showLabels: true,

              },
            ],
          },
        ],
        hideHeader: false,
        hideHeaderOverview: false,
        hideNoTracksActive: false,
        trackSelectorType: `hierarchical`,
        trackLabels: `overlapping`,
        showCenterLine: false,
        showCytobandsSetting: true,
        showGridlines: true,
      },
    ],
  },    
  };
};

export default getConfig;
