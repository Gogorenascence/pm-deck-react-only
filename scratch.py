# import datetime

# then = "2022-06-26T16:23:23.488Z"

# # Convert the string to a datetime object
# then_datetime = datetime.datetime.fromisoformat(then[:-1])

# # Get the current time
# time_now = datetime.datetime.utcnow()

# # Compare the two datetime objects
# ago = time_now - then_datetime

# days = ago.days
# years, days = divmod(days, 365.25)
# months, days = divmod(days, 30.44)
# hours, remainder = divmod(ago.seconds, 3600)
# minutes, seconds = divmod(remainder, 60)

# # Print the time difference
# if years > 0:
#     print(f"{int(years)} year{'s' if int(years) > 1 else ''}, {int(months)} month{'s' if int(months) > 1 else ''} ago")
# elif months > 0:
#     print(f"{int(months)} month{'s' if int(months) > 1 else ''}, {hours} hours, {minutes} minutes, and {seconds} seconds ago")
# elif days > 0:
#     print(f"{days} day{'s' if days > 1 else ''}, {hours} hours, {minutes} minutes, and {seconds} seconds ago")
# elif hours > 0:
#     print(f"{hours} hour{'s' if hours > 1 else ''}, {minutes} minutes, and {seconds} seconds ago")
# elif minutes > 0:
#     print(f"{minutes} minute{'s' if minutes > 1 else ''} and {seconds} seconds ago")
# else:
#     print(f"{seconds} seconds ago")

# # import datetime
# # # from bson.objectid import ObjectId

# # # def get_times(self, id) -> dict:
# # time_ago = {}
# #     # props = self.collection.find_one({"_id": ObjectId(id)})

# # created = "2023-06-25T18:16:38.644000"
# # created_datetime = datetime.datetime.fromisoformat(created[:-1])

# # updated = "2023-06-2T18:16:38.644000"
# # updated_datetime = datetime.datetime.fromisoformat(updated[:-1])

# # time_now = datetime.datetime.utcnow()

# # created_ago = time_now - created_datetime

# # days_created = created_ago.days
# # years_created, days_created = divmod(days_created, 365.25)
# # months_created, days_created = divmod(days_created, 30.44)
# # hours_created, remainder_created = divmod(created_ago.seconds, 3600)
# # minutes_created, seconds_created = divmod(remainder_created, 60)

# # if years_created > 0:
# #     time_ago["created"] = f"{int(years_created)} year{'s' if int(years_created) > 1 else ''} ago"
# # elif months_created > 0:
# #     time_ago["created"] = f"{int(months_created)} month{'s' if int(months_created) > 1 else ''} ago"
# # elif days_created > 0:
# #     time_ago["created"] = f"{days_created} day{'s' if days_created > 1 else ''} and {hours_created} hours ago"
# # elif hours_created > 0:
# #     time_ago["created"] = f"{hours_created} hour{'s' if hours_created > 1 else ''} and {minutes_created} minutes ago"
# # elif minutes_created > 0:
# #     time_ago["created"] = f"{minutes_created} minute{'s' if minutes_created > 1 else ''} ago"
# # else:
# #     time_ago["created"] = "A few seconds ago"

# # updated_ago = time_now - updated_datetime

# # days_updated = updated_ago.days
# # years_updated, days_updated = divmod(days_updated, 365.25)
# # months_updated, days_updated = divmod(days_updated, 30.44)
# # hours_updated, remainder_updated = divmod(updated_ago.seconds, 3600)
# # minutes_updated, seconds_updated = divmod(remainder_updated, 60)

# # if years_updated > 0:
# #     time_ago["updated"] = f"{int(years_updated)} year{'s' if int(years_updated) > 1 else ''} ago"
# # elif months_updated > 0:
# #     time_ago["updated"] = f"{int(months_updated)} month{'s' if int(months_updated) > 1 else ''} ago"
# # elif days_updated > 0:
# #     time_ago["updated"] = f"{days_updated} day{'s' if days_updated > 1 else ''} and {hours_updated} hours ago"
# # elif hours_updated > 0:
# #     time_ago["updated"] = f"{hours_updated} hour{'s' if hours_updated > 1 else ''} and {minutes_updated} minutes ago"
# # elif minutes_updated > 0:
# #     time_ago["updated"] = f"{minutes_updated} minute{'s' if minutes_updated > 1 else ''} ago"
# # else:
# #     time_ago["updated"] = "A few seconds ago"

# # return time_ago


# import datetime


# def get_times(created, updated):
#     time_ago = {}

#     created_datetime = datetime.datetime.fromisoformat(created)
#     updated_datetime = datetime.datetime.fromisoformat(updated)
#     time_now = datetime.datetime.utcnow()

#     created_ago = time_now - created_datetime
#     days_created = created_ago.days
#     years_created, days_created = divmod(days_created, 365.25)
#     months_created, days_created = divmod(days_created, 30.44)
#     hours_created, remainder_created = divmod(created_ago.seconds, 3600)
#     minutes_created, seconds_created = divmod(remainder_created, 60)

#     if years_created > 0:
#         time_ago["created"] = f"{int(years_created)} year{'s' if int(years_created) > 1 else ''} ago"
#     elif months_created > 0:
#         time_ago["created"] = f"{int(months_created)} month{'s' if int(months_created) > 1 else ''} ago"
#     elif days_created > 0:
#         time_ago["created"] = f"{days_created} day{'s' if days_created > 1 else ''} and {hours_created} hours ago"
#     elif hours_created > 0:
#         time_ago["created"] = f"{hours_created} hour{'s' if hours_created > 1 else ''} and {minutes_created} minutes ago"
#     elif minutes_created > 0:
#         time_ago["created"] = f"{minutes_created} minute{'s' if minutes_created > 1 else ''} ago"
#     else:
#         time_ago["created"] = "A few seconds ago"

#     updated_ago = time_now - updated_datetime
#     days_updated = updated_ago.days
#     years_updated, days_updated = divmod(days_updated, 365.25)
#     months_updated, days_updated = divmod(days_updated, 30.44)
#     hours_updated, remainder_updated = divmod(updated_ago.seconds, 3600)
#     minutes_updated, seconds_updated = divmod(remainder_updated, 60)

#     if years_updated > 0:
#         time_ago["updated"] = f"{int(years_updated)} year{'s' if int(years_updated) > 1 else ''} ago"
#     elif months_updated > 0:
#         time_ago["updated"] = f"{int(months_updated)} month{'s' if int(months_updated) > 1 else ''} ago"
#     elif days_updated > 0:
#         time_ago["updated"] = f"{days_updated} day{'s' if days_updated > 1 else ''} and {hours_updated} hours ago"
#     elif hours_updated > 0:
#         time_ago["updated"] = f"{hours_updated} hour{'s' if hours_updated > 1 else ''} and {minutes_updated} minutes ago"
#     elif minutes_updated > 0:
#         time_ago["updated"] = f"{minutes_updated} minute{'s' if minutes_updated > 1 else ''} ago"
#     else:
#         time_ago["updated"] = "A few seconds ago"

#     return time_ago

# created = "2023-06-25T18:16:38.644000"
# updated = "2023-06-2T18:16:38.644000"
# result = get_times(created, updated)
# print(result)


#     def get_all_full_decks(self) -> list:
#         db = self.collection.find()
#         decks = []
#         for deck in db:
#             deck["id"] = str(deck["_id"])
#             deck.pop("_id")
#             card_list = deck["cards"]
#             pluck_list = deck["pluck"]

#             DATABASE_URL = os.environ["DATABASE_URL"]
#             conn = MongoClient(DATABASE_URL)
#             db = conn.cards.cards

#             main_deck = []
#             for card_item in card_list:
#                 card = db.find_one({"card_number": card_item})
#                 card["id"] = str(card["_id"])
#                 card.pop("_id")
#                 main_deck.append(card)
#             pluck_deck = []

#             for pluck_item in pluck_list:
#                 pluck = db.find_one({"card_number": pluck_item})
#                 pluck["id"] = str(pluck["_id"])
#                 pluck.pop("_id")
#                 pluck_deck.append(pluck)
#             deck["full_card_list"] = main_deck
#             deck["full_pluck_list"] = pluck_deck
#             decks.append(deck)
#         return decks
# docker compose yaml

# volumes:
#   cards:
#     external: true
# services:
#   api:
#     build:
#       context: ./api
#       dockerfile: Dockerfile.dev
#     environment:
#       CORS_HOST: http://localhost:3000
#       DATABASE_URL: mongodb://root:password@mongo
#       DATABASE_NAME: cards
#       WAIT_HOSTS: mongo:27017
#       WAIT_BEFORE: 5
#       WAIT_TIMEOUT: 60
#       SIGNING_KEY: 80f21f5e48acbc32a55hj26pabafb2d4d57f5be921a487484d014147bfd96115d7ddbe8f26219rsds227b343d7f4b9p00p9dd1249e1ec892baf73572353666a97e
#     ports:
#       - "8000:8000"
#     volumes:
#       - ./api:/app
#   mongo:
#     image: mongo:6
#     volumes:
#         - ./setup/mongodb:/docker-entrypoint-initdb.d
#         - cards:/data/db
#     environment:
#         MONGO_INITDB_ROOT_USERNAME: root
#         MONGO_INITDB_ROOT_PASSWORD: password
#     ports:
#       - 27017:27017
#   ghi:
#     image: node:lts-bullseye
#     command: /bin/bash run.sh
#     working_dir: /app
#     volumes:
#       - ./ghi:/app
#     ports:
#       - "3000:3000"
#     environment:
#       HOST_OS: ${OS}
#       NODE_ENV: development
#       HOST: "0.0.0.0"
#       PUBLIC_URL: http://localhost:3000
#       REACT_APP_FASTAPI_SERVICE_API_HOST: http://localhost:8000

# dockerfile.python

# FROM python:3.10-bullseye
# RUN python -m pip install --upgrade pip
# WORKDIR /app

# # Copy the top-level files in your service's directory
# # Modify these instructions to do that
# COPY requirements.txt requirements.txt
# COPY authenticator.py authenticator.py
# COPY main.py main.py

# # Copy all of the subdirectories in your service's directory
# # Modify these instructions to do that
# COPY queries queries
# COPY routers routers
# COPY models models

# RUN python -m pip install -r requirements.txt

# # !! PORT env var needs to match with exposed port in caprover dashboard
# CMD uvicorn main:app --host 0.0.0.0 --port 80

# # If you're using a relational database and want migrations
# # to be run automatically, delete the previous CMD line and
# # uncomment the following COPY and CMD lines
# # COPY migrations migrations
# # # !! PORT env var needs to match with exposed port in caprover dashboard
# # CMD python -m migrations up && uvicorn main:app --host 0.0.0.0 --port 80

# dockerfile.mongo

# FROM mongo:latest

# # Copy the JSON file into the container
# COPY data/card_tags.json data/card_tags.json
# COPY data/card_types.json data/card_types.json
# COPY data/cards.json data/cards.json
# COPY data/decks.json data/decks.json
# COPY data/extra_effects.json data/extra_effects.json
# COPY data/reactions.json data/reactions.json

# # Install MongoDB client tools
# RUN apt-get update && \
#     apt-get install -y mongodb-clients && \
#     rm -rf /var/lib/apt/lists/*

# # Load the data into the MongoDB database

# CMD mongoimport --host mongodb --db cards --collection card_tags --file /data/card_tags.json --jsonArray && \
#     mongoimport --host mongodb --db cards --collection card_types --file /data/card_types.json --jsonArray && \
#     mongoimport --host mongodb --db cards --collection cards --file /data/cards.json --jsonArray && \
#     mongoimport --host mongodb --db cards --collection decks --file /data/decks.json --jsonArray && \
#     mongoimport --host mongodb --db cards --collection extra_effects --file /data/extra_effects.json --jsonArray && \
#     mongoimport --host mongodb --db cards --collection reactions --file /data/reactions.json --jsonArray


# stages:
#   - build
#   - deploy

# services:
#   - docker:dind

# build-cards-image:
#   stage: build
#   image: docker:git
#   variables:
#     GITLAB_IMAGE: ${CI_REGISTRY_IMAGE}/cards_image
#   before_script:
#     # $CI_JOB_TOKEN is variable automatically added by Gitlab: see https://docs.gitlab.com/ee/ci/variables/predefined_variables.html#variables-reference
#     - echo $CI_JOB_TOKEN | docker login -u gitlab-ci-token registry.gitlab.com --password-stdin
#   script:
#     - docker build --tag $GITLAB_IMAGE:latest api
#     - docker push $GITLAB_IMAGE:latest
#   only:
#     - main


# deploy-cards-image:
#   stage: deploy
#   image: registry.gitlab.com/galvanize-inc/foss/glv-cloud-cli:latest
#   script:
#     - glv-cloud-cli reset -a ${SBFC_API} -t ${CIRRUS_TOKEN}
#   only:
#     - main

# # # Build the React/JavaScript front-end
# build-front-end-job:
#   stage: build
#   image: node:lts-bullseye
#   variables:
#     # If either of these variables is defined in the GitLab
#     # CI/CD variables, that value will override the value here.
#     # You need to substitute in your real values for
#     # GROUP_NAME, PROJECT_NAME, & WEBSERVICE_NAME below.
#     PUBLIC_URL: https://jothplaymaker.com
#     REACT_APP_API_HOST: https://pm-deckapp.project.com
#   script:
#     - cd ghi
#     - npm install
#     - npm run build
#     - cp build/index.html build/404.html
#   artifacts:
#     paths:
#       - ghi/build/

# # # Deploy the React/JavaScript front-end to GitLab pages
# pages:
#   stage: deploy
#   rules:
#     - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
#   dependencies:
#     - build-front-end-job
#   needs:
#     - build-front-end-job
#   script:
#     - mv ghi/build/ public
#   artifacts:
#     paths:
#       - public


# string = "The quick, brown fox jumps over the lazy dog!"

# def is_pangram(string):
#     letters = []
#     # alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
#     string = string.lower()
#     for l in string:
#         if l.isaplha():
#             letters.append(l)
#     letters = set(letters)
#     if len(letters) == 26:
#         print(True)

# is_pangram(string)

# lst = []
# y = {"x": 100}
# lst += ([y] * 5)
# print(lst)


# x = "abced"
# print(x[2])

# {
#     "name": "Enter the Hero",
#     "description": "Base Set 1",
#     "ratio": {
#         "normals": 5,
#         "rares": 3,
#         "supers": 1
#     },
#     "normals": [
#         1001,
#         1004,
#         1008,
#         1011,
#         1012,
#         1014,
#         1015,
#         1016,
#         1017,
#         1019,
#         1021,
#         1023,
#         1025,
#         1030,
#         1035,
#         1036,
#         1037,
#         1040,
#         1042,
#         1045,
#         1046,
#         1049,
#         1052,
#         1053,
#         1056,
#         1057,
#         1059,
#         1062,
#         1064,
#         1065,
#         1066,
#         1069,
#         1070,
#         1072,
#         1081,
#         1084,
#         1085,
#         1087,
#         1093,
#         1096,
#         1097,
#         1099,
#         1102,
#         1105,
#         1108,
#         1110,
#         1114,
#         1115,
#         1123,
#         1124
#     ],
#     "rares": [
#         1002,
#         1003,
#         1007,
#         1009,
#         1010,
#         1013,
#         1018,
#         1028,
#         1031,
#         1034,
#         1038,
#         1039,
#         1043,
#         1044,
#         1047,
#         1051,
#         1054,
#         1058,
#         1063,
#         1071,
#         1075,
#         1077,
#         1080,
#         1082,
#         1083,
#         1086,
#         1088,
#         1089,
#         1090,
#         1091,
#         1101,
#         1104,
#         1106,
#         1109,
#         1112,
#         1116,
#         1117,
#         1118,
#         1119,
#         1120,
#         1126
#     ],
#     "super_rares": [
#         1006,
#         1020,
#         1024,
#         1027,
#         1029,
#         1032,
#         1033,
#         1041,
#         1048,
#         1050,
#         1055,
#         1061,
#         1067,
#         1068,
#         1073,
#         1074,
#         1078,
#         1079,
#         1092,
#         1094,
#         1095,
#         1103,
#         1111,
#         1113,
#         1121,
#         1122,
#         1125
#     ],
#     "ultra_rares": [
#         1005,
#         1022,
#         1026,
#         1060,
#         1076,
#         1098,
#         1100,
#         1107
#     ],
#     "created_on": {},
#     "updated_on": {},
#     "cover_image": "string"
# }


# [
#   {
#     "name": "Entering the Inventory",
#     "card_class": "",
#     "hero_id": "HS1",
#     "series_name": "Warp Family//Cosmic//Psychic",
#     "card_number": 1099,
#     "enthusiasm": 0,
#     "effect_text": "Discard 1 card from your hand, then unfurl 2 Pluck. Add 1 Pluck to your ownership and discard the other unfurled Pluck.",
#     "second_effect_text": "<Critical> Draw 1 card and gain 1 Item.",
#     "illustrator": "Undeadsushii",
#     "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb11hs.png",
#     "file_name": "i1cb11hs",
#     "card_type": [
#       1008
#     ],
#     "extra_effects": [
#       1002
#     ],
#     "reactions": [],
#     "card_tags": [
#       1000
#     ],
#     "created_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "18:44",
#       "full_time": "2023-06-25T18:44:06.985000"
#     },
#     "updated_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "19:21",
#       "full_time": "2023-06-25T19:21:12.570000"
#     },
#     "id": "64400ae72e72274cabf63cf9",
#     "count": null
#   },
#   {
#     "name": "Warm Mending!",
#     "card_class": "Staunch",
#     "hero_id": "FB1",
#     "series_name": "Flamebell//Magic//Quest",
#     "card_number": 1014,
#     "enthusiasm": 0,
#     "effect_text": "Add 1 card from the discard pile to your hand. If the card added was Staunch or Power, gain 2 HP.",
#     "second_effect_text": "",
#     "illustrator": "XIOLI",
#     "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g4fba.png",
#     "file_name": "",
#     "card_type": [
#       1002
#     ],
#     "extra_effects": [],
#     "reactions": [],
#     "card_tags": [
#       1001
#     ],
#     "created_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "18:44",
#       "full_time": "2023-06-25T18:44:06.985000"
#     },
#     "updated_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 29,
#       "time": "23:33",
#       "full_time": "2023-06-29T23:33:15.972000"
#     },
#     "id": "641423bdb00a31a52c1ba05c",
#     "count": null
#   },
#   {
#     "name": "Hive",
#     "card_class": "Unity",
#     "hero_id": "H01",
#     "series_name": "Hive//Tech//Nature",
#     "card_number": 1037,
#     "enthusiasm": 0,
#     "effect_text": "Draw 1 Pluck and reveal it; apply the following effects based on the Pluck revealed: //<Item> Add 1 Move or MAX VARIABLE from your hand to your play (MAX VARIABLE counts as an Move). //<Event> Reset 1 of your Pluck. //<Comeback> Add 1 Aura, Move or MAX VARIABLE from the discard pile to your hand.",
#     "second_effect_text": "",
#     "illustrator": "layonsin.art",
#     "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1b2hf.png",
#     "file_name": "i1b2hf",
#     "card_type": [
#       1001
#     ],
#     "extra_effects": [],
#     "reactions": [
#       1002,
#       1002
#     ],
#     "card_tags": [
#       1001
#     ],
#     "created_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "18:09",
#       "full_time": "2023-06-25T18:09:54.986000"
#     },
#     "updated_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "19:21",
#       "full_time": "2023-06-25T19:21:51.382000"
#     },
#     "id": "6440bfa92e72274cabf64017",
#     "count": null
#   },
#   {
#     "name": "Entering the Inventory",
#     "card_class": "",
#     "hero_id": "HS1",
#     "series_name": "Warp Family//Cosmic//Psychic",
#     "card_number": 1099,
#     "enthusiasm": 0,
#     "effect_text": "Discard 1 card from your hand, then unfurl 2 Pluck. Add 1 Pluck to your ownership and discard the other unfurled Pluck.",
#     "second_effect_text": "<Critical> Draw 1 card and gain 1 Item.",
#     "illustrator": "Undeadsushii",
#     "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb11hs.png",
#     "file_name": "i1cb11hs",
#     "card_type": [
#       1008
#     ],
#     "extra_effects": [
#       1002
#     ],
#     "reactions": [],
#     "card_tags": [
#       1000
#     ],
#     "created_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "18:44",
#       "full_time": "2023-06-25T18:44:06.985000"
#     },
#     "updated_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "19:21",
#       "full_time": "2023-06-25T19:21:12.570000"
#     },
#     "id": "64400ae72e72274cabf63cf9",
#     "count": null
#   },
#   {
#     "name": "Gold Frag",
#     "card_class": "",
#     "hero_id": "GW1",
#     "series_name": "Golden Wall//Cosmic//Defender",
#     "card_number": 1070,
#     "enthusiasm": 0,
#     "effect_text": "<L. Trigger> When a Fighter in your play is revealed, that Fighter gains 1 HP.",
#     "second_effect_text": "<C. Trigger> If you resolve the trigger effect of a Staunch card in your play, deal 2 damage to a random foe.",
#     "illustrator": "Eric Rodrigues",
#     "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl02gwi.png",
#     "file_name": "i1pl02gwi",
#     "card_type": [
#       1006
#     ],
#     "extra_effects": [
#       1001,
#       1003,
#       1002
#     ],
#     "reactions": [],
#     "card_tags": [
#       1004
#     ],
#     "created_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "18:44",
#       "full_time": "2023-06-25T18:44:06.985000"
#     },
#     "updated_on": {
#       "year": 2023,
#       "month": 7,
#       "day": 27,
#       "time": "02:39",
#       "full_time": "2023-07-27T02:39:55.794000"
#     },
#     "id": "640935786b4d5881ee5633dd",
#     "count": null
#   },
#   {
#     "name": "Flamebell",
#     "card_class": "Staunch",
#     "hero_id": "FB1",
#     "series_name": "Flamebell//Magic//Quest",
#     "card_number": 1013,
#     "enthusiasm": 0,
#     "effect_text": "Gain 2 HP, then all foes with a Power card(s) in their play and their Fighters take 1 damage.",
#     "second_effect_text": "<Trigger> At the start of the round or when this card is revealed, all Power cards gain damage minus 1 (damage dealt by those cards is reduced by 1 at the end of their resolutions).",
#     "illustrator": "XIOLI",
#     "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g4fbf.png",
#     "file_name": "i1g4fbf",
#     "card_type": [
#       1001
#     ],
#     "extra_effects": [
#       1001
#     ],
#     "reactions": [
#       1002,
#       1003
#     ],
#     "card_tags": [
#       1001
#     ],
#     "created_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "18:44",
#       "full_time": "2023-06-25T18:44:06.985000"
#     },
#     "updated_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "18:44",
#       "full_time": "2023-06-25T18:44:06.985000"
#     },
#     "id": "6407a305c503d0c6f5a33236",
#     "count": null
#   },
#   {
#     "name": "Side Step Counter!!",
#     "card_class": "Power",
#     "hero_id": "BGA",
#     "series_name": "Battle Girl Alice",
#     "card_number": 1031,
#     "enthusiasm": 0,
#     "effect_text": "<Target> Foe on your right. //<1-5> Remove 1 reaction token from your Fighter. //<6-11> Deal 2 damage. Your Fighter gains Counter 1. //<12+> Deal 2 bypassing damage. Your Fighter gains Counter 1.",
#     "second_effect_text": "",
#     "illustrator": "mo.moan",
#     "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r4bgam.png",
#     "file_name": "",
#     "card_type": [
#       1003
#     ],
#     "extra_effects": [],
#     "reactions": [],
#     "card_tags": [
#       1002,
#       1001
#     ],
#     "created_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "18:44",
#       "full_time": "2023-06-25T18:44:06.985000"
#     },
#     "updated_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "18:51",
#       "full_time": "2023-06-25T18:51:22.412000"
#     },
#     "id": "640fa56627a3b154a88df42b",
#     "count": null
#   },
#   {
#     "name": "The Next Project",
#     "card_class": "",
#     "hero_id": "GEN",
#     "series_name": "Tech//Brawler//Spoiler",
#     "card_number": 1126,
#     "enthusiasm": 0,
#     "effect_text": "Discard 1 card from your hand; discard 1 Item in a random foe’s ownership.",
#     "second_effect_text": "<Critical> Add 1 Item from the discard pile to your ownership.",
#     "illustrator": "NightWong",
#     "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb20g.png",
#     "file_name": "i1cb20g",
#     "card_type": [
#       1008
#     ],
#     "extra_effects": [
#       1002
#     ],
#     "reactions": [],
#     "card_tags": [
#       1000
#     ],
#     "created_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "18:44",
#       "full_time": "2023-06-25T18:44:06.985000"
#     },
#     "updated_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "19:21",
#       "full_time": "2023-06-25T19:21:39.801000"
#     },
#     "id": "644015702e72274cabf63e6e",
#     "count": null
#   },
#   {
#     "name": "Burning Impact!!!",
#     "card_class": "Power",
#     "hero_id": "BM1",
#     "series_name": "Blast Mouth//Altered//Nature",
#     "card_number": 1020,
#     "enthusiasm": 6,
#     "effect_text": "<Target> Foe of your choice. //If you are last to go this round, ignore the reaction(s) of defending Fighter(s). //<1-5> Deal 4 damage. //<6-11> Deal 4 piercing damage. //<12+> Deal 5 piercing damage and 1 additional piercing damage if they have already gone this round.",
#     "second_effect_text": "",
#     "illustrator": "Znttus",
#     "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r1bme.png",
#     "file_name": "i1r1bme",
#     "card_type": [
#       1004
#     ],
#     "extra_effects": [],
#     "reactions": [],
#     "card_tags": [
#       1002,
#       1001
#     ],
#     "created_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "18:44",
#       "full_time": "2023-06-25T18:44:06.985000"
#     },
#     "updated_on": {
#       "year": 2023,
#       "month": 6,
#       "day": 25,
#       "time": "19:12",
#       "full_time": "2023-06-25T19:12:24.353000"
#     },
#     "id": "643f56612e72274cabf638cc",
#     "count": null
#   }
# ]

# {
#   "0": {
#     "pull_list": [
#       1065,
#       1070,
#       1062,
#       1021,
#       1114,
#       1070,
#       1009,
#       1090,
#       1109,
#       1121,
#       1029
#     ],
#     "pulled_cards": [
#       {
#         "name": "MAX VARIABLE",
#         "card_class": "",
#         "hero_id": "MV1",
#         "series_name": "MAX VARIABLE",
#         "card_number": 1065,
#         "enthusiasm": 0,
#         "effect_text": "Unfurl 4 cards (reveal 4 cards from the top of the Main deck). Add 1 card that matches the type MAX VARIABLE is replacing to your play and add 2 of the other unfurled cards to your hand. Discard MAX VARIABLE and the last unfurled card.",
#         "second_effect_text": "",
#         "illustrator": "mvthwus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1rb1mv.png",
#         "file_name": "",
#         "card_type": [
#           1005
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1003
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:52",
#           "full_time": "2023-06-25T18:52:52.346000"
#         },
#         "id": "64130de7b00a31a52c1b98bf",
#         "count": null
#       },
#       {
#         "name": "Gold Frag",
#         "card_class": "",
#         "hero_id": "GW1",
#         "series_name": "Golden Wall//Cosmic//Defender",
#         "card_number": 1070,
#         "enthusiasm": 0,
#         "effect_text": "<L. Trigger> When a Fighter in your play is revealed, that Fighter gains 1 HP.",
#         "second_effect_text": "<C. Trigger> If you resolve the trigger effect of a Staunch card in your play, deal 2 damage to a random foe.",
#         "illustrator": "Eric Rodrigues",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl02gwi.png",
#         "file_name": "i1pl02gwi",
#         "card_type": [
#           1006
#         ],
#         "extra_effects": [
#           1001,
#           1003,
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1004
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 7,
#           "day": 27,
#           "time": "02:39",
#           "full_time": "2023-07-27T02:39:55.794000"
#         },
#         "id": "640935786b4d5881ee5633dd",
#         "count": null
#       },
#       {
#         "name": "Heavy Aura!",
#         "card_class": "Canny",
#         "hero_id": "GE1",
#         "series_name": "Gravity Enforcer//Cosmic//Tactical",
#         "card_number": 1062,
#         "enthusiasm": 0,
#         "effect_text": "Foes with Enthusiasm lower than yours take 1 damage after resolving an Aura(s) or drawing a card(s). ",
#         "second_effect_text": "<Trigger> At the start of the round, lower the Enthusiasm of all foes by 4 and resolve this Aura in your play.",
#         "illustrator": "betomirandaart2",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p4gea.png",
#         "file_name": "i1p4gea",
#         "card_type": [
#           1002
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 8,
#           "day": 10,
#           "time": "02:57",
#           "full_time": "2023-08-10T02:57:42.844000"
#         },
#         "id": "6413ad2bb00a31a52c1b9c3d",
#         "count": null
#       },
#       {
#         "name": "Red Fist",
#         "card_class": "Power",
#         "hero_id": "RF1",
#         "series_name": "Red Fist//Tech//Brawler",
#         "card_number": 1021,
#         "enthusiasm": 0,
#         "effect_text": "Deal 3 damage to your strongest foe, then discard 3 cards from your hand.",
#         "second_effect_text": "<Trigger> Just before using this card’s reaction(s), remove 3 Counter tokens from this card; draw 3 cards.",
#         "illustrator": "gmoshiro",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r2rff.png",
#         "file_name": "i1r2rff",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [
#           1002,
#           1002,
#           1002
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 29,
#           "time": "23:44",
#           "full_time": "2023-06-29T23:44:32.879000"
#         },
#         "id": "64397afc3d6559427fc58825",
#         "count": null
#       },
#       {
#         "name": "New Equilibrium",
#         "card_class": "",
#         "hero_id": "GE1",
#         "series_name": "Gravity Enforcer//Cosmic//Tactical",
#         "card_number": 1114,
#         "enthusiasm": 0,
#         "effect_text": "<Trigger> At the start of the round or during a foe's turn, lower the Enthusiasm of all foes by 2.",
#         "second_effect_text": "<Critical> Your Ending gains damage plus 1 if it deals damage to a foe with Enthusiasm lower than yours.",
#         "illustrator": "betomirandaart2",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb16ge.png",
#         "file_name": "i1cb16ge",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1001,
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:57",
#           "full_time": "2023-06-25T18:57:45.089000"
#         },
#         "id": "6413bffeb00a31a52c1b9e03",
#         "count": null
#       },
#       {
#         "name": "Gold Frag",
#         "card_class": "",
#         "hero_id": "GW1",
#         "series_name": "Golden Wall//Cosmic//Defender",
#         "card_number": 1070,
#         "enthusiasm": 0,
#         "effect_text": "<L. Trigger> When a Fighter in your play is revealed, that Fighter gains 1 HP.",
#         "second_effect_text": "<C. Trigger> If you resolve the trigger effect of a Staunch card in your play, deal 2 damage to a random foe.",
#         "illustrator": "Eric Rodrigues",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl02gwi.png",
#         "file_name": "i1pl02gwi",
#         "card_type": [
#           1006
#         ],
#         "extra_effects": [
#           1001,
#           1003,
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1004
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 7,
#           "day": 27,
#           "time": "02:39",
#           "full_time": "2023-07-27T02:39:55.794000"
#         },
#         "id": "640935786b4d5881ee5633dd",
#         "count": null
#       },
#       {
#         "name": "Bone Whisperer",
#         "card_class": "Staunch",
#         "hero_id": "BW1",
#         "series_name": "Bone Whisperer//Mystic//Nature",
#         "card_number": 1009,
#         "enthusiasm": 0,
#         "effect_text": "Resolve 1 of the following effects: //<> Discard up to 3 cards from your hand; gain 1 HP for each card discarded. //<>Discard 3 cards from your hand; unfurl 3 Pluck (reveal 3 cards from the top of the Pluck deck). Add 2 Pluck to your ownership and discard the other unfurled Pluck.",
#         "second_effect_text": "",
#         "illustrator": "Ranbutam",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g3bwf.png",
#         "file_name": "i1g3bwf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [],
#         "reactions": [
#           1001
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:08",
#           "full_time": "2023-06-25T19:08:52.534000"
#         },
#         "id": "6414212cb00a31a52c1b9ff9",
#         "count": null
#       },
#       {
#         "name": "“More Training!”",
#         "card_class": "",
#         "hero_id": "BGA",
#         "series_name": "Battle Girl Alice//Magic//Brawler//Call",
#         "card_number": 1090,
#         "enthusiasm": 0,
#         "effect_text": "<Trigger> At the start of the round or during a foe's turn, your Fighter gains 1 HP (that card is revealed).",
#         "second_effect_text": "<C.Trigger> At the start of the round or during a foe's turn, your Fighter gains Counter 1 (that card is revealed).\n\n\n",
#         "illustrator": "mo.moan",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb8bga.png",
#         "file_name": "i1cb8bga",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1001,
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:19",
#           "full_time": "2023-06-25T19:19:50.352000"
#         },
#         "id": "643f612e2e72274cabf63b46",
#         "count": null
#       },
#       {
#         "name": "Muertorn the Soul Returning Scythe",
#         "card_class": "",
#         "hero_id": "CP1",
#         "series_name": "Ceifeira Preta//Mystic//Quest",
#         "card_number": 1109,
#         "enthusiasm": 0,
#         "effect_text": "Once per round, if you gain a Comeback(s), add 1 Fighter from the discard pile to the top of the Main deck.",
#         "second_effect_text": "<Trigger> If a card(s) in your play is discarded before resolving its main effect, discard this Item; resolve that card (max of 1) as if it was in your play.",
#         "illustrator": "Hugo Roberto",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl15cpi.png",
#         "file_name": "i1pl15cpi",
#         "card_type": [
#           1006
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1004
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:08",
#           "full_time": "2023-06-25T19:08:12.623000"
#         },
#         "id": "64395bc43d6559427fc585a2",
#         "count": null
#       },
#       {
#         "name": "Surprise Appearance",
#         "card_class": "",
#         "hero_id": "GEN",
#         "series_name": "Cosmic//Psychic//Quest//Spoiler",
#         "card_number": 1121,
#         "enthusiasm": 0,
#         "effect_text": "Unfurl 3 cards; add 1 card to your hand and discard the other unfurled cards. \nApply the following effects based on the classes of the added card (you can only apply each effect once): \n//<Power> Deal 1 damage to a foe and add 3 to your Focus. \n//<Unity> Return 1 Aura or 1 Move from the discard pile to the top of the Main deck. \n//<Canny> Deal 2 bypassing damage to a foe.",
#         "second_effect_text": "",
#         "illustrator": "mvthwus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1plg3e.png",
#         "file_name": "i1plg3e",
#         "card_type": [
#           1007
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1005
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:21",
#           "full_time": "2023-06-25T19:21:39.801000"
#         },
#         "id": "6440132e2e72274cabf63e51",
#         "count": null
#       },
#       {
#         "name": "Battle Girl Alice",
#         "card_class": "Power",
#         "hero_id": "BGA",
#         "series_name": "Battle Girl Alice//Magic//Brawler",
#         "card_number": 1029,
#         "enthusiasm": 0,
#         "effect_text": "This card gains Counter 1.",
#         "second_effect_text": "<Trigger> If you defend with this card, Counter damage this card deals is treated as bypassing damage (once only).",
#         "illustrator": "mo.moan",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r4bgaf.png",
#         "file_name": "i1r4bgaf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [
#           1002,
#           1002
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:45",
#           "full_time": "2023-06-25T18:45:34.425000"
#         },
#         "id": "6407d2c3a777df7381b6d87a",
#         "count": null
#       }
#     ]
#   },
#   "1": {
#     "pull_list": [
#       1065,
#       1093,
#       1017,
#       1084,
#       1093,
#       1110,
#       1091,
#       1112,
#       1077,
#       1061,
#       1113
#     ],
#     "pulled_cards": [
#       {
#         "name": "MAX VARIABLE",
#         "card_class": "",
#         "hero_id": "MV1",
#         "series_name": "MAX VARIABLE",
#         "card_number": 1065,
#         "enthusiasm": 0,
#         "effect_text": "Unfurl 4 cards (reveal 4 cards from the top of the Main deck). Add 1 card that matches the type MAX VARIABLE is replacing to your play and add 2 of the other unfurled cards to your hand. Discard MAX VARIABLE and the last unfurled card.",
#         "second_effect_text": "",
#         "illustrator": "mvthwus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1rb1mv.png",
#         "file_name": "",
#         "card_type": [
#           1005
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1003
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:52",
#           "full_time": "2023-06-25T18:52:52.346000"
#         },
#         "id": "64130de7b00a31a52c1b98bf",
#         "count": null
#       },
#       {
#         "name": "The Survey Crew",
#         "card_class": "",
#         "hero_id": "DW1",
#         "series_name": "Project HERMES//Tech//Tactical//Team",
#         "card_number": 1093,
#         "enthusiasm": 0,
#         "effect_text": "This Comeback counts as a Unity card in your play (this does not count towards play size).",
#         "second_effect_text": "<Critical> Return 1 card from the discard pile to the top of the Main deck.",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb9dw.png",
#         "file_name": "i1cb9dw",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:56",
#           "full_time": "2023-06-25T18:56:12.953000"
#         },
#         "id": "6413bcb1b00a31a52c1b9d3b",
#         "count": null
#       },
#       {
#         "name": "Blast Mouth",
#         "card_class": "Power",
#         "hero_id": "BM1",
#         "series_name": "Blast Mouth//Altered//Nature",
#         "card_number": 1017,
#         "enthusiasm": 0,
#         "effect_text": "Deal 2 damage to a foe. \n \nIf you are last to go this round or have the lowest Enthusiasm, deal 1 additional damage and draw 1 Pluck.",
#         "second_effect_text": "",
#         "illustrator": "Znttus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r1bmf.png",
#         "file_name": "",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [],
#         "reactions": [
#           1002,
#           1002
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 29,
#           "time": "23:38",
#           "full_time": "2023-06-29T23:38:25.821000"
#         },
#         "id": "6431be08b87f22f9450ff544",
#         "count": null
#       },
#       {
#         "name": "Peaceful Meditation",
#         "card_class": "",
#         "hero_id": "RF1",
#         "series_name": "Red Fist//Tech//Brawler//Relaxation",
#         "card_number": 1084,
#         "enthusiasm": 0,
#         "effect_text": "This Comeback counts as a Power card in your play (this does not count towards play size).",
#         "second_effect_text": "<Trigger> Draw 3 cards, then discard 1 card from your hand.",
#         "illustrator": "gmoshiro",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb6rf.png",
#         "file_name": "i1cb6rf",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:19",
#           "full_time": "2023-06-25T19:19:29.871000"
#         },
#         "id": "643f5ae22e72274cabf639f7",
#         "count": null
#       },
#       {
#         "name": "The Survey Crew",
#         "card_class": "",
#         "hero_id": "DW1",
#         "series_name": "Project HERMES//Tech//Tactical//Team",
#         "card_number": 1093,
#         "enthusiasm": 0,
#         "effect_text": "This Comeback counts as a Unity card in your play (this does not count towards play size).",
#         "second_effect_text": "<Critical> Return 1 card from the discard pile to the top of the Main deck.",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb9dw.png",
#         "file_name": "i1cb9dw",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:56",
#           "full_time": "2023-06-25T18:56:12.953000"
#         },
#         "id": "6413bcb1b00a31a52c1b9d3b",
#         "count": null
#       },
#       {
#         "name": "Grimmer Form",
#         "card_class": "",
#         "hero_id": "CP1",
#         "series_name": "Ceifeira Preta//Mystic//Quest//Transformation",
#         "card_number": 1110,
#         "enthusiasm": 0,
#         "effect_text": "<Trigger> If you are targeted for damage, apply each of the following effects for each Comeback in your ownership: //<1> Your Fighter is treated as Canny. //<2> Discard 1 card in your strongest or weakest foe's hand. //<3> You can discard 1 card in your play; you are unaffected by the effect(s) of the card targeting you. //<4+> Your next Move and next Ending gain damage plus 1.",
#         "second_effect_text": "",
#         "illustrator": "Hugo Roberto",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl15cpe.png",
#         "file_name": "i1pl15cpe",
#         "card_type": [
#           1007
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1005
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:09",
#           "full_time": "2023-06-25T19:09:18.581000"
#         },
#         "id": "64169cb10673ac355a739f21",
#         "count": null
#       },
#       {
#         "name": "Experimental Dual Mode Thruster",
#         "card_class": "",
#         "hero_id": "DW1",
#         "series_name": "Project HERMES//Tech//Tactical//Team",
#         "card_number": 1091,
#         "enthusiasm": 0,
#         "effect_text": "<Trigger> At the start of the round, discard 1 card from your hand; resolve one of the following effects: //<> Add 3 to your Focus for your first Focus roll this round. //<> Add 3 to your Enthusiasm this round.",
#         "second_effect_text": "Discard this Item after the third round of use.",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl09dwi.png",
#         "file_name": "i1pl09dwi",
#         "card_type": [
#           1006
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1004
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 7,
#           "day": 17,
#           "time": "05:29",
#           "full_time": "2023-07-17T05:29:46.782000"
#         },
#         "id": "6413bba6b00a31a52c1b9d09",
#         "count": null
#       },
#       {
#         "name": "Gravity Patrol Badge",
#         "card_class": "",
#         "hero_id": "GE1",
#         "series_name": "Gravity Enforcer//Cosmic//Tactical",
#         "card_number": 1112,
#         "enthusiasm": 0,
#         "effect_text": "<L.Trigger> During a foe's turn, card effects can not be resolved more than once this round.",
#         "second_effect_text": "Lower the Enthusiasm of all foes by 2.",
#         "illustrator": "betomirandaart2",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl16gei.png",
#         "file_name": "i1pl16gei",
#         "card_type": [
#           1006
#         ],
#         "extra_effects": [
#           1001,
#           1003
#         ],
#         "reactions": [],
#         "card_tags": [
#           1004
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:57",
#           "full_time": "2023-06-25T18:57:34.918000"
#         },
#         "id": "6413bee1b00a31a52c1b9db7",
#         "count": null
#       },
#       {
#         "name": "Supernova",
#         "card_class": "",
#         "hero_id": "FB1",
#         "series_name": "Flamebell//Magic//Quest",
#         "card_number": 1077,
#         "enthusiasm": 0,
#         "effect_text": "All foes with a Power card(s) in their play take 1 damage. All Fighters are treated as Power and all effects that increase damage are cancelled.",
#         "second_effect_text": "<Trigger> At the start of the round or if you are targeted for damage, resolve this Event in your ownership.",
#         "illustrator": "XIOLI",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl04fbe.png",
#         "file_name": "i1pl04fbe",
#         "card_type": [
#           1007
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1005
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:13",
#           "full_time": "2023-06-25T19:13:24.834000"
#         },
#         "id": "643977593d6559427fc587a3",
#         "count": null
#       },
#       {
#         "name": "Gravity Enforcer",
#         "card_class": "Canny",
#         "hero_id": "GE1",
#         "series_name": "Gravity Enforcer//Cosmic//Tactical",
#         "card_number": 1061,
#         "enthusiasm": 0,
#         "effect_text": "Foes with Enthusiasm lower than yours can not use reactions. Deal 2 damage to the foe with the lowest Enthusiasm.",
#         "second_effect_text": "<Trigger> At the start of the round or when this card is revealed, lower the Enthusiasm of all foes by 4.",
#         "illustrator": "betomirandaart2",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p4gef.png",
#         "file_name": "i1p4gef",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [
#           1001
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:55",
#           "full_time": "2023-06-25T18:55:12.534000"
#         },
#         "id": "6413ac2fb00a31a52c1b9c06",
#         "count": null
#       },
#       {
#         "name": "Ground Collapse",
#         "card_class": "",
#         "hero_id": "GE1",
#         "series_name": "Gravity Enforcer//Cosmic//Tactical",
#         "card_number": 1113,
#         "enthusiasm": 0,
#         "effect_text": "Reduce the focus of all foes by 2. If they have Enthusiasm lower than yours, reduce it by 4 instead.",
#         "second_effect_text": "<Trigger> At the start of the round, lower the Enthusiasm of all foes by 2, then resolve this Event in your ownership.",
#         "illustrator": "betomirandaart2",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl16gee.png",
#         "file_name": "i1pl16gee",
#         "card_type": [
#           1007
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1005
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 29,
#           "time": "23:57",
#           "full_time": "2023-06-29T23:57:59.577000"
#         },
#         "id": "6413bf79b00a31a52c1b9de4",
#         "count": null
#       }
#     ]
#   },
#   "2": {
#     "pull_list": [
#       1066,
#       1102,
#       1084,
#       1105,
#       1099,
#       1036,
#       1051,
#       1088,
#       1051,
#       1068,
#       1061
#     ],
#     "pulled_cards": [
#       {
#         "name": "MAX VARIABLE #2",
#         "card_class": "",
#         "hero_id": "MV1",
#         "series_name": "MAX VARIABLE",
#         "card_number": 1066,
#         "enthusiasm": 0,
#         "effect_text": "\nUnfurl 2 cards (reveal 2 cards from the top of the Main deck). Add 1 to your play and discard the other. If the added card matches the type MAX VARIABLE is replacing, draw 1 Pluck. Discard MAX VARIABLE.",
#         "second_effect_text": "",
#         "illustrator": "Dalfovo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1rb1mvn2.png",
#         "file_name": "",
#         "card_type": [
#           1005
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1003
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:52",
#           "full_time": "2023-06-25T18:52:57.066000"
#         },
#         "id": "64130eabb00a31a52c1b98d6",
#         "count": null
#       },
#       {
#         "name": "New Growth",
#         "card_class": "",
#         "hero_id": "BB1",
#         "series_name": "Bolt Blossom//Nature//Energy",
#         "card_number": 1102,
#         "enthusiasm": 0,
#         "effect_text": "Add 2 to the Focus of the next card in your play. ",
#         "second_effect_text": "<Critical> Add the top card of the Main deck to your play.",
#         "illustrator": "Filippo Scalisi",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb12bb.png",
#         "file_name": "i1cb12bb",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:09",
#           "full_time": "2023-06-25T19:09:11.835000"
#         },
#         "id": "641425ffb00a31a52c1ba073",
#         "count": null
#       },
#       {
#         "name": "Peaceful Meditation",
#         "card_class": "",
#         "hero_id": "RF1",
#         "series_name": "Red Fist//Tech//Brawler//Relaxation",
#         "card_number": 1084,
#         "enthusiasm": 0,
#         "effect_text": "This Comeback counts as a Power card in your play (this does not count towards play size).",
#         "second_effect_text": "<Trigger> Draw 3 cards, then discard 1 card from your hand.",
#         "illustrator": "gmoshiro",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb6rf.png",
#         "file_name": "i1cb6rf",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:19",
#           "full_time": "2023-06-25T19:19:29.871000"
#         },
#         "id": "643f5ae22e72274cabf639f7",
#         "count": null
#       },
#       {
#         "name": "Tuning",
#         "card_class": "",
#         "hero_id": "BN1",
#         "series_name": "Black Note//Altered//Quest//Call",
#         "card_number": 1105,
#         "enthusiasm": 0,
#         "effect_text": "This Comeback counts as a Canny card in your play (this does not count towards play size).",
#         "second_effect_text": "<Critical> Add 3 to your Focus.",
#         "illustrator": "ahtan_delmundo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb13bn.png",
#         "file_name": "i1cb13bn",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:57",
#           "full_time": "2023-06-25T18:57:29.459000"
#         },
#         "id": "6413be4fb00a31a52c1b9d98",
#         "count": null
#       },
#       {
#         "name": "Entering the Inventory",
#         "card_class": "",
#         "hero_id": "HS1",
#         "series_name": "Warp Family//Cosmic//Psychic",
#         "card_number": 1099,
#         "enthusiasm": 0,
#         "effect_text": "Discard 1 card from your hand, then unfurl 2 Pluck. Add 1 Pluck to your ownership and discard the other unfurled Pluck.",
#         "second_effect_text": "<Critical> Draw 1 card and gain 1 Item.",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb11hs.png",
#         "file_name": "i1cb11hs",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:21",
#           "full_time": "2023-06-25T19:21:12.570000"
#         },
#         "id": "64400ae72e72274cabf63cf9",
#         "count": null
#       },
#       {
#         "name": "Dive Bomb Finisher!!!",
#         "card_class": "Unity",
#         "hero_id": "DW1",
#         "series_name": "Project HERMES//Tech//Tactical//Team",
#         "card_number": 1036,
#         "enthusiasm": 20,
#         "effect_text": "<Target> Your weakest foe. //<1-5> Deal 1 damage. //<6-11> Deal 3 damage. //<12+> Deal 1 damage for each card in your play. Return 1 other card in your play to your hand.\n\n\n",
#         "second_effect_text": "",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1b1dwe.png",
#         "file_name": "i1b1dwe",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:51",
#           "full_time": "2023-06-25T18:51:49.451000"
#         },
#         "id": "6410aaa0baeb0bbfb51492ba",
#         "count": null
#       },
#       {
#         "name": "Super Sonic Riff!!",
#         "card_class": "Canny",
#         "hero_id": "BN1",
#         "series_name": "Black Note//Altered//Quest//Call",
#         "card_number": 1051,
#         "enthusiasm": 0,
#         "effect_text": "Deal 3 damage to a random foe and you take 2 damage.",
#         "second_effect_text": "<Trigger> At the start of the round, resolve this Move in your play, then discard it. ",
#         "illustrator": "ahtan_delmundo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p1bnm.png",
#         "file_name": "i1p1bnm",
#         "card_type": [
#           1003
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:55",
#           "full_time": "2023-06-25T18:55:01.747000"
#         },
#         "id": "6413aa91b00a31a52c1b9bc8",
#         "count": null
#       },
#       {
#         "name": "“Battle Greaves!”",
#         "card_class": "",
#         "hero_id": "BGA",
#         "series_name": "Battle Girl Alice//Magic//Brawler//Call",
#         "card_number": 1088,
#         "enthusiasm": 0,
#         "effect_text": "<Trigger> At the start of the round or during a foe's turn, your Fighter gains Counter 1 (that card is revealed).",
#         "second_effect_text": "Once per foe's turn, if you have a defending Power Fighter and you are dealt damage, reduce that damage by 1.",
#         "illustrator": "mo.moan",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl08bgai.png",
#         "file_name": "i1pl08bgai",
#         "card_type": [
#           1006
#         ],
#         "extra_effects": [
#           1001,
#           1003
#         ],
#         "reactions": [],
#         "card_tags": [
#           1004
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:19",
#           "full_time": "2023-06-25T19:19:55.272000"
#         },
#         "id": "643f61972e72274cabf63b4d",
#         "count": null
#       },
#       {
#         "name": "Super Sonic Riff!!",
#         "card_class": "Canny",
#         "hero_id": "BN1",
#         "series_name": "Black Note//Altered//Quest//Call",
#         "card_number": 1051,
#         "enthusiasm": 0,
#         "effect_text": "Deal 3 damage to a random foe and you take 2 damage.",
#         "second_effect_text": "<Trigger> At the start of the round, resolve this Move in your play, then discard it. ",
#         "illustrator": "ahtan_delmundo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p1bnm.png",
#         "file_name": "i1p1bnm",
#         "card_type": [
#           1003
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:55",
#           "full_time": "2023-06-25T18:55:01.747000"
#         },
#         "id": "6413aa91b00a31a52c1b9bc8",
#         "count": null
#       },
#       {
#         "name": "A Hero’s Entrance",
#         "card_class": "",
#         "hero_id": "PM1",
#         "series_name": "PantheraMan//Nature//Brawler",
#         "card_number": 1068,
#         "enthusiasm": 0,
#         "effect_text": "<Trigger> At the start of the round or during a foe's turn, resolve the main effect of 1 Fighter in your play.",
#         "second_effect_text": "<C.Trigger> At the start of the round, you go first.",
#         "illustrator": "XIOLI",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl01pme.png",
#         "file_name": "i1pl01pme",
#         "card_type": [
#           1007
#         ],
#         "extra_effects": [
#           1001,
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1005
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:55",
#           "full_time": "2023-06-25T18:55:49.525000"
#         },
#         "id": "6413ba34b00a31a52c1b9cbf",
#         "count": null
#       },
#       {
#         "name": "Gravity Enforcer",
#         "card_class": "Canny",
#         "hero_id": "GE1",
#         "series_name": "Gravity Enforcer//Cosmic//Tactical",
#         "card_number": 1061,
#         "enthusiasm": 0,
#         "effect_text": "Foes with Enthusiasm lower than yours can not use reactions. Deal 2 damage to the foe with the lowest Enthusiasm.",
#         "second_effect_text": "<Trigger> At the start of the round or when this card is revealed, lower the Enthusiasm of all foes by 4.",
#         "illustrator": "betomirandaart2",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p4gef.png",
#         "file_name": "i1p4gef",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [
#           1001
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:55",
#           "full_time": "2023-06-25T18:55:12.534000"
#         },
#         "id": "6413ac2fb00a31a52c1b9c06",
#         "count": null
#       }
#     ]
#   },
#   "3": {
#     "pull_list": [
#       1065,
#       1035,
#       1052,
#       1124,
#       1011,
#       1016,
#       1117,
#       1112,
#       1009,
#       1068,
#       1041
#     ],
#     "pulled_cards": [
#       {
#         "name": "MAX VARIABLE",
#         "card_class": "",
#         "hero_id": "MV1",
#         "series_name": "MAX VARIABLE",
#         "card_number": 1065,
#         "enthusiasm": 0,
#         "effect_text": "Unfurl 4 cards (reveal 4 cards from the top of the Main deck). Add 1 card that matches the type MAX VARIABLE is replacing to your play and add 2 of the other unfurled cards to your hand. Discard MAX VARIABLE and the last unfurled card.",
#         "second_effect_text": "",
#         "illustrator": "mvthwus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1rb1mv.png",
#         "file_name": "",
#         "card_type": [
#           1005
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1003
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:52",
#           "full_time": "2023-06-25T18:52:52.346000"
#         },
#         "id": "64130de7b00a31a52c1b98bf",
#         "count": null
#       },
#       {
#         "name": "Dual Wing Strike!!",
#         "card_class": "Unity",
#         "hero_id": "DW1",
#         "series_name": "Project HERMES//Tech//Tactical//Team",
#         "card_number": 1035,
#         "enthusiasm": 0,
#         "effect_text": "<Target> Your strongest foe. //<1-5> Deal 2 damage. //<6-11> Deal 2 damage. Draw 1 card. //<12+> Deal 2 damage plus 1 additional damage for each card in your play past 4. Add 1 Unity card from the discard pile to your hand.",
#         "second_effect_text": "",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1b1dwm.png",
#         "file_name": "i1b1dwm",
#         "card_type": [
#           1003
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:51",
#           "full_time": "2023-06-25T18:51:44.576000"
#         },
#         "id": "6410a48cb100cf99372ee885",
#         "count": null
#       },
#       {
#         "name": "Max Reverb!!!",
#         "card_class": "Canny",
#         "hero_id": "BN1",
#         "series_name": "Black Note//Altered//Quest//Call",
#         "card_number": 1052,
#         "enthusiasm": 5,
#         "effect_text": "<Target> All foes. //If you are at 8 HP or less, add 3 to your Focus. //<1-5> Deal 2 piercing damage. Take 4 damage. //<6-11> Deal 3 piercing damage. Take 3 damage. //<12+> Deal 4 piercing damage and ignore the reaction(s) of defending Fighter(s). Take 2 damage.",
#         "second_effect_text": "",
#         "illustrator": "ahtan_delmundo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p1bne.png",
#         "file_name": "i1p1bne",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:55",
#           "full_time": "2023-06-25T18:55:06.804000"
#         },
#         "id": "6413ab47b00a31a52c1b9be7",
#         "count": null
#       },
#       {
#         "name": "Change of Plans ",
#         "card_class": "",
#         "hero_id": "GEN",
#         "series_name": "Cosmic//Defender//Transformation//Call",
#         "card_number": 1124,
#         "enthusiasm": 0,
#         "effect_text": "<Trigger> During a foe's turn; switch 1 card in your play that has yet to be resolved with 1 card in your hand of the same type (the new card can not be used to defend).",
#         "second_effect_text": "<Critical> Discard 1 card from your hand; add 1 MAX VARIABLE from your hand to your play (MAX VARIABLE counts as an Aura).\n",
#         "illustrator": "mvthwus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb18g.png",
#         "file_name": "i1cb18g",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1001,
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:07",
#           "full_time": "2023-06-25T19:07:47.834000"
#         },
#         "id": "6439583c3d6559427fc584dc",
#         "count": null
#       },
#       {
#         "name": "Umala - Heavy Trampling!!",
#         "card_class": "Staunch",
#         "hero_id": "BW1",
#         "series_name": "Bone Whisperer//Mystic//Nature",
#         "card_number": 1011,
#         "enthusiasm": 0,
#         "effect_text": "You can resolve one additional Event this round.// Deal 1 piercing damage for each Event in your ownership (max of 4) to a random foe, then gain 2 HP.",
#         "second_effect_text": "",
#         "illustrator": "Ranbutam",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g3bwm.png",
#         "file_name": "i1g3bwm",
#         "card_type": [
#           1003
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:08",
#           "full_time": "2023-06-25T19:08:46.747000"
#         },
#         "id": "641420a2b00a31a52c1b9fe2",
#         "count": null
#       },
#       {
#         "name": "Restorative Heat!!!",
#         "card_class": "Staunch",
#         "hero_id": "FB1",
#         "series_name": "Flamebell//Magic//Quest",
#         "card_number": 1016,
#         "enthusiasm": 11,
#         "effect_text": "<Target> Foe of your choice. //All foes with a Power card(s) in their play take 1 damage. //<1-5> Deal 3 damage. //<6-11> Deal 3 damage. Gain 1 HP. //<12+> Deal 4 damage. Gain 2 HP and resolve your Aura one more time.",
#         "second_effect_text": "",
#         "illustrator": "XIOLI",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g4fbe.png",
#         "file_name": "i1g4fbe",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 29,
#           "time": "23:36",
#           "full_time": "2023-06-29T23:36:43.986000"
#         },
#         "id": "64142354b00a31a52c1ba03d",
#         "count": null
#       },
#       {
#         "name": "First Aid Kit",
#         "card_class": "",
#         "hero_id": "GEN",
#         "series_name": "Development",
#         "card_number": 1117,
#         "enthusiasm": 0,
#         "effect_text": "<Limited> This Item counts as a Staunch card in your play this round (this does not count towards play size).",
#         "second_effect_text": "Discard this Item; gain 1 HP and draw 1 card.",
#         "illustrator": "prusin_senpai",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1plg5i.png",
#         "file_name": "i1plg5i",
#         "card_type": [
#           1006
#         ],
#         "extra_effects": [
#           1003
#         ],
#         "reactions": [],
#         "card_tags": [
#           1004
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 7,
#           "day": 17,
#           "time": "05:29",
#           "full_time": "2023-07-17T05:29:34.702000"
#         },
#         "id": "643f5e5d2e72274cabf63ad9",
#         "count": null
#       },
#       {
#         "name": "Gravity Patrol Badge",
#         "card_class": "",
#         "hero_id": "GE1",
#         "series_name": "Gravity Enforcer//Cosmic//Tactical",
#         "card_number": 1112,
#         "enthusiasm": 0,
#         "effect_text": "<L.Trigger> During a foe's turn, card effects can not be resolved more than once this round.",
#         "second_effect_text": "Lower the Enthusiasm of all foes by 2.",
#         "illustrator": "betomirandaart2",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl16gei.png",
#         "file_name": "i1pl16gei",
#         "card_type": [
#           1006
#         ],
#         "extra_effects": [
#           1001,
#           1003
#         ],
#         "reactions": [],
#         "card_tags": [
#           1004
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:57",
#           "full_time": "2023-06-25T18:57:34.918000"
#         },
#         "id": "6413bee1b00a31a52c1b9db7",
#         "count": null
#       },
#       {
#         "name": "Bone Whisperer",
#         "card_class": "Staunch",
#         "hero_id": "BW1",
#         "series_name": "Bone Whisperer//Mystic//Nature",
#         "card_number": 1009,
#         "enthusiasm": 0,
#         "effect_text": "Resolve 1 of the following effects: //<> Discard up to 3 cards from your hand; gain 1 HP for each card discarded. //<>Discard 3 cards from your hand; unfurl 3 Pluck (reveal 3 cards from the top of the Pluck deck). Add 2 Pluck to your ownership and discard the other unfurled Pluck.",
#         "second_effect_text": "",
#         "illustrator": "Ranbutam",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g3bwf.png",
#         "file_name": "i1g3bwf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [],
#         "reactions": [
#           1001
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:08",
#           "full_time": "2023-06-25T19:08:52.534000"
#         },
#         "id": "6414212cb00a31a52c1b9ff9",
#         "count": null
#       },
#       {
#         "name": "A Hero’s Entrance",
#         "card_class": "",
#         "hero_id": "PM1",
#         "series_name": "PantheraMan//Nature//Brawler",
#         "card_number": 1068,
#         "enthusiasm": 0,
#         "effect_text": "<Trigger> At the start of the round or during a foe's turn, resolve the main effect of 1 Fighter in your play.",
#         "second_effect_text": "<C.Trigger> At the start of the round, you go first.",
#         "illustrator": "XIOLI",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl01pme.png",
#         "file_name": "i1pl01pme",
#         "card_type": [
#           1007
#         ],
#         "extra_effects": [
#           1001,
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1005
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:55",
#           "full_time": "2023-06-25T18:55:49.525000"
#         },
#         "id": "6413ba34b00a31a52c1b9cbf",
#         "count": null
#       },
#       {
#         "name": "Hammerspace",
#         "card_class": "Unity",
#         "hero_id": "HS1",
#         "series_name": "Warp Family//Cosmic//Psychic",
#         "card_number": 1041,
#         "enthusiasm": 0,
#         "effect_text": "Draw 1 card and gain 1 Item. \nIf you have a Canny card in your play, reset 1 of your Pluck (you can resolve the extra effects of 1 Pluck one more time this round).",
#         "second_effect_text": "",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1b3hsf.png",
#         "file_name": "i1b3hsf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [],
#         "reactions": [
#           1002,
#           1004
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:11",
#           "full_time": "2023-06-25T19:11:49.370000"
#         },
#         "id": "64397b773d6559427fc5885c",
#         "count": null
#       }
#     ]
#   },
#   "4": {
#     "pull_list": [
#       1065,
#       1023,
#       1019,
#       1114,
#       1062,
#       1019,
#       1090,
#       1058,
#       1104,
#       1073,
#       1055
#     ],
#     "pulled_cards": [
#       {
#         "name": "MAX VARIABLE",
#         "card_class": "",
#         "hero_id": "MV1",
#         "series_name": "MAX VARIABLE",
#         "card_number": 1065,
#         "enthusiasm": 0,
#         "effect_text": "Unfurl 4 cards (reveal 4 cards from the top of the Main deck). Add 1 card that matches the type MAX VARIABLE is replacing to your play and add 2 of the other unfurled cards to your hand. Discard MAX VARIABLE and the last unfurled card.",
#         "second_effect_text": "",
#         "illustrator": "mvthwus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1rb1mv.png",
#         "file_name": "",
#         "card_type": [
#           1005
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1003
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:52",
#           "full_time": "2023-06-25T18:52:52.346000"
#         },
#         "id": "64130de7b00a31a52c1b98bf",
#         "count": null
#       },
#       {
#         "name": "Ignition Left!!",
#         "card_class": "Power",
#         "hero_id": "RF1",
#         "series_name": "Red Fist//Tech//Brawler",
#         "card_number": 1023,
#         "enthusiasm": 0,
#         "effect_text": "<Target> Foe on your left. //<1-5> Deal 1 damage. //<6-11> Deal 3 piercing damage. //<12+> Deal 3 piercing damage. Ignore the reaction(s) of defending Fighter(s) and draw 1 card.",
#         "second_effect_text": "",
#         "illustrator": "gmoshiro",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r2rfm.png",
#         "file_name": "i1r2rfm",
#         "card_type": [
#           1003
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:11",
#           "full_time": "2023-06-25T19:11:54.452000"
#         },
#         "id": "643f53632e72274cabf63893",
#         "count": null
#       },
#       {
#         "name": "Cinder Crunch!!",
#         "card_class": "Power",
#         "hero_id": "BM1",
#         "series_name": "Blast Mouth//Altered//Nature",
#         "card_number": 1019,
#         "enthusiasm": 0,
#         "effect_text": "Deal 3 piercing damage to a foe who has already gone this round. If this card defeats a Fighter, your Ending gains damage plus 1 (that card deals 1 additional damage at the end of its resolution).",
#         "second_effect_text": "",
#         "illustrator": "Znttus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r1bmm.png",
#         "file_name": "i1r1bmm",
#         "card_type": [
#           1003
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:12",
#           "full_time": "2023-06-25T19:12:18.514000"
#         },
#         "id": "643f55a42e72274cabf638b5",
#         "count": null
#       },
#       {
#         "name": "New Equilibrium",
#         "card_class": "",
#         "hero_id": "GE1",
#         "series_name": "Gravity Enforcer//Cosmic//Tactical",
#         "card_number": 1114,
#         "enthusiasm": 0,
#         "effect_text": "<Trigger> At the start of the round or during a foe's turn, lower the Enthusiasm of all foes by 2.",
#         "second_effect_text": "<Critical> Your Ending gains damage plus 1 if it deals damage to a foe with Enthusiasm lower than yours.",
#         "illustrator": "betomirandaart2",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb16ge.png",
#         "file_name": "i1cb16ge",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1001,
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:57",
#           "full_time": "2023-06-25T18:57:45.089000"
#         },
#         "id": "6413bffeb00a31a52c1b9e03",
#         "count": null
#       },
#       {
#         "name": "Heavy Aura!",
#         "card_class": "Canny",
#         "hero_id": "GE1",
#         "series_name": "Gravity Enforcer//Cosmic//Tactical",
#         "card_number": 1062,
#         "enthusiasm": 0,
#         "effect_text": "Foes with Enthusiasm lower than yours take 1 damage after resolving an Aura(s) or drawing a card(s). ",
#         "second_effect_text": "<Trigger> At the start of the round, lower the Enthusiasm of all foes by 4 and resolve this Aura in your play.",
#         "illustrator": "betomirandaart2",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p4gea.png",
#         "file_name": "i1p4gea",
#         "card_type": [
#           1002
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 8,
#           "day": 10,
#           "time": "02:57",
#           "full_time": "2023-08-10T02:57:42.844000"
#         },
#         "id": "6413ad2bb00a31a52c1b9c3d",
#         "count": null
#       },
#       {
#         "name": "Cinder Crunch!!",
#         "card_class": "Power",
#         "hero_id": "BM1",
#         "series_name": "Blast Mouth//Altered//Nature",
#         "card_number": 1019,
#         "enthusiasm": 0,
#         "effect_text": "Deal 3 piercing damage to a foe who has already gone this round. If this card defeats a Fighter, your Ending gains damage plus 1 (that card deals 1 additional damage at the end of its resolution).",
#         "second_effect_text": "",
#         "illustrator": "Znttus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r1bmm.png",
#         "file_name": "i1r1bmm",
#         "card_type": [
#           1003
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:12",
#           "full_time": "2023-06-25T19:12:18.514000"
#         },
#         "id": "643f55a42e72274cabf638b5",
#         "count": null
#       },
#       {
#         "name": "“More Training!”",
#         "card_class": "",
#         "hero_id": "BGA",
#         "series_name": "Battle Girl Alice//Magic//Brawler//Call",
#         "card_number": 1090,
#         "enthusiasm": 0,
#         "effect_text": "<Trigger> At the start of the round or during a foe's turn, your Fighter gains 1 HP (that card is revealed).",
#         "second_effect_text": "<C.Trigger> At the start of the round or during a foe's turn, your Fighter gains Counter 1 (that card is revealed).\n\n\n",
#         "illustrator": "mo.moan",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb8bga.png",
#         "file_name": "i1cb8bga",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1001,
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:19",
#           "full_time": "2023-06-25T19:19:50.352000"
#         },
#         "id": "643f612e2e72274cabf63b46",
#         "count": null
#       },
#       {
#         "name": "Life Cleaving Presence!",
#         "card_class": "Canny",
#         "hero_id": "CP1",
#         "series_name": "Ceifeira Preta//Mystic//Quest",
#         "card_number": 1058,
#         "enthusiasm": 0,
#         "effect_text": "This card cannot target the same foe twice.// Discard 1 card from your strongest or weakest foe's hand  for each Comeback in your ownership (max of 3), then they draw 1 card for each Comeback in their ownership plus 1 (max of 3).",
#         "second_effect_text": "",
#         "illustrator": "Hugo Roberto",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p3cpa.png",
#         "file_name": "i1p3cpa",
#         "card_type": [
#           1002
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 29,
#           "time": "23:53",
#           "full_time": "2023-06-29T23:53:14.316000"
#         },
#         "id": "6413c34cb00a31a52c1b9eaa",
#         "count": null
#       },
#       {
#         "name": "“1..2..3..”",
#         "card_class": "",
#         "hero_id": "BN1",
#         "series_name": "Black Note//Altered//Quest//Call",
#         "card_number": 1104,
#         "enthusiasm": 0,
#         "effect_text": "All players discard cards from their plays until they have 3 or less cards, then deal 2 damage to all players that discarded card(s) from their play. ",
#         "second_effect_text": "<Critical> All foes and their Fighters take 1 damage.",
#         "illustrator": "ahtan_delmundo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl13bne.png",
#         "file_name": "i1pl13bne",
#         "card_type": [
#           1007
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1005
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:57",
#           "full_time": "2023-06-25T18:57:24.796000"
#         },
#         "id": "6413bdabb00a31a52c1b9d79",
#         "count": null
#       },
#       {
#         "name": "Spirit Anchor",
#         "card_class": "",
#         "hero_id": "BW1",
#         "series_name": "Bone Whisperer//Mystic//Nature",
#         "card_number": 1073,
#         "enthusiasm": 0,
#         "effect_text": "<Limited> If you resolve an Event this round, place the Event under this Item instead of discarding it at the end of the round (the placed Event(s) count towards your Pluck limit, and if this Item is discarded or changes ownership, the placed Event(s) is discarded).",
#         "second_effect_text": "The Event(s) under this Item can be resolved one more time; the Event is not discarded at the end of the round.",
#         "illustrator": "Ranbutam",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl03bwi.png",
#         "file_name": "i1pl03bwi",
#         "card_type": [
#           1006
#         ],
#         "extra_effects": [
#           1003
#         ],
#         "reactions": [],
#         "card_tags": [
#           1004
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:08",
#           "full_time": "2023-06-25T19:08:01.274000"
#         },
#         "id": "64395a0b3d6559427fc58532",
#         "count": null
#       },
#       {
#         "name": "Spatial Reversal!!",
#         "card_class": "Canny",
#         "hero_id": "P01",
#         "series_name": "Warp Family//Cosmic//Psychic",
#         "card_number": 1055,
#         "enthusiasm": 0,
#         "effect_text": "This card copies the text of a foe's Move on your left or right until the end of your turn (if their Move is face-down, reveal it).",
#         "second_effect_text": "<Trigger> If you are targeted for damage, your Fighter gains Redirect 1 (that card is revealed).",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p2pm.png",
#         "file_name": "i1p2pm",
#         "card_type": [
#           1003
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:08",
#           "full_time": "2023-06-25T19:08:33.350000"
#         },
#         "id": "64141e41b00a31a52c1b9f74",
#         "count": null
#       }
#     ]
#   },
#   "5": {
#     "pull_list": [
#       1065,
#       1052,
#       1021,
#       1093,
#       1001,
#       1087,
#       1058,
#       1089,
#       1002,
#       1113,
#       1020
#     ],
#     "pulled_cards": [
#       {
#         "name": "MAX VARIABLE",
#         "card_class": "",
#         "hero_id": "MV1",
#         "series_name": "MAX VARIABLE",
#         "card_number": 1065,
#         "enthusiasm": 0,
#         "effect_text": "Unfurl 4 cards (reveal 4 cards from the top of the Main deck). Add 1 card that matches the type MAX VARIABLE is replacing to your play and add 2 of the other unfurled cards to your hand. Discard MAX VARIABLE and the last unfurled card.",
#         "second_effect_text": "",
#         "illustrator": "mvthwus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1rb1mv.png",
#         "file_name": "",
#         "card_type": [
#           1005
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1003
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:52",
#           "full_time": "2023-06-25T18:52:52.346000"
#         },
#         "id": "64130de7b00a31a52c1b98bf",
#         "count": null
#       },
#       {
#         "name": "Max Reverb!!!",
#         "card_class": "Canny",
#         "hero_id": "BN1",
#         "series_name": "Black Note//Altered//Quest//Call",
#         "card_number": 1052,
#         "enthusiasm": 5,
#         "effect_text": "<Target> All foes. //If you are at 8 HP or less, add 3 to your Focus. //<1-5> Deal 2 piercing damage. Take 4 damage. //<6-11> Deal 3 piercing damage. Take 3 damage. //<12+> Deal 4 piercing damage and ignore the reaction(s) of defending Fighter(s). Take 2 damage.",
#         "second_effect_text": "",
#         "illustrator": "ahtan_delmundo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p1bne.png",
#         "file_name": "i1p1bne",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:55",
#           "full_time": "2023-06-25T18:55:06.804000"
#         },
#         "id": "6413ab47b00a31a52c1b9be7",
#         "count": null
#       },
#       {
#         "name": "Red Fist",
#         "card_class": "Power",
#         "hero_id": "RF1",
#         "series_name": "Red Fist//Tech//Brawler",
#         "card_number": 1021,
#         "enthusiasm": 0,
#         "effect_text": "Deal 3 damage to your strongest foe, then discard 3 cards from your hand.",
#         "second_effect_text": "<Trigger> Just before using this card’s reaction(s), remove 3 Counter tokens from this card; draw 3 cards.",
#         "illustrator": "gmoshiro",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r2rff.png",
#         "file_name": "i1r2rff",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [
#           1002,
#           1002,
#           1002
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 29,
#           "time": "23:44",
#           "full_time": "2023-06-29T23:44:32.879000"
#         },
#         "id": "64397afc3d6559427fc58825",
#         "count": null
#       },
#       {
#         "name": "The Survey Crew",
#         "card_class": "",
#         "hero_id": "DW1",
#         "series_name": "Project HERMES//Tech//Tactical//Team",
#         "card_number": 1093,
#         "enthusiasm": 0,
#         "effect_text": "This Comeback counts as a Unity card in your play (this does not count towards play size).",
#         "second_effect_text": "<Critical> Return 1 card from the discard pile to the top of the Main deck.",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb9dw.png",
#         "file_name": "i1cb9dw",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:56",
#           "full_time": "2023-06-25T18:56:12.953000"
#         },
#         "id": "6413bcb1b00a31a52c1b9d3b",
#         "count": null
#       },
#       {
#         "name": "PantheraMan",
#         "card_class": "Staunch",
#         "hero_id": "PM1",
#         "series_name": "PantheraMan//Nature//Brawler",
#         "card_number": 1001,
#         "enthusiasm": 0,
#         "effect_text": "Deal 2 damage to a foe who has yet to go this round. If you are first to go this round or you have the highest Enthusiasm, draw 1 Pluck and gain 2 HP.",
#         "second_effect_text": "",
#         "illustrator": "XIOLI",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g1pmf.png",
#         "file_name": "i1g1pmf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [],
#         "reactions": [
#           1003
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:42",
#           "full_time": "2023-06-25T18:42:32.929000"
#         },
#         "id": "6407a2c0c503d0c6f5a33235",
#         "count": null
#       },
#       {
#         "name": "Transfer of Bad Energy",
#         "card_class": "",
#         "hero_id": "BE1",
#         "series_name": "Burst Esper//Psychic//Energy//Relaxation",
#         "card_number": 1087,
#         "enthusiasm": 0,
#         "effect_text": "Discard 1 card from your hand; 1 random card in your play gains damage plus 1 (that card deals 1 additional damage at the end of its resolution).  ",
#         "second_effect_text": "<C.Trigger> At the start of the round, your Fighter gains Redirect 1 (that card is revealed).",
#         "illustrator": "mo.moan",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb7be.png",
#         "file_name": "i1cb7be",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1001,
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:13",
#           "full_time": "2023-06-25T19:13:13.733000"
#         },
#         "id": "643962953d6559427fc58635",
#         "count": null
#       },
#       {
#         "name": "Life Cleaving Presence!",
#         "card_class": "Canny",
#         "hero_id": "CP1",
#         "series_name": "Ceifeira Preta//Mystic//Quest",
#         "card_number": 1058,
#         "enthusiasm": 0,
#         "effect_text": "This card cannot target the same foe twice.// Discard 1 card from your strongest or weakest foe's hand  for each Comeback in your ownership (max of 3), then they draw 1 card for each Comeback in their ownership plus 1 (max of 3).",
#         "second_effect_text": "",
#         "illustrator": "Hugo Roberto",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p3cpa.png",
#         "file_name": "i1p3cpa",
#         "card_type": [
#           1002
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 29,
#           "time": "23:53",
#           "full_time": "2023-06-29T23:53:14.316000"
#         },
#         "id": "6413c34cb00a31a52c1b9eaa",
#         "count": null
#       },
#       {
#         "name": "Menacingly Cute Pose",
#         "card_class": "",
#         "hero_id": "BGA",
#         "series_name": "Battle Girl Alice//Magic//Brawler",
#         "card_number": 1089,
#         "enthusiasm": 0,
#         "effect_text": "Foes can not use trigger effects or reactions in response to the effects and reactions of your Fighter(s).",
#         "second_effect_text": "<Trigger> If your Fighter defends, cancel all non-damaging effect(s) of card(s) targeting you until the end of this turn.",
#         "illustrator": "mo.moan",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl08bgae.png",
#         "file_name": "i1pl08bgae",
#         "card_type": [
#           1007
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1005
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:20",
#           "full_time": "2023-06-25T19:20:00.729000"
#         },
#         "id": "643f61e22e72274cabf63b54",
#         "count": null
#       },
#       {
#         "name": "Boisterous Call!",
#         "card_class": "Staunch",
#         "hero_id": "PM1",
#         "series_name": "PantheraMan//Nature//Brawler//Call",
#         "card_number": 1002,
#         "enthusiasm": 0,
#         "effect_text": "Gain 1 HP and add 4 to your Focus.",
#         "second_effect_text": "<Trigger> At the start of the round, add 4 to your Enthusiasm and resolve this Aura in your play.",
#         "illustrator": "XIOLI",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g1pma.png",
#         "file_name": "",
#         "card_type": [
#           1002
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:54",
#           "full_time": "2023-06-25T18:54:34.381000"
#         },
#         "id": "6413a629b00a31a52c1b9b13",
#         "count": null
#       },
#       {
#         "name": "Ground Collapse",
#         "card_class": "",
#         "hero_id": "GE1",
#         "series_name": "Gravity Enforcer//Cosmic//Tactical",
#         "card_number": 1113,
#         "enthusiasm": 0,
#         "effect_text": "Reduce the focus of all foes by 2. If they have Enthusiasm lower than yours, reduce it by 4 instead.",
#         "second_effect_text": "<Trigger> At the start of the round, lower the Enthusiasm of all foes by 2, then resolve this Event in your ownership.",
#         "illustrator": "betomirandaart2",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl16gee.png",
#         "file_name": "i1pl16gee",
#         "card_type": [
#           1007
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1005
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 29,
#           "time": "23:57",
#           "full_time": "2023-06-29T23:57:59.577000"
#         },
#         "id": "6413bf79b00a31a52c1b9de4",
#         "count": null
#       },
#       {
#         "name": "Burning Impact!!!",
#         "card_class": "Power",
#         "hero_id": "BM1",
#         "series_name": "Blast Mouth//Altered//Nature",
#         "card_number": 1020,
#         "enthusiasm": 6,
#         "effect_text": "<Target> Foe of your choice. //If you are last to go this round, ignore the reaction(s) of defending Fighter(s). //<1-5> Deal 4 damage. //<6-11> Deal 4 piercing damage. //<12+> Deal 5 piercing damage and 1 additional piercing damage if they have already gone this round.",
#         "second_effect_text": "",
#         "illustrator": "Znttus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r1bme.png",
#         "file_name": "i1r1bme",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:12",
#           "full_time": "2023-06-25T19:12:24.353000"
#         },
#         "id": "643f56612e72274cabf638cc",
#         "count": null
#       }
#     ]
#   },
#   "6": {
#     "pull_list": [
#       1066,
#       1052,
#       1069,
#       1037,
#       1045,
#       1012,
#       1126,
#       1043,
#       1034,
#       1050,
#       1020
#     ],
#     "pulled_cards": [
#       {
#         "name": "MAX VARIABLE #2",
#         "card_class": "",
#         "hero_id": "MV1",
#         "series_name": "MAX VARIABLE",
#         "card_number": 1066,
#         "enthusiasm": 0,
#         "effect_text": "\nUnfurl 2 cards (reveal 2 cards from the top of the Main deck). Add 1 to your play and discard the other. If the added card matches the type MAX VARIABLE is replacing, draw 1 Pluck. Discard MAX VARIABLE.",
#         "second_effect_text": "",
#         "illustrator": "Dalfovo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1rb1mvn2.png",
#         "file_name": "",
#         "card_type": [
#           1005
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1003
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:52",
#           "full_time": "2023-06-25T18:52:57.066000"
#         },
#         "id": "64130eabb00a31a52c1b98d6",
#         "count": null
#       },
#       {
#         "name": "Max Reverb!!!",
#         "card_class": "Canny",
#         "hero_id": "BN1",
#         "series_name": "Black Note//Altered//Quest//Call",
#         "card_number": 1052,
#         "enthusiasm": 5,
#         "effect_text": "<Target> All foes. //If you are at 8 HP or less, add 3 to your Focus. //<1-5> Deal 2 piercing damage. Take 4 damage. //<6-11> Deal 3 piercing damage. Take 3 damage. //<12+> Deal 4 piercing damage and ignore the reaction(s) of defending Fighter(s). Take 2 damage.",
#         "second_effect_text": "",
#         "illustrator": "ahtan_delmundo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p1bne.png",
#         "file_name": "i1p1bne",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:55",
#           "full_time": "2023-06-25T18:55:06.804000"
#         },
#         "id": "6413ab47b00a31a52c1b9be7",
#         "count": null
#       },
#       {
#         "name": "Rallying Cry",
#         "card_class": "",
#         "hero_id": "PM1",
#         "series_name": "PantheraMan//Nature//Brawler//Call",
#         "card_number": 1069,
#         "enthusiasm": 0,
#         "effect_text": "This Comeback counts as a Staunch card in your play (this does not count towards play size).",
#         "second_effect_text": "<C.Trigger> At the start of the round or during a foe’s turn, add 8 to your Enthusiasm.",
#         "illustrator": "XIOLI",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb1pm.png",
#         "file_name": "",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1001,
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:55",
#           "full_time": "2023-06-25T18:55:55.121000"
#         },
#         "id": "6413bac7b00a31a52c1b9ce6",
#         "count": null
#       },
#       {
#         "name": "Hive",
#         "card_class": "Unity",
#         "hero_id": "H01",
#         "series_name": "Hive//Tech//Nature",
#         "card_number": 1037,
#         "enthusiasm": 0,
#         "effect_text": "Draw 1 Pluck and reveal it; apply the following effects based on the Pluck revealed: //<Item> Add 1 Move or MAX VARIABLE from your hand to your play (MAX VARIABLE counts as an Move). //<Event> Reset 1 of your Pluck. //<Comeback> Add 1 Aura, Move or MAX VARIABLE from the discard pile to your hand.",
#         "second_effect_text": "",
#         "illustrator": "layonsin.art",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1b2hf.png",
#         "file_name": "i1b2hf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [],
#         "reactions": [
#           1002,
#           1002
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:09",
#           "full_time": "2023-06-25T18:09:54.986000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:21",
#           "full_time": "2023-06-25T19:21:51.382000"
#         },
#         "id": "6440bfa92e72274cabf64017",
#         "count": null
#       },
#       {
#         "name": "Bolt Blossom",
#         "card_class": "Unity",
#         "hero_id": "BB1",
#         "series_name": "Bolt Blossom//Nature//Energy",
#         "card_number": 1045,
#         "enthusiasm": 0,
#         "effect_text": "Discard 1 card from your hand, then unfurl 4 cards. Add any Fighters with a class different to this card to your play and discard the other unfurled cards.",
#         "second_effect_text": "",
#         "illustrator": "Fililppo Scalisi",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1b4bbf.png",
#         "file_name": "i1b4bbf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [],
#         "reactions": [
#           1003
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:46",
#           "full_time": "2023-06-25T18:46:24.877000"
#         },
#         "id": "640cd72b5f6730657ad87285",
#         "count": null
#       },
#       {
#         "name": "Pitch - Swift Rending!!!",
#         "card_class": "Staunch",
#         "hero_id": "BW1",
#         "series_name": "Bone Whisperer//Mystic//Nature",
#         "card_number": 1012,
#         "enthusiasm": 15,
#         "effect_text": "<Target> Random foe. //<1-5> No effect. //<6-11> Deal 3 damage. Add 1 Event from the discard pile to your ownership. //<12+> Deal 3 piercing damage. Add 1 card and 1 Event from their respective discard piles to your hand/ownership.",
#         "second_effect_text": "",
#         "illustrator": "Ranbutam",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g3bwe.png",
#         "file_name": "i1g3bwe",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:08",
#           "full_time": "2023-06-25T19:08:58.859000"
#         },
#         "id": "6414223fb00a31a52c1ba01e",
#         "count": null
#       },
#       {
#         "name": "The Next Project",
#         "card_class": "",
#         "hero_id": "GEN",
#         "series_name": "Tech//Brawler//Spoiler",
#         "card_number": 1126,
#         "enthusiasm": 0,
#         "effect_text": "Discard 1 card from your hand; discard 1 Item in a random foe’s ownership.",
#         "second_effect_text": "<Critical> Add 1 Item from the discard pile to your ownership.",
#         "illustrator": "NightWong",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb20g.png",
#         "file_name": "i1cb20g",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:21",
#           "full_time": "2023-06-25T19:21:39.801000"
#         },
#         "id": "644015702e72274cabf63e6e",
#         "count": null
#       },
#       {
#         "name": "...And The Kitchen Sink!!",
#         "card_class": "Unity",
#         "hero_id": "HS1",
#         "series_name": "Warp Family//Cosmic//Psychic",
#         "card_number": 1043,
#         "enthusiasm": 0,
#         "effect_text": "Deal 2 damage to a foe. If you have 4 or more Items in your ownership, deal 2 additional damage.",
#         "second_effect_text": "<Trigger> At the start of the round, discard this Move in your play; draw 1 Pluck.",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1b3hsm.png",
#         "file_name": "i1b3hsm",
#         "card_type": [
#           1003
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:20",
#           "full_time": "2023-06-25T19:20:52.218000"
#         },
#         "id": "644009582e72274cabf63cdd",
#         "count": null
#       },
#       {
#         "name": "Double Combatants!",
#         "card_class": "Unity",
#         "hero_id": "DW1",
#         "series_name": "Project HERMES//Tech//Tactical//Team",
#         "card_number": 1034,
#         "enthusiasm": 0,
#         "effect_text": "Draw 1 card. If you have a Fighter in your play, it is now defending. Add 1 Fighter from your hand to your play.",
#         "second_effect_text": "",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1b1dwa.png",
#         "file_name": "i1b1dwa",
#         "card_type": [
#           1002
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:51",
#           "full_time": "2023-06-25T18:51:36.168000"
#         },
#         "id": "64109f06159c81c7afebd119",
#         "count": null
#       },
#       {
#         "name": "Debilitating Sound!",
#         "card_class": "Canny",
#         "hero_id": "BN1",
#         "series_name": "Black Note//Altered//Quest//Call",
#         "card_number": 1050,
#         "enthusiasm": 0,
#         "effect_text": "All players discard 1 Move from their play. If your play did not have a Move before the resolution of this card's effect, resolve 1 of the discarded Moves as this card's effect.",
#         "second_effect_text": "",
#         "illustrator": "ahtan_delmundo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p1bna.png",
#         "file_name": "i1p1bna",
#         "card_type": [
#           1002
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:54",
#           "full_time": "2023-06-25T18:54:56.208000"
#         },
#         "id": "6413aa1bb00a31a52c1b9bb1",
#         "count": null
#       },
#       {
#         "name": "Burning Impact!!!",
#         "card_class": "Power",
#         "hero_id": "BM1",
#         "series_name": "Blast Mouth//Altered//Nature",
#         "card_number": 1020,
#         "enthusiasm": 6,
#         "effect_text": "<Target> Foe of your choice. //If you are last to go this round, ignore the reaction(s) of defending Fighter(s). //<1-5> Deal 4 damage. //<6-11> Deal 4 piercing damage. //<12+> Deal 5 piercing damage and 1 additional piercing damage if they have already gone this round.",
#         "second_effect_text": "",
#         "illustrator": "Znttus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r1bme.png",
#         "file_name": "i1r1bme",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:12",
#           "full_time": "2023-06-25T19:12:24.353000"
#         },
#         "id": "643f56612e72274cabf638cc",
#         "count": null
#       }
#     ]
#   },
#   "7": {
#     "pull_list": [
#       1066,
#       1053,
#       1105,
#       1099,
#       1014,
#       1108,
#       1089,
#       1028,
#       1013,
#       1020,
#       1060
#     ],
#     "pulled_cards": [
#       {
#         "name": "MAX VARIABLE #2",
#         "card_class": "",
#         "hero_id": "MV1",
#         "series_name": "MAX VARIABLE",
#         "card_number": 1066,
#         "enthusiasm": 0,
#         "effect_text": "\nUnfurl 2 cards (reveal 2 cards from the top of the Main deck). Add 1 to your play and discard the other. If the added card matches the type MAX VARIABLE is replacing, draw 1 Pluck. Discard MAX VARIABLE.",
#         "second_effect_text": "",
#         "illustrator": "Dalfovo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1rb1mvn2.png",
#         "file_name": "",
#         "card_type": [
#           1005
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1003
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:52",
#           "full_time": "2023-06-25T18:52:57.066000"
#         },
#         "id": "64130eabb00a31a52c1b98d6",
#         "count": null
#       },
#       {
#         "name": "Portal",
#         "card_class": "Canny",
#         "hero_id": "P01",
#         "series_name": "Warp Family//Cosmic//Psychic",
#         "card_number": 1053,
#         "enthusiasm": 0,
#         "effect_text": "Look at a random foe's hand, then discard 1 card from their hand. That foe draws 1 card.//\nIf you have a Unity card in your play, resolve this card one more time, but the target foe draws 2 cards instead.\n\n\n",
#         "second_effect_text": "",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p2pf.png",
#         "file_name": "i1p2pf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [],
#         "reactions": [
#           1002,
#           1004
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 7,
#           "day": 9,
#           "time": "14:45",
#           "full_time": "2023-07-09T14:45:45.336000"
#         },
#         "id": "64141bb5b00a31a52c1b9eff",
#         "count": null
#       },
#       {
#         "name": "Tuning",
#         "card_class": "",
#         "hero_id": "BN1",
#         "series_name": "Black Note//Altered//Quest//Call",
#         "card_number": 1105,
#         "enthusiasm": 0,
#         "effect_text": "This Comeback counts as a Canny card in your play (this does not count towards play size).",
#         "second_effect_text": "<Critical> Add 3 to your Focus.",
#         "illustrator": "ahtan_delmundo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb13bn.png",
#         "file_name": "i1cb13bn",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:57",
#           "full_time": "2023-06-25T18:57:29.459000"
#         },
#         "id": "6413be4fb00a31a52c1b9d98",
#         "count": null
#       },
#       {
#         "name": "Entering the Inventory",
#         "card_class": "",
#         "hero_id": "HS1",
#         "series_name": "Warp Family//Cosmic//Psychic",
#         "card_number": 1099,
#         "enthusiasm": 0,
#         "effect_text": "Discard 1 card from your hand, then unfurl 2 Pluck. Add 1 Pluck to your ownership and discard the other unfurled Pluck.",
#         "second_effect_text": "<Critical> Draw 1 card and gain 1 Item.",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb11hs.png",
#         "file_name": "i1cb11hs",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:21",
#           "full_time": "2023-06-25T19:21:12.570000"
#         },
#         "id": "64400ae72e72274cabf63cf9",
#         "count": null
#       },
#       {
#         "name": "Warm Mending!",
#         "card_class": "Staunch",
#         "hero_id": "FB1",
#         "series_name": "Flamebell//Magic//Quest",
#         "card_number": 1014,
#         "enthusiasm": 0,
#         "effect_text": "Add 1 card from the discard pile to your hand. If the card added was Staunch or Power, gain 2 HP.",
#         "second_effect_text": "",
#         "illustrator": "XIOLI",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g4fba.png",
#         "file_name": "",
#         "card_type": [
#           1002
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 29,
#           "time": "23:33",
#           "full_time": "2023-06-29T23:33:15.972000"
#         },
#         "id": "641423bdb00a31a52c1ba05c",
#         "count": null
#       },
#       {
#         "name": "Backdoor Exit",
#         "card_class": "",
#         "hero_id": "P01",
#         "series_name": "Warp Family//Cosmic//Psychic",
#         "card_number": 1108,
#         "enthusiasm": 0,
#         "effect_text": "<Trigger> If a card(s) in your play would be sent to the discard pile during this round, return that card (max of 1) to your hand instead. ",
#         "second_effect_text": "<Critical> Discard 1 card from 2 random foes' hands.",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb14p.png",
#         "file_name": "i1cb14p",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1001,
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:21",
#           "full_time": "2023-06-25T19:21:27.609000"
#         },
#         "id": "64400d4c2e72274cabf63dbd",
#         "count": null
#       },
#       {
#         "name": "Menacingly Cute Pose",
#         "card_class": "",
#         "hero_id": "BGA",
#         "series_name": "Battle Girl Alice//Magic//Brawler",
#         "card_number": 1089,
#         "enthusiasm": 0,
#         "effect_text": "Foes can not use trigger effects or reactions in response to the effects and reactions of your Fighter(s).",
#         "second_effect_text": "<Trigger> If your Fighter defends, cancel all non-damaging effect(s) of card(s) targeting you until the end of this turn.",
#         "illustrator": "mo.moan",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl08bgae.png",
#         "file_name": "i1pl08bgae",
#         "card_type": [
#           1007
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1005
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:20",
#           "full_time": "2023-06-25T19:20:00.729000"
#         },
#         "id": "643f61e22e72274cabf63b54",
#         "count": null
#       },
#       {
#         "name": "Thermodynamic Break!!!",
#         "card_class": "Power",
#         "hero_id": "BE1",
#         "series_name": "Burst Esper//Psychic//Energy",
#         "card_number": 1028,
#         "enthusiasm": 13,
#         "effect_text": "<Target> All foes with a larger hand than you (damage is calculated separately for each target). //<1-5> Deal 1 damage. //<6-11> Deal damage equal to the difference. Draw 1 card. //<12+> Deal damage equal to the difference plus 1. Ignore the reaction(s) of defending Fighter(s). Draw 1 card.",
#         "second_effect_text": "",
#         "illustrator": "mo.moan",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r3bee.png",
#         "file_name": "i1r3bee",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 7,
#           "day": 17,
#           "time": "04:15",
#           "full_time": "2023-07-17T04:15:43.872000"
#         },
#         "id": "6412232fd762a869c0b2e0b5",
#         "count": null
#       },
#       {
#         "name": "Flamebell",
#         "card_class": "Staunch",
#         "hero_id": "FB1",
#         "series_name": "Flamebell//Magic//Quest",
#         "card_number": 1013,
#         "enthusiasm": 0,
#         "effect_text": "Gain 2 HP, then all foes with a Power card(s) in their play and their Fighters take 1 damage.",
#         "second_effect_text": "<Trigger> At the start of the round or when this card is revealed, all Power cards gain damage minus 1 (damage dealt by those cards is reduced by 1 at the end of their resolutions).",
#         "illustrator": "XIOLI",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g4fbf.png",
#         "file_name": "i1g4fbf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [
#           1002,
#           1003
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "id": "6407a305c503d0c6f5a33236",
#         "count": null
#       },
#       {
#         "name": "Burning Impact!!!",
#         "card_class": "Power",
#         "hero_id": "BM1",
#         "series_name": "Blast Mouth//Altered//Nature",
#         "card_number": 1020,
#         "enthusiasm": 6,
#         "effect_text": "<Target> Foe of your choice. //If you are last to go this round, ignore the reaction(s) of defending Fighter(s). //<1-5> Deal 4 damage. //<6-11> Deal 4 piercing damage. //<12+> Deal 5 piercing damage and 1 additional piercing damage if they have already gone this round.",
#         "second_effect_text": "",
#         "illustrator": "Znttus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r1bme.png",
#         "file_name": "i1r1bme",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:12",
#           "full_time": "2023-06-25T19:12:24.353000"
#         },
#         "id": "643f56612e72274cabf638cc",
#         "count": null
#       },
#       {
#         "name": "Psychopomp Chop!!!",
#         "card_class": "Canny",
#         "hero_id": "CP1",
#         "series_name": "Ceifeira Preta//Mystic//Quest",
#         "card_number": 1060,
#         "enthusiasm": 8,
#         "effect_text": "<Target> Your strongest or weakest foe. //<1-5> Deal 1 damage. //<6-11> Deal 3 damage. Gain 1 Comeback. //<12+> Deal 3 damage. Gain 2 Comebacks, then resolve 1 of your Comebacks as if you were at critical HP.",
#         "second_effect_text": "",
#         "illustrator": "Hugo Roberto",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1p3cpe.png",
#         "file_name": "i1p3cpe",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:58",
#           "full_time": "2023-06-25T18:58:25.121000"
#         },
#         "id": "64141a6ab00a31a52c1b9ee0",
#         "count": null
#       }
#     ]
#   },
#   "8": {
#     "pull_list": [
#       1066,
#       1105,
#       1037,
#       1040,
#       1001,
#       1093,
#       1101,
#       1109,
#       1010,
#       1113,
#       1100
#     ],
#     "pulled_cards": [
#       {
#         "name": "MAX VARIABLE #2",
#         "card_class": "",
#         "hero_id": "MV1",
#         "series_name": "MAX VARIABLE",
#         "card_number": 1066,
#         "enthusiasm": 0,
#         "effect_text": "\nUnfurl 2 cards (reveal 2 cards from the top of the Main deck). Add 1 to your play and discard the other. If the added card matches the type MAX VARIABLE is replacing, draw 1 Pluck. Discard MAX VARIABLE.",
#         "second_effect_text": "",
#         "illustrator": "Dalfovo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1rb1mvn2.png",
#         "file_name": "",
#         "card_type": [
#           1005
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1003
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:52",
#           "full_time": "2023-06-25T18:52:57.066000"
#         },
#         "id": "64130eabb00a31a52c1b98d6",
#         "count": null
#       },
#       {
#         "name": "Tuning",
#         "card_class": "",
#         "hero_id": "BN1",
#         "series_name": "Black Note//Altered//Quest//Call",
#         "card_number": 1105,
#         "enthusiasm": 0,
#         "effect_text": "This Comeback counts as a Canny card in your play (this does not count towards play size).",
#         "second_effect_text": "<Critical> Add 3 to your Focus.",
#         "illustrator": "ahtan_delmundo",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb13bn.png",
#         "file_name": "i1cb13bn",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:57",
#           "full_time": "2023-06-25T18:57:29.459000"
#         },
#         "id": "6413be4fb00a31a52c1b9d98",
#         "count": null
#       },
#       {
#         "name": "Hive",
#         "card_class": "Unity",
#         "hero_id": "H01",
#         "series_name": "Hive//Tech//Nature",
#         "card_number": 1037,
#         "enthusiasm": 0,
#         "effect_text": "Draw 1 Pluck and reveal it; apply the following effects based on the Pluck revealed: //<Item> Add 1 Move or MAX VARIABLE from your hand to your play (MAX VARIABLE counts as an Move). //<Event> Reset 1 of your Pluck. //<Comeback> Add 1 Aura, Move or MAX VARIABLE from the discard pile to your hand.",
#         "second_effect_text": "",
#         "illustrator": "layonsin.art",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1b2hf.png",
#         "file_name": "i1b2hf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [],
#         "reactions": [
#           1002,
#           1002
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:09",
#           "full_time": "2023-06-25T18:09:54.986000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:21",
#           "full_time": "2023-06-25T19:21:51.382000"
#         },
#         "id": "6440bfa92e72274cabf64017",
#         "count": null
#       },
#       {
#         "name": "Stinger Tornado!!!",
#         "card_class": "Unity",
#         "hero_id": "H01",
#         "series_name": "Hive//Tech//Nature",
#         "card_number": 1040,
#         "enthusiasm": 10,
#         "effect_text": "<Target> 2 foes on your right. //<1-5> Deal 1 damage. //<6-11> Deal 3 piercing damage. Draw 1 card. //<12+> Deal 3 piercing damage. Draw 1 card and resolve 1 random card in your play one more time.",
#         "second_effect_text": "",
#         "illustrator": "layonsin.art",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1b2he.png",
#         "file_name": "i1b2he",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:20",
#           "full_time": "2023-06-25T19:20:14.831000"
#         },
#         "id": "644005a42e72274cabf63beb",
#         "count": null
#       },
#       {
#         "name": "PantheraMan",
#         "card_class": "Staunch",
#         "hero_id": "PM1",
#         "series_name": "PantheraMan//Nature//Brawler",
#         "card_number": 1001,
#         "enthusiasm": 0,
#         "effect_text": "Deal 2 damage to a foe who has yet to go this round. If you are first to go this round or you have the highest Enthusiasm, draw 1 Pluck and gain 2 HP.",
#         "second_effect_text": "",
#         "illustrator": "XIOLI",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g1pmf.png",
#         "file_name": "i1g1pmf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [],
#         "reactions": [
#           1003
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:42",
#           "full_time": "2023-06-25T18:42:32.929000"
#         },
#         "id": "6407a2c0c503d0c6f5a33235",
#         "count": null
#       },
#       {
#         "name": "The Survey Crew",
#         "card_class": "",
#         "hero_id": "DW1",
#         "series_name": "Project HERMES//Tech//Tactical//Team",
#         "card_number": 1093,
#         "enthusiasm": 0,
#         "effect_text": "This Comeback counts as a Unity card in your play (this does not count towards play size).",
#         "second_effect_text": "<Critical> Return 1 card from the discard pile to the top of the Main deck.",
#         "illustrator": "Undeadsushii",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb9dw.png",
#         "file_name": "i1cb9dw",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:56",
#           "full_time": "2023-06-25T18:56:12.953000"
#         },
#         "id": "6413bcb1b00a31a52c1b9d3b",
#         "count": null
#       },
#       {
#         "name": "Taxonomy Above All Orders",
#         "card_class": "",
#         "hero_id": "BB1",
#         "series_name": "Bolt Blossom//Nature//Energy",
#         "card_number": 1101,
#         "enthusiasm": 0,
#         "effect_text": "Apply the following effects based on each different class in your play (you can only apply each effect once): //<Staunch> Gain 2 HP and draw 1 card. //<Power> Deal 2 damage to a foe or add 2 to your Focus. //<Unity> Reset 1 of your Pluck (you can resolve the extra effects of 1 Pluck one more time this round). //<Canny> Gain 1 Comeback.",
#         "second_effect_text": "",
#         "illustrator": "Fililppo Scalisi",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl12bbe.png",
#         "file_name": "i1pl12bbe",
#         "card_type": [
#           1007
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1005
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 30,
#           "time": "00:11",
#           "full_time": "2023-06-30T00:11:15.158000"
#         },
#         "id": "640ce5705f6730657ad873bf",
#         "count": null
#       },
#       {
#         "name": "Muertorn the Soul Returning Scythe",
#         "card_class": "",
#         "hero_id": "CP1",
#         "series_name": "Ceifeira Preta//Mystic//Quest",
#         "card_number": 1109,
#         "enthusiasm": 0,
#         "effect_text": "Once per round, if you gain a Comeback(s), add 1 Fighter from the discard pile to the top of the Main deck.",
#         "second_effect_text": "<Trigger> If a card(s) in your play is discarded before resolving its main effect, discard this Item; resolve that card (max of 1) as if it was in your play.",
#         "illustrator": "Hugo Roberto",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl15cpi.png",
#         "file_name": "i1pl15cpi",
#         "card_type": [
#           1006
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1004
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:08",
#           "full_time": "2023-06-25T19:08:12.623000"
#         },
#         "id": "64395bc43d6559427fc585a2",
#         "count": null
#       },
#       {
#         "name": "Spirit Channeling and Union!",
#         "card_class": "Staunch",
#         "hero_id": "BW1",
#         "series_name": "Bone Whisperer//Mystic//Nature",
#         "card_number": 1010,
#         "enthusiasm": 0,
#         "effect_text": "Add 1 Pluck from the discard pile to your Active Pluck. You can not resolve it this round.",
#         "second_effect_text": "<Trigger> If a card(s) would be discarded from your hand or play, resolve this Aura in your play, then discard this card instead (max of 1).",
#         "illustrator": "Ranbutam",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g3bwa.png",
#         "file_name": "i1g3bwa",
#         "card_type": [
#           1002
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:08",
#           "full_time": "2023-06-25T19:08:39.910000"
#         },
#         "id": "6414200db00a31a52c1b9fc3",
#         "count": null
#       },
#       {
#         "name": "Ground Collapse",
#         "card_class": "",
#         "hero_id": "GE1",
#         "series_name": "Gravity Enforcer//Cosmic//Tactical",
#         "card_number": 1113,
#         "enthusiasm": 0,
#         "effect_text": "Reduce the focus of all foes by 2. If they have Enthusiasm lower than yours, reduce it by 4 instead.",
#         "second_effect_text": "<Trigger> At the start of the round, lower the Enthusiasm of all foes by 2, then resolve this Event in your ownership.",
#         "illustrator": "betomirandaart2",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl16gee.png",
#         "file_name": "i1pl16gee",
#         "card_type": [
#           1007
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1005
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 29,
#           "time": "23:57",
#           "full_time": "2023-06-29T23:57:59.577000"
#         },
#         "id": "6413bf79b00a31a52c1b9de4",
#         "count": null
#       },
#       {
#         "name": "Precious Potted Plant",
#         "card_class": "",
#         "hero_id": "BB1",
#         "series_name": "Bolt Blossom//Nature//Energy",
#         "card_number": 1100,
#         "enthusiasm": 0,
#         "effect_text": "<Limited> Place 1 card from your hand under this Item (if this Item is discarded or changes ownership, the placed card(s) is discarded).\n\n\n",
#         "second_effect_text": "This Item counts as the class(s) of the card(s) under it in each of your plays (this does not count towards play size).",
#         "illustrator": "Filippo Scalisi",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl12bbi.png",
#         "file_name": "i1pl12bbi",
#         "card_type": [
#           1006
#         ],
#         "extra_effects": [
#           1003
#         ],
#         "reactions": [],
#         "card_tags": [
#           1004
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 7,
#           "day": 17,
#           "time": "04:13",
#           "full_time": "2023-07-17T04:13:09.333000"
#         },
#         "id": "643956e33d6559427fc5846d",
#         "count": null
#       }
#     ]
#   },
#   "9": {
#     "pull_list": [
#       1065,
#       1004,
#       1012,
#       1085,
#       1096,
#       1045,
#       1038,
#       1009,
#       1009,
#       1020,
#       1022
#     ],
#     "pulled_cards": [
#       {
#         "name": "MAX VARIABLE",
#         "card_class": "",
#         "hero_id": "MV1",
#         "series_name": "MAX VARIABLE",
#         "card_number": 1065,
#         "enthusiasm": 0,
#         "effect_text": "Unfurl 4 cards (reveal 4 cards from the top of the Main deck). Add 1 card that matches the type MAX VARIABLE is replacing to your play and add 2 of the other unfurled cards to your hand. Discard MAX VARIABLE and the last unfurled card.",
#         "second_effect_text": "",
#         "illustrator": "mvthwus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1rb1mv.png",
#         "file_name": "",
#         "card_type": [
#           1005
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1003
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:52",
#           "full_time": "2023-06-25T18:52:52.346000"
#         },
#         "id": "64130de7b00a31a52c1b98bf",
#         "count": null
#       },
#       {
#         "name": "Black Claw Divide!!!",
#         "card_class": "Staunch",
#         "hero_id": "PM1",
#         "series_name": "PantheraMan//Nature//Brawler",
#         "card_number": 1004,
#         "enthusiasm": 17,
#         "effect_text": "<Target> Foe who has yet to go this round. //<1-5> Deal 1 damage. //<6-11> Deal 3 piercing damage. //<12+> Deal 4 piercing damage. The next player's Move(s) and Ending(s) gain damage minus 1 (damage dealt by those cards is reduced by 1 at the end of their resolutions).",
#         "second_effect_text": "",
#         "illustrator": "XIOLI",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g1pme.png",
#         "file_name": "i1g1pme",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:54",
#           "full_time": "2023-06-25T18:54:45.184000"
#         },
#         "id": "6413a730b00a31a52c1b9b47",
#         "count": null
#       },
#       {
#         "name": "Pitch - Swift Rending!!!",
#         "card_class": "Staunch",
#         "hero_id": "BW1",
#         "series_name": "Bone Whisperer//Mystic//Nature",
#         "card_number": 1012,
#         "enthusiasm": 15,
#         "effect_text": "<Target> Random foe. //<1-5> No effect. //<6-11> Deal 3 damage. Add 1 Event from the discard pile to your ownership. //<12+> Deal 3 piercing damage. Add 1 card and 1 Event from their respective discard piles to your hand/ownership.",
#         "second_effect_text": "",
#         "illustrator": "Ranbutam",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g3bwe.png",
#         "file_name": "i1g3bwe",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:08",
#           "full_time": "2023-06-25T19:08:58.859000"
#         },
#         "id": "6414223fb00a31a52c1ba01e",
#         "count": null
#       },
#       {
#         "name": "Power Channeling Unit ",
#         "card_class": "",
#         "hero_id": "BE1",
#         "series_name": "Burst Esper//Psychic//Energy",
#         "card_number": 1085,
#         "enthusiasm": 0,
#         "effect_text": "<Limited> Return 1 card from the discard pile to your hand.",
#         "second_effect_text": "Once per round, if a card in your play or ownership randomly chooses a foe(s) or card(s) at, you choose the target(s) instead. ",
#         "illustrator": "mo.moan",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1pl07bei.png",
#         "file_name": "i1pl07bei",
#         "card_type": [
#           1006
#         ],
#         "extra_effects": [
#           1003
#         ],
#         "reactions": [],
#         "card_tags": [
#           1004
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:13",
#           "full_time": "2023-06-25T19:13:03.569000"
#         },
#         "id": "64395ea73d6559427fc585ff",
#         "count": null
#       },
#       {
#         "name": "Robbing",
#         "card_class": "",
#         "hero_id": "H01",
#         "series_name": "Hive//Tech//Nature",
#         "card_number": 1096,
#         "enthusiasm": 0,
#         "effect_text": "Draw 2 cards, then 2 random foes draw 1 card.",
#         "second_effect_text": "<Critical> Steal 1 Pluck from a foe, then they draw 2 cards. Discard the Pluck at the end of your turn or when this Comeback is removed from your ownership.",
#         "illustrator": "layonsin.art",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1cb10h.png",
#         "file_name": "i1cb10h",
#         "card_type": [
#           1008
#         ],
#         "extra_effects": [
#           1002
#         ],
#         "reactions": [],
#         "card_tags": [
#           1000
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:20",
#           "full_time": "2023-06-25T19:20:28.752000"
#         },
#         "id": "644006d82e72274cabf63c06",
#         "count": null
#       },
#       {
#         "name": "Bolt Blossom",
#         "card_class": "Unity",
#         "hero_id": "BB1",
#         "series_name": "Bolt Blossom//Nature//Energy",
#         "card_number": 1045,
#         "enthusiasm": 0,
#         "effect_text": "Discard 1 card from your hand, then unfurl 4 cards. Add any Fighters with a class different to this card to your play and discard the other unfurled cards.",
#         "second_effect_text": "",
#         "illustrator": "Fililppo Scalisi",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1b4bbf.png",
#         "file_name": "i1b4bbf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [],
#         "reactions": [
#           1003
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:46",
#           "full_time": "2023-06-25T18:46:24.877000"
#         },
#         "id": "640cd72b5f6730657ad87285",
#         "count": null
#       },
#       {
#         "name": "Clustering!",
#         "card_class": "Unity",
#         "hero_id": "H01",
#         "series_name": "Hive//Tech//Nature",
#         "card_number": 1038,
#         "enthusiasm": 0,
#         "effect_text": "Your next Move targets the foes on your left and right instead for its first resolution.",
#         "second_effect_text": "<Trigger> At the start of the round, discard this Aura in your play; draw 2 cards.",
#         "illustrator": "layonsin.art",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1b2ha.png",
#         "file_name": "i1b2ha",
#         "card_type": [
#           1002
#         ],
#         "extra_effects": [
#           1001
#         ],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:20",
#           "full_time": "2023-06-25T19:20:05.610000"
#         },
#         "id": "644004b62e72274cabf63bdd",
#         "count": null
#       },
#       {
#         "name": "Bone Whisperer",
#         "card_class": "Staunch",
#         "hero_id": "BW1",
#         "series_name": "Bone Whisperer//Mystic//Nature",
#         "card_number": 1009,
#         "enthusiasm": 0,
#         "effect_text": "Resolve 1 of the following effects: //<> Discard up to 3 cards from your hand; gain 1 HP for each card discarded. //<>Discard 3 cards from your hand; unfurl 3 Pluck (reveal 3 cards from the top of the Pluck deck). Add 2 Pluck to your ownership and discard the other unfurled Pluck.",
#         "second_effect_text": "",
#         "illustrator": "Ranbutam",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g3bwf.png",
#         "file_name": "i1g3bwf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [],
#         "reactions": [
#           1001
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:08",
#           "full_time": "2023-06-25T19:08:52.534000"
#         },
#         "id": "6414212cb00a31a52c1b9ff9",
#         "count": null
#       },
#       {
#         "name": "Bone Whisperer",
#         "card_class": "Staunch",
#         "hero_id": "BW1",
#         "series_name": "Bone Whisperer//Mystic//Nature",
#         "card_number": 1009,
#         "enthusiasm": 0,
#         "effect_text": "Resolve 1 of the following effects: //<> Discard up to 3 cards from your hand; gain 1 HP for each card discarded. //<>Discard 3 cards from your hand; unfurl 3 Pluck (reveal 3 cards from the top of the Pluck deck). Add 2 Pluck to your ownership and discard the other unfurled Pluck.",
#         "second_effect_text": "",
#         "illustrator": "Ranbutam",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1g3bwf.png",
#         "file_name": "i1g3bwf",
#         "card_type": [
#           1001
#         ],
#         "extra_effects": [],
#         "reactions": [
#           1001
#         ],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:08",
#           "full_time": "2023-06-25T19:08:52.534000"
#         },
#         "id": "6414212cb00a31a52c1b9ff9",
#         "count": null
#       },
#       {
#         "name": "Burning Impact!!!",
#         "card_class": "Power",
#         "hero_id": "BM1",
#         "series_name": "Blast Mouth//Altered//Nature",
#         "card_number": 1020,
#         "enthusiasm": 6,
#         "effect_text": "<Target> Foe of your choice. //If you are last to go this round, ignore the reaction(s) of defending Fighter(s). //<1-5> Deal 4 damage. //<6-11> Deal 4 piercing damage. //<12+> Deal 5 piercing damage and 1 additional piercing damage if they have already gone this round.",
#         "second_effect_text": "",
#         "illustrator": "Znttus",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r1bme.png",
#         "file_name": "i1r1bme",
#         "card_type": [
#           1004
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1002,
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "19:12",
#           "full_time": "2023-06-25T19:12:24.353000"
#         },
#         "id": "643f56612e72274cabf638cc",
#         "count": null
#       },
#       {
#         "name": "Double Ki Charge!",
#         "card_class": "Power",
#         "hero_id": "RF1",
#         "series_name": "Red Fist//Tech//Brawler",
#         "card_number": 1022,
#         "enthusiasm": 0,
#         "effect_text": "Add 2 to your Focus and your Fighter gains 1 HP.  You can discard 1 Aura from your hand to resolve this effect one more time and your next Move gains damage plus 1.\n\n",
#         "second_effect_text": "",
#         "illustrator": "gmoshiro",
#         "picture_url": "https://playmakercards.s3.us-west-1.amazonaws.com/i1r2rfa.png",
#         "file_name": "i1r2rfa",
#         "card_type": [
#           1002
#         ],
#         "extra_effects": [],
#         "reactions": [],
#         "card_tags": [
#           1001
#         ],
#         "created_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 25,
#           "time": "18:44",
#           "full_time": "2023-06-25T18:44:06.985000"
#         },
#         "updated_on": {
#           "year": 2023,
#           "month": 6,
#           "day": 29,
#           "time": "23:40",
#           "full_time": "2023-06-29T23:40:23.964000"
#         },
#         "id": "643f54fe2e72274cabf638a1",
#         "count": null
#       }
#     ]
#   },
# full_pull_list = [
#     1065,
#     1070,
#     1062,
#     1021,
#     1114,
#     1070,
#     1009,
#     1090,
#     1109,
#     1121,
#     1029,
#     1065,
#     1093,
#     1017,
#     1084,
#     1093,
#     1110,
#     1091,
#     1112,
#     1077,
#     1061,
#     1113,
#     1066,
#     1102,
#     1084,
#     1105,
#     1099,
#     1036,
#     1051,
#     1088,
#     1051,
#     1068,
#     1061,
#     1065,
#     1035,
#     1052,
#     1124,
#     1011,
#     1016,
#     1117,
#     1112,
#     1009,
#     1068,
#     1041,
#     1065,
#     1023,
#     1019,
#     1114,
#     1062,
#     1019,
#     1090,
#     1058,
#     1104,
#     1073,
#     1055,
#     1065,
#     1052,
#     1021,
#     1093,
#     1001,
#     1087,
#     1058,
#     1089,
#     1002,
#     1113,
#     1020,
#     1066,
#     1052,
#     1069,
#     1037,
#     1045,
#     1012,
#     1126,
#     1043,
#     1034,
#     1050,
#     1020,
#     1066,
#     1053,
#     1105,
#     1099,
#     1014,
#     1108,
#     1089,
#     1028,
#     1013,
#     1020,
#     1060,
#     1066,
#     1105,
#     1037,
#     1040,
#     1001,
#     1093,
#     1101,
#     1109,
#     1010,
#     1113,
#     1100,
#     1065,
#     1004,
#     1012,
#     1085,
#     1096,
#     1045,
#     1038,
#     1009,
#     1009,
#     1020,
#     1022
# ]
# # }
# list1 = "abcdefghijklmnopqrstuvwxyz"

