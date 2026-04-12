import { motion } from "framer-motion";

function FormInput({ placeholder, onChange, textarea }) {

  if (textarea) {
    return (
      <motion.textarea
        className="input"
        placeholder={placeholder}
        rows="4"
        onChange={onChange}
        whileFocus={{ scale: 1.03 }}
      />
    );
  }

  return (
    <motion.input
      className="input"
      placeholder={placeholder}
      onChange={onChange}
      whileFocus={{ scale: 1.03 }}
    />
  );
}

export default FormInput;