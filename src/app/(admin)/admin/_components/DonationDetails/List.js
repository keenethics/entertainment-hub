import React from 'react';
import { BooleanField, Datagrid, List, TextField } from 'react-admin';

export function DonationDetailsList() {
  return (
    <List>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <BooleanField label="Donations enabled" source="isDonationEnabled" />
        <TextField label="Modal title" source="title" />
        <TextField label="Modal subtitle" source="subtitle" />
        <BooleanField label="Show modal subtitle" source="isSubtitleEnabled" />
        <BooleanField label="Show bank details" source="isBankDetailsEnabled" />
        <TextField label="PayPal link" source="paypalLink" />
        <BooleanField label="Show PayPal link" source="isPayPalLinkEnabled" />
        <TextField label="Privat24 link" source="privatLink" />
        <BooleanField label="Show Privat24 link" source="isPrivatLinkEnabled" />
      </Datagrid>
    </List>
  );
}
