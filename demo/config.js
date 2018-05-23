const categorize = {
  choices: () => [
    { id: '1', content: '<h3>Hi</h3>' },
    { id: '2', content: '<b>Banana</b>' }
  ],
  categories: () => [
    { id: '1', label: 'Fruit' },
    { id: '2', label: 'Vegetable' }
  ]
};

module.exports = {
  elements: {
    'categorize-el': '@pie-element/categorize@next',
    'calculator-el': '@pie-element/calculator@next'
  },
  models: [
    {
      id: '1',
      element: 'calculator-el',
      mode: 'scientific'
    },
    {
      id: '2',
      element: 'categorize-el',
      choices: categorize.choices(),
      categories: categorize.categories(),
      correctResponse: [{ category: '1', choices: ['1', '2', '1'] }],
      scoring: {
        weighting: {
          enabled: true,
          rules: [{ category: '1', points: 1 }, { category: '2', points: 1 }]
        },
        partial: {
          enabled: true,
          rules: [
            {
              category: '1',
              rules: [{ count: 1, percent: 50 }, { count: 2, percent: 100 }]
            },
            { category: '2', rules: [] }
          ]
        }
      },
      config: {
        choices: {
          columns: 2,
          position: 'above',
          label: 'Here are the choices',
          shuffle: false
        },
        categories: {
          columns: 2
        }
      }
    }
  ]
};
