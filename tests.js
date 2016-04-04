var tape = require('tape');
var transform = require('./index.js');

var tests = {
  '{{ _("voila") }}': '{{ gettext("voila") }}',
  '{{ _(\'django is here!\') }}': '{{ gettext(\'django is here!\') }}',
  '{{ _("%(wicked)s django is massive")|filter % {wicked: "wicked"} }}': '{{ interpolate(gettext("%(wicked)s django is massive"), { wicked: "wicked" }, true) }}',
  '{{ _(\'%s %s %s no filter with list\') % [\'s\', \'s\',\'s\'] }}': '{{ interpolate(gettext(\'%s %s %s no filter with list\'), [\'s\', \'s\', \'s\']) }}',
  '{{ _(\'set is on fire %s %s %s\') % (\'s\', \'s\',\'s\') }}': '{{ interpolate(gettext(\'set is on fire %s %s %s\'), [\'s\', \'s\', \'s\']) }}',
  '{{ _("single item %s") % something }}': '{{ interpolate(gettext("single item %s"), [something]) }}'
};

tape('loader should be a function', (t) => {
  t.equal(typeof transform, 'function');
  t.end();
});

tape('transform django gettext syntax', (t) => {
  t.plan(tests.length);

  for (var sourceString in tests) {
    t.equal(transform(sourceString), tests[sourceString]);
  }
  
  t.end();
});
