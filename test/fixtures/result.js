'use strict';

module.exports = {
  used: [
    {
      selector: '#foo',
      occurrences: [
        'test/fixtures/templateTwo.html'
      ]
    },
    {
      selector: '.bar',
      occurrences: [
        'test/fixtures/templateTwo.html'
      ]
    },
    {
      selector: '.foo',
      occurrences: [
        'test/fixtures/templateOne.html',
        'test/fixtures/templateTwo.html'
      ]
    },
    {
      selector: '.SomeComponent',
      occurrences: [
        'test/fixtures/templateTwo.html'
      ]
    },
    {
      selector: '.SomeComponent-link',
      occurrences: [
        'test/fixtures/templateTwo.html'
      ]
    },
    {
      selector: '.SomeComponent-avatar',
      occurrences: [
        'test/fixtures/templateTwo.html'
      ]
    },
    {
      selector: '.SomeComponent-button',
      occurrences: [
        'test/fixtures/templateTwo.html'
      ]
    }
  ],
  unused: [
    '.link-one',
    '.link-two',
    '#link-one',
    '#link-two',
    '#baz',
    '.qux',
    '.parent',
    '.child',
    '.brother',
    '.sister',
    '.another-brother',
    '.another-sister',
    '.pseudo',
    '.first',
    '.second',
    '.third'
  ]
};
