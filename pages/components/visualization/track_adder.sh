#this was done to generate the config file for oomycetes data using the jbrowse CLI 

for file in ../../../public/melonis_genomes/test/*.fna ; do
	b=`basename $file .fna`
	echo $file, $b
	jbrowse add-assembly $file --load inPlace
	jbrowse add-track ../../../public/melonis_genomes/test/"$b"_with_product_name.sorted.gff3.gz --load inPlace --assemblyNames $b.fna
	jbrowse add-track ../../../public/melonis_genomes/test/"$b"_rxlr.bw --load inPlace --assemblyNames $b.fna

done
