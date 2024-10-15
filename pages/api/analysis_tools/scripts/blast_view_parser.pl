#Parsing a blast output using bioperl
#This program has 3 while loops to break the output
#The first object is Result
#This gives rise to hit object
#hit gives rise to hsp object

#use Bio::DB::GenPept; #For protein accession
#use Bio::DB::GenBank;
#use Bio::AlignIO;
use Bio::SearchIO;

my $cutoff = 0.001;
my $in = new Bio::SearchIO(-format => 'blast',
                           -file    => $ARGV[0]);
while( my $r = $in->next_result ) { # Beginning of hit object
  print "Query is: ", $r->query_name, " ",
  $r->query_description," ",$r->query_length," aa\n";
  print " Matrix was ", $r->get_parameter(matrix), "\n";
  print " Number of Hit was ", $r->num_hits, "\n";
  while( my $h = $r->next_hit ) { #beginning of query object
    last if $h->significance > $cutoff;
    print "Hit is ", $h->name, "\n";
    print "Accession is ", $h->accession, "\n";
 #   my $db= new Bio::DB::GenPept;
  #  my $seq= $db->get_Seq_by_acc($h->accession);
   # print "display id is", $seq->display_id, "primary id is", $seq->primary_id,"\n";
    print "Description is ", $h->description, "\n";
    print "number of hsp is ", $h->num_hsps, "\n";
    while( my $hsp = $h->next_hsp ) {
       print " HSP Len is ", $hsp->length(total), " ",
       " E-value is ", $hsp->evalue, " Bit score ",
       $hsp->score, " \n",
       " Query loc: ",$hsp->query->start, " ",
       $hsp->query->end," ",
       " Sbject loc: ",$hsp->hit->start, " ",
       $hsp->hit->end,"\n and hit is", $hsp->query_string,"\n hit string",
       $hsp->hit_string,"\n homolgy string", $hsp->homology_string,"\n
       Hit strand is", $hsp->strand('hit'),
       "\n strand query is", $hsp->strand('query'),
       "\n start query is", $hsp->start('query'),
       "\n end query is", $hsp->end('query'),"\n";
    }
   print "Beginning of second hit \n\n";
  }
  print "Beginning of next result\n";
}


