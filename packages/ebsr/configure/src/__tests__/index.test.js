import { ModelUpdatedEvent } from '@pie-framework/pie-configure-events';
import { choiceUtils as utils } from '@pie-lib/config-ui';
import merge from 'lodash/merge';

const PART_A = 'partA';
const PART_B = 'partB';

const model = {
  partA: {
    choiceMode: 'radio',
    choices: [
      {
        value: 'yellow',
        label: 'Yellow',
        correct: true,
        feedback: {
          type: 'custom',
          value: 'foo'
        }
      },
      {
        value: 'green',
        label: 'Green',
        feedback: {
          type: 'default'
        }
      }
    ],
    keyMode: 'numbers',
    prompt: `prompt ${PART_A}`
  },
  partB: {
    choiceMode: 'radio',
    choices: [
      {
        value: 'orange',
        label: 'Orange',
        correct: true,
        feedback: {
          type: 'custom',
          value: 'foo'
        }
      },
      {
        value: 'purple',
        label: 'Purple',
        feedback: {
          type: 'default'
        }
      }
    ],
    keyMode: 'numbers',
    prompt: `prompt ${PART_B}`
  }
};

describe('index', () => {
  let Def;
  let el;
  let ebsr;

  beforeAll(() => {
    Def = require('../index').default;
  });

  beforeEach(() => {
    el = new Def();
    el.connectedCallback();
    ebsr = {
      partA: new HTMLElement(),
      partB: new HTMLElement()
    };
    el.querySelector = jest.fn(s => {
      if (s === '#part-a-configure') {
        return ebsr.partA;
      } else {
        return ebsr.partB;
      }
    });
    el.model = model;
  });

  const shouldHaveModel = (key) => {
    it(`${key} should have set the model`, () => {
      expect(ebsr[key].model).toEqual(model[key]);
    });
  };

  const updateModel = (model, key) => {
    const event = new ModelUpdatedEvent(model, false);
    el.handleUpdate(event, key);
  };

  const expectToMatchModel = (newModel, key) => {
    expect(newModel).toEqual(model[key]);
  };

  const resetsModel = (key) => {
    it(`${key} resets the model`, () => {
      const newModel = {
        ...model[key],
        choiceMode: 'checkbox'
      };

      updateModel(newModel, key);
      expectToMatchModel(newModel, key);
    });
  };

  const changesPartialScoring = (key) => {
    it(`${key} changes partial scoring value`, () => {
      const newModel = {
        ...model[key],
        partialScoring: true
      };

      updateModel(newModel, key);
      expectToMatchModel(newModel, key);
    });
  };

  const addsChoice = (key) => {
    it(`${key} adds a choice`, () => {
      const newModel = {
        ...model[key],
        choices: [
          ...model[key].choices,
          {
            label: 'label',
            value: utils.firstAvailableIndex(model[key].choices.map(c => c.value), 0),
            feedback: {
              type: 'none'
            }
          }
        ]
      };

      updateModel(newModel, key);
      expectToMatchModel(newModel, key);
    });
  };

  const removesChoice = (key) => {
    it(`${key} removes choice`, () => {
      const newModel = {
        ...model[key],
        choices: model[key].choices.splice(0, 2)
      };

      updateModel(newModel, key);
      expectToMatchModel(newModel, key);
    });
  };

  const changesKeyMode = (key) => {
    it(`${key} changes keyMode`, () => {
      const newModel = {
        ...model[key],
        keyMode: 'letters'
      };

      updateModel(newModel, key);
      expectToMatchModel(newModel, key);
    });
  };

  const changesChoice = (key, value) => {
    const choice = {
      correct: true,
      value,
      label: (value) => value.charAt(0).toUpperCase() + value.slice(1),
      feedback: {
        type: 'none',
        value: ''
      }
    };

    it(`${key} changes choice`, () => {
      const newModel = {
        ...model[key],
        choiceMode: 'checkbox',
      };

      newModel.choices.splice(1, 1, choice);

      updateModel(newModel, key);
      expectToMatchModel(newModel, key);
    });

    it(`${key} changes choice and makes incorrect all other choices`, () => {
      const newModel = {
        ...model[key],
        choiceMode: 'radio',
        choices: [
          ...model[key].choices.map(c => {return merge({}, c, { correct: false })}),
        ]
      };

      newModel.choices.splice(1, 1, choice);

      updateModel(newModel, key);
      expectToMatchModel(newModel, key);
    });
  };

  shouldHaveModel(PART_A);
  shouldHaveModel(PART_B);

  describe('logic', () => {
    describe('onChoiceModeChanged', () => {
      resetsModel(PART_A);
      resetsModel(PART_B);
    });

    describe('onPartialScoringChanged', () => {
      changesPartialScoring(PART_A);
      changesPartialScoring(PART_B);
    });

    describe('onAddChoice', () => {
      addsChoice(PART_A);
      addsChoice(PART_B);
    });

    describe('onRemoveChoice', () => {
      removesChoice(PART_A);
      removesChoice(PART_B);
    });

    describe('onKeyModeChanged', () => {
      changesKeyMode(PART_A);
      changesKeyMode(PART_B);
    });

    describe('onChoiceChanged', () => {
      changesChoice(PART_A, 'green');
      changesChoice(PART_B, 'purple');
    })
  })
});