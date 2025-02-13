import React, { useState } from "react";
import { Modal } from "antd";

// SVG Icons components remain the same...
const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

const ZoomIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
    />
  </svg>
);

const ImageIcon = ({ className = "w-12 h-12" }) => (
  <svg
    className={`${className} text-gray-400`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const ProductModal = ({ product, visible, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoadError, setImageLoadError] = useState({});

  const DefaultImage = ({ size }) => (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ${
        size === "full"
          ? "w-full h-full"
          : size === "12"
          ? "w-12 h-12"
          : "w-16 h-16"
      }`}
    >
      <ImageIcon className={size === "full" ? "w-16 h-16" : "w-6 h-6"} />
    </div>
  );

  const getValidImages = () => {
    if (
      !product?.images ||
      !Array.isArray(product.images) ||
      product.images.length === 0
    ) {
      return [null];
    }

    return product.images.map((image) => {
      // Handle stringified array (e.g., '["https://..."]')
      if (
        typeof image === "string" &&
        image.startsWith("[") &&
        image.endsWith("]")
      ) {
        try {
          const parsedArray = JSON.parse(image); // Parse the string into an array
          if (Array.isArray(parsedArray) && parsedArray.length > 0) {
            return parsedArray[0]; // Return the first element of the parsed array
          }
        } catch (error) {
          console.error("Error parsing image string:", error);
          return null; // Return null if parsing fails
        }
      }
      return image; // Return the image as-is if not stringified array
    });
  };

  const validImages = getValidImages();

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === validImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? validImages.length - 1 : prev - 1
    );
  };

  const handleImageError = (index) => {
    setImageLoadError((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      width="80%"
      centered
      className="max-w-4xl"
      bodyStyle={{ padding: 0 }}
    >
      <div className="p-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {product?.title}
          </h2>
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold">
            ₹{product?.price?.toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5 relative group">
            <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
              {validImages[currentImageIndex] &&
              !imageLoadError[currentImageIndex] ? (
                <img
                  src={validImages[currentImageIndex]}
                  alt={`Product view ${currentImageIndex + 1}`}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  onError={() => handleImageError(currentImageIndex)}
                />
              ) : (
                <DefaultImage size="full" />
              )}

              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <ZoomIcon />
              </button>
            </div>

            {validImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}

            <div className="flex gap-1.5 mt-2">
              {validImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-shrink-0 rounded-md overflow-hidden transition-all ${
                    currentImageIndex === index
                      ? "ring-2 ring-blue-500 ring-offset-1"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {image && !imageLoadError[index] ? (
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-12 h-12 object-cover"
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <DefaultImage size="12" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                {product?.category?.name}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-base font-semibold mb-2">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product?.description}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-base font-semibold mb-3">Category Details</h3>
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-100">
                  {product?.category?.image && !imageLoadError["category"] ? (
                    <img
                      src={product.category.image}
                      alt={product.category.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError("category")}
                    />
                  ) : (
                    <DefaultImage size="16" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{product?.category?.name}</h4>
                  <p className="text-xs text-gray-500">
                    Category ID: {product?.category?.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
