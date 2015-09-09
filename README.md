Split Level
===
So webpack + amok live-editting is two steps:

1, Auto-webpack:
fswatch cube.js entry.js | xargs -n1 -I{} webpack &

There's totally a way to make webpack do this for you, I jsut haven't looked it up yet.

2, amok live reload:
 amok --browser chrome --hot file://$PWD/index.html

You can go and edit the ticker in entry.js and see the title change when you save.

Lots and lots of room to make it better.  e.g. At the moment, opening the dev console in chrome breaks the connection to the amok server.