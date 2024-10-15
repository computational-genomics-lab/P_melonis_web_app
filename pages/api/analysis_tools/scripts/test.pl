#!/usr/bin/perl 

# This script calculates the position specific scoring matrix weight of a
# multiple aligned sequence file
# The mulitple sequence alignment file could be in fasta or MSF format
# TO run : perl pssm2.pl <-fasta or -MSF >  <sequence file> <1 for DNA 2 for Protein>  <output file>
# Output will be printed on the screen unless re-directed
# Author: Sucheta                  Date: July 14th 2008
#########################################################################

use utility;

my %hash;

	%hash = &utility::read_msf_tohash($ARGV[0]);


	foreach my $keys ( keys %hash){

	print "$keys =>\t $hash{$keys}\n";

	}	

