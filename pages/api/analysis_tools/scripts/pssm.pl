#!/usr/bin/perl 

# This script will calculate the PSSM scores of the given sequence file and 
# print in a matrix in the format of:
# pos -8 -7 -6 -5 -4 -3 -2 -1 0 1 2 3 4 5 6 7 8
# A
# T
# G
# C

my @A=0;
my @T=0;
my @G=0;
my @C=0;


open FH, $ARGV[0] or die "Can't open file for reading $!\n";

while(<FH>){
	
	chomp;
	my @tmp=split(//,$_);
	for(my $i=0;$i<=$#tmp;$i++){
		if($tmp[$i] eq 'A' or $tmp[$i] eq 'a'){ $A[$i]++; $T[$i]+=0; $C[$i]+=0; $G[$i]+=0; }
		elsif($tmp[$i] eq 'T' or $tmp[$i] eq 't'){ $T[$i]++; $A[$i]+=0; $G[$i]+=0; $C[$i]+=0; }
		elsif($tmp[$i] eq 'G' or $tmp[$i] eq 'g'){ $G[$i]++; $A[$i]+=0; $C[$i]+=0; $T[$i]+=0; }
		elsif($tmp[$i] eq 'C' or $tmp[$i] eq 'c'){ $C[$i]++; $A[$i]+=0; $G[$i]+=0; $T[$i]+=0; }
	}
}

close(FH);

open FH1, ">$ARGV[1]" or die "Can't open file for writing $!\n";

#print "Inside pssm.pl<br>";
print FH1 "A ->". join(",",@A)."\n";
print FH1 "T ->". join(",",@T)."\n";
print FH1 "G ->". join(",",@G)."\n";
print FH1 "C ->". join(",",@C)."\n";

close(FH1);
