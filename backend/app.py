from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import numpy as np

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your data and model
# Replace these paths with your actual file paths
df_filtered = pd.read_pickle('path_to_your_filtered_df.pkl')
df_sm_filtered = pd.read_pickle('path_to_your_sm_filtered_df.pkl')
neigh = NearestNeighbors(metric='cosine')
neigh.fit(df_sm_filtered.toarray())

class SearchRequest(BaseModel):
    query: str
    search_type: str

@app.post("/api/recommendations")
async def get_recommendations(request: SearchRequest):
    try:
        book = request.query
        
        if book not in df_filtered.index:
            raise HTTPException(status_code=404, detail=f"'{book}' not found in the dataset")
            
        book_row = df_filtered.index.get_loc(book)
        recommendations = {
            "input_book": book,
            "recommendations": []
        }
        
        dist, idx = neigh.kneighbors([df_sm_filtered[book_row].toarray()[0]], 11, return_distance=True)
        recom_titles = df_filtered.iloc[np.flip(idx[0])[:-1]].index.to_list()
        recom_distances = list(np.flip(dist[0])[:-1])
        
        for title, distance in zip(recom_titles, recom_distances):
            recommendations["recommendations"].append({
                "title": title,
                "distance": round(distance, 4)
            })
            
        return recommendations
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)