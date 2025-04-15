import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const ProductSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');

  const handleSwipe = (direction, productId) => {
    setExitDirection(direction);

    setTimeout(() => {
      if (direction === 'right') {
        console.log(`Liked Product ID: ${productId}`);
        setLikedProducts([...likedProducts, productId]);
        setMessageType('liked');
      } else if (direction === 'left') {
        console.log(`Passed Product ID: ${productId}`);
        setMessageType('passed');
      } else if (direction === 'up') {
        console.log(`Add to cart Product ID: ${productId}`);
        setCartProducts([...cartProducts, productId]);
        setMessageType('cart');
      }

      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 1000);

      if (currentIndex < products.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0); // Loop back to the beginning
      }

      setExitDirection(null);
    }, 200);
  };

  const generateVariants = (direction) => {
    if (!direction) return {};

    if (direction === 'left') {
      return {
        initial: { x: 0, opacity: 1 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -300, opacity: 0, transition: { duration: 0.2 } },
      };
    } else if (direction === 'right') {
      return {
        initial: { x: 0, opacity: 1 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 300, opacity: 0, transition: { duration: 0.2 } },
      };
    } else if (direction === 'up') {
      return {
        initial: { y: 0, opacity: 1 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -300, opacity: 0, transition: { duration: 0.2 } },
      };
    }

    return {};
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col overflow-hidden">
      <header className="pt-8 pb-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-pink-600">Shop</span>Swipe
        </h1>
      </header>
      
      <div className="relative flex-1 w-full max-w-sm mx-auto px-4 overflow-hidden">
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`absolute top-8 left-1/2 transform -translate-x-1/2 z-30 px-5 py-2 rounded-full font-bold text-white shadow-lg ${
                messageType === 'liked' ? 'bg-green-500' : 
                messageType === 'cart' ? 'bg-blue-500' : 'bg-red-500'
              }`}
            >
              {messageType === 'liked' ? 'Added to Favorites! 💖' : 
               messageType === 'cart' ? 'Added to Cart! 🛒' : 'Passed 👋'}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence>
            {products[currentIndex] && (
              <ProductCard
                key={products[currentIndex].id}
                product={products[currentIndex]}
                onSwipe={handleSwipe}
                variants={generateVariants(exitDirection)}
                initial="initial"
                animate="animate"
                exit="exit"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="pb-8 pt-4 px-4">
        <div className="flex justify-between w-full max-w-xs mx-auto">
          <button 
            onClick={() => handleSwipe('left', products[currentIndex].id)} 
            className="bg-white p-3.5 rounded-full shadow-md text-red-500 transform transition hover:scale-110 active:scale-95"
            aria-label="Pass"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button 
            onClick={() => handleSwipe('up', products[currentIndex].id)} 
            className="bg-blue-500 p-3.5 rounded-full shadow-md text-white transform transition hover:scale-110 active:scale-95"
            aria-label="Add to cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
          
          <button 
            onClick={() => handleSwipe('right', products[currentIndex].id)} 
            className="bg-white p-3.5 rounded-full shadow-md text-green-500 transform transition hover:scale-110 active:scale-95"
            aria-label="Like"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        <div className="mt-5 text-center text-xs text-gray-500">
          <p className="font-medium">Swipe <span className="text-red-500">left</span> to pass, <span className="text-green-500">right</span> to like, or <span className="text-blue-500">up</span> to add to cart</p>
          <p className="mt-1 text-gray-400">{currentIndex + 1} of {products.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductSwiper; 