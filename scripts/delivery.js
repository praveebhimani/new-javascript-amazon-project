export const deliveryOptions = [
  {
    id:'1',
    deliveryDays:7,
    priceCents:0},
  {
    id:'2',
    deliveryDays:3,
    priceCents:499
  },
  {
    id:'3',
    deliveryDays:1,
    priceCents:999
  }
];

export function findDeliveryOption(id){
  let deliveryOpiton;
  deliveryOptions.forEach(option => {
    if(option.id === id){
      deliveryOpiton = option;
    }
  });
  return deliveryOpiton;
}