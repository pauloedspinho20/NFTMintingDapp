import humanize from 'humanize-duration';

const humanizeDuration = (start, end) => {
  let ms = start - end;

  // If we're dealing in months, always add 2d to the duration, to account for leap years
  const label = humanize(ms, { largest: 1 });
  if (label.indexOf('month') !== -1) {
    ms += 1000 * 60 * 60 * 24 * 2;
  }

  return humanize(ms, { largest: 1 });
};

export default humanizeDuration;
