import { BooleanInput, Edit, SimpleForm, TextInput } from 'react-admin';
import { DonationDetailsSchema } from '@admin/_lib/validationSchemas/donationDetailsSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export function DonationDetailsEdit() {
  return (
    <Edit>
      <SimpleForm reValidateMode="onChange" resolver={zodResolver(DonationDetailsSchema)}>
        <BooleanInput label="Donations allowed" source="isDonationEnabled" />
        <TextInput label="Modal title" source="title" fullWidth />
        <BooleanInput label="Show modal subtitle" source="isSubtitleEnabled" />
        <TextInput label="Modal subtitle" fullWidth source="subtitle" />
        <BooleanInput label="Show bank details in modal" fullWidth source="isBankDetailsEnabled" />
        <TextInput label="PayPal link" fullWidth source="paypalLink" />
        <BooleanInput label="Show PayPal link" source="isPayPalLinkEnabled" />
        <TextInput label="Privat24 link" source="privatLink" fullWidth />
        <BooleanInput label="Show Privat24 link" fullWidth source="isPrivatLinkEnabled" />
        <TextInput label="Name of company" source="enterpriceName" fullWidth />
        <TextInput label="IBAN" source="iban" fullWidth />
        <TextInput
          label="Enterprise registry ID"
          source="enterpriseRegisterId"
          parse={v => {
            if (!v) return v;
            return !Number.isNaN(Number(v)) ? Number(v) : v;
          }}
          fullWidth
        />
        <TextInput label="Payment reason" source="paymentPurpose" fullWidth />
        <BooleanInput label="Show QR-code" source="isQREnabled" />
        <TextInput label="QR-code link" source="qrLink" fullWidth />
      </SimpleForm>
    </Edit>
  );
}
