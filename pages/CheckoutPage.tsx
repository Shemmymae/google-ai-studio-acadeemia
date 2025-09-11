



import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingLayout from '../components/LandingLayout';
import { useCart } from '../components/CartContext';
import { useAuth } from '../App';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
      e.preventDefault();
      // In a real app, you would process the payment here.
      console.log('Placing order for user:', user?.email);
      clearCart();
      navigate('/order-confirmation');
  };

  return (
    <LandingLayout>
      <div className="bg-secondary dark:bg-gray-800 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-text-primary dark:text-gray-100">Checkout</h1>
        </div>
      </div>
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Order Form */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-6">Payment Information</h2>
            <form onSubmit={handlePlaceOrder} className="bg-card dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input type="email" value={user?.email || ''} readOnly className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cardholder Name</label>
                <input type="text" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Card Details</label>
                <div className="mt-1 p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600">
                  {/* This would be a Stripe/Braintree element in a real app */}
                  <p className="text-sm text-gray-500">Mock Card Element: 4242 **** **** 4242</p>
                </div>
              </div>
              <button type="submit" className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-4">Order Summary</h2>
              <div className="space-y-3 border-b dark:border-gray-700 pb-4 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-text-secondary dark:text-gray-300">{item.title} x {item.quantity}</span>
                    <span className="font-medium text-text-primary dark:text-gray-200">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mb-2 text-text-secondary dark:text-gray-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-text-secondary dark:text-gray-300">
                <span>Taxes</span>
                <span>$0.00</span>
              </div>
              <div className="border-t dark:border-gray-700 pt-4 flex justify-between font-bold text-lg text-text-primary dark:text-gray-100">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default CheckoutPage;