const getTraits = ({ attributes }) => attributes?.reduce((acc, cur) => ({
  ...acc,
  [cur['trait-type'] || cur.trait_type]: cur.value,
}), {});

export default getTraits;
