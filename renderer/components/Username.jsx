import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import useGlobalState from '../state.js';
import { USERNAME_SETTINGS_TYPES, STATE_NAMES, FILE_NAMES } from '../../constants/constants.js';

const Username = () => {
  const [usernameMin, updateUsernameMin] = useGlobalState(STATE_NAMES.USERNAME_MIN);
  const [usernameMax, updateUsernameMax] = useGlobalState(STATE_NAMES.USERNAME_MAX);
  const [usernameSetType, updateUsernameSetType] = useGlobalState(STATE_NAMES.USERNAME_SET_TYPE);

  const handleMinChange = (e) => {
    updateUsernameMin(e.target.value);
  };

  const handleMaxChange = (e) => {
    updateUsernameMax(e.target.value);
  };

  const handleUsernameSetTypeChange = (e) => {
    updateUsernameSetType(e.target.value);
  };

  return (
    <>
      <InputGroup className="col-5 p-1">
        <InputGroup.Prepend>
          <InputGroup.Text>
            {usernameSetType === USERNAME_SETTINGS_TYPES.RANDOM ? 'USERNAME LENGTH' : 'USERNAME'}
          </InputGroup.Text>
          {usernameSetType === USERNAME_SETTINGS_TYPES.RANDOM ? <InputGroup.Text>MIN</InputGroup.Text> : null}
        </InputGroup.Prepend>

        {usernameSetType === USERNAME_SETTINGS_TYPES.RANDOM ? (
          <Form.Control type="number" min="6" max="24" value={usernameMin} onChange={handleMinChange} />
        ) : null}
        {usernameSetType === USERNAME_SETTINGS_TYPES.RANDOM ? (
          <InputGroup.Prepend>
            <InputGroup.Text>MAX</InputGroup.Text>
          </InputGroup.Prepend>
        ) : null}
        {usernameSetType === USERNAME_SETTINGS_TYPES.RANDOM ? (
          <Form.Control type="number" min="6" max="24" value={usernameMax} onChange={handleMaxChange} />
        ) : null}
        <Form.Control as="select" custom value={usernameSetType} onChange={handleUsernameSetTypeChange}>
          {Object.values(USERNAME_SETTINGS_TYPES).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Form.Control>
      </InputGroup>

      <FontAwesomeIcon
        icon={faQuestionCircle}
        size="2x"
        color="grey"
        className="m-1 mr-2"
        data-for="username_info"
        data-tip
      />
      <ReactTooltip id="username_info" effect="solid" place="left">
        <p className="m-0">
          <strong>RANDOM:</strong> Random username
          <br />
          <strong>CUSTOM:</strong> {FILE_NAMES.CUSTOM_USERNAMES}
        </p>
      </ReactTooltip>
    </>
  );
};

export default Username;
