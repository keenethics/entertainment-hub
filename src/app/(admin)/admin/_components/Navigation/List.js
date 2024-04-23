'use client';

import { Datagrid, EditButton, List, TextField } from 'react-admin';
import React from 'react';

export function NavigationList() {
  return (
    <List>
      <Datagrid bulkActionButtons={false}>
        <TextField label="Name" source="title" />
        <TextField label="Link" source="href" />
        <EditButton label="Edit" />
      </Datagrid>
    </List>
  );
}
