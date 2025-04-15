import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="relative w-full h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">Discover Products</h1>
      
      <div className="relative w-full max-w-sm h-[500px] overflow-visible flex justify-center">
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`absolute top-1/4 z-30 px-6 py-3 rounded-full font-bold text-white ${
                messageType === 'liked' ? 'bg-green-500' : 
                messageType === 'cart' ? 'bg-blue-500' : 'bg-red-500'
              }`}
            >
              {messageType === 'liked' ? 'Added to Favorites!' : 
               messageType === 'cart' ? 'Added to Cart!' : 'Passed'}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative w-full h-full">
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
      
      <div className="flex justify-between w-full max-w-sm mt-10">
        <button 
          onClick={() => handleSwipe('left', products[currentIndex].id)} 
          className="bg-white p-4 rounded-full shadow-md text-red-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <button 
          onClick={() => handleSwipe('up', products[currentIndex].id)} 
          className="bg-white p-4 rounded-full shadow-md text-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
        
        <button 
          onClick={() => handleSwipe('right', products[currentIndex].id)} 
          className="bg-white p-4 rounded-full shadow-md text-green-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>Swipe <span className="text-red-500 font-bold">left</span> to pass, <span className="text-green-500 font-bold">right</span> to like, or <span className="text-blue-500 font-bold">up</span> to add to cart</p>
      </div>
    </div>
  );
};

export default ProductSwiper; 