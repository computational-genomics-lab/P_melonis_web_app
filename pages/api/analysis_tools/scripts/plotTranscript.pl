#!/usr/bin/perl -w


# This script plots the nextgeneration sequencing data with the genomes
# as well as connects with oracle database, fetches EST and gene model 
# information and plots them.
use GD;
use GD::Graph;
use GD::Graph::Data;
use GD::Graph::lines;
use DBI;
use lib "/var/www/html/lib";
use nextGen;

my $organism = $ARGV[10];
my $scaffold = $ARGV[4];
my $scaffold_no;
my $tmp = "";
my $taxon_id=67593;

sub plot_transcript_map;
sub drawVerticalLines;

#Writing Labels
my $graph = GD::Image->new(1500,1500);
my $white = $graph->colorAllocate(255,255,255);
my $red   = $graph->colorAllocate(255,0,0);
my $blue  = $graph->colorAllocate(0,0,255);
my $darkgreen = $graph->colorAllocate(0,255,0);
my $green  = $graph->colorAllocate(50,200,0);
my $purple = $graph->colorAllocate(200,0,255);
my $orange = $graph->colorAllocate(255,200,0);
my $grey = $graph->colorAllocate(200,200,200);
my $darkgrey = $graph->colorAllocate(105, 105, 105);
my $yellow = $graph->colorAllocate(255,255,0);
my $brown = $graph->colorAllocate(175,115,0);

if($scaffold =~ /scaffold_(\d+)/i){
	$scaffold_no = $1;
}
elsif($scaffold =~ /super_(\d+)/i){
	$scaffold_no = $1 + 1;
}


my $identifier;
my $orgn_id;


#for(my $m=0;$m<4-length($scaffold_no);$m++){
#	$tmp .= "0";
#}

#if($organism =~ /Ha8/i){
#	$identifier = "GI:8".$tmp."$scaffold_no"."000";
#	$taxon_id = 272952;
#	$orgn_id = 8;
#}
#elsif($organism=~ /PsV1/i){
#	$identifier = "GI:0".$tmp."$scaffold_no"."000";
#	$taxon_id = 67593;
#	$orgn_id = 0;
#}	
#elsif($organism =~ /PsV5/i){
#	$identifier = "GI:2".$tmp."$scaffold_no"."000";
#	$taxon_id = 67593;
#	$orgn_id = 1;
#}	
#else{
# Do nothing....
#}

	($identifier, $taxon_id, $orgn_id)=&nextGen::getIdentifier($scaffold_no,$organism);



my $estref;
my $generef;
		
if($ARGV[7] or $ARGV[8]){

	($estref, $generef)= &nextGen::getFeatures($ARGV[5],$ARGV[6],$ARGV[7],$ARGV[8],$ARGV[9],$taxon_id,$identifier);


}

&plot_transcript_map($ARGV[0],$ARGV[1],$ARGV[2], $estref, $generef);


# making global declarations
my $start_loc;
my $end_loc;
my $xbegin;
my $xend;
my $ybegin;


