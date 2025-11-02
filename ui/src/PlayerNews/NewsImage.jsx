import React from 'react';

/**
 * NewsImage Component
 * 
 * A reusable component that fetches and displays news cover images from Cricbuzz API
 * using the imageId. Falls back to a placeholder if the image cannot be loaded.
 * 
 * @param {Object} props - Component props
 * @param {number|string} props.imageId - The image ID from Cricbuzz API
 * @param {string} props.caption - Image caption
 * @param {string} props.source - Image source attribution
 * @param {string} props.alt - Alt text for the image
 * @param {Object} props.style - Custom styles for the image
 * @param {string} props.className - Custom CSS class
 */
const NewsImage = ({ 
  imageId, 
  caption,
  source,
  alt = 'News Image', 
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
      if (!imageId) {
        setImageUrl(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setHasError(false);

        // Call the Cricbuzz get_image API endpoint
        // Format: /img/v1/i1/c{imageId}/i.jpg?p=de
        const response = await fetch(
          `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${imageId}/i.jpg?p=de`,
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
            console.warn(`Failed to fetch news image for ID ${imageId}, status: ${response.status}`);
            setImageUrl(null);
            setHasError(true);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error fetching news image:', error);
        if (!isCancelled) {
          setImageUrl(null);
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
  }, [imageId]);

  // Default styles
  const defaultStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '12px 12px 0 0',
    backgroundColor: '#f0f0f0',
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
          background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
          color: '#999',
        }}
        className={className}
      >
        <div style={{ fontSize: '32px' }}>📰</div>
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
          color: '#999',
          gap: '8px'
        }}
        className={className}
      >
        <div style={{ fontSize: '48px' }}>🏏</div>
        <div style={{ fontSize: '12px', textAlign: 'center', padding: '0 16px' }}>
          {caption || 'Image not available'}
        </div>
      </div>
    );
  }

  // Display the image with optional caption
  return (
    <div className={className}>
      <img 
        src={imageUrl} 
        alt={alt || caption}
        style={defaultStyle}
        onError={() => {
          console.error('News image failed to load');
          setHasError(true);
          setImageUrl(null);
        }}
      />
      {(caption || source) && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#F9FAFB',
          borderTop: '1px solid #E5E7EB',
          fontSize: '12px',
          lineHeight: '1.5'
        }}>
          {caption && (
            <div style={{
              color: '#374151',
              marginBottom: source ? '6px' : '0',
              fontWeight: '400'
            }}>
              {caption}
            </div>
          )}
          {source && (
            <div style={{
              color: '#6B7280',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{ fontSize: '10px' }}>📷</span>
              <span>{source}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsImage;
