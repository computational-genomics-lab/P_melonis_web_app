import {
    createViewState,
    createJBrowseTheme,
    JBrowseLinearGenomeView,
    ThemeProvider,
  } from '@jbrowse/react-linear-genome-view'
  
  const theme = createJBrowseTheme()
  
  const assembly = [  {
    name: 'Phytophthora agathidicida',
    aliases: ['Phyag_NZFS3770'],
    sequence: {
      type: 'ReferenceSequenceTrack',
      trackId: 'GRCh38-ReferenceSequenceTrack',
      adapter: {
        type: 'IndexedFastaAdapter',
        fastaLocation: {
          uri: 'http://10.0.0.231:3000/Phyag_NZFS3770.fna',
        },
        faiLocation: {
          uri: 'http://10.0.0.231:3000/Phyag_NZFS3770.fna.fai',
        },
        gziLocation: {
          uri: 'http://10.0.0.231:3000/Phyag_NZFS3770.fna.gz.gzi',
        },
      },
    },
  },]
  
  const tracks = [
    {
        type: 'FeatureTrack',
        trackId: 'genes',
        name: 'NCBI RefSeq Genes',
        assemblyNames: ['Phyag_NZFS3770'],
        category: ['Genes'],
        adapter: {
          type: 'Gff3TabixAdapter',
          gffGzLocation: {
            uri: 'http://10.0.0.231:3000/Phyag_NZFS3770.sorted.gff3.gz',
          },
          index: {
            location: {
              uri: 'http://10.0.0.231:3000/Phyag_NZFS3770.sorted.gff3.gz.tbi',
            },
          },
        },
      },
      {
        type: 'FeatureTrack',
        trackId: 'repeats_hg38',
        name: 'SSR file',
        assemblyNames: ['Phyag_NZFS3770'],
        category: ['Annotation'],
        adapter: {
          type: 'BigBedAdapter',
          bigBedLocation: {
            uri: 'http://10.0.0.231:3000/Phyag_NZFS3770.bw',
            locationType: 'UriLocation',
          },
        },
      },
  ]
  
  const defaultSession =  {
    name: 'My session',
    view: {
      id: 'linearGenomeView',
      type: 'LinearGenomeView',
      tracks: [
        {
          type: 'ReferenceSequenceTrack',
          configuration: 'GRCh38-ReferenceSequenceTrack',
          displays: [
            {
              type: 'LinearReferenceSequenceDisplay',
              configuration:
                'GRCh38-ReferenceSequenceTrack-LinearReferenceSequenceDisplay',
            },
          ],
        },
        {
          type: 'FeatureTrack',
          configuration: 'ncbi_refseq_109_hg38',
          displays: [
            {
              type: 'LinearBasicDisplay',
              configuration: 'ncbi_refseq_109_hg38-LinearBasicDisplay',
            },
          ],
        },
      ],
    },
  }
  
  
  function View() {
    const state = createViewState({
      assembly,
      tracks,
      
      defaultSession,
    })
    return (
      <ThemeProvider theme={theme}>
        <JBrowseLinearGenomeView viewState={state} />
      </ThemeProvider>
    )
  }
  
  export default View
