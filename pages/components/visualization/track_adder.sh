#this was done to generate the config file for oomycetes data using the jbrowse CLI 

for file in ../../../public/genomes/*.fna ; do
	b=`basename $file .fna`
	echo $file, $b
	jbrowse add-assembly $file --load inPlace
	jbrowse add-track ../../../public/genomes/"$b".gff3.gz --load inPlace --assemblyNames $b.fna
	jbrowse add-track ../../../public/genomes/"$b"_rxlr.bw --load inPlace --assemblyNames $b.fna

done
