import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-300 text-base-content">
      <aside>
        <Image
          src={"/fusiondesignlogo-simple.png"}
          alt={""}
          width={100}
          height={100}
          className="-my-8 -mx-1"
        />
        <p>
          Fusion Design
          <br />
          Where Styles Unite, Interiors Delight
        </p>
      </aside>
      <nav>
        <header className="footer-title">Shop</header>
        <a className="link link-hover">New Arrivals</a>
        <a className="link link-hover">Best Sellers</a>
        <a className="link link-hover">Special Offers</a>
        <a className="link link-hover">Gift Cards</a>
      </nav>
      <nav>
        <header className="footer-title">Customer Service</header>
        <a className="link link-hover">Contact Us</a>
        <a className="link link-hover">FAQ</a>
        <a className="link link-hover">Order Tracking</a>
        <a className="link link-hover">Returns & Exchanges</a>
      </nav>
      <nav>
        <header className="footer-title">Information</header>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Terms & Conditions</a>
        <a className="link link-hover">Shipping Policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
