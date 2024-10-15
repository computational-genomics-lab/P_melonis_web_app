#!/usr/bin/perl 

# This script calculates the position specific scoring matrix weight of a
# multiple aligned sequence file
# TO run : perl pssm2.pl <sequence file> <1 for DNA 2 for Protein>
# Output will be printed on the screen unless re-directed
# Author: Sucheta                  Date: July 14th 2008
#########################################################################

use lib "/home/ajaya/scripts/";
use utility;

my %HOA;

my %hash = &utility::read_fasta_tohash($ARGV[0]);


for my $seq(keys %hash){
	
	chomp;
	
	my @tmp=split(//,$hash{$seq});
	
	if($ARGV[1] == 1){
	
	for(my $i=0;$i<=$#tmp;$i++){
		if($tmp[$i] eq 'A' or $tmp[$i] eq 'a'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'T' or $tmp[$i] eq 't'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'G' or $tmp[$i] eq 'g'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'C' or $tmp[$i] eq 'c'){ $HOA{$tmp[$i]}[$i]++;}
	}

	}

	elsif($ARGV[1] == 2){
	for(my $i=0;$i<=$#tmp;$i++){
		if($tmp[$i] eq 'A' or $tmp[$i] eq 'a'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'R' or $tmp[$i] eq 'r'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'N' or $tmp[$i] eq 'n'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'D' or $tmp[$i] eq 'd'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'C' or $tmp[$i] eq 'c'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'E' or $tmp[$i] eq 'e'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'Q' or $tmp[$i] eq 'q'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'G' or $tmp[$i] eq 'g'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'H' or $tmp[$i] eq 'h'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'I' or $tmp[$i] eq 'i'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'L' or $tmp[$i] eq 'l'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'K' or $tmp[$i] eq 'k'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'M' or $tmp[$i] eq 'm'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'F' or $tmp[$i] eq 'f'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'P' or $tmp[$i] eq 'p'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'S' or $tmp[$i] eq 's'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'T' or $tmp[$i] eq 't'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'W' or $tmp[$i] eq 'w'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'Y' or $tmp[$i] eq 'y'){ $HOA{$tmp[$i]}[$i]++;}
		elsif($tmp[$i] eq 'V' or $tmp[$i] eq 'v'){ $HOA{$tmp[$i]}[$i]++;}

		
	}



	}

}	
	



open FH1, ">$ARGV[2]" or die "Can't open file for writing $!\n";

#print "Inside pssm.pl<br>";

	foreach my $keys ( keys %HOA){

	my @arr = @{@HOA{$keys}};
	
	print FH1 "$keys =>\t";

	for(my $i=0;$i<=$#arr;$i++){
		if(!$arr[$i]){ $arr[$i] = 0; }
		print FH1 "$arr[$i]\t";
	}
	print FH1 "\n";

	}

	

close(FH1);
