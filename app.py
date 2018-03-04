from flask import Flask, render_template, request, jsonify
import requests, json

app = Flask(__name__)

@app.route("/")
def index():
	return render_template("index.html")


@app.route('/checkvin', methods=["GET", "POST"])
def checkvin():
	if request.method == "POST":
		payload = {'format': 'json'}
		vin = request.form['vin']
		url = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/' + vin

		response = requests.get(url, params=payload)

		myDict = json.loads(response.text)

		responseText = json.dumps(myDict, indent=4)
		return jsonify({"success": "YES", "data": myDict['Results']})
	return render_template('vin.html')


@app.route("/retrieveImg", methods=["POST"])
def retrieveImg():
	if request.method == "POST":
		subscription_key = '0c56f0da11c44132b56f31e6d79d6586'
		search_url = "https://api.cognitive.microsoft.com/bing/v7.0/search"
		search_term = request.json['query']

		headers = {"Ocp-Apim-Subscription-Key" : subscription_key}
		params  = {"q": search_term, "textDecorations":True}
		response = requests.get(search_url, headers=headers, params=params)
		r = response.json()
		imgLink = r['images']['value'][0]['contentUrl']

		return jsonify({"src": imgLink})


if __name__ == "__main__":
	app.run(debug=True)