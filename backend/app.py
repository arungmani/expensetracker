from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://mongo:27017/items_db"
mongo = PyMongo(app)
CORS(app)

def convert_objectid(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, dict):
        return {key: convert_objectid(value) for key, value in obj.items()}
    if isinstance(obj, list):
        return [convert_objectid(item) for item in obj]
    return obj

@app.route("/items", methods=["GET"])
def get_items():
    items = mongo.db.items.find()
    return jsonify([{"_id": str(item["_id"]), "name": item["name"], "price": item["price"]} for item in items])

@app.route("/items", methods=["POST"])
def add_item():
    data = request.json
    item_id = mongo.db.items.insert_one(data).inserted_id
    response_data = {"_id": str(item_id), **convert_objectid(data)}
    return jsonify(response_data)

@app.route("/items/<id>", methods=["DELETE"])
def delete_item(id):
    mongo.db.items.delete_one({"_id": ObjectId(id)})
    return "", 204

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)