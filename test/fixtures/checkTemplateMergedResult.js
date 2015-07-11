'use strict';

module.exports = {
  used: [
    {
      selector: '.foo',
      occurrences: [
        getFixturePath('templateTwo.html'),
        getFixturePath('templateOne.html')
      ]
    }
  ],
  unused: []
};
