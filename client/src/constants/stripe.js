const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_U1UOM3xqOl9mU5smnBP9KB9m'
  : 'pk_test_U1UOM3xqOl9mU5smnBP9KB9m';

export default STRIPE_PUBLISHABLE;
