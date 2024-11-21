
##  Author:  Sucheta   Date:  21st July 2004     ##
##  Version: 1       ##

#!/usr/bin/perl -w

package utility;

use strict;


################ Beginning of read_fasta_tohash  ######################

# this function reads a sequence file in fasta format and stores
# in a hash for future manipulation

sub read_fasta_tohash{

my $file_name=shift;
open SCAF, $file_name or die "can't open file $!\n";
my %scaf=();
my $id = "";
my $sequence = "";
my $first_pass=1;

while(<SCAF>){  #Reading the file
	if($_ =~ /^>(.*)/){
            if( not $first_pass){
                $scaf{$id}=$sequence; #second time the > symbol encountered
            }
            $id = $1;
            chomp($id);
            $first_pass=0;
            $sequence="";
	}
	else{
	    chomp($_);
	    $sequence .= $_;
	}

}
$scaf{$id}=$sequence;   #the last sequence

close(SCAF);

return %scaf;

} 

################ End of read_fasta_tohash #################################


################# beginning of read_msf_tohash function ####################

# An msf file is a multiple sequence alignment file. It is the one of the
# standard outputs from clustalw program. The first column is usually the
# sequence identifier without space.  The sequences are separated from
# sequence identifier by space or tab.

sub read_msf_tohash{

my $file_name=shift;
open MSF, $file_name or die "Can't open file for reading $! \n";

my %data=();

my $id = "";
my $seq = "";

while(<MSF>){
	if($_=~ /^(\S+)(\s+|\t)(.*)/){
		
		my $id = $1;
		my $seq = $3;
		$seq =~ s/\s+//g;
		
		if(exists($data{$id})){
			$data{$id} .= $seq;
		}
		else{
			$data{$id} = $seq;
		}

	}
}

close(MSF);

return %data;

}

############### End of read_msf_tofasta ##############################
1;
