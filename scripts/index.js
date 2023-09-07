const YouDontKnowJS = require("./you-dont-know-js");

async function init() {
  await YouDontKnowJS("You-Dont-Know-JS-1", "1st-ed", [
    "preface",
    "up & going",
    "scope & closures",
    "this & object prototypes",
    "types & grammar",
    "async & performance",
    "es6 & beyond",
  ]);
  await YouDontKnowJS("You-Dont-Know-JS-2", "2nd-ed", [
    "preface",
    "get-started",
    "scope-closures",
    "objects-classes",
    "types-grammar",
    "sync-async",
    "es-next-beyond",
  ]);
}

init();

// encode %26 to &、%23 to #、%3A to :、%2F to /