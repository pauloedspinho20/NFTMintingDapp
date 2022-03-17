import {
  arrayOf, node, shape, string,
} from 'prop-types';
import parser from 'html-react-parser';

import ExpandableItem from 'components/Mint/Expandable/Item/Item';

const ExpandableItems = ({ children, items, type }) => (!!children || !!items?.length) && (
  <ul className="expandable-items--container">
    { items?.map(item => (
      <ExpandableItem
        key={ `faq-${item.title}` }
        title={ item.title }
        type={ type }
      >
        { parser(item.description) }
      </ExpandableItem>
    )) }

    { children }
  </ul>
);

ExpandableItems.propTypes = {
  children: node,
  items: arrayOf(shape({
    description: string,
    title: string,
  })),
  type: string,
};

ExpandableItems.defaultProps = {
  children: null,
  items: null,
  type: 'expandable',
};

export default ExpandableItems;
