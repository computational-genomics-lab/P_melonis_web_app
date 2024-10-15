##################################################################
#This script is used to parse the blastx results of the unigenes #
#The fields described here correspond to the fields in the secdb #
#Author: Sucheta                                                 # 
#Date 10th June 2004                                             #
##################################################################


use Bio::DB::GenPept; #For protein accession
use Bio::SearchIO;

my $cutoff = 0.001;

my $in = new Bio::SearchIO(-format => 'blast',
                           -file    => $ARGV[0]);

my $i=1; #hit_id corresponds to each hit
my $j=1; #hsp_id corresponds to each hsp
my $backup=0; # This number is to have backup value for 
              # the cases where $seq does not return anything

open FH ,">blast_hit" or die "Can't open file $!\n";
open FH1,">blast_hsp" or die "Can't open file $!\n";


while( my $r = $in->next_result ) { # Beginning of result object
my $count=0; #$count to restrict the number of hits to 10
  while( my $h = $r->next_hit ) { #beginning of hit object
    my $db= new Bio::DB::GenPept;
    my $seq= $db->get_Seq_by_acc($h->accession);
    if(!$seq){
         $backup=0;
    }
    else{
         $backup=$seq->primary_id;
    }
    last if ($h->significance > $cutoff || $count >= 10);
    print FH  $r->query_name, "\t",$i,"\t"; #seq_name and hit_id here
    print FH $h->significance,"\t", $h->bits,"\t", $h->name, "\t", $h->length,
    "\t",$h->description,"\t",$backup,"\t",$h->num_hsps,"\n";
    # Printing done for the first file(hit file)
    while( my $hsp = $h->next_hsp ) { #Beginning of hsp object
       print FH1 $i,"\t",$j,"\t",$hsp->length(total),"\t",
             $hsp->length(query),"\t",$hsp->length(hit),"\t",
             $hsp->query_string,"\t",$hsp->homology_string,"\t",
             $hsp->hit_string,"\t",$hsp->expect,"\t",$hsp->score,"\t",
             $hsp->query->start,"\t",$hsp->query->end,"\t",
             $hsp->hit->start,"\t",$hsp->hit->end,"\t",
             $hsp->query->strand,"\t",$hsp->percent_identity,"\t",
             $hsp->gaps,"\n";
    $j++;
    }
   print "Beginning of second hit \n\n";
   $i++;
   $count++;
  }
  print "Beginning of next result\n";
}

close(FH);
close(FH1);

