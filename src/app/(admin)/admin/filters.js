import { SearchInput, DateTimeInput, SelectInput, NullableBooleanInput } from 'react-admin';

export const specialistsFilters = [
  <SearchInput placeholder="Search" key="search" source="q" alwaysOn />,
  <DateTimeInput label="Was created from" key="fromDate" source="createdAt_gte" alwaysOn />,
  <DateTimeInput label="Was created until" key="toDate" source="createdAt_lte" alwaysOn />,
  <SelectInput
    label="Format of work"
    key="formatOfWork"
    source="formatOfWork_enum"
    choices={[
      { id: null, name: 'All' },
      { id: 'BOTH', name: 'Online + offline' },
      { id: 'OFFLINE', name: 'Offline' },
      { id: 'ONLINE', name: 'Online' },
    ]}
    alwaysOn
  />,
  <NullableBooleanInput
    key="active"
    label="Status"
    source="isActive"
    nullLabel="All"
    falseLabel="Inactive"
    trueLabel="Active"
    alwaysOn
  />,
];

export const organizationFilters = specialistsFilters;
