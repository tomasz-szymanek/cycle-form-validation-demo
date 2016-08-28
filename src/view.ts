import { Stream } from 'xstream';
import { div, label, input, hr, h1, VNode, button } from '@cycle/dom';
import { IState } from './definitions';

function view(state: IState): Stream<VNode> {
  const vdom$ =
    state.results$
      .map(results =>
        div('#root', [
          label('Name:'),
          input('.section-title', { attr: { type: 'text' } }),
          input('.section-subtitle', { attr: { type: 'text' } }),
          input('.number-of-assets', { attr: { type: 'number' } }),
          hr(),
          h1([results]),
        ])
      );
  return vdom$;
}

export default view;