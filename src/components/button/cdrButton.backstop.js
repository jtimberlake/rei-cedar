module.exports = [
  {
    label: 'Button',
    selectors: [
      '[data-backstop="buttons"]',
    ],
    hoverSelectors: [
      '[data-backstop="cdr-button"]',
      '[data-backstop="cdr-button--secondary"]',
    ],
    delay: 0,
    misMatchThreshold: 0.1,
  },
];