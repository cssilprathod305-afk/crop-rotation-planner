import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function CropPlanner({ setPage }) {
  const [crops, setCrops] = useState([]);
  const [cropName, setCropName] = useState("");
  const [seasonNote, setSeasonNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadCrops = async () => {
    const { data, error } = await supabase
      .from("crop_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      return;
    }

    setCrops(data || []);
  };

  useEffect(() => {
    loadCrops();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!cropName.trim() || !seasonNote.trim()) {
      setError("Please enter crop name and season note.");
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from("crop_entries")
        .update({
          crop_name: cropName.trim(),
          season_note: seasonNote.trim(),
        })
        .eq("id", editingId);

      if (error) {
        setError(error.message);
        return;
      }

      setMessage("Crop updated successfully.");
      setEditingId(null);
    } else {
      const { error } = await supabase
        .from("crop_entries")
        .insert([
          {
            crop_name: cropName.trim(),
            season_note: seasonNote.trim(),
          },
        ]);

      if (error) {
        setError(error.message);
        return;
      }

      setMessage("Crop added successfully.");
    }

    setCropName("");
    setSeasonNote("");

    loadCrops();
  };

  const handleEdit = (crop) => {
    setEditingId(crop.id);
    setCropName(crop.crop_name);
    setSeasonNote(crop.season_note);
    setMessage("");
    setError("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this crop?"
    );

    if (!confirmDelete) {
      return;
    }

    setError("");
    setMessage("");

    const { error } = await supabase
      .from("crop_entries")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Crop deleted successfully.");

    loadCrops();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setCropName("");
    setSeasonNote("");
    setMessage("");
    setError("");
  };

  return (
    <div className="crop-page">

      {/* Navbar */}
      <nav className="crop-navbar">
        <div className="crop-logo">
          🌱 <span>Crop Planner</span>
        </div>

        <button
          className="crop-dashboard-button"
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>
      </nav>

      {/* Main Content */}
      <main className="crop-content">

        <div className="crop-heading">
          <p>🌿 Smart Farming</p>

          <h1>Crop Rotation Planner</h1>

          <span>
            Add, organize and manage your crops by season.
          </span>
        </div>

        {/* Add / Edit Card */}
        <section className="crop-form-card">

          <div className="crop-form-icon">
            {editingId ? "✏️" : "🌾"}
          </div>

          <div className="crop-form-content">

            <h2>
              {editingId ? "Update Crop" : "Add a New Crop"}
            </h2>

            <p>
              {editingId
                ? "Update the crop information below."
                : "Enter crop details to add them to your planner."}
            </p>

            {message && (
              <div className="crop-success">
                {message}
              </div>
            )}

            {error && (
              <div className="crop-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <label>Crop Name</label>

              <input
                type="text"
                placeholder="e.g. Wheat"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
              />

              <label>Season Note</label>

              <textarea
                placeholder="e.g. Winter / Rabi season"
                value={seasonNote}
                onChange={(e) => setSeasonNote(e.target.value)}
              />

              <div className="crop-form-buttons">

                <button
                  type="submit"
                  className="crop-primary-button"
                >
                  {editingId ? "Update Crop" : "Add Crop"} →
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="crop-cancel-button"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>
          </div>
        </section>

        {/* Crop List */}
        <section className="crop-list-section">

          <div className="crop-list-heading">
            <div>
              <h2>Your Crops</h2>
              <p>
                {crops.length} crop{crops.length !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>

          {crops.length === 0 ? (
            <div className="empty-crops">
              <div>🌱</div>
              <h3>No crops added yet</h3>
              <p>
                Add your first crop using the form above.
              </p>
            </div>
          ) : (
            <div className="crop-grid">

              {crops.map((crop) => (
                <div className="crop-card" key={crop.id}>

                  <div className="crop-card-top">
                    <div className="crop-card-icon">
                      🌾
                    </div>

                    <span className="crop-season">
                      Season
                    </span>
                  </div>

                  <h3>{crop.crop_name}</h3>

                  <p>{crop.season_note}</p>

                  <div className="crop-card-actions">

                    <button
                      className="edit-button"
                      onClick={() => handleEdit(crop)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(crop.id)}
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default CropPlanner;