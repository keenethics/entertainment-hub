import { BooleanField, FunctionField, Show, SimpleShowLayout, TextField } from 'react-admin';
import { QRCodeSVG } from 'qrcode.react';

export function DonateDetailsShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <BooleanField label="Donations enabled" source="isDonationEnabled" />
        <TextField label="Modal title" source="title" />
        <TextField label="Modal subtitle" source="subtitle" />
        <BooleanField label="Show modal subtitle" source="isSubtitleEnabled" />
        <BooleanField label="Show bank details" source="isBankDetailsEnabled" />
        <TextField label="PayPal link" source="paypalLink" />
        <BooleanField label="Show PayPal link" source="isPayPalLinkEnabled" />
        <TextField label="Privat24 link" source="privatLink" />
        <BooleanField label="Show Privat24 link" source="isPrivatLinkEnabled" />
        <TextField label="Name of company" source="enterpriceName" />
        <TextField label="IBAN" source="iban" />
        <TextField label="Enterprise registry name" source="enterpriseRegisterId" />
        <TextField label="Payment reason" source="paymentPurpose" />
        <BooleanField label="Show QR-code" source="isQREnabled" />
        <TextField label="QR-code link" source="qrLink" />
        <FunctionField
          label="QR-code"
          render={record => (
            <a href={record.qrLink} target="_blank" rel="noopener noreferrer">
              <QRCodeSVG size={200} value={record.qrLink} />
            </a>
          )}
        />
      </SimpleShowLayout>
    </Show>
  );
}
