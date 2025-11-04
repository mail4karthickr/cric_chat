import React from 'react';

/**
 * PlayerImage Component
 * 
 * A reusable component that fetches and displays player images from Cricbuzz API
 * using the faceImageId. Falls back to a direct image URL if provided.
 * 
 * @param {Object} props - Component props
 * @param {number|string} props.faceImageId - The face image ID from Cricbuzz API
 * @param {string} props.fallbackUrl - Optional fallback image URL
 * @param {string} props.alt - Alt text for the image
 * @param {Object} props.style - Custom styles for the image
 * @param {string} props.className - Custom CSS class
 * @param {string} props.size - Size preset: 'small' (60px), 'medium' (120px), 'large' (180px), or custom
 * @param {boolean} props.rounded - Whether to apply border-radius
 * @param {string} props.objectFit - CSS object-fit value: 'cover', 'contain', 'fill', 'none', 'scale-down'
 * @param {string} props.objectPosition - CSS object-position value (e.g., 'center center', 'center top')
 */
const PlayerImage = ({ 
  faceImageId, 
  fallbackUrl, 
  alt = 'Player Image', 
  style = {},
  className = '',
  size = 'medium',
  rounded = false,
  objectFit = 'contain',
  objectPosition = 'center center'
}) => {
  const [imageUrl, setImageUrl] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    if (!faceImageId) {
      // If no faceImageId, use fallback URL
      setImageUrl(fallbackUrl || null);
      setIsLoading(false);
      setHasError(!fallbackUrl);
      return;
    }

    try {
      setIsLoading(true);
      setHasError(false);

      // Try high-resolution images from Cricbuzz CDN
      // Available sizes: 420x420, 300x170, 250x140, 152x152
      // For player photos, use 420x420 for best quality
      const urls = [
        `https://static.cricbuzz.com/a/img/v1/420x420/i1/c${faceImageId}/i.jpg`,  // High-res
        `https://static.cricbuzz.com/a/img/v1/300x170/i1/c${faceImageId}/i.jpg`,  // Medium
        `https://static.cricbuzz.com/a/img/v1/i1/c${faceImageId}/i.jpg`,          // Default
      ];
      
      let urlIndex = 0;
      
      const tryNextUrl = () => {
        if (urlIndex >= urls.length) {
          console.warn(`All image URLs failed for player ID ${faceImageId}`);
          // Fall back to fallbackUrl if provided
          setImageUrl(fallbackUrl || null);
          setHasError(true);
          setIsLoading(false);
          return;
        }
        
        const currentUrl = urls[urlIndex];
        const img = new Image();
        
        img.onload = () => {
          setImageUrl(currentUrl);
          setIsLoading(false);
          setHasError(false);
        };
        
        img.onerror = () => {
          console.warn(`Failed to load player image from ${currentUrl}`);
          urlIndex++;
          tryNextUrl();
        };
        
        img.src = currentUrl;
      };
      
      tryNextUrl();

    } catch (error) {
      console.error('Error setting up player image:', error);
      setImageUrl(fallbackUrl || null);
      setHasError(true);
      setIsLoading(false);
    }
  }, [faceImageId, fallbackUrl]);

  // Size presets
  const sizeMap = {
    small: '60px',
    medium: '120px',
    large: '180px'
  };

  const imageSize = sizeMap[size] || size;

  // Default styles
  const defaultStyle = {
    width: imageSize,
    height: imageSize,
    objectFit: objectFit,
    objectPosition: objectPosition,
    borderRadius: rounded ? '50%' : '0',
    backgroundColor: '#ffffff',
    display: 'block',
    ...style
  };

  // Show loading placeholder
  if (isLoading) {
    return (
      <div 
        style={{
          ...defaultStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f0f0f0',
          color: '#999',
        }}
        className={className}
      >
        <div style={{ fontSize: size === 'small' ? '16px' : size === 'large' ? '32px' : '24px' }}>🏏</div>
      </div>
    );
  }

  // Show error placeholder if no image available
  if (!imageUrl || hasError) {
    return (
      <div 
        style={{
          ...defaultStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f0f0f0',
          color: '#999',
        }}
        className={className}
      >
        <div style={{ fontSize: size === 'small' ? '16px' : size === 'large' ? '32px' : '24px' }}>👤</div>
      </div>
    );
  }

  // Display the image
  return (
    <img 
      src={imageUrl} 
      alt={alt}
      style={defaultStyle}
      className={className}
      onError={() => {
        console.error('Image failed to load');
        setHasError(true);
        setImageUrl(null);
      }}
    />
  );
};

export default PlayerImage;
