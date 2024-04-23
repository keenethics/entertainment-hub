import {
  SimpleForm,
  BooleanInput,
  TextInput,
  DateTimeInput,
  required,
  SelectInput,
  NumberInput,
  useEditContext,
  Loading,
  FormDataConsumer,
} from 'react-admin';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventSchema } from '@admin/_lib/validationSchemas/eventSchema';
import { capitalize } from '@admin/_utils/common';
import { EventPriceFormat, EventFormat } from '@prisma/client';
import { FormTranslations } from '@admin/_lib/translations';
import { TagSelect } from './TagSelect';

const fieldGroupClass = 'flex flex-col md:flex-row md:gap-6';

function PriceInput() {
  const priceType = useWatch({ name: 'priceType' });
  return (
    <>
      <span className="self-center">{priceType === 'MIN_PRICE' && 'from'}</span>
      <NumberInput disabled={priceType === 'FREE'} label="Price" source="price" />
    </>
  );
}

function AddressInput() {
  const format = useWatch({ name: 'format' });
  return (
    <>
      <TextInput disabled={format !== 'OFFLINE'} source="address" label="Address" className="w-96" />
      <TextInput disabled={format !== 'OFFLINE'} source="locationLink" label="Location link" className="w-96" />
    </>
  );
}

export function EventFormEdit({ toolbar, setSelectedTags }) {
  // it is possible that form will be rendered even if tags of event
  // are still being fetched, so we need all data to be fetched before rendering a form
  const { isFetching, isLoading, record } = useEditContext();
  if (isFetching || isLoading) return <Loading />;
  const recordTags = record.tags.map(tag => ({ label: tag.name, value: tag.name }));
  return <EventForm toolbar={toolbar} setSelectedTags={setSelectedTags} recordTags={recordTags} />;
}

export function EventForm({ toolbar, setSelectedTags, recordTags }) {
  const getChoicesList = (list, translations) =>
    list.map(item => ({
      id: item,
      name: capitalize(translations[item.toLowerCase()]) ?? item,
    }));

  const priceTypeChoices = getChoicesList(Object.values(EventPriceFormat), FormTranslations.eventPriceFormat);
  const formatChoices = getChoicesList(Object.values(EventFormat), FormTranslations.eventFormat);

  return (
    <SimpleForm resolver={zodResolver(EventSchema)} toolbar={toolbar}>
      <FormDataConsumer>
        {({ formData }) => (
          <>
            <BooleanInput source="isActive" label="Active" />
            <p className="font-bold">Main information</p>
            <TextInput source="title" label="Event name" validate={required()} className="w-72" />
            <TextInput source="organizerName" label="Organiser name" validate={required()} className="w-72" />
            <TextInput className="mt-32 w-96" source="notes" label="Notes" multiline />
            <DateTimeInput source="eventDate" label="Event date" validate={formData.isActive && required()} />
            <p className="font-bold">Price</p>
            <div className={fieldGroupClass}>
              <SelectInput
                source="priceType"
                choices={priceTypeChoices}
                label="Варіанти"
                validate={formData.isActive && required()}
              />
              <PriceInput />
            </div>
            <p className="font-bold">Location and format</p>
            <div className={fieldGroupClass}>
              <SelectInput
                source="format"
                choices={formatChoices}
                label="Event format"
                validate={formData.isActive && required()}
              />
              <AddressInput />
            </div>
            <p className="font-bold">Event tags</p>
            <TagSelect setSelectedTags={setSelectedTags} defaultValue={recordTags} />
            <p className="mt-6 font-bold">Additional link (specify the type of link: telegran, facebook etc.)</p>
            <div className={fieldGroupClass}>
              <TextInput source="additionalLink.label" label="Type" />
              <TextInput source="additionalLink.link" label="Link" fullWidth />
            </div>
          </>
        )}
      </FormDataConsumer>
    </SimpleForm>
  );
}

EventFormEdit.propTypes = {
  setSelectedTags: PropTypes.func,
  toolbar: PropTypes.element,
};

EventForm.propTypes = {
  setSelectedTags: PropTypes.func,
  toolbar: PropTypes.element,
  recordTags: PropTypes.array,
};
