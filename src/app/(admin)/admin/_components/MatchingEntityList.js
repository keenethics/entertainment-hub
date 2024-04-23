import React from 'react';
import { useFindEntityMatchingPhoneOrEmail } from '@admin/_hooks/useFindEntityMatchingPhoneOrEmail';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { MatchingEntityListItem } from '@admin/components/MatchingEntityListItem';
import { EMAIL, PHONE } from '@admin/_lib/consts';
import { useWatch } from 'react-hook-form';

export function MatchingEntityList({ matchingParams, className }) {
  const { phone, email } = matchingParams;

  const currentEntityId = useWatch({ name: 'id' });

  const { data: entitiesMatchingPhone, num: numEntitiesMatchingPhone } = useFindEntityMatchingPhoneOrEmail({
    key: PHONE,
    value: phone,
    idToExclude: currentEntityId,
  });

  const { data: entitiesMatchingEmail, num: numEntitiesMatchingEmail } = useFindEntityMatchingPhoneOrEmail({
    key: EMAIL,
    value: email,
    idToExclude: currentEntityId,
  });

  const hasEntitiesMatchingPhone = !!phone && !!numEntitiesMatchingPhone;
  const hasEntitiesMatchingEmail = !!email && !!numEntitiesMatchingEmail;

  const noteIndicator = ({ isActive }) => {
    const bgColor = isActive ? 'bg-primary-300' : 'bg-secondary-300';
    const text = isActive ? 'active' : 'inactive';
    return (
      <p>
        <span className={cn('inline-block h-2.5 w-2.5', bgColor)} /> - {text}
      </p>
    );
  };

  const isShown = hasEntitiesMatchingPhone || hasEntitiesMatchingEmail;

  return isShown ? (
    <div className={cn('flex flex-col gap-6', className)}>
      {hasEntitiesMatchingPhone && <MatchingEntityListItem entities={entitiesMatchingPhone} label="phone" />}
      {hasEntitiesMatchingEmail && <MatchingEntityListItem entities={entitiesMatchingEmail} label="email" />}
      <div className="text-p4">
        {noteIndicator({ isActive: true })}
        {noteIndicator({ isActive: false })}
      </div>
    </div>
  ) : null;
}

MatchingEntityList.propTypes = {
  matchingParams: PropTypes.shape({
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  className: PropTypes.string,
};
