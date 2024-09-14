from fastapi import FastAPI
from pydantic import BaseModel
import spacy
from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="geoapiExercises")


nlp_en = spacy.load("en_core_web_sm")
app = FastAPI()

@app.get("/text/{data}")
def extract_entities(data: str):
    doc_en = nlp_en(data)
    ents = []
    for ent in doc_en.ents:
        ents.append({"text": ent.text, "label_": ent.label_})
        if ent.label_ == "GPE":
            print(ent.text)
            location = geolocator.geocode(ent.text)
            if location:
                ents[-1]["coordinates"] = (location.latitude, location.longitude)
    return {"message": data, "ents": ents}
