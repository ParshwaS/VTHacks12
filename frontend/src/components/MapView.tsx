"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import zipCodeData from "../../public/zipcode.json"; // Ensure GeoJSON data is in public folder
import { Feature, FeatureCollection } from 'geojson'; // GeoJSON types

interface ZipCodeProperties {
	zip: string;
}

const MapView = ({ setSelectedZip, selectedZip }: { setSelectedZip: Function, selectedZip: string | null }) => {
	const [selectedLayer, setSelectedLayer] = useState<L.Layer | null>(null);

	const defaultStyle = {
		color: '#3388ff', // Default boundary color
		weight: 2,
		fillColor: '#66CCFF',
		fillOpacity: 0.3,
	};

	const highlightStyle = {
		color: '#FF0000', // Highlight boundary color (red)
		weight: 3,
		fillColor: '#FF6666',
		fillOpacity: 0.5,
	};

	// Function to handle when a zip code is clicked
	const onEachZipCode = (feature: Feature<GeoJSON.Geometry, ZipCodeProperties>, layer: L.Layer) => {
		layer.on({
			click: () => {
				setSelectedZip(feature.properties?.zip || null);

				// Reset previously selected layer style
				if (selectedLayer) {
					(selectedLayer as L.Path).setStyle(defaultStyle);
				}

				// Highlight the newly selected zip code
				setSelectedLayer(layer);
				(layer as L.Path).setStyle(highlightStyle);
			},
		});

		// Bind tooltip to show zip code
		if (feature.properties?.zip == selectedZip) {
			setSelectedLayer(layer);
		}

		if (feature.properties?.zip) {
			layer.bindTooltip(feature.properties.zip, {
				permanent: true,
				direction: 'center',
				className: 'zip-code-tooltip'
			});
		}
	};

	useEffect(() => {
		if (selectedLayer) {
			(selectedLayer as L.Path).setStyle(highlightStyle);
		}
	}, [selectedLayer]);

	return (
		<div>
			<MapContainer center={[35.2271, -80.8431]} zoom={12} style={{ height: '50vh', width: '100%' }}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<GeoJSON data={zipCodeData as FeatureCollection} onEachFeature={onEachZipCode} style={defaultStyle} />
			</MapContainer>

			{selectedZip && (
				<div style={{ padding: '10px' }}>
					<h2>Selected Zip Code: {selectedZip}</h2>
				</div>
			)}
		</div>
	);

};

export default MapView;
