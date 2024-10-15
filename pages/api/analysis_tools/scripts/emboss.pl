#!/usr/bin/perl -w
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use EMBOSS::GUI;

my $cgi = new CGI;
print "Content-type: text/html\n\n";
init('/usr/local/share/EMBOSS', '/usr/local/bin', '/var/www/html/EMBOSS', 'http://www.eumicrobedb.org/EMBOSS', 'http://www.eumicrobedb.org/cgi-bin', 0);
for ($cgi->param("_action")) {
	/^mmenu/	and do { mmenu($cgi); last; };
	/^input/	and do { input($cgi); last; };
	/^run/		and do { run($cgi); last; };
	/^help/		and do { help($cgi); last; };
	/^manual/	and do { manual($cgi); last; };
	/^search/	and do { search($cgi); last; };
	/^frames/	and do { frames($cgi); last; };
}
print "\n";
