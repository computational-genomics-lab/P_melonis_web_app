#!/usr/bin/perl -w


# All te plotting programs are merged to create this one
# The only difference is this program has several parameters 
# passed and the 5th parameter determines what needs be done
# and depending on that the sub routine is called
# Author Sucheta
#
use GD;
use GD::Graph::pie;
use GD::Graph::lines;
use strict;

# These commented lines were the ones causing the program not executing
# After commenting these the plotting files work fine
# Date: 16th July 2006, Sucheta
#
#open DEBUG, ">debug" or die "Can't open file for writing\n";

#print DEBUG  "$ARGV[0] $ARGV[1]  $ARGV[2]  $ARGV[3]  $ARGV[4]";

#print "HERE";
if($ARGV[4] eq 'plot_pie'){
&plot_pie($ARGV[0],$ARGV[1],$ARGV[2],$ARGV[3]);
}
elsif($ARGV[4] eq 'plot_qual'){
&plot_qual($ARGV[0],$ARGV[1]);
}
# This one is to plot the assembly information
elsif($ARGV[4] eq 'plot_assembly'){
&plot_assembly($ARGV[0],$ARGV[1]);
}
# This one is to create image maps over the assembly plot
elsif($ARGV[4] eq 'image_map'){
&image_map($ARGV[0],$ARGV[1]);
}

close(DEBUG);

# This is a simplified version of the plot.pl program present in /cgi-bin/EST directory
# This is directly called from the common_search.php program and the arguements are passed directly
# The pie plot values are also passed directly. And the output is written to a file, which
# is used by the PHP program 

sub plot_pie{

my $arg1      = shift;
my $arg2      = shift;
my $file_name = shift;
my @data      = ();

my $graph = new GD::Graph::pie(60,40) or die "$!\n";

push(@data, ["singlets","contigs"]);
push(@data,[ $arg1,$arg2 ]);

open FH, ">$file_name" or die "can't open file for writing $!";

$graph->set(
            title  =>  '',
           );
   my $gd= $graph->plot(\@data) or die "can't plot pie chart $!\n";

binmode FH;
print FH $gd->png;

close(FH);

}



# This is a simplified version of the plot.pl program present in /cgi-bin/EST directory
# This is directly called from the common_search.php program and the arguements are passed directly
# The pie plot values are also passed directly. And the output is written to a file, which
# is used by the PHP program 
# Gets the input as well as the output file name as parameters



sub plot_qual{

my $arg1      = shift;
my $file_name = shift;


open(FH,$arg1) or die "Can't open file for reading $!\n";

my @arr1 = ();
my @arr2 = ();


while(<FH>){
  @arr1=split(/ /,$_);
}  

close(FH);


for(my $i=0;$i<=$#arr1;$i++){
    push(@arr2,$i);
}


my @data = ();
push(@data,[ @arr2 ],[ @arr1 ]);


my $graph = new GD::Graph::lines(825,225) or die "$!\n";
$graph->set(
            title        => "quality plot for EST",
            x_label      => 'base position',
            y_label      => 'quality score',
            y_max_value  =>  100,
            x_all_ticks  =>  25,
            y_all_ticks  =>  1,
            x_label_skip =>  25,
            );
            

open FH1, ">$file_name" or die "can't open file for writing $!";

   my $gd= $graph->plot(\@data) or die "can't plot graph $!\n";


binmode FH1;
print FH1 $gd->png;

close(FH1);

}



# This perl program plots the values generated from the contig_plot
# file
sub plot_assembly{

my $input_file = shift; # input file name having data
my $out_file   = shift; # file to which the image will be plotted

my $size=0;
my @features=();

open FH, "$input_file" or die "Can't open file for reading $!\n";

while(<FH>){
   my @arr= split(/\t/,$_);
   push @features, [@arr];
   $size++;
}   

my $y_range;

  $y_range = ($size * 5) +20; # This is dynamically fixed
                          # because some of the contigs
                          # have much more sequences and
                          # some have too little

my $image = new GD::Image(850,$y_range) or die "$!\n";

my $white   = $image->colorAllocate(0,255,255);
my $green   = $image->colorAllocate(0,255,0);
my $brown   = $image->colorAllocate(175,115,0);
my $red     = $image->colorAllocate(255,0,0);
my $blue    = $image->colorAllocate(0,0,255);
my $yellow  = $image->colorAllocate(255,255,0);

my $start_x= 10;
my $end_x  = 835;
my $start_y= 10;
my $end_y  = $y_range - 10;


close(FH);

open OUT, ">$out_file" or die "can't open file for writing $!\n";


my $distance=1; # distance between the horizontal bars
my $width=$distance * .75; # width of the rectangle
                           # These are the initialized values
                           # which will be multiplied with
                           # appropriate values to get the real
                           # width and distance

my $total = $distance + $width; # This is the total width of a 
                                # rectangle with space
                                #
                                #
$total *= $size;
# $vertical_unit is the vertical equivalent of $horizontal_unit
my $vertical_unit = ($end_y - $start_y)/$total;
$distance *= $vertical_unit;
$width *= $vertical_unit;



# This is the total image width divided by the contig length
# This is the unit distance that can be used to map the sequences to
# contig
my $horizontal_unit= ($end_x - $start_x)/$features[0][1];

$image->filledRectangle($start_x,$start_y,$start_x + ($horizontal_unit * $features[0][1]),($start_y + $width),$brown);


#$image->filledRectangle($start_x,$start_y,$end_x,($start_y + $width),$green);
$start_y= $start_y + $width + $distance;

my $color=$blue;

for(my $i=0;$i<=$#features;$i++){
   
   my $startx;
   my $endx;
   $endx = $start_x + ($horizontal_unit * $features[$i][2]);
   
    if($features[$i][5] eq 'U'){
    $color = $blue;
    }
    else{ 
    $color = $red; 
    }

    # This is the first rectangle in yellow that is non-matching to contig
    # If the starting point of contig starts beyond the sequence length
    # then just print from the beginning point of contig
    if($features[$i][6] > $features[$i][2]){
          $image->filledRectangle($start_x,$start_y,$endx,$start_y+$width,$yellow);
    }
    else{
          $image->filledRectangle($start_x+ ($horizontal_unit * ($features[$i][2] - $features[$i][6])),$start_y,$endx,$start_y + $width,$yellow);
    }

    # The next rectangle starts where the previous $endx was there
    $startx = $endx;
    my $temp_width = $features[$i][7] - $features[$i][6];
    
    

$image->filledRectangle($startx,$start_y,$startx + ($temp_width * $horizontal_unit),$start_y + $width,$color);


    $start_y = $start_y + $width + $distance;
}


binmode OUT;
print OUT $image->png;
close(OUT);


}

