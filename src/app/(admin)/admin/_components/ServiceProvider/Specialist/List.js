import React from 'react';
import { BooleanField, Datagrid, DateField, DeleteWithConfirmButton, List, TextField } from 'react-admin';
import { specialistsFilters } from '@admin/filters';

export function SpecialistsList() {
  return (
    <List sort={{ field: 'createdAt', order: 'DESC' }} filters={specialistsFilters}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField label="First name" source="firstName" />
        <TextField label="Last name" source="lastName" />
        <TextField label="Surname" source="surname" />
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
