import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import Button from '@kiwicom/orbit-components/lib/Button';
import Desktop from '@kiwicom/orbit-components/lib/Desktop';
import Mobile from '@kiwicom/orbit-components/lib/Mobile';
import { Remove } from '@kiwicom/orbit-components/lib/icons';

const DeleteButton = ({
  id, children, onSuccess, mutation, refetchQuery, ...rest
}) => {
  const [deleteAction] = useMutation(
    mutation, { refetchQueries: [{ query: refetchQuery }] },
  );

  const deleteHandler = () => {
    // eslint-disable-next-line
    if (confirm('Are you sure you want to delete this?')) {
      deleteAction({ variables: { id } })
        .then(() => {
          if (onSuccess) onSuccess();
        })
        .catch((e) => alert(e.message)); // eslint-disable-line
    }
  };

  return (
    <Button onClick={deleteHandler} type='critical' {...rest}>
      <Desktop>{children}️</Desktop>
      <Mobile>
        <Remove />
      </Mobile>
    </Button>
  );
};

DeleteButton.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string,
  onSuccess: PropTypes.func,
  mutation: PropTypes.object,
  refetchQuery: PropTypes.object,
};

export default DeleteButton;
