var tape = require('tape');
var transform = require('./index.js');

var transformTests = {
  '{{ _("voila") }}': '{{ gettext("voila") }}',
  '{{ _(\'django is here!\') }}': '{{ gettext(\'django is here!\') }}',
  '{{ _("%(wicked)s django is massive")|filter % {wicked: "wicked"} }}': '{{ interpolate(gettext("%(wicked)s django is massive"), { wicked: "wicked" }, true) }}',
  '{{ _(\'%s %s %s no filter with list\') % [\'s\', \'s\',\'s\'] }}': '{{ interpolate(gettext(\'%s %s %s no filter with list\'), [\'s\', \'s\', \'s\']) }}',
  '{{ _(\'set is on fire %s %s %s\') % (\'s\', \'s\',\'s\') }}': '{{ interpolate(gettext(\'set is on fire %s %s %s\'), [\'s\', \'s\', \'s\']) }}',
  '{{ _("single item %s") % something }}': '{{ interpolate(gettext("single item %s"), [something]) }}',
  '{{ username | capitalize }}': '{{ username | capitalize }}',
  '{{ "substitute %s" % "it" }}': '{{ interpolate("substitute %s", ["it"]) }}',
  '{{ \'<p>%s</p>\' % _(\'Hello\') }}': '{{ interpolate(\'<p>%s</p>\', gettext(\'Hello\')) }}',
  '{{ "User: %(first)s %(last)s" % {"first": _("Kylo"), "last": _("Ren") } }}': '{{ interpolate("User: %(first)s %(last)s", { "first": gettext("Kylo"), "last": gettext("Ren") }, true) }}',
  ':placeholder="_(\'lorem ipsum dolor\')"': ':placeholder="gettext(\'lorem ipsum dolor\')"',
  ':placeholder="someProp || _(\'lorem ipsum dolor\')"': ':placeholder="someProp || gettext(\'lorem ipsum dolor\')"',
  '<fieldset class="some-fieldset" :class="{active: true}">': '<fieldset class="some-fieldset" :class="{active: true}">',
  '<div> <input :key="`touch__${option.value}`"> </div>': '<div> <input :key="`touch__${option.value}`"> </div>'
};

tape('loader should be a function', (t) => {
  t.equal(typeof transform, 'function');
  t.end();
});

tape('transform django gettext syntax', (t) => {
  t.plan(transformTests.length);

  for (var sourceString in transformTests) {
    t.equal(transform(sourceString), transformTests[sourceString]);
  }

  t.end();
});
