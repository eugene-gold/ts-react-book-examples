import { useState, useEffect } from 'react';
import { IdValue } from './types';
import { getNewCheckedIds } from './getNewCheckedIds';

type Params = {
  checkedIds?: IdValue[];
  onCheckedIdsChange?: (checkedIds: IdValue[]) => void;
};

export const useChecked = ({ checkedIds, onCheckedIdsChange }: Params) => {
  const [resolvedCheckedIds, setResolvedCheckedIds] = useState<IdValue[]>(checkedIds || []);

  const handleCheckChange = (checkedId: IdValue) => () => {
    // const isChecked = resolvedCheckedIds.includes(checkedId);
    const newCheckedIds = getNewCheckedIds(resolvedCheckedIds, checkedId);
    // let newCheckedIds = isChecked
    //   ? resolvedCheckedIds.filter((itemCheckedid) => itemCheckedid !== checkedId)
    //   : resolvedCheckedIds.concat(checkedId);

    if (onCheckedIdsChange) {
      onCheckedIdsChange(newCheckedIds);
    } else {
      setResolvedCheckedIds(newCheckedIds);
    }
  };

  useEffect(() => {
    const isControlled = checkedIds !== undefined;
    if (isControlled) {
      setResolvedCheckedIds(checkedIds);
    }
  }, [checkedIds]);

  return { handleCheckChange, resolvedCheckedIds };
};
