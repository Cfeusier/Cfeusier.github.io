/**
SyntaxHighlighter
http://alexgorbatchev.com/

@version
2.0.320 (July 26 2009)

@copyright
Copyright (C) 2004-2009 Alex Gorbatchev.
Copyright (C) 2009 Nicolas Perriault
Copyright (C) 2014 Clark Feusier

@license
This file is part of SyntaxHighlighter.

SyntaxHighlighter is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation
*/

SyntaxHighlighter.brushes.Yaml = function() {
  // modified by Clark Feusier
  var constants = '~ true false on off';

  this.regexList = [
  { regex: SyntaxHighlighter.regexLib.singleLinePerlComments, css: 'comments' },
  { regex: SyntaxHighlighter.regexLib.doubleQuotedString, css: 'string' },
  { regex: SyntaxHighlighter.regexLib.singleQuotedString, css: 'string' },
  { regex: /^\s*([a-z0-9\._-])+\s*:/gmi, css: 'variable' },
  { regex: /\s?(\.)([a-z0-9\._-])+\s?:/gmi, css: 'comments' },
  { regex: /\s(@|:)([a-z0-9\._-])+\s*$/gmi, css: 'variable bold' },
  { regex: /\s+\d+\s?$/gm, css: 'color2 bold' },
  { regex: /(\{|\}|\[|\]|,|~|:)/gm, css: 'constants' },
  { regex: /^\s+(-)+/gm, css: 'string bold' },
  { regex: /^---/gm, css: 'string bold' },
  { regex: new RegExp(this.getKeywords(constants), 'gmi'), css: 'constants' }
  ];
};

SyntaxHighlighter.brushes.Yaml.prototype = new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.Yaml.aliases = ['yaml', 'yml'];
