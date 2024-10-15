#!/usr/bin/perl -w

# This script takes a protein sequence file in fasta format and computes the
# dipeptide frequency. Dipeptide frequency is the number of times a dipeptide
# occures divided by the total number of dipeptides in the sequence.
# The output appears as a 20 X 20 matrix.
# Usage: perl < script name > <input file> <output file>
# Author: Sucheta                                 Date: 13th July 2008


use lib "/home/ajaya/scripts/";
use utility;

my @name = qw(A R N D C E Q G H I L K M F P S T W Y V);

my $total=0;

my %HOA =(

	A => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	R => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	N => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	D => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	C => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	E => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	Q => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	G => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	H => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	I => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	L => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	K => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	M => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	F => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	P => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	S => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	T => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	W => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	Y => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	V => [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	);

my %hash = &utility::read_fasta_tohash($ARGV[0]);

for my $seq(keys %hash){
#print "Reading sequences<br>";
	my @prot =split(//, $hash{$seq});

		for(my $i=0;$i<$#prot;$i++){

			for(my $j=0;$j<20;$j++){
				for(my $k=0;$k<20;$k++){
					my $tmp1 = $name[$j];
					my $tmp2 = $name[$k];
					$tmp1 =~ tr/[A-Z]/[a-z]/;
					$tmp2 =~ tr/[A-Z]/[a-z]/;
					
					if( ( ($prot[$i] eq $name[$j]) or ($prot[$i] eq $tmp1) ) and (($prot[$i+1] eq $name[$k]) or ($prot[$i+1] eq $tmp2) ) ){
						
						$HOA{$name[$j]}[$k]++;
						$total++;

					}
				}
			}
		}
}		

open FH1, ">$ARGV[1]" or die "Can't open file for writing $! \n";

#print FH1 "TOTAL DIPEPTIDE FREQUENCY : $total\n";


print FH1 "\t". join("\t", @name)."\n";

	for(my $i=0;$i<=$#name;$i++){

		my @arr = @{$HOA{$name[$i]}};
		print FH1 "$name[$i] =>\t ";
		for (my $i=0;$i<=$#arr;$i++){
		my $val = 100 * ($arr[$i]/$total);	
		print FH1 substr ($val, 0, 5) ."\t";

		}
	print FH1 "\n";
}	

close(FH1);

