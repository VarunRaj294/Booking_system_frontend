import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);

  const handleLogout = () => {
    // Remove session items
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");

    sessionStorage.removeItem("active-owner");
    sessionStorage.removeItem("owner-jwtToken");

    sessionStorage.removeItem("active-guest");
    sessionStorage.removeItem("giest-jwtToken");

    // Set loading state to false and redirect after a delay
    setTimeout(() => {
      setLoading(false); // Hide the loading message
      // Redirect to home and force a page reload
      window.location.href = "/home";
    }, 1000); // Adjust delay as needed
  };

  const handleCancel = () => {
    window.location.href = "/home";
  };

  return (
    <>
      {showModal && (
        <div className="modal fade show" style={{ 
          display: 'block', 
          background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
          backdropFilter: 'blur(8px)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1050
        }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{
              borderRadius: '20px',
              border: 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              overflow: 'hidden'
            }}>
              <div className="modal-header" style={{
                borderBottom: 'none',
                padding: '25px 30px',
                background: 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px'
              }}>
                <h5 className="modal-title" style={{
                  color: '#2c3e50',
                  fontWeight: '600',
                  fontSize: '1.4rem',
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>Confirm Logout</h5>
                <button type="button" className="btn-close" onClick={handleCancel} style={{
                  fontSize: '0.8rem',
                  opacity: '0.7',
                  transition: 'opacity 0.3s ease'
                }}></button>
              </div>
              <div className="modal-body" style={{
                padding: '30px',
                textAlign: 'center',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
              }}>
                <div style={{
                  marginBottom: '25px',
                  color: '#34495e',
                  fontSize: '1.2rem'
                }}>
                  <i className="fas fa-sign-out-alt" style={{
                    fontSize: '3rem',
                    color: '#e74c3c',
                    marginBottom: '20px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}></i>
                  <p style={{ 
                    marginTop: '20px',
                    fontWeight: '500',
                    letterSpacing: '0.3px'
                  }}>Are you sure you want to logout?</p>
                </div>
              </div>
              <div className="modal-footer" style={{
                borderTop: 'none',
                padding: '25px 30px',
                background: 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px'
              }}>
                <button 
                  type="button" 
                  className="btn" 
                  onClick={handleCancel}
                  style={{
                    background: 'linear-gradient(145deg, #95a5a6 0%, #7f8c8d 100%)',
                    color: 'white',
                    padding: '10px 25px',
                    borderRadius: '12px',
                    border: 'none',
                    marginRight: '15px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    fontWeight: '500'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn" 
                  onClick={handleLogout}
                  style={{
                    background: 'linear-gradient(145deg, #e74c3c 0%, #c0392b 100%)',
                    color: 'white',
                    padding: '10px 25px',
                    borderRadius: '12px',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    fontWeight: '500'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container my-5 text-center">
        {loading ? (
          <>
            <p>Logging out...</p>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </>
        ) : (
          <p>You are being redirected...</p>
        )}
      </div>
    </>
  );
};

export default UserLogout;
