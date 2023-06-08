import { useState, useEffect } from 'react';
import { IdValue } from './types';

type Params = {
  checkedIds?: IdValue[];
  onCheckedIdsChange?: (checkedIds: IdValue[]) => void;
};

export const useChecked = ({ checkedIds, onCheckedIdsChange }: Params) => {
  const [resolvedCheckedIds, setResolvedCheckedIds] = useState<IdValue[]>(checkedIds || []);

  useEffect(() => {
    const isControlled = checkedIds !== undefined;
    if (isControlled) {
      setResolvedCheckedIds(checkedIds);
    }
  }, [checkedIds]);

  const handleCheckChange = (checkedId: IdValue) => () => {
    const isChecked = resolvedCheckedIds.includes(checkedId);
    let newCheckedIds = isChecked
      ? resolvedCheckedIds.filter((itemCheckedid) => itemCheckedid !== checkedId)
      : resolvedCheckedIds.concat(checkedId);

    if (onCheckedIdsChange) {
      onCheckedIdsChange(newCheckedIds);
    } else {
      setResolvedCheckedIds(newCheckedIds);
    }
  };

  return { handleCheckChange, resolvedCheckedIds };
};
