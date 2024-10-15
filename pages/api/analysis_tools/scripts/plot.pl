#!/usr/bin/perl -w

use GD;
use GD::Graph;
#use GD::Graph::Data;
use GD::Graph::lines;


&plot_gene($ARGV[0],$ARGV[1],$ARGV[2],$ARGV[3]);




sub plot_gene;

sub plot_gene{

my $log_file=shift;
my $fickett_file=shift;
my $gene_len=shift;
my $out_file=shift;


open FH, $log_file or die "Can't open log data file for plotting $! \n";
open FH1, $fickett_file or die "Can't open log data file for plotting $! \n";
#open FH3, ">./sequence/debug" or die "Can't open file for writing $! \n";

my @log=<FH>;
my @fickett=<FH1>;

close(FH);
close(FH1);

my @fickett_data=();
my @log_data=();
#print FH3 "outfile is $out_file\n";

#system("rm /usr/local/apache2/htdocs/images/test.png");
open (TEST,">$out_file") || die " Can't open plot file to write $!\n";
$image = GD::Image->new(900,675);

# This block converts the data into GD::Graph readable format.
# GD::Graph takes reference to an array, which has the first element as 
# reference to another array having the values to be plotted in the x-axis
# The remaining values will be plotted in the y-axis

### For Fickett  ############
my @tmp=();
my @tmp1=();
my @tmp2=();
my $j=0;

for($j=0;$j<scalar(@fickett);$j++){
if($fickett[$j]=~/^(\d+)\t(.*?)\t(.*)/){
  push @tmp,$1;
  push @tmp1,$2;
  push @tmp2,$3;
  }
  else{
  }
}


push @fickett_data,[ @tmp  ];
push @fickett_data,[ @tmp1 ];
push @fickett_data,[ @tmp2 ];


#print "The first array is @tmp\n\n";
#print "The second array is @tmp1\n\n";
#print "The third array is @tmp2\n\n";


#### For loglikelihood ######
   @tmp=();
   @tmp1=();
   @tmp2=();
my @tmp3=();
my @tmp4=();
my @tmp5=();
my @tmp6=();

$j=scalar(@log);
for($j=0;$j<scalar(@log);$j++){
  if($log[$j] =~ /^\s+(\d+)\s+(.*?)\s+(.*?)\s+(.*?)\s+(.*?)\s+(.*?)\s+(.*)/){
  push @tmp,$1;
  push @tmp1,$2;
  push @tmp2,$3;
  push @tmp3,$4;
  push @tmp4,$5;
  push @tmp5,$6;
  push @tmp6,$7;
  }
  else{
  }
}

push @log_data,[ @tmp  ];
push @log_data,[ @tmp1 ];
push @log_data,[ @tmp2 ];
push @log_data,[ @tmp3 ];
push @log_data,[ @tmp4 ];
push @log_data,[ @tmp5 ];
push @log_data,[ @tmp6 ];

#close(FH3);

### End of re-allocation of array ###

# Allocate colours

my $white = $image->colorAllocate(255,255,255);
my $black = $image->colorAllocate(0,0,0);
my $red   = $image->colorAllocate(255,0,0);
my $blue  = $image->colorAllocate(0,0,255);
my $green = $image->colorAllocate(50,200,0);
my $purple= $image->colorAllocate(200,0,255);
my $orange= $image->colorAllocate(255,200,0);

# End of color allocation

# Making background transparent and set interlaced true

#$image->transparent($white);
#$image->interlaced('true');


# This marks the beginning and end of the plot
my $xbegin = 100; # Image begin x coordinate
my $xend   = 850; # Image end X coordinate
my $ybegin = 75;  # y-axis beginning
my $offset = 5;  # This is the width of the bar

# Put a border around the image
# It has $x1,$y1,$x2,$y2
# Make sure that your rectangle size is smaller than the image pixel allocated space
# x1,$y1 marks the origin which starts from the top

#$image->rectangle(20,20,920,200,$blue);

$image->string(gdLargeFont,30,30,"sequence",$black);


# This will have the total length of gene(exon + intron)
my $fraction    = ($xend - $xbegin)/$gene_len ;


# Now draw the gene coordinates
    
         
         $image->string(gdSmallFont,($xbegin),($ybegin-10),"|",$red);
         $image->string(gdSmallFont,($xbegin),($ybegin-15),"0",$blue);
         $image->string(gdSmallFont,($xend),($ybegin-10),"|",$red);
         $image->string(gdSmallFont,($xend),($ybegin-15),$gene_len,$blue);
         $image->filledRectangle($xbegin,$ybegin,$xend,($ybegin+$offset),$green);
         

# End of plotting gene coordinates

# Plot fickett statistics
# Takes width and height as parameters
# $xend - $xbegin is set to be 650 here
my $graph1 = new GD::Graph::lines(775,225);


$graph1->set(
            title                 =>  "Fickett plot for the sequence",
            x_label               =>  'base position',
            y_label               =>  'fickett score',
            y_max_value           =>   2,
            x_all_ticks           =>   25,
            y_all_ticks           =>   1,
            x_label_skip          =>   25,
            zero_axis             =>  .74,
            );
$graph1->set_legend_font(GD::gdFontTiny);
$graph1->set_legend('+ strand','- strand');

# Remember in order to plot from an array , it is essential the array has only the 
# references of the arrays it has, so it was necessary to transpose the matrix and 
# store it in @data array

   my $gd = $graph1->plot(\@fickett_data) or die " can't plot graph $!\n";

    
   my ($w, $h) = $graph1->gd()->getBounds();
   
   # Copy image parameters
   # source image name, destination_x,destination_y,source_x,source_y,width,height
   $image->copy($graph1->gd(),70,150,0,0,$w,$h);

# Drawing a line for fickett statistics to identify the threshold
  $image->line(106,267,825,267,$black);



##### End of fickett Plot

## Beginning of Loglikelihood plot  ####

my $graph2 = new GD::Graph::lines(775,225);


$graph2->set(
            title               =>  "Loglikelihood plot for the sequence",
            x_label             =>  'base position',
            y_label             =>  'loglikelihood score',
            y_max_value         =>   25,
            x_all_ticks         =>   25,
            y_all_tick          =>   1,
            x_label_skip        =>   25,
            zero_axis           =>   1,
            );

    $graph2->set_legend_font(GD::gdFontTiny);
    $graph2->set_legend('+1','+2','+3','-1','-2','-3');
    my $gd1 = $graph2->plot(\@log_data) or die "Can't plot loglikelihood graph$!\n";
    
    ($w, $h) = $graph2->gd()->getBounds();

    # Copy image parameters
    $image->copy($graph2->gd(),70,400,0,0,$w,$h);



            
binmode TEST;
print TEST $image->png;
close TEST;


}
