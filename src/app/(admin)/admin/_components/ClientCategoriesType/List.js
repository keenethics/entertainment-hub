import React from 'react';
import { Datagrid, TextField, List, EditButton, DeleteWithConfirmButton } from 'react-admin';

export function ClientCategoryList() {
  return (
    <List>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" label="Category" />
        <EditButton label="Edit" />
        <DeleteWithConfirmButton
          confirmContent="Are you sure?"
          confirmTitle="This category will be removed from all organizations it is related to."
          confirmColor="warning"
          label="Delete"
        />
      </Datagrid>
    </List>
  );
}
