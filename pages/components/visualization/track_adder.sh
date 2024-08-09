#this was done to generate the config file for oomycetes data using the jbrowse CLI 

for file in ../../../public/melonis_genomes/*.fna ; do
	b=`basename $file .fna`
	echo $file, $b
	jbrowse add-assembly $file --load inPlace
	jbrowse add-track ../../../public/melonis_genomes/{$b}_with_product_name.sorted.gff3.gz --load inPlace --assemblyNames $b

#	jbrowse add-track ../../../public/oomycetes_data/$b.bw --load inPlace --assemblyNames $b.fna

done
