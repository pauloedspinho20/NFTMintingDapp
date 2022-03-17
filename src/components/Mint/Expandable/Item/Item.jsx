import { useState } from 'react';
import {
  node, string,
} from 'prop-types';
import classnames from 'classnames';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'components/Image';

import './Item.scss';

const ExpandableItem = ({
  children, icon, title, type,
}) => {
  const [ active, setActive ] = useState(false);
  const eventKey = `${type}-${title}`;

  return (
    <Accordion
      as="li"
      className={ classnames('expandable-items--item', {
        'expandable-items--item-active': active,
      }) }
      onSelect={ newEventKey => setActive(!!newEventKey) }
    >
      <Accordion.Item
        as="div"
        eventKey={ eventKey }
      >
        <Accordion.Button
          as="button"
          className="minting-details-trigger"
          type="button"
        >
          { title }

          { icon && (
          <Image
            className="arrow"
            alt="icon"
            src={ icon }
          />
          ) }
        </Accordion.Button>

        <Accordion.Collapse
          className="expandable-items--content"
          eventKey={ eventKey }
        >
          { children }
        </Accordion.Collapse>
      </Accordion.Item>
    </Accordion>
  );
};

ExpandableItem.propTypes = {
  children: node.isRequired,
  title: string.isRequired,
  type: string,
  icon: string,
};

ExpandableItem.defaultProps = {
  type: 'expandable',
  icon: null,
};

export default ExpandableItem;