sub plot_transcript_map{

my $map=shift;
my $out_file=shift;
my $plotflag=shift;
my $estref = shift;
my $codingref = shift;


open FH, $map or die "Can't open map data file for plotting $! \n";

my @map=<FH>;
my @tmp=();

foreach my $val (@map){
	if($val =~ /(\d+)\t(\d+)/){
		push (@tmp,$2);
	}
}	
my @tmp1 = sort {$a <=> $b} (@tmp);	
		
$start_loc=$tmp1[0];
$end_loc = $tmp1[-1];

my $tmpStart = $start_loc;
my $tmpEnd = $end_loc;

close(FH);


open (TEST,">$out_file") || die " Can't open plot file to write $!\n";


# End of color allocation

# Making background transparent and set interlaced true



# This marks the beginning and end of the plot
$xbegin = 100; # Image begin x coordinate
$xend   = 1000; # Image end X coordinate
$ybegin = 300;  # y-axis beginning

my $ystart = 0;
my $fraction    = ($xend - $xbegin)/($end_loc - $start_loc) ;
my $yoffset = 0.05;  # This is the width of the bar
my $ynext = 0.06;    # next read position if overlaps
my $xoffset = $fraction * 50;  # This is the length of the bar

my $prev=0;

my $ybegintmp=$ybegin;


my $flag = 0;
my $color; 
my $numSelected = 0; # Number of values selected



$graph->rectangle(10,10,95,180,$orange);
$graph->rectangle(12,12,93,178,$purple);
$graph->rectangle(14,14,91,176,$orange);
$graph->string(gdLargeFont,16,16,"+ Strand ",$blue);
$graph->string(gdLargeFont,16,30," = Blue ",$blue);
$graph->string(gdLargeFont,16,45,"- Strand ",$red);
$graph->string(gdLargeFont,16,60," = Red ",$red);
$graph->string(gdLargeFont,16,85,"EST",$purple);
$graph->string(gdLargeFont,16,95,"----",$purple);
$graph->string(gdLargeFont,16,110,"- Best Q",$red);
$graph->string(gdLargeFont,16,125,"- BetterQ",$purple);
$graph->string(gdLargeFont,16,140,"- Good Q",$blue);
$graph->string(gdLargeFont,16,155,"- OK Q",$green);
$graph->string(gdLargeFont,16,155,"- OK Q",$green);

foreach my $i(@map){
	if(!$plotflag and $i =~ /(\d+)\t(\d+)/){
	$flag = 1;
		if(($2 - $prev) < 50){
			$ybegintmp -=   $ynext;
		}
		else{
			$ybegintmp = $ybegin;
		}

		# making blocks of contiguous reads
		if($2 - $prev > 1000){
		
		my $blockSize = $prev - $tmpStart;
		
		my $coordString=join(",",($xbegin+($tmpStart-$start_loc)*$fraction,$ybegintmp,$xbegin+($tmpStart-$start_loc)*$fraction + $blockSize*$fraction, $ybegin));
		my $link = "http://www.eumicrobedb.org/cgi-bin/nextgen.cgi?flag=1&reference=$ARGV[3]&seqname=$ARGV[4]&start=$tmpStart&stop=$prev&organism=$ARGV[10]";
		
		print "<area shape=rect";
		print "      coords=\"$coordString\"";
		print "      target=\"_blank\"";
		print "      href=\"$link\">\n";

		$tmpStart = $2;

		}
		# 0 means reference strand and any other value(16) means reverse
		if($1 == 0){
			$color = $blue;
		}
		else{
			$color = $red;

		}


	
	$graph->filledRectangle($xbegin + ($2 - $start_loc)*$fraction,$ybegintmp,$xbegin + ($2 - $start_loc)*$fraction + $xoffset, $ybegintmp - $yoffset,$color);
	
	$graph->filledRectangle($xbegin + ($2 - $start_loc)*$fraction,$ybegin + 1,$xbegin + ($2 - $start_loc)*$fraction+ $xoffset, $ybegin,$color);
	

	
	$prev = $2;
	
	}
	
	elsif($i =~ /---(\S+)---/){
		
		$graph->rectangle($xbegin,$ystart,$xend+$xoffset,$ybegin+50,$darkgreen);
		my $name = $1;
		$name =~ s/_.*//g;
		$graph->string(gdGiantFont,$xbegin+20,$ystart+30,$name,$purple);
		$ystart = ($ybegin + 50);
		
		$ybegintmp += 350;
		$ybegin = $ybegintmp;
		$flag = 0;
		$numSelected++;
	}


}


if(!$plotflag){
	&plotVerticalLines;
}





#Plotting EST and coding tracks

my %contigColor; 

$contigColor{'1'}=$red; # Best Quality
$contigColor{'2'}=$purple; # Better
$contigColor{'3'}=$blue; # Good
$contigColor{'4'}=$green; # OK


$ybegin = 350;

for(my $j = 0; $j < $numSelected ; $j++){



	#Plotting coding regions

	my $currentFeatureID;
	my $prevFeatureID;

	for my $i(0 .. $#$codingref){


	#set default color to red

	$color = $red;

		if($codingref->[$i][3] == 0){
		$color = $blue;
		}

		my $link = "http://www.eumicrobedb.org/cgi-bin/browse/browserDetail_new.cgi?ID=$codingref->[$i][5]&ID1=$scaffold_no&orgn=$orgn_id";

		if(defined $codingref->[$i][1] && defined $codingref->[$i][2]){

			if($codingref->[$i][1] <= 0 || $codingref->[$i][2] <= 0){

			next;
	
			}
			if($codingref->[$i][2] - $codingref->[$i][1] <= 10000){

			$graph->filledRectangle($xbegin + ($codingref->[$i][1] - $start_loc)*$fraction,$ybegin - 30,$xbegin + ($codingref->[$i][2] - $start_loc)*$fraction , $ybegin - 25,$color);
			my $coordString = join(",",($xbegin + ($codingref->[$i][1] - $start_loc)*$fraction,$ybegin - 30,$xbegin + ($codingref->[$i][2] - $start_loc)*$fraction , $ybegin - 25));
			
			$graph->string(gdSmallFont,$xbegin,$ybegin - 25,"CODING",$purple);
			print "<area shape=rect";
			print "      coords=\"$coordString\"";
			print "      target=\"_blank\"";
			print "      href=\"$link\">\n";
			$currentFeatureID = $codingref->[$i][5];
				
				# Draw introns
				if($currentFeatureID == $prevFeatureID){
					$graph->filledRectangle($xbegin + ($prevExonEnd - $start_loc)*$fraction,$ybegin - 28,$xbegin + ($codingref->[$i][1] - $start_loc)*$fraction + $xoffset, $ybegin - 27,$color);
				
				$prevExonEnd = $codingref->[$i][2];

				}
				
			}
		}

	}	
		
	# Plotting EST graph


	for my $i(0..$#$estref){
	
	my $contig;
	my $link = "http://www.eumicrobedb.org/transcripts/common_search.php?find_contig=$contig&val=contig&organism=1";

		if( defined $estref->[$i][5] && defined $estref->[$i][6]){
		
			my @blocksizes = split(",",$estref->[$i][5]);
			my @tstarts = split(",",$estref->[$i][6]);

			my $newContig = 1;

			for my $j (0 .. $#tstarts){
				
				if($tstarts[$j] < 0){
				 	next;
				}
			$graph->filledRectangle($xbegin + ($tstarts[$j] - $start_loc)*$fraction,$ybegin - 45,$xbegin + ($tstarts[$j] + $blocksizes[$j] - $start_loc)*$fraction, $ybegin - 40, $contigColor{$estref->[$j][4]});
			$graph->string(gdSmallFont,$xbegin,$ybegin - 40,"EST",$purple);
			print "<area shape=rect";
			my $coordString =join(",",$xbegin + ($tstarts[$j] - $start_loc)*$fraction,$ybegin - 45,$xbegin + ($tstarts[$j] + $blocksizes[$j] - $start_loc)*$fraction ,$ybegin - 40);
			print "      coords=\"$coordString\"";
			print "      target=\"_blank\"";
			print "      href=\"$link\">\n";
			$currentFeatureID = $codingref->[$i][5];
			}
		}


	}


$ybegin += 350;

}



            
binmode TEST;
print TEST $graph->png;
close TEST;


}

# Drawing vertical scales
sub plotVerticalLines{

my $xbegin = 100; # Image begin x coordinate
my $xend   = 1000; # Image end X coordinate
my $lineFrac = ($xend - $xbegin)/100;

my $linecolor = $grey;

for(my $i=1;$i<=100;$i++){
	

	if($i%10 == 0 || $i == 1){
	
		$linecolor=$darkgrey;
		$graph->string(gdLargeFont,$xbegin+$lineFrac*$i,0,$start_loc+($end_loc -$start_loc)*$i/100,$purple); 

	}
	
	$graph->line($xbegin+$lineFrac * $i,0,$xbegin+$lineFrac * $i,$ybegin+50,$linecolor);

	$linecolor = $grey;

}

}

# Connecting to oracle database and returning features as arrays
sub getFeatures
{
my $start    = shift;
my $stop     = shift;
my $isest    = shift;
my $iscoding = shift;
my $isgc     = shift;
my $taxon_id = shift;



my $maxLength = 110000;
my $user = "testadmin";
my $password="forinventorydatabase";
my $conn = "DBI:mysql:host=localhost;port=3306";

#open FH, ">/tmp/analyze/debug" or die "Can't open file for writing $! \n";
 

#my $dbh = DBI->connect($conn,$user,$password, { RaiseError => 1, AutoCommit => 0}) || die "Error connecting to server";
my $dbh = DBI->connect($conn,$user,$password) || die "Error connecting to server";


my $sql;
my $sth;
my @estFeature;
my @geneFeature;


		
if($isest == 1){

my $sql = "select distinct ena2.name, ba.number_of_spans, ba.target_start, ba.is_reversed,ba.blat_alignment_quality_id,ba.blocksizes,ba.tstarts from DoTS.externalnasequence ena1, DoTS.blatalignment ba, DoTS.externalnasequence ena2 where ena1.secondary_identifier='$identifier' and  ba.target_na_sequence_id=ena1.na_sequence_id and ba.query_na_sequence_id = ena2.na_sequence_id and ba.target_start between $start and $stop and ba.query_taxon_id=$taxon_id order by ba.target_start"; 

$sth = $dbh->prepare($sql);
#print "$sql<br>";

$sth->execute || die "error in executing EST query";

	while (my @array = $sth->fetchrow_array()){
		
		my @temp;
		
		foreach my $line (@array){
		
			if( defined $line){
				
				push @temp,$line;
			}
			else{
		
				push @temp, -1;

			}
		}
		push @estFeature , [@temp];

	}

	$sth->finish;

}
if($iscoding == 2){

	my $sql = "select nl.start_min,nl.end_min,nl.is_reversed,nl.loc_order,en.length,fi.product from DoTS.nalocation nl, DoTS.transcript fi, DoTS.externalnasequence en where en.secondary_identifier = '$identifier' and nl.start_min between $start and $stop and en.na_sequence_id=fi.na_sequence_id and fi.na_feature_id=nl.na_feature_id order by nl.start_min";
	
print "$sql<br>";
$sth = $dbh->prepare($sql);

$sth->execute || die "error in executing gene model query";

	while (my @array = $sth->fetchrow_array()){
		
		my @temp;
		
		foreach my $line (@array){
		
			if( defined $line){
				
				push @temp,$line;
			}
			else{
		
				push @temp, -1;

			}
		}
		push @geneFeature , [@temp];

	}

	$sth->finish;
}

return (\@estFeature,\@geneFeature);

}


# This subroutine will print character with span

sub printChar{

my $fileName = shift;
open FH, $fileName or die "Can't open file for reading $! \n";

print "<pre>";

while(<FH>){
	
	if(/(\d+)\t(\d+)\t(\S+)/){

	my @arr = split(//,$3);
		foreach($2){
			print " ";
		}
	foreach my $base(@arr){
		if($base eq 'A'){
			print "<span style=\"background-color:#9999FF\">A</span>";
		}
		elsif($base eq 'T'){
			print "<span style=\"background-color:#FFCC99\">T</span>";
		}
		elsif($base eq 'G'){
			print "<span style=\"background-color:#FFCCCC\">G</span>";
		}
		elsif($base eq 'C'){
			print "<span style=\"background-color:#99FFCC\">C</span>";
		}

			
	}

	}
print "<br>";
	

}

print "</pre>";


}
