import { Document, Page, Text, Image, View, Tspan } from "@react-pdf/renderer";
import React, { useContext } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import html2pdf from 'html2pdf.js';
import moment from 'moment';
import Swal from 'sweetalert2';



function Prueba({ primero, segundo, tercero, herramienta }) {

    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    return (
        <Document>
        <Page
            size="A4"
            style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            }}
        >
            <View
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                padding: 10,
            }}
            >
            <Text style={{ color: "#3388af", fontSize: "42px" }}>
                {primero ? primero.title : "..."}
            </Text>
            <Text>Por {primero ? primero.poet.name : "..."}</Text>
            <Image
                src="https://picsum.photos/600/400"
                alt="random image"
                style={{ maxWidth: "600px", maxHeight: "400" }}
            />
            <Text
                style={{
                color: "gray",
                fontStyle: "italic",
                fontSize: "10px",
                }}
            >
                {lorem}
            </Text>
    
            <Text style={{ textAlign: "justify", marginTop: "22px" }}>
                {primero ? primero.content : null}
            </Text>
            </View>
        </Page>
        </Document>
    );
}

export default Prueba
