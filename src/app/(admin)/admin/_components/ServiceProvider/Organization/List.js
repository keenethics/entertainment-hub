import React from 'react';
import { BooleanField, Datagrid, DateField, DeleteWithConfirmButton, List, TextField } from 'react-admin';
import { organizationFilters } from '@admin/filters';

export function OrganizationsList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={organizationFilters}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField label="Name" source="name" />
        <TextField label="Format of work" source="formatOfWork" />
        <DateField label="Record creation date" showTime source="createdAt" />
        <BooleanField label="Active" source="isActive" />
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
