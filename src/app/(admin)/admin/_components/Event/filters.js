import { SearchInput, DateTimeInput, SelectInput } from 'react-admin';
import { QuickFilter } from '@admin/components/QuickFilter';
import { EventFormat } from '@prisma/client';

export const eventFilters = [
  <SearchInput key="search" source="q" alwaysOn />,
  <DateTimeInput key="fromDate" label="Event date from:" source="eventDate_gte" alwaysOn />,
  <DateTimeInput key="toDate" label="Event date to:" source="eventDate_lte" alwaysOn />,
  <SelectInput
    label="Event format"
    key="format"
    source="format_enum"
    choices={[
      { id: undefined, name: 'Both' },
      { id: EventFormat.OFFLINE, name: 'Offline' },
      { id: EventFormat.ONLINE, name: 'Online' },
    ]}
    alwaysOn
  />,
  <DateTimeInput key="fromCreationDate" label="Event created date from:" source="createdAt_gte" alwaysOn />,
  <DateTimeInput key="toCreationDate" label="Event created date to:" source="createdAt_lte" alwaysOn />,
  <SelectInput
    key="status"
    label="Status"
    source="isActive"
    choices={[
      { id: undefined, name: 'Both' },
      { id: true, name: 'Active' },
      { id: false, name: 'Inactive' },
    ]}
    alwaysOn
  />,
  <QuickFilter key="futureEvents" source="eventDate_gt" label="Future events" defaultValue={new Date()} />,
  <QuickFilter key="archivedEvents" source="eventDate_lt" label="Archived events" defaultValue={new Date()} />,
];
