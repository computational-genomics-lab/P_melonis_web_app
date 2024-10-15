#!/usr/bin/perl -w

use HTML::Parse;
use HTML::Strip;

$inFile = $ARGV[0];
$outFile = $ARGV[1];

# Get the input
open(HTMLFILE, "<$inFile") or die $!;
undef $/;
$html_text = <HTMLFILE>;
close(HTMLFILE);

# Remove the html
my $hs = HTML::Strip->new(emit_spaces => 0);
$plain_text = $hs->parse($html_text);


# Write out the results
open(OUTFILE, ">$outFile") or die $!;
print OUTFILE $plain_text;
close(OUTFILE);
