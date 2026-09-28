import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Dashboard({ setPage }) {
  const [crops, setCrops] = useState([]);

  const loadCrops = async () => {
    const { data, error } = await supabase
      .from("crop_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading crops:", error);
      return;
    }

    setCrops(data || []);
  };

  useEffect(() => {
    loadCrops();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setPage("home");
  };

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="dashboard-logo">
          🌱 <span>Crop Planner</span>
        </div>

        <div className="dashboard-nav-right">
          <span className="dashboard-user">
            🌾 Farmer
          </span>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="dashboard-content">

        <div className="dashboard-heading">
          <div>
            <p className="dashboard-tag">
              🌿 Welcome back
            </p>

            <h1>Your Farming Dashboard</h1>

            <p>
              Plan, organize and manage your crop rotation easily.
            </p>
          </div>
        </div>

        {/* Stats */}
        <section className="dashboard-stats">

          <div className="stat-card">
            <div className="stat-icon">🌱</div>

            <div>
              <span>Total Crops</span>
              <strong>{crops.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>

            <div>
              <span>Planning</span>
              <strong>Active</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">☁️</div>

            <div>
              <span>Data Storage</span>
              <strong>Secure</strong>
            </div>
          </div>

        </section>

        {/* Crop Planner Card */}
        <section className="planner-card">

          <div className="planner-card-icon">
            🌾
          </div>

          <div className="planner-card-content">
            <h2>Crop Rotation Planner</h2>

            <p>
              Add crops, track seasonal information,
              update your entries and manage your crop rotation.
            </p>

            {crops.length > 0 && (
              <div className="latest-crop">
                <span>Latest Crop</span>

                <strong>
                  🌱 {crops[0].crop_name}
                </strong>

                <small>
                  {crops[0].season_note}
                </small>
              </div>
            )}

            <button
              className="dashboard-primary-button"
              onClick={() => setPage("crop")}
            >
              View All Crops →
            </button>
          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;