import { IdValue } from './types';
import { isChecked } from './isChecked';

export function getNewCheckedIds(currentCheckedIds: IdValue[], checkedId: IdValue) {
  if (isChecked(currentCheckedIds, checkedId)) {
    return currentCheckedIds.filter((itemCheckedid) => itemCheckedid !== checkedId);
  } else {
    return currentCheckedIds.concat(checkedId);
  }
}
