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
//               uri: `http://eumicrobedb.org:3001/genomes/${props.name}..fna`,
  
//             },
//             faiLocation: {
//             uri: `http://eumicrobedb.org:3001/genomes/${props.name}..fna.fai`,
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
//             uri: `http://eumicrobedb.org:3001/genomes/${props.name}..gff3.gz`,
//           },
//           index: {
//             location: {
//               uri: `http://eumicrobedb.org:3001/genomes/${props.name}..gff3.gz.tbi`,
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
//             uri: `http://eumicrobedb.org:3001/genomes/${props.name}..bw`,
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
                    uri: `http://eumicrobedb.org:3001/genomes/${props.name}.fna`,
        
                  },
                  faiLocation: {
                  uri: `http://eumicrobedb.org:3001/genomes/${props.name}.fna.fai`,
                  },
                },    
              },
            },
          ],
  configuration: {
      "theme" :{
        "typography": { "fontSize": 22 },
      "spacing": 2,
        "palette": {
          "primary": {
            "main": "#311b92"
          },
          "secondary": {
            "main": "#0097a7"
          },
          "tertiary": {
            "main": "#f57c00"
          },
          "quaternary": {
            "main": "#d50000"
          }
        }
      }
    },
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
            uri: `http://eumicrobedb.org:3001/genomes/${props.name}.gff3.gz`,
          },
          index: {
            location: {
              uri: `http://eumicrobedb.org:3001/genomes/${props.name}.gff3.gz.tbi`,
            },
          },
        },
      },
      // {
      //   type: `QuantitativeTrack`,
      //   trackId: `effector`,
      //   name: `RXLR file`,
      //   assemblyNames: [`${props.name}`],
      //   //category: [`Annotation`],
      //   category: [`Conservation`],
      //   adapter: {
      //     type: `BigWigAdapter`,
      //     bigWigLocation: {
      //       uri: `http://eumicrobedb.org:3001/genomes/${props.name}_rxlr.bw`,
      //       locationType: `UriLocation`,
      //     },
      //   },
      // },'
      {
        type: 'QuantitativeTrack',
        trackId: 'hg38.100way.phyloP100way',
        name: 'RXLR file',
        assemblyNames: [`${props.name}`],
        category: ['Conservation'],
        adapter: {
          type: 'BigWigAdapter',
          bigWigLocation: {
            uri: `http://eumicrobedb.org:3001/genomes/${props.name}_rxlr.bw`,
            locationType: 'UriLocation',
          },
        },}
      
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
          {
            //id: 'EUnTnpVI6',
            type: 'QuantitativeTrack',
            configuration: 'hg38.100way.phyloP100way',
            minimized: false,
            displays: [
              {
                //id: 'mrlawr9Wtg',
                type: 'LinearWiggleDisplay',
                height: 100,
                configuration: 'hg38.100way.phyloP100way-LinearWiggleDisplay',
                selectedRendering: '',
                resolution: 1,
                constraints: {},
              },
            ],
          }
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
