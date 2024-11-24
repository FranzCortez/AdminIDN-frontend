import React, { useState } from 'react';
import { FiFileText } from "react-icons/fi";

import Draggable from "react-draggable";

function PreinformeFlotante({ contenido }) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleWindow = () => {
        setIsVisible(!isVisible);
    };

  return (
    <div className='card-body-opt'>
        <div className='card-body-opt-btn' onClick={toggleWindow}>
            <FiFileText size={50} color='#fff'/>
        </div>

        {isVisible && (
            <Draggable>
            <div style={styles.window}>
                <div style={styles.header}>
                    Pre Informe
                <button style={styles.closeButton} onClick={toggleWindow}>
                    X
                </button>
                </div>
                <div style={styles.content}>
                <p>{contenido}</p>
                </div>
            </div>
            </Draggable>
        )}
    </div>
)
}

const styles = {
    window: {
      width: "400px", // Un poco más ancha
      maxHeight: "300px", // Máxima altura permitida
      backgroundColor: "#f0f0f0",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      position: "fixed",
      top: "20%",
      right: "10%",
      maxHeight: "calc(100vh - 210px)",
    },
    header: {
      backgroundColor: "#ff8533",
      color: "white",
      padding: "10px",
      cursor: "move",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    closeButton: {
      backgroundColor: "transparent",
      border: "none",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
    },
    content: {
      padding: "15px",
      overflowY: "auto",
      maxHeight: "200px",
    },
  };

export default PreinformeFlotante;