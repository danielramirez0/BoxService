import "./Home.css";

const Home = () => {
  return (
    <section className="row square-row mt-4">
      <div className="col-xs-12 flex-center text-center hero-content">
        <div className="img-wrapper">
          <img
            className="hidden-sm-up"
            src="https://stopxwhispering.files.wordpress.com/2013/07/shelf-closeup-likeable.jpg"
            alt="Retro games on shelf"
          />
        </div>
        <div className="hero-text-overlay">
          <span>
            <h1 className="hero-content">Retro Video Games Delivered to Your Door Every Month!</h1>
            <p>
              Video Game Box Service is a monthly subscription service. Every
              month you get a selection of games for the retro consoles you
              select with ONLY the types of games you like! A box contains 3-5
              Retro Games inside for you to keep!
            </p>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Home;
