const queryString = ({
  filters,
  page,
  perPage,
  sort,
}, exclude) => Object.entries({
  ...filters,
  order: sort,
  page,
  per_page: perPage,
})
  .filter(([ key, val ]) => !(exclude || []).includes(key) && val)
  .map(([ key, val ]) => `${key}=${decodeURIComponent(val).replace(/#/g, '%23')}`)
  .join('&');

export default queryString;
