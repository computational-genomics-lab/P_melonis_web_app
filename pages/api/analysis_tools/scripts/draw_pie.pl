#!/usr/bin/perl -w

use GD;
use GD::Graph::pie;

# This is a simplified version of the plot.pl program present in /cgi-bin/EST directory
# This is directly called from the common_search.php program and the arguements are passed directly
# The pie plot values are also passed directly. And the output is written to a file, which
# is used by the PHP program 

use strict;

&plot_pie($ARGV[0],$ARGV[1],$ARGV[2],$ARGV[3]);

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


