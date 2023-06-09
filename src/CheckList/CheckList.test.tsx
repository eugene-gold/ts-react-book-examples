import { render, screen } from '@testing-library/react';
import { CheckList } from './CheckList';
import userEvent from '@testing-library/user-event';
import { IdValue } from './types';
import { getNewCheckedIds } from './getNewCheckedIds';

test('should render correct list items when data specified', () => {
  render(
    <CheckList
      data={[{ id: 1, name: 'Lucy', role: 'Manager' }]}
      id="id"
      primary="name"
      secondary="role"
    />,
  );
  expect(screen.getByText('Lucy')).toBeInTheDocument();
  expect(screen.getByText('Manager')).toBeInTheDocument();
});

test('should render correct list items when renderItem specified', () => {
  render(
    <CheckList
      data={[{ id: 1, name: 'Lucy', role: 'Manager' }]}
      id="id"
      primary="name"
      secondary="role"
      renderItem={(item) => (
        <li key={item.id}>
          {item.name}-{item.role}
        </li>
      )}
    />,
  );
  expect(screen.getByText('Lucy-Manager')).toBeInTheDocument();
});

test('should render correct checked items when specified', () => {
  render(
    <CheckList
      data={[{ id: 1, name: 'Lucy', role: 'Manager' }]}
      id="id"
      primary="name"
      secondary="role"
      checkedIds={[1]}
    />,
  );
  expect(screen.getByTestId('CheckList__input__1')).toBeChecked();
});

test('should check and uncheck items when clicked', async () => {
  const user = userEvent.setup();
  render(
    <CheckList
      data={[{ id: 1, name: 'Lucy', role: 'Manager' }]}
      id="id"
      primary="name"
      secondary="role"
    />,
  );
  const lucyCheckbox = screen.getByTestId('CheckList__input__1');
  expect(lucyCheckbox).not.toBeChecked();
  await user.click(lucyCheckbox);
  expect(lucyCheckbox).toBeChecked();
  await user.click(lucyCheckbox);
  expect(lucyCheckbox).not.toBeChecked();
});

test('should call onCheckedIdsChange when clicked', async () => {
  const user = userEvent.setup();
  let calledWith: IdValue[] | undefined = undefined;
  render(
    <CheckList
      data={[{ id: 1, name: 'Lucy', role: 'Manager' }]}
      id="id"
      primary="name"
      secondary="role"
      onCheckedIdsChange={(checkedIds) => (calledWith = checkedIds)}
    />,
  );
  await user.click(screen.getByTestId('CheckList__input__1'));
  expect(calledWith).toStrictEqual([1]);
});

test('should remove id when already in checked ids', () => {
  const result = getNewCheckedIds([1, 2, 3], 2);
  expect(result).toStrictEqual([1, 3]);
});
