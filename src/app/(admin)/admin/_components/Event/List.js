import React from 'react';
import { Datagrid, List, TextField, BooleanField, DateField, DeleteWithConfirmButton, EditButton } from 'react-admin';
import { eventFilters } from './filters';

export function EventList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={eventFilters}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="title" />
        <TextField source="organizerName" />
        <DateField source="eventDate" />
        <TextField source="format" />
        <DateField source="createdAt" />
        <BooleanField source="isActive" />
        <EditButton />
        <DeleteWithConfirmButton
          confirmContent="Are you sure?"
          confirmTitle="Data will be removed from the database."
          confirmColor="warning"
          label="Delete"
        />
      </Datagrid>
    </List>
  );
}
