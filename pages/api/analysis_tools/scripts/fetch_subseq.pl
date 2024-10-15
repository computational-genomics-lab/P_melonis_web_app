#!/usr/bin/perl -w
use web_utility;

my $substr;
my $seq;
my @arr=();
my $name="";
my $start=0;
my $len=0;
my $transcript_len=0;

open FH, ">/usr/local/apache2/htdocs/develop/sequence/out.php" or die "can't open file\n";


print FH "<HTML><body><pre>\n";

# If the user wants a transcript sequence
if($ARGV[0] =~ /transcript/){

	my @arr=web_utility::read_fasta($ARGV[0]);

        for(my $i=0;$i<$#arr;$i+=2){

		if($arr[$i] =~ /$ARGV[1]/){

		$seq=$arr[$i+1];

		# Assign $ARGV[1] the value of the name of the sequence
        	# which is in the form of gene_name start_of_orf end_of_orf

      	        $name = $arr[$i];

		# Inserting font colour in the middle of the string
                $name =~ /(^\d+)\s+(\d+)\s+(\d+)/;
                
                $start=$2;
                $transcript_len=$3;

                last;

		}
	}
        # If 3rd and fourth arguement is passed to get substring
	if($ARGV[3]){ # This is changed because if $ARGV[2] = 0 
                      # It does not return anything
                      # The user has to put some value in $ARGV[3]

	$substr=substr($seq,$ARGV[2],$ARGV[3]);
        }

        # when the 3rd and 4th arguements are empty
        # just getting the sequence( no substring)
        elsif(!$ARGV[2] && !$ARGV[3]){

        $substr=$seq;
	}
	
}

# If the user wants the scaffold sequence
else{
	my %hash=web_utility::read_fasta_tohash($ARGV[0]);

	$seq=$hash{$ARGV[1]};
     
        $name = $ARGV[1];

        # If 3rd and fourth arguement is passed to get substring
	if($ARGV[3]){

	$substr=substr($seq,$ARGV[2],$ARGV[3]);
        }

        # when the 3rd and 4th arguements are empty
        # just getting the sequence( no substring)
        elsif(!$ARGV[2] && !$ARGV[3]){

        $substr=$seq;
        }
}


$i=0;

$len=length($substr);


	if($ARGV[3]){

	$tmp=$ARGV[2] + $ARGV[3];

	print FH "<b>>$name     from $ARGV[2]...$tmp sequence length=$len </b>\n";
	}
	elsif(!$ARGV[2] && !$ARGV[3]){

	print FH "<b>>$name and length of sequence is $len</b>\n";
	}

	if($ARGV[0] =~ /transcript/){
		my $out = web_utility::display_string($substr,$start,$transcript_len);
                print FH "$out\n";
	}
	else{
		while($i < $len){
		$tmp=substr($substr,$i,70);
		print FH "$tmp\n";
		$i+=70;
		}
	}

print FH "</pre></body></html>";

close(FH);
