import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

export function MethodsShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="title" label="Name" />
        <TextField source="description" label="Description" />
      </SimpleShowLayout>
    </Show>
  );
}
