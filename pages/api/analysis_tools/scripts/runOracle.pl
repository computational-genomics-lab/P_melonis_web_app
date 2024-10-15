#!/usr/bin/perl -w

$ENV{'DYLD_LIBRARY_PATH'} = '/usr/local/instantclient10_1';
$ENV{'ORACLE_HOME'} = '/usr/local/instantclient10_1';
$ENV{'ORACLE_BASE'} = '/usr/local/instantclient10_1';
$ENV{'ORACLE_SID'} = 'gusdev';
$ENV{'NLS_LANG'} = "AMERICAN_AMERICA.UTF8";
$ENV{'LD_LIBRARY_PATH'} = '/usr/local/instantclient10_1/lib';

use DBI;
use DBD::Oracle;

my $sql_results = "";
my $db_UserName = "gusdevreadonly";
my $db_Password = "grang3r";
my $db_ConnString = "DBI:Oracle:host=fornost.bioinformatics.vt.edu;sid=guspd;port=1521";


my $dbh = DBI->connect($db_ConnString,$db_UserName, $db_Password, { RaiseError => 1, AutoCommit => 0}) || die "Error connecting to server";
my $sql = $ARGV[0]; 

# This is set so that the maximum size of the string fetched
# Also note, this has to be there before $dbh->prepare
$dbh->{'LongReadLen'} = 2000000;
$dbh->{'LongTruncOk'} = 0;

my $sth = $dbh->prepare($sql);

$sth->execute || die "error in executing query";

while ( my @arry = $sth->fetchrow_array()) 
{
        foreach my $line (@arry)
        {
                if ( defined  $line )
                {
                       $sql_results .= $line . ",";
                }
                else
                {
                      #  push @temp, -1;   # set to -1 when any element is missing         
                }
        }

	chop($sql_results);		
	$sql_results .= "\n";
      #  push @features, [ @temp ];
}
    
$sth->finish;
$dbh->disconnect;
print  $sql_results;
