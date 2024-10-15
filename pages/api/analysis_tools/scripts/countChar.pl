# #!/usr/bin/perl -w
#!/scratch/sucheta/utility.pm
use utility;

my $length;
#$max = 0;
my %hash = &utility::read_fasta_tohash($ARGV[0]);

foreach my $seq(keys %hash){

	$length += length($hash{$seq});
	if($max < length($hash{$seq}))
	{
		$max = length($hash{$seq});
	}
}

#print "The total length is $length\n";
print "Maximum length is $max\n";
