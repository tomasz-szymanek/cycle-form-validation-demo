import { Stream } from 'xstream';
import { IIntent } from './intent';
import { IState } from './definitions';
import { button, div } from '@cycle/dom';
import xs from 'xstream';

function model(intent: IIntent): IState {
  const message$ =
    intent.validation$
      .map(valid =>
        valid
          ? div('.message', [
              div('.message-valid', ['Form is valid']),
              button('.go-on', ['next step']),
            ]
          : 'Form is not valid');

  const info$ =
    intent.railObject$
      .map(obj =>
        div('.rail-object', [JSON.stringify(obj)]);
      );

  const results$ = xs.combine(message$, info$)
    .map(([message, info]) => {
      return div('.intel', [
        message,
        info
      ]);
    });

  return {
    results$
  };
}

export default model;