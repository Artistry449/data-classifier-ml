##### AI байгаа хэсэг сервер-ийг ажлуулахын тулд доорх код-ийг copy_of_algo_biy_daalt2.py -руу зөөв #####

# from flask import Flask, request, jsonify
# from flask_ngrok import run_with_ngrok
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/process": {"origins": "*"}})

# @app.route('/process', methods=['POST'])
# def process():
#     data = request.get_json()

#     if 'test' not in data:
#         return jsonify({"error": "Missing 'test' parameter"}), 400

#     test = data['test']

#     try:
#         zuw_ug, buruu_ug, ugnuud = ug_shalgah(test)
#         stems = undes_ug(ugnuud)
#         final_sentence = undes_ug_sentence(stems)
#         suggestions = buruu_ug_sanal(buruu_ug)

#         sedev = predict_news(test)

#         response = {
#             "zuw_ug": zuw_ug,
#             "buruu_ug": buruu_ug,
#             "final_sentence": final_sentence,
#             "suggestions": suggestions,
#             "sedev":sedev
#         }

#         return jsonify(response)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# run_with_ngrok(app)
# app.run()