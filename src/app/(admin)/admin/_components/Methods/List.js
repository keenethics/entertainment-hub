import React from 'react';
import { Datagrid, TextField, List, EditButton, DeleteWithConfirmButton } from 'react-admin';

export function MethodsList() {
  return (
    <List>
      <Datagrid rowClick="show" bulkActionButtons={false} sort={{ field: 'specialization.name' }}>
        <TextField source="specialization.name" label="Specialization" />
        <TextField source="title" label="Name" />
        <TextField source="description" label="Description" />
        <EditButton label="Edit" />
        <DeleteWithConfirmButton
          confirmContent="Are you sure?"
          confirmTitle="Data will be removed from database."
          confirmColor="warning"
          label="Delete"
        />
      </Datagrid>
    </List>
  );
}