sub image_map{

my $input_file = shift; # inpur file name having data

my $size=0;
my @features=();

open FH, "$input_file" or die "Can't open file for reading $!\n";

while(<FH>){
   my @arr= split(/\t/,$_);
   push @features, [@arr];
   $size++;
}

my $y_range;

    $y_range = ($size * 5) + 20;


my $start_x= 10;
my $end_x  = 835;
my $start_y= 10;
my $end_y  = $y_range - 10;
my $coordstring;


close(FH);

my $distance=1; # distance between the horizontal bars
my $width=$distance * .75; # width of the rectangle
                           # These are the initialized values
                           # which will be multiplied with
                           # appropriate values to get the real
                           # width and distance

my $total = $distance + $width; # This is the total width of a 
                                # rectangle with space
                                #
                                #
$total *= $size;
# $vertical_unit is the vertical equivalent of $horizontal_unit
my $vertical_unit = ($end_y - $start_y)/$total;
$distance *= $vertical_unit;
$width *= $vertical_unit;



# This is the total image width divided by the contig length
# This is the unit distance that can be used to map the sequences to
# contig
my $horizontal_unit= ($end_x - $start_x)/$features[0][1];

#for image mapping
$coordstring=join(",",$start_x,$start_y,($start_x + ($horizontal_unit * $features[0][1])),($start_y + $width));

&printMapping($coordstring,$features[0][0],$features[0][0]); # creating image map for contig

#$image->filledRectangle($start_x,$start_y,$end_x,($start_y + $width),$green);
$start_y= $start_y + $width + $distance;


for(my $i=0;$i<=$#features;$i++){
   
   my $startx;
   my $endx;
   my $comment;
   $endx = $start_x + ($horizontal_unit * $features[$i][2]);
   
    if($features[$i][5] eq 'U'){
    $comment = $features[$i][3]." positive strand";
    }
    else{ 
    $comment = $features[$i][3]." negative strand";
    }

    # This is the first rectangle in yellow that is non-matching to contig
    # If the starting point of contig starts beyond the sequence length
    # then just print from the beginning point of contig
    if($features[$i][6] > $features[$i][2]){
          $coordstring=join(",",$start_x,$start_y,$endx,$start_y+$width);
    }
    else{
          $coordstring=join(",",$start_x+ ($horizontal_unit * ($features[$i][2] - $features[$i][6])),$start_y,$endx,$start_y + $width);
    }
    &printMapping($coordstring,$features[$i][3],"non-matching regions of $features[$i][3]");

    # The next rectangle starts where the previous $endx was there
    $startx = $endx;
    my $temp_width = $features[$i][7] - $features[$i][6];
    
    

$coordstring=join(",",$startx,$start_y,($startx + ($temp_width * $horizontal_unit)),($start_y + $width));

&printMapping($coordstring,$features[$i][3],$comment);

    $start_y = $start_y + $width + $distance;
}


}


sub printMapping{

my $coordstring = shift;
my $name        = shift;
my $feature     = shift;

print "<area shape=rect";
print "    coords=\"$coordstring\"";
print "target=\"_top\"";
#print "onMouseOver=\"setFeature('$feature');\"";
print " ONMOUSEOVER=\'document.COMMENT.comment.value=\"$feature\"\'";
if($name=~/CL/){
print " href=\"http://phytophthora.vbi.vt.edu/EST/common_search.php?find_contig=$name&val=contig\">";
}
else{
print " href=\"http://phytophthora.vbi.vt.edu/EST/common_search.php?find_sequence=$name&val=sequence\">";
}
}
