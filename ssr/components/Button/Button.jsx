import PropTypes from 'prop-types';

const Button = ({ children, style, onClick, type, onSubmit }) => {
  return (
    <button
      className="  text-white px-10 tracking-[2px] py-3 font-BebasNeue text-[18px] uppercase hover:from-[#AA0000] hover:to-[#CC0000] hover:text-[#09090b]"
      style={style}
      onClick={onClick}
      type={type}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func, // Define prop validation for onClick
  onSubmit: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // Add prop validation for type
};

export default Button;
