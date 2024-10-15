#!/usr/bin/perl -w

# This script is called inside all_prog_new.php script
# It gets organism, assembly version, start and stop location
# passed onto it. Generates query and fetches gene model and 
# EST match information. Also plots GC content.

use DBI;
#print "Content-type: text/html\n\n";


my $user = "gusrw";
my $password="grang3r";
my $conn = "DBI:Oracle:host=fornost.bioinformatics.vt.edu;sid=guspd;port=1521";


my $dbh = DBI->connect($conn,$user,$password, { RaiseError => 1, AutoCommit => 0
}) || die "Error connecting to server";
#print "connected to database<br>";
$dbh->disconnect;
