import { motion } from 'framer-motion';

const formatPrice = (price) => {
  return `₹${price.toLocaleString()}`;
};

const ProductCard = ({ product, style, onSwipe, ...props }) => {
  return (
    <motion.div
      className="absolute w-[90%] max-w-xs mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      style={style}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = offset.x;
        if (swipe < -100) {
          onSwipe('left', product.id);
        } else if (swipe > 100) {
          onSwipe('right', product.id);
        } else if (velocity.y < -100) {
          onSwipe('up', product.id);
        }
      }}
      whileDrag={{ 
        scale: 1.03,
        rotate: ({ x }) => x * 0.03
      }}
      {...props}
    >
      <div className="relative h-[60vh] max-h-[450px] w-full overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start">
          <div className="bg-white/90 px-3 py-1 rounded-full">
            <p className="text-xs font-bold uppercase text-gray-700">{product.brand}</p>
          </div>
          
          {product.discountPercentage > 0 && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center">
              <span className="text-xs font-bold">{product.discountPercentage}% OFF</span>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h2 className="text-xl font-bold capitalize text-white mb-1">{product.name}</h2>
          <div className="flex items-center">
            <span className="text-lg font-bold text-white mr-2">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-300 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 flex justify-around">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <span className="text-[10px] text-gray-500 mt-1">Nope</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-[10px] text-gray-500 mt-1">Cart</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-[10px] text-gray-500 mt-1">Like</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 