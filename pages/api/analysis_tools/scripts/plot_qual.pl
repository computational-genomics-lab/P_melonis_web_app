#!/usr/bin/perl -w

use GD;
use GD::Graph::lines;

# This is a simplified version of the plot.pl program present in /cgi-bin/EST directory
# This is directly called from the common_search.php program and the arguements are passed directly
# The pie plot values are also passed directly. And the output is written to a file, which
# is used by the PHP program 
# Gets the input as well as the output file name as parameters

use strict;

&plot_qual($ARGV[0],$ARGV[1]);

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


