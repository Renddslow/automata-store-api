import makeItemResponse from '../items/makeItemResponse';

const makeCartItemResponse = (data) => {
  const itemAttributes = makeItemResponse({ ...data, specs: [] });
  const { specs, ...item } = itemAttributes.attributes;

  return {
    type: 'cart_item',
    id: data.cart_item_id,
    attributes: {
      itemId: data.item_id,
      priceOnAdd: data.price_on_add,
      quantity: data.quantity,
      ...item,
    },
  };
};

export default makeCartItemResponse;
