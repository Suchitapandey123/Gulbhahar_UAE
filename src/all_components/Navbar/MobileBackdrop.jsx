
const MobileBackdrop = ({ isMenuOpen, toggleMenu }) => (
    isMenuOpen && (
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-out opacity-100 md:hidden"
        onClick={toggleMenu}
      />
    )
  );
  
  export default MobileBackdrop;