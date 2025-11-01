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
 */
const PlayerImage = ({ 
  faceImageId, 
  fallbackUrl, 
  alt = 'Player Image', 
  style = {},
  className = '' 
}) => {
  const [imageUrl, setImageUrl] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    let objectUrl = null;
    let isCancelled = false;

    const fetchImage = async () => {
      if (!faceImageId) {
        // If no faceImageId, use fallback URL
        setImageUrl(fallbackUrl || null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setHasError(false);

        // Call the Cricbuzz get_image API endpoint
        // Format: /img/v1/i1/c{imageId}/i.jpg
        const response = await fetch(
          `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${faceImageId}/i.jpg`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': '2fe6426376mshba6ba3c234ef5e8p122e39jsn331868a1557d',
              'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
            }
          }
        );

        if (!isCancelled) {
          if (response.ok) {
            const blob = await response.blob();
            objectUrl = URL.createObjectURL(blob);
            setImageUrl(objectUrl);
            setIsLoading(false);
          } else {
            console.warn(`Failed to fetch image for ID ${faceImageId}, status: ${response.status}`);
            // Fallback to the fallback URL
            setImageUrl(fallbackUrl || null);
            setHasError(true);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error fetching player image:', error);
        if (!isCancelled) {
          // Fallback to the fallback URL
          setImageUrl(fallbackUrl || null);
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    fetchImage();

    // Cleanup function
    return () => {
      isCancelled = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [faceImageId, fallbackUrl]);

  // Default styles
  const defaultStyle = {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    objectPosition: 'center top',
    borderRadius: '8px',
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
        <div style={{ fontSize: '24px' }}>🏏</div>
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
        <div style={{ fontSize: '24px' }}>👤</div>
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
