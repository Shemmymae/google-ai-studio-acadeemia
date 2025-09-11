
import React from 'react';
import { Link } from 'react-router-dom';
import LandingLayout from '../components/LandingLayout';
import { useCart } from '../components/CartContext';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <LandingLayout>
      <div className="bg-secondary dark:bg-gray-800 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-text-primary dark:text-gray-100">Shopping Cart</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-text-primary dark:text-gray-100">Your cart is empty</h2>
            <p className="text-text-secondary dark:text-gray-400 mt-2">Looks like you haven't added any add-ons yet.</p>
            <Link to="/store" className="mt-6 inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase">Product</th>
                      <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase text-center">Quantity</th>
                      <th className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item.id} className="border-b dark:border-gray-700">
                        <td className="p-4">
                          <div className="font-bold text-text-primary dark:text-gray-100">{item.title}</div>
                          <p className="text-sm text-text-secondary dark:text-gray-400">${item.price.toFixed(2)}</p>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline text-xs mt-1">Remove</button>
                        </td>
                        <td className="p-4 align-middle">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                            min="1"
                            className="w-20 text-center p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
                          />
                        </td>
                        <td className="p-4 text-right font-semibold text-text-primary dark:text-gray-200">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2 text-text-secondary dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 text-text-secondary dark:text-gray-300">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t dark:border-gray-700 pt-4 flex justify-between font-bold text-lg text-text-primary dark:text-gray-100">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="mt-6 w-full text-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors block">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </LandingLayout>
  );
};

export default CartPage;
