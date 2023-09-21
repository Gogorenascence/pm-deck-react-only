mongoimport --host mongodb --db cards --collection card_tags --file /data/card_tags.json --jsonArray
mongoimport --host mongodb --db cards --collection card_types --file /data/card_types.json --jsonArray
mongoimport --host mongodb --db cards --collection cards --file /data/cards.json --jsonArray
mongoimport --host mongodb --db cards --collection decks --file /data/decks.json --jsonArray
mongoimport --host mongodb --db cards --collection extra_effects --file /data/extra_effects.json --jsonArray
mongoimport --host mongodb --db cards --collection reactions --file /data/reactions.json --jsonArray
