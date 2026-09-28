function Home({ setPage }) {
  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          🌱 <span>Crop Planner</span>
        </div>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button onClick={() => setPage("signin")}>
            Sign In
          </button>

          <button
            className="nav-signup"
            onClick={() => setPage("signup")}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">
          <p className="hero-tag">
            🌿 Smart Farming • Better Planning
          </p>

          <h1>
            Plan Your Crops.
            <br />
            <span>Grow Smarter.</span>
          </h1>

          <p className="hero-description">
            Manage your crop rotation, keep track of seasons,
            and organize your farming plans in one simple place.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-button"
              onClick={() => setPage("signup")}
            >
              Get Started →
            </button>

            <button
              className="secondary-button"
              onClick={() => setPage("signin")}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="hero-card">
          <div className="hero-card-icon">
            🌾
          </div>

          <h2>Crop Rotation</h2>

          <p>
            Organize your crops by season and keep
            your farming plans easy to manage.
          </p>

          <div className="crop-preview">
            <div>
              <span>🌾</span>
              <strong>Wheat</strong>
              <small>Winter Season</small>
            </div>

            <div>
              <span>🌽</span>
              <strong>Maize</strong>
              <small>Summer Season</small>
            </div>
          </div>
        </div>

      </section>

      {/* Features */}
      <section className="features">

        <div className="feature-card">
          <div>🌱</div>
          <h3>Manage Crops</h3>
          <p>
            Add and organize your crop entries easily.
          </p>
        </div>

        <div className="feature-card">
          <div>📅</div>
          <h3>Track Seasons</h3>
          <p>
            Keep useful seasonal notes for every crop.
          </p>
        </div>

        <div className="feature-card">
          <div>☁️</div>
          <h3>Save Your Data</h3>
          <p>
            Your crop information is securely stored.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;