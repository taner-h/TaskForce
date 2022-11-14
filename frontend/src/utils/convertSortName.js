const convertSortName = sort => {
  if (sort === 'create_time') return 'Create Time';
  if (sort === 'member_count') return 'Member Count';
  if (sort === 'credit_count') return 'Credit Count';
  return 'Create Time';
};

export default convertSortName;
