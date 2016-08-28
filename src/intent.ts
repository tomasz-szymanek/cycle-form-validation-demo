import { ISources } from './definitions';
import { Stream } from 'xstream';
import xs from 'xstream';

export interface IIntent {
  validation$: Stream<boolean>,
  railObject$: Stream<any>,
}

function intent(sources: ISources): IIntent {
  const dom = sources.dom;
  const title$ = dom
    .select('.section-title')
    .events('input')
    .map(ev => (ev.target as HTMLInputElement).value)
    .startWith('');

  const subtitle$ = dom
    .select('.section-subtitle')
    .events('input')
    .map(ev => (ev.target as HTMLInputElement).value)
    .startWith('');

  const numberOfAssets$ = dom
    .select('.number-of-assets')
    .events('input')
    .map(ev => (ev.target as HTMLInputElement).value)
    .startWith(0);

  const validation$ = xs.combine(title$, subtitle$, numberOfAssets$)
    .map(([title, subtitle, numberOfAssets]) => {
      return numberOfAssets <= 10 && numberOfAssets > 0 && title.length > 0 && subtitle.length > 0;
    })
    .startWith(false);

  const railObject$ = xs.combine(title$, subtitle$, numberOfAssets$)
    .map(([title, subtitle, numberOfAssets]) => {
      return {
        title,
        subtitle,
        numberOfAssets,
      }
    })
    .startWith({});

  const intent = {
    validation$,
    railObject$,
  };
  return intent;
}

export default intent;