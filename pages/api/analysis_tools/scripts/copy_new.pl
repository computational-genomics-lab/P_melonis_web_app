######################################################################################################################
#This program is written to copy the blast output file and to provide link to 
#the individual sequences by string substitution
#created by:                    Sucheta
# The original file is modified to accommodate graphical output
#Modified by                    Sucheta
#date                           24th feb 2003
#######################################################################################################################
###############################################################################################################################

#!/usr/sbin/perl -w

#Takes the first commandline and opens the supplied file name and stores it in  the array @arr
open FH, $ARGV[0] or die $!;
@arr=<FH>;

my $rand=rand();
$rand=$rand.".png";
my $eval = $ARGV[3];
my $num_tracks = $ARGV[4];

system("perl /home/sutripa/scripts/blast_graphics.pl $ARGV[1] $rand $eval $num_tracks");
#Detects the place where the first e value and bit score appears in the file so that that particular line can be split
# Appending the blast runtime image just after the Searching... portion
for($i=0;$i<$#arr;$i++){

    if($arr[$i] =~ /Searching\./){

        $i+=2;
        my $str="<hr><center>$num_tracks Best Hits sorted in their decreasing order of bit scores.<br>The color of the tracks are graded from dark blue to light blue in the decreasing orders of their scores.<br>(Cutoff value for the tracks: < $eval)<hr><table><tr><td><img src=\"http://www.bgagenomics.iicb.res.in/images/$rand\"></img></td></tr></table></center><hr>";
        $arr[$i]=$str;
        last;
        }
}        

for($i=0;$i<$#arr;$i++)
{
	if($arr[$i]=~/Sequences/)
	{
	last;  #substitute of break
	}
}

$i+=2;       #Setting $i to the first score

#Finding the place till where the substitution has to be made
for($j=$i;$j<$#arr;$j++)
	{
	if($arr[$j]=~/<\/PRE>/)
	{
	last;
	}
}

@element; #defining a new element


#Substituting the value
for($k=0;$i<$j;$i++,$k++)
{
@new_arr=split(/</,$arr[$i]); #fetching the second highest score

  if($ARGV[2] =~ /transcript/){
  @new_arr1=split(/_/,$new_arr[0]);
  $arr[$i]=~s/$new_arr[0]</<a href=http:\/\/www.eumicrobedb.org\/cgi-bin\/browse\/browserDetail_new.cgi?gene_id=$new_arr1[0] target="_blank"> $new_arr[0]<\/a></;
  }
  elsif($new_arr[0] =~ /ps/){
  $arr[$i]=~s/$new_arr[0]</<a href=http:\/\/www.eumicrobedb.org\/transcripts\/common_search.php?find_sequence=$new_arr[0]&val=sequence target="_blank"> $new_arr[0]<\/a></;
  }
  elsif($new_arr[0] =~ /CL/ && $ARGV[2] =~ /sojae/){
  $arr[$i]=~s/$new_arr[0]</<a href=http:\/\/www.eumicrobedb.org\/transcripts\/common_search.php?find_contig=$new_arr[0]&val=contig&organism=1 target="_blank"> $new_arr[0]<\/a></;
  }
  elsif($new_arr[0] =~ /CL/ && $ARGV[2] =~ /vgm/){
  $arr[$i]=~s/$new_arr[0]</<a href=http:\/\/www.eumicrobedb.org\/transcripts\/common_search.php?find_contig=$new_arr[0]&val=contig&organism=4 target="_blank"> $new_arr[0]<\/a></;
  }
  elsif($new_arr[0] =~ /CL/ && $ARGV[2] =~ /infestans/){
  $arr[$i]=~s/$new_arr[0]</<a href=http:\/\/www.eumicrobedb.org\/transcripts\/common_search.php?find_contig=$new_arr[0]&val=contig&organism=3 target="_blank"> $new_arr[0]<\/a></;
  }
  elsif($new_arr[0] =~ /Gma/){
  $arr[$i]=~s/$new_arr[0]</<a href=http:\/\/www.eumicrobedb.org\/transcripts\/common_search.php?organism=6&find_contig=$new_arr[0]&val=contig target="_blank"> $new_arr[0]<\/a></;
  }
  elsif($new_arr[0] =~ /^6/){
  $arr[$i]=~s/$new_arr[0]</<a href=http:\/\/www.eumicrobedb.org\/cgi-bin\/browse\/browserDetail_new.cgi?gene_id=$new_arr[0] target="_blank"> $new_arr[0]<\/a></;
  }
  else{
  $arr[$i]=~s/$new_arr[0]</<a href=http:\/\/www.bgagenomics.iicb.res.in\/toolkit\/sequence\/target.php?id=$new_arr[0]&data1=$ARGV[2]&data2=$ARGV[3] target="_blank"> $new_arr[0]<\/a></;
  }
$element[$k]=$new_arr[0];
}

#open FH1,"> ./sequence/seq.php" or die $!;
#print FH1 @arr;
print STDOUT @arr;

#close(FH1);
close(FH);