# print(full_pull_list[::-7])



# print(7010//26, 7010%26)
# print(chr(80))

# def convertNumtoLetters1(num, letters=""):
#     to_divide = 0
#     if num % 26 ==0:
#         to_divide = num//26
#     else:
#         to_divide = num//26
#         letters = chr(num%26 + 64) + letters
#     if to_divide > 26:
#         return convertNumtoLetters1(to_divide, letters=letters)
#     else:
#         letters = chr(to_divide + 64) + letters
#     return letters
# print(convertNumtoLetters1(28))


# def convertNumtoLetters2(num):
#     letters = ""
#     while num > 0:
#         remainder = (num - 1) % 26
#         letters = chr(65 + remainder) + letters
#         num = (num - 1) // 26
#     return letters

# print(convertNumtoLetters2(701))

# def plusOne(digits):
#     num = int("".join(map(str,digits))) + 1
#     return [int(num) for num in str(num)]

# print(plusOne([1,2,9]))

# token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZWEwNWNiNC05NzFjLTRkZGMtYmM2Mi0yNzQ5Mjg3ZWI0YWEiLCJleHAiOjE2OTMyNDg5ODYsInN1YiI6ImpvZ2dlcjgiLCJhY2NvdW50Ijp7ImlkIjoiNjRlYzNiODM4MmM1NzI5ZjBiMzZlMTU1IiwiZW1haWwiOiJqb2dzMm11Y2hAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkbzlZTW1DdmJFd21PZnQveXlPbEhrT0lVQ3RydzZhTWRnUmJmZ0R0SEVWZnhVSzFDM2NHZVciLCJ1c2VybmFtZSI6ImpvZ2dlcjgiLCJ1bmhhc2hlZF9wYXNzd29yZCI6InBhc3MiLCJjb2xsZWN0aW9uIjpudWxsLCJ3aXNobGlzdCI6bnVsbCwiZGVja3MiOm51bGwsInJvbGVzIjpbIm1lbWJlciJdfX0.d653wgIohKnMaziIDLfVbrNcmms-EJSs_oQ7pmh261I"
# token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNjc2YTJiMS1jODYzLTRiOWYtODNjMi05ODc1ZGQzOTBmODYiLCJleHAiOjE2OTMyNDkwODQsInN1YiI6ImpvZ2dlcjgiLCJhY2NvdW50Ijp7ImlkIjoiNjRlYzNiODM4MmM1NzI5ZjBiMzZlMTU1IiwiZW1haWwiOiJqb2dzMm11Y2hAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkbzlZTW1DdmJFd21PZnQveXlPbEhrT0lVQ3RydzZhTWRnUmJmZ0R0SEVWZnhVSzFDM2NHZVciLCJ1c2VybmFtZSI6ImpvZ2dlcjgiLCJ1bmhhc2hlZF9wYXNzd29yZCI6InBhc3MiLCJjb2xsZWN0aW9uIjpudWxsLCJ3aXNobGlzdCI6bnVsbCwiZGVja3MiOm51bGwsInJvbGVzIjpbIm1lbWJlciJdfX0.pkAVfjhhcuMqBmZWxJUT9i8_6rqux7sGP-PmKw93hHo",


# print(token1 == token2)


# string = "abcdefghijklmnopqrstuvwxyz"

# def jumble_string(string):
#     newString = (string[-1::2] + string[13:] + string[1::3]) +

    # for char in string:



# print(len("640cd72b5f6730657ad87285"), len("640935736b4d5881ee5633dc"), len("6409357e6b4d5881ee5633de") )

name = "Joe!"

pre_name = list(name)
var_name = ""
for char in pre_name:
    if char.isalnum():
        var_name += char
    elif char == " ":
        var_name += "_"

print(name)
print("pre_name: ", pre_name)
print("var_name: ", var_name)
