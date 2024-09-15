from fastapi import FastAPI
from pydantic import BaseModel
import spacy
import requests

nlp_en = spacy.load("en_core_web_sm")
app = FastAPI()

@app.get("/text/{data}")
def extract_entities(data: str):
    doc_en = nlp_en(data)
    ents = []
    for ent in doc_en.ents:
        ents.append({"text": ent.text, "label": ent.label_})
        if ent.label_ == "GPE":
            # OSM API to get the coordinates of the location
            # Set User-Agent to avoid 403 Forbidden error
            headers = {'User-Agent': 'Mozilla/5.0'}
            response = requests.get(f"https://nominatim.openstreetmap.org/search?q={ent.text}&format=jsonv2", headers=headers)
            if response.status_code == 200:
                location_data = response.json()
                if location_data:
                    coords = location_data[0]
                    ents[-1]["coordinates"] = {"lat": coords["lat"], "lon": coords["lon"]}
    return {"message": data, "ents": ents}

@app.get("/point/{lat}/{lon}")
def get_location(lat: float, lon: float):
    # OSM API to get the location name from coordinates
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=jsonv2", headers=headers)
    if response.status_code == 200:
        location_data = response.json()
        return {
            "location": location_data.get("display_name"),
            "latitude": lat,
            "longitude": lon,
            "postcode": location_data.get("address", {}).get("postcode"),
            "city": location_data.get("address", {}).get("city"),
            "country": location_data.get("address", {}).get("country"),
            "state": location_data.get("address", {}).get("state"),
        }
    return {"error": "Location not found"}