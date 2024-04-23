import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, SimpleForm, TextInput, useGetList } from 'react-admin';
import { specialistEditValidationSchema } from '@admin/_lib/validationSchemas/specialistSchema';
import { transformSpecialistEditData } from '@admin/_utils/transformSpecialistEditData';
import { ActivationForm } from '@admin/components/ServiceProvider/ActivationForm';
import { ServicesForm } from '@admin/components/ServiceProvider/ServicesForm';
import { AddressesForm } from '@admin/components/ServiceProvider/AddressesForm';
import { ContactsList } from '@admin/components/ContactsList';
import { SocialLinks } from '@admin/components/ServiceProvider/SocialLinks';
import { PSYCHOLOGIST, DOCTOR, RESOURCES } from '@admin/_lib/consts';
import { WorkTimeForm } from '@admin/components/ServiceProvider/WorkTimeForm';
import { GeneralInfoEditSpec } from './GeneralInfoEditSpec';
import { DetailsEditSpec } from './DetailsEditSpec';

export function SpecialistEdit() {
  const { data: specializationsData } = useGetList(RESOURCES.specialization);
  const handleTransform = ({ specializationsIds, specializationMethodsIds, ...rest }) => {
    const selectedSpecializationNamesList = specializationsIds.map(id => {
      const specializationData = specializationsData.find(s => s.id === id);
      return specializationData.name.toLowerCase();
    });
    const psychologistMethodsList = selectedSpecializationNamesList.includes(PSYCHOLOGIST.toLowerCase())
      ? specializationMethodsIds.psychologist
      : [];
    const doctorMethodsList = selectedSpecializationNamesList.includes(DOCTOR.toLowerCase())
      ? specializationMethodsIds.doctor
      : [];

    return transformSpecialistEditData({
      rest,
      ...rest,
      specializationsIds,
      specializationMethodsIds: {
        psychologist: psychologistMethodsList,
        doctor: doctorMethodsList,
      },
    });
  };

  return (
    <Edit title="Specialist edit" transform={handleTransform} mutationMode="pessimistic">
      <SimpleForm mode="all" reValidateMode="onChange" resolver={zodResolver(specialistEditValidationSchema)}>
        <GeneralInfoEditSpec type="edit" />
        <DetailsEditSpec />
        <AddressesForm type="edit" label="Addresses" />
        <WorkTimeForm />
        <ServicesForm type="edit" label="Services" />
        <TextInput name="description" source="description" label="Description" fullWidth multiline />
        <ContactsList />
        <SocialLinks />
        <ActivationForm label="Activate/deactivate specialist" />
      </SimpleForm>
    </Edit>
  );
}
