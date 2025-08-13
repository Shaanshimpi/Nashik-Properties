import React from 'react';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  size = 'md',
  hover = false,
  shadow = 'md',
  padding = true,
  className = '',
  onClick,
  ...props
}) => {
  const cardClasses = [
    'card',
    `card--${variant}`,
    `card--${size}`,
    `card--shadow-${shadow}`,
    hover && 'card--hover',
    !padding && 'card--no-padding',
    onClick && 'card--clickable',
    className
  ].filter(Boolean).join(' ');

  const CardComponent = onClick ? 'button' : 'div';

  return (
    <CardComponent
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

// Card sub-components
Card.Header = ({ children, className = '', ...props }) => (
  <div className={`card__header ${className}`} {...props}>
    {children}
  </div>
);

Card.Body = ({ children, className = '', ...props }) => (
  <div className={`card__body ${className}`} {...props}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '', ...props }) => (
  <div className={`card__footer ${className}`} {...props}>
    {children}
  </div>
);

Card.Image = ({ src, alt, className = '', ...props }) => (
  <div className={`card__image ${className}`}>
    <img src={src} alt={alt} {...props} />
  </div>
);

Card.Title = ({ children, level = 3, className = '', ...props }) => {
  const TitleComponent = `h${level}`;
  return (
    <TitleComponent className={`card__title ${className}`} {...props}>
      {children}
    </TitleComponent>
  );
};

Card.Subtitle = ({ children, className = '', ...props }) => (
  <p className={`card__subtitle ${className}`} {...props}>
    {children}
  </p>
);

Card.Text = ({ children, className = '', ...props }) => (
  <p className={`card__text ${className}`} {...props}>
    {children}
  </p>
);

Card.Actions = ({ children, align = 'left', className = '', ...props }) => (
  <div className={`card__actions card__actions--${align} ${className}`} {...props}>
    {children}
  </div>
);

export default Card;