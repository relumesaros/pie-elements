# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="2.0.0"></a>
# 2.0.0 (2018-09-20)


### Bug Fixes

* **dependencies:** fix dependencies ([46a2162](https://github.com/pie-framework/pie-elements/commit/46a2162))
* **dependencies:** fix dependencies ([136beff](https://github.com/pie-framework/pie-elements/commit/136beff))
* **dependencies:** update dependency names ([dc789ac](https://github.com/pie-framework/pie-elements/commit/dc789ac))
* build fixes ([3c3a7f2](https://github.com/pie-framework/pie-elements/commit/3c3a7f2))
* bump config-ui@^7.6.6 ([266235a](https://github.com/pie-framework/pie-elements/commit/266235a))


### Features

* **dependencie:** use latest [@pie-ui](https://github.com/pie-ui)/text-entry ([d6ef0cb](https://github.com/pie-framework/pie-elements/commit/d6ef0cb))
* **model:** move away from old model ([4763668](https://github.com/pie-framework/pie-elements/commit/4763668))
* upgrade material-ui -> [@material-ui](https://github.com/material-ui)/core@1.0.0-rc.1 ([1e38e50](https://github.com/pie-framework/pie-elements/commit/1e38e50))
* **text-entry:** added prompt property ([10a6646](https://github.com/pie-framework/pie-elements/commit/10a6646))


### BREAKING CHANGES

* **model:** * Feedback now uses the new model
* `model` is gone, properties moved up a level.

Full example:

From:
```javascript

    {
      id: '1',
      element: 'text-entry',
      correctResponses: {
        values: ['mutt', 'hound'],
        ignoreWhitespace: true,
        ignoreCase: false,
        feedback: {
          type: 'custom',
          value: 'correct-o'
        }
      },
      partialResponses: {
        values: ['mutty'],
        ignoreWhitespace: true,
        ignoreCase: true,
        awardPercentage: '50',
        feedback: {
          type: 'custom',
          value: 'foo'
        }
      },
      incorrectFeedback: {
        type: 'custom',
        value: 'custom feedback'
      },
      model: {
        answerBlankSize: '10',
        answerAlignment: 'left',
        allowDecimal: true,
        allowIntegersOnly: false,
        allowThousandsSeparator: true
      }
    }

```

To:
```javascript
    {
      id: '1',
      element: 'text-entry',
      feedback: {
        correct: {
          type: 'custom',
          custom: 'correct-o'
        },
        incorrect: {
          type: 'custom',
          custom: 'custom feedback'
        },
        partial: {
          type: 'custom',
          custom: 'foo'
        }
      },
      correctResponses: {
        values: ['mutt', 'hound'],
        ignoreWhitespace: true,
        ignoreCase: false
      },
      partialResponses: {
        values: ['mutty'],
        ignoreWhitespace: true,
        ignoreCase: true,
        awardPercentage: '50'
      },
      answerBlankSize: '10',
      answerAlignment: 'left',
      allowDecimal: true,
      allowIntegersOnly: false,
      allowThousandsSeparator: true
    }
```