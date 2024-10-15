  #!/usr/bin/perl -w
  # File blast_graphics.pl
  # This program takes a raw blast input and displays as the aligned graphics
  # Author: Sucheta                 Date: 25th Aug 2004
  
  use strict;
  use Bio::Graphics;
  use Bio::SearchIO;

  my $file = shift or die "Usage: blast_graphics.pl <blast file>\n";
  my $out_file = shift;
  my $eval = shift;
  my $num_tracks = shift;

  my $searchio = Bio::SearchIO->new(-file   => $file,
                                    -format => 'blast') or die "parse failed";

  my $result = $searchio->next_result() or die "no result";

  my $panel = Bio::Graphics::Panel->new(-length    => $result->query_length,
                                        -width     => 800,
                                        -pad_left  => 10,
                                        -pad_right => 10,
                                       );

  my $full_length = Bio::SeqFeature::Generic->new(-start       =>  1,
                                                  -end         => $result->query_length,
                                                  -display_name=>$result->query_name
                                                    );
  $panel->add_track($full_length,
                    -glyph   => 'arrow',
                    -tick    => 2,
                    -fgcolor => 'black',
                    -double  => 1,
                    -label   => 1,
                   );

  my $track = $panel->add_track(-glyph       => 'graded_segments',
                                -label       => 1,
                                -connector   => 'dashed',
                                -bgcolor     => 'blue',
                                -font2color  => 'red',
                                -lineWidth   => 1,
                                -stranded    => 1,
                                -sort_order  => 'high_score',
                                -description => sub {
                                  my $feature = shift;
                                  return unless $feature->has_tag('description');
                                  my ($description) = $feature->each_tag_value('description');
                                  my $score = $feature->score;
                                  "$description, score=$score";
                                 });


my $i=0;
    my $strand;
  while( my $hit = $result->next_hit ) {
    next unless $hit->significance < $eval;
    $i++;
    my $feature = Bio::SeqFeature::Generic->new(-score     => $hit->raw_score,
                                                -display_name => $hit->name,
                                               # -strand       => $strand,
                                                -tag     => {
                                                             description => $hit->description
                                                            },
                                               );
    while( my $hsp = $hit->next_hsp ) {
      $strand=$hsp->sbjct->strand;
        if($strand == -1){
        $feature->strand(-1);
        $track->configure(-orientation => -1);
        }
        elsif($strand == 1){
        $feature->strand(1);
        $track->configure(-orientation => 1);
        }
      $feature->add_sub_SeqFeature($hsp,'EXPAND');
    }
    $track->add_feature($feature);
    
  if($i >= $num_tracks){ last;}
  }
  
#my $command = "rm /home/apache/htdocs/sequence/runtime_blast.png";
#system($command);

open FH,">/tmp/images/$out_file" or die "can't open file $out_file for writing\n $!";
  print FH $panel->png;
  close(FH);
