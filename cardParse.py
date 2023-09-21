def cardParse(cards):
    for card in cards:
        del card["id"]
        print(card)
        print("\n")


cards = [
    {
        "name": "PantheraMan",
        "card_class": "Staunch",
        "hero_id": "PM1",
        "series_name": "PantheraMan",
        "card_number": 1001,
        "enthusiasm": 0,
        "effect_text": "Deal 2 damage to a foe who has yet to go this round. If you are first to go this round or you have the highest Enthusiasm, draw 1 Pluck and gain 2 HP.",
        "second_effect_text": None,
        "illustrator": "XIOLI",
        "picture_url": "https://kornan.dreamhosters.com/i1g1pmf/",
        "file_name": "string",
        "card_type": [
            "64079ed6b2b376b6cd0454f5"
        ],
        "extra_effects": [],
        "reactions": [
            "6407a0a9c503d0c6f5a33232"
        ],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6407a2c0c503d0c6f5a33235"
    },
    {
        "name": "Flamebell",
        "card_class": "Staunch",
        "hero_id": "FB1",
        "series_name": "Flamebell",
        "card_number": 1013,
        "enthusiasm": None,
        "effect_text": "Gain 2 HP, then all foes with a Power card(s) in their play and their Fighters take 1 damage.",
        "second_effect_text": "<Trigger> At the start of the round or when this card is revealed, all Power cards gain damage minus 1 (damage dealt by those cards is reduced by 1 at the end of their resolutions).",
        "illustrator": "XIOLI",
        "picture_url": "https://kornan.dreamhosters.com/i1g4fbf/",
        "file_name": "string",
        "card_type": [
            "64079ed6b2b376b6cd0454f5",
            "undefined"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [
            "6407a068c503d0c6f5a33231",
            "6407a0a9c503d0c6f5a33232"
        ],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6407a305c503d0c6f5a33236"
    },
    {
        "name": "Swift Guard!!",
        "card_class": "Staunch",
        "hero_id": "GW1",
        "series_name": "Golden Wall",
        "card_number": 1007,
        "enthusiasm": 0,
        "effect_text": "<Target> Foe on your left or right. <1-5> No effect. <6-11> Deal 2 damage. Damage you and your Fighter take this turn is reduced by 1. <12+> Deal 3 damage. Damage you and your Fighter take this turn is reduced by 1.\n\n",
        "second_effect_text": "<Trigger> If you are targeted for damage, resolve this Move in your play.",
        "illustrator": "Eric Rodrigues",
        "picture_url": "https://kornan.dreamhosters.com/i1g2gwm/",
        "file_name": "string",
        "card_type": [
            "6407a3bbc503d0c6f5a33238"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6407a351c503d0c6f5a33237"
    },
    {
        "name": "Formation of the Golden Wall!",
        "card_class": "Staunch",
        "hero_id": "GW1",
        "series_name": "Golden Wall",
        "card_number": 1006,
        "enthusiasm": 0,
        "effect_text": "Gain 2 HP.",
        "second_effect_text": "<Trigger> If you are targeted for damage, your Fighter gains Block 1 (that card is revealed).",
        "illustrator": "Eric Rodrigues",
        "picture_url": "https://kornan.dreamhosters.com/i1g2gwa/",
        "file_name": "string",
        "card_type": [
            "6407bb289b4fb23f5ddab698"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6407ad1b5139f66679d6ac55"
    },
    {
        "name": "Battle Girl Alice",
        "card_class": "Power",
        "hero_id": "BGA",
        "series_name": "Battle Girl Alice",
        "card_number": 1029,
        "enthusiasm": 0,
        "effect_text": "This card gains Counter 1.",
        "second_effect_text": "<Trigger> If you defend with this card, Counter damage this card deals is treated as bypassing damage (once only).",
        "illustrator": "mo.moan",
        "picture_url": "https://kornan.dreamhosters.com/i1r4bgaf/",
        "file_name": "string",
        "card_type": [
            "64079ed6b2b376b6cd0454f5"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [
            "6407a068c503d0c6f5a33231",
            "6407a068c503d0c6f5a33231"
        ],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6407d2c3a777df7381b6d87a"
    },
    {
        "name": "Golden Wall",
        "card_class": "Staunch",
        "hero_id": "GW1",
        "series_name": "Golden Wall",
        "card_number": 1005,
        "enthusiasm": 0,
        "effect_text": "<Trigger> At the start of the round or when this card is revealed, draw 1 card and this card gains 2 HP.",
        "second_effect_text": "<Critical> Deal 1 damage to a random foe each time you resolve a Staunch card or a Fighter defends this turn (excluding defending against this card’s effect).",
        "illustrator": "Eric Rodrigues",
        "picture_url": "https://kornan.dreamhosters.com/i1g2gwf/",
        "file_name": "string",
        "card_type": [
            "64079ed6b2b376b6cd0454f5"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6",
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [
            "64079f9fb2b376b6cd0454f8"
        ],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "640935736b4d5881ee5633dc"
    },
    {
        "name": "Gold Frag",
        "card_class": "string",
        "hero_id": "GW1",
        "series_name": "Golden Wall",
        "card_number": 1069,
        "enthusiasm": 0,
        "effect_text": "Your Fighter(s) gains 1 HP when they are revealed.",
        "second_effect_text": "<Trigger> If you resolve the trigger effect of a Staunch card in your play, deal 2 damage to a random foe.",
        "illustrator": "Eric Rodrigues",
        "picture_url": "https://kornan.dreamhosters.com/i1pl02gwi/",
        "file_name": "string",
        "card_type": [
            "64108dee159c81c7afebd104",
            "640ce41c5f6730657ad8739f"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6",
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [],
        "card_tags": [
            "64124686d762a869c0b2e12d"
        ],
        "id": "640935786b4d5881ee5633dd"
    },
    {
        "name": "Double Wall Blowback!!!",
        "card_class": "Staunch",
        "hero_id": "GW1",
        "series_name": "Golden Wall",
        "card_number": 1008,
        "enthusiasm": 7,
        "effect_text": "<Target> Foes on your left and right. <1-5> Deal 2 damage. <6-11> Deal 3 damage and if either target has a defending Fighter, deal 1 bypassing damage to them. <12+> Deal 3 damage and if either target has a defending Fighter, they both take 1 damage.",
        "second_effect_text": "<Trigger> If this card is discarded from your hand or play,  your Fighter gains 2 HP (that card is revealed).",
        "illustrator": "Eric Rodrigues",
        "picture_url": "https://kornan.dreamhosters.com/i1g2gwe/",
        "file_name": "string",
        "card_type": [
            "640ce41c5f6730657ad8739f"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6409357e6b4d5881ee5633de"
    },
    {
        "name": "New Foundation",
        "card_class": "",
        "hero_id": "GW1",
        "series_name": "Golden Wall",
        "card_number": 1108,
        "enthusiasm": 0,
        "effect_text": "<Trigger> If you resolve a trigger effect, gain 1 HP.",
        "second_effect_text": "<Critical> Gain 2 HP.",
        "illustrator": "Eric Rodrigues",
        "picture_url": "https://kornan.dreamhosters.com/i1cb2gw/",
        "file_name": "string",
        "card_type": [
            "64108db9159c81c7afebd103"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6",
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [],
        "card_tags": [
            "641292cf38b70f477bb72e6f"
        ],
        "id": "640935836b4d5881ee5633df"
    },
    {
        "name": "Hive",
        "card_class": "Unity",
        "hero_id": "H01",
        "series_name": "Hive",
        "card_number": 1037,
        "enthusiasm": None,
        "effect_text": "Draw 1 Pluck and reveal it; apply the following effects based on the Pluck revealed: <Item> Add 1 Move or MAX VARIABLE from your hand to your play (MAX VARIABLE counts as an Move). <Event> Reset 1 of your Pluck. <Comeback> Add 1 Aura, Move or MAX VARIABLE from the discard pile to your hand.",
        "second_effect_text": None,
        "illustrator": "layonsin",
        "picture_url": "https://kornan.dreamhosters.com/i1b2hf/",
        "file_name": "string",
        "card_type": [
            "64079ed6b2b376b6cd0454f5"
        ],
        "extra_effects": [],
        "reactions": [
            "6407a068c503d0c6f5a33231",
            "6407a068c503d0c6f5a33231"
        ],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "640a269cce45290634774874"
    },
    {
        "name": "Trance State!",
        "card_class": "Power",
        "hero_id": "BE1",
        "series_name": "Burst Esper",
        "card_number": 1026,
        "enthusiasm": 0,
        "effect_text": "Discard up to 3 cards from your hand, then add 1 to your Focus for each card discarded. If you discarded 3 cards, resolve 1 of those discarded cards as if it was in your play.",
        "second_effect_text": "<Trigger> If this card is discarded from your hand or play, deal 2 damage to a random foe.",
        "illustrator": "mo.moan",
        "picture_url": "https://kornan.dreamhosters.com/i1r3bea/",
        "file_name": "string",
        "card_type": [
            "6407bb289b4fb23f5ddab698"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "640b9f828e4a61dcf4e46dc3"
    },
    {
        "name": "Bolt Blossom",
        "card_class": "Unity",
        "hero_id": "BB1",
        "series_name": "Bolt Blossom",
        "card_number": 1045,
        "enthusiasm": 0,
        "effect_text": "Discard 1 card from your hand, then unfurl 4 cards. Add any Fighters with a class different to this card to your play and discard the other unfurled cards.",
        "second_effect_text": "",
        "illustrator": "Fililppo Scalisi",
        "picture_url": "https://kornan.dreamhosters.com/i1b4bbf/",
        "file_name": "string",
        "card_type": [
            "64079ed6b2b376b6cd0454f5"
        ],
        "extra_effects": [],
        "reactions": [
            "6407a0a9c503d0c6f5a33232"
        ],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "640cd72b5f6730657ad87285"
    },
    {
        "name": "Sparking Rainbow Flower Frenzy!!!",
        "card_class": "Unity",
        "hero_id": "BB1",
        "series_name": "Bolt Blossom",
        "card_number": 1048,
        "enthusiasm": 12,
        "effect_text": "Target: Strongest foe. Add 1 to your Focus for each different class in your play. <1-5> Deal 1 damage for each class in your play. <6-11> Deal 2 damage for each class in your play. <12+> Deal 3 damage for each class in your play. Ignore the reaction(s) of defending Fighter(s).",
        "second_effect_text": "",
        "illustrator": "Fililppo Scalisi",
        "picture_url": "https://kornan.dreamhosters.com/i1b4bbe/",
        "file_name": "string",
        "card_type": [
            "640ce41c5f6730657ad8739f"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "640ce3485f6730657ad8738d"
    },
    {
        "name": "Taxonomy Above All Orders",
        "card_class": "",
        "hero_id": "BB1",
        "series_name": "Bolt Blossom",
        "card_number": 1090,
        "enthusiasm": 0,
        "effect_text": "Apply the following effects based on each different class in your play (you can only apply each effect once): <Staunch> Gain 2 HP and add 2 to your Focus. <Power> Deal 2 damage to a foe. <Unity> Reset 1 of your Pluck (you can resolve the extra effects of 1 Pluck one more time this round). <Canny> Gain 1 Comeback.",
        "second_effect_text": "",
        "illustrator": "Fililppo Scalisi",
        "picture_url": "https://kornan.dreamhosters.com/i1pl12bbe/",
        "file_name": "string",
        "card_type": [
            "640ce4bf5f6730657ad873be"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "640ce5e85f6730657ad873cb"
        ],
        "id": "640ce5705f6730657ad873bf"
    },
    {
        "name": "Side Step Counter!!",
        "card_class": "Power",
        "hero_id": "BGA",
        "series_name": "Battle Girl Alice",
        "card_number": 1031,
        "enthusiasm": 0,
        "effect_text": "<Target> Foe on your right. <1-5> Remove 1 reaction token from your Fighter. <6-11> Deal 2 damage. Your Fighter gains Counter 1. <12+> Deal 2 bypassing damage. Your Fighter gains Counter 1.",
        "second_effect_text": "",
        "illustrator": "mo.moan",
        "picture_url": "https://kornan.dreamhosters.com/i1r4bgam/",
        "file_name": "",
        "card_type": [
            "6407a3bbc503d0c6f5a33238"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "640fa56627a3b154a88df42b"
    },
    {
        "name": "Spinning Swallow Tail Deathblow!!!",
        "card_class": "Power",
        "hero_id": "BGA",
        "series_name": "Battle Girl Alice",
        "card_number": 1032,
        "enthusiasm": 19,
        "effect_text": "<Target> Foe on your left. <1-5> Remove 2 reaction tokens from your Fighter. <6-11> Deal 2 damage. Your Fighter gains Redirect 1. <12+> Deal 2 bypassing damage. Your Fighter gains Redirect 1.",
        "second_effect_text": "",
        "illustrator": "mo.moan",
        "picture_url": "https://kornan.dreamhosters.com/i1r4bgae/",
        "file_name": "",
        "card_type": [
            "640ce41c5f6730657ad8739f"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "640fa9ec27a3b154a88df432"
    },
    {
        "name": "Battle Girl Transformation!",
        "card_class": "Power",
        "hero_id": "BGA",
        "series_name": "Battle Girl Alice",
        "card_number": 1030,
        "enthusiasm": 0,
        "effect_text": "Resolve 1 of the following effects. If you have yet to deal damage this round, resolve 2 different effects instead: <> Your Fighter gains Counter 1. <> Take 2 damage, then your Fighter gains 2 HP. <> Draw 1 Pluck.",
        "second_effect_text": "",
        "illustrator": "mo.moan",
        "picture_url": "https://kornan.dreamhosters.com/i1r4bgaa/",
        "file_name": "",
        "card_type": [
            "6407bb289b4fb23f5ddab698"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "641098bd159c81c7afebd106"
    },
    {
        "name": "Double Combatants!",
        "card_class": "Unity",
        "hero_id": "DW1",
        "series_name": "Project HERMES",
        "card_number": 1034,
        "enthusiasm": 0,
        "effect_text": "Draw 1 card. If you have a Fighter in your play, it is now defending. Add 1 Fighter from your hand to your play.",
        "second_effect_text": "",
        "illustrator": "Undeadsushii",
        "picture_url": "https://kornan.dreamhosters.com/i1b1dwa/",
        "file_name": "",
        "card_type": [
            "6407bb289b4fb23f5ddab698"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "64109f06159c81c7afebd119"
    },
    {
        "name": "Dual Wing Strike!!",
        "card_class": "Unity",
        "hero_id": "DW1",
        "series_name": "Project HERMES",
        "card_number": 1035,
        "enthusiasm": 0,
        "effect_text": "<Target> Your strongest foe. <1-5> Deal 2 damage. <6-11> Deal 2 damage. Draw 1 card. <12+> Deal 2 damage plus 1 additional damage for each card in your play past 4. Add 1 Unity card from the discard pile to your hand.",
        "second_effect_text": "",
        "illustrator": "Undeadsushii",
        "picture_url": "https://kornan.dreamhosters.com/i1b1dwm/",
        "file_name": "",
        "card_type": [
            "6407a3bbc503d0c6f5a33238"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6410a48cb100cf99372ee885"
    },
    {
        "name": "Jet and Climber",
        "card_class": "Unity",
        "hero_id": "DW1",
        "series_name": "Project HERMES",
        "card_number": 1033,
        "enthusiasm": 0,
        "effect_text": "Add 1 Move from your hand to your play. Draw 1 card and reveal it; if the card is a Move or MAX VARIABLE, add it to your play (MAX VARIABLE counts as a Move).\n\n\n",
        "second_effect_text": "",
        "illustrator": "Undeadsushii",
        "picture_url": "https://kornan.dreamhosters.com/i1b1dwf/",
        "file_name": "",
        "card_type": [
            "64079ed6b2b376b6cd0454f5"
        ],
        "extra_effects": [],
        "reactions": [
            "6407a0a9c503d0c6f5a33232"
        ],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6410a5fabaeb0bbfb51492b3"
    },
    {
        "name": "Dive Bomb Finisher!!!",
        "card_class": "Unity",
        "hero_id": "DW1",
        "series_name": "Project HERMES",
        "card_number": 1036,
        "enthusiasm": 20,
        "effect_text": "<Target> Your weakest foe. <1-5> Deal 1 damage. <6-11> Deal 3 damage. <12+> Deal 1 damage for each card in your play. Return 1 other card in your play to your hand.\n\n\n",
        "second_effect_text": "",
        "illustrator": "Undeadsushii",
        "picture_url": "https://kornan.dreamhosters.com/i1b1dwe/",
        "file_name": "",
        "card_type": [
            "640ce41c5f6730657ad8739f"
        ],
        "extra_effects": [],
        "reactions": [
            "6407a0a9c503d0c6f5a33232"
        ],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6410aaa0baeb0bbfb51492ba"
    },
    {
        "name": "Healing Backfire!!",
        "card_class": "Staunch",
        "hero_id": "FB1",
        "series_name": "Flamebell",
        "card_number": 1015,
        "enthusiasm": 0,
        "effect_text": "Deal 3 damage to a foe.",
        "second_effect_text": "<Trigger>  If you take damage, gain 2 HP and deal 3 damage to all foes with a Power card(s) in their play.\n\n",
        "illustrator": "XIOLI",
        "picture_url": "https://kornan.dreamhosters.com/i1g4fbm",
        "file_name": "",
        "card_type": [
            "6407a3bbc503d0c6f5a33238"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6410c90e478149e0847e243b"
    },
    {
        "name": "Thermodynamic Break!!!",
        "card_class": "Power",
        "hero_id": "BE1",
        "series_name": "Burst Esper",
        "card_number": 1028,
        "enthusiasm": 13,
        "effect_text": "<Target> All foes with a larger hand than you (damage is calculated separately for each target). <1-5> Deal 3 damage. <6-11> Deal damage equal to the difference. Draw 1 card. <12+> Deal damage equal to the difference plus 2. Ignore the reaction(s) of defending Fighter(s). Draw 2 cards.",
        "second_effect_text": "",
        "illustrator": "mo.moan",
        "picture_url": "https://kornan.dreamhosters.com/i1r3bee/",
        "file_name": "",
        "card_type": [
            "640ce41c5f6730657ad8739f"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6412232fd762a869c0b2e0b5"
    },
    {
        "name": "“Get Behind Me!”",
        "card_class": "",
        "hero_id": "GW1",
        "series_name": "Golden Wall",
        "card_number": 1070,
        "enthusiasm": 0,
        "effect_text": "<Trigger> If you are targeted for damage and your Fighter has 3 or less HP, add 1 card from your hand to your play. The added card takes the damage instead (this does not count as defending). If the card added was a Staunch Fighter, resolve its main effect.",
        "second_effect_text": "",
        "illustrator": "Eric Rodrigues",
        "picture_url": "https://kornan.dreamhosters.com/i1pl02gwe/",
        "file_name": "",
        "card_type": [
            "640ce4bf5f6730657ad873be"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6",
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [],
        "card_tags": [
            "640ce5e85f6730657ad873cb"
        ],
        "id": "6412927438b70f477bb72e68"
    },
    {
        "name": "MAX VARIABLE",
        "card_class": "",
        "hero_id": "MV1",
        "series_name": "MAX VARIABLE",
        "card_number": 1065,
        "enthusiasm": 0,
        "effect_text": "Unfurl 4 cards (reveal 4 cards from the top of the Main deck). Add 1 card that matches the type MAX VARIABLE is replacing to your play and add 2 of the other unfurled cards to your hand. Discard MAX VARIABLE and the last unfurled card.",
        "second_effect_text": "",
        "illustrator": "mvthwus",
        "picture_url": "https://kornan.dreamhosters.com/i1rb1mv/",
        "file_name": "",
        "card_type": [
            "64108e0e159c81c7afebd105"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407ac305139f66679d6ac54"
        ],
        "id": "64130de7b00a31a52c1b98bf"
    },
    {
        "name": "MAX VARIABLE #2",
        "card_class": "",
        "hero_id": "MV1",
        "series_name": "MAX VARIABLE",
        "card_number": 1066,
        "enthusiasm": 0,
        "effect_text": "                \nUnfurl 2 cards (reveal 2 cards from the top of the Main deck). Add 1 to your play and discard the other. If the added card matches the type MAX VARIABLE is replacing, draw 1 Pluck. Discard MAX VARIABLE.",
        "second_effect_text": "",
        "illustrator": "Dalfovo",
        "picture_url": "https://kornan.dreamhosters.com/i1rb1mvn2/",
        "file_name": "",
        "card_type": [
            "64108e0e159c81c7afebd105"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407ac305139f66679d6ac54"
        ],
        "id": "64130eabb00a31a52c1b98d6"
    },
    {
        "name": "\"MAX VARIABLE!!\"",
        "card_class": "",
        "hero_id": "MV1",
        "series_name": "MAX VARIABLE",
        "card_number": 1100,
        "enthusiasm": 0,
        "effect_text": "Discard 2 cards from your hand; add MAX VARIABLEs from the discard pile to your play until you have 4 cards in your play (max of 2). If all cards in your play are MAX VARIABLE, draw 1 Pluck and add 4 to your Focus.",
        "second_effect_text": "",
        "illustrator": "Dalfovo",
        "picture_url": "https://kornan.dreamhosters.com/i1plg2eb",
        "file_name": "",
        "card_type": [
            "640ce4bf5f6730657ad873be"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "640ce5e85f6730657ad873cb"
        ],
        "id": "641312a7b00a31a52c1b9943"
    },
    {
        "name": "Max Variable’s Variable Box",
        "card_class": "",
        "hero_id": "MV1",
        "series_name": "MAX VARIABLE",
        "card_number": 1099,
        "enthusiasm": 0,
        "effect_text": "                \nOnce per round, if a MAX VARIABLE(s) in any play resolves, roll a die and apply 1 of the following effects based on the result:<1> Gain 1 HP. <2-3> 1 random card in your play gains damage plus 1. <4-5> Discard 1 card from your hand; draw 1 Pluck. <6> Deal 2 damage to all foes, then discard this Item. Discard this Item after the fourth round of use.",
        "second_effect_text": "",
        "illustrator": "mvthwus",
        "picture_url": "https://kornan.dreamhosters.com/i1plg1i",
        "file_name": "",
        "card_type": [
            "64108dee159c81c7afebd104"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "64124686d762a869c0b2e12d"
        ],
        "id": "64133bbbb00a31a52c1b9ad0"
    },
    {
        "name": "Boisterous Call!",
        "card_class": "Staunch",
        "hero_id": "PM1",
        "series_name": "PantheraMan",
        "card_number": 1002,
        "enthusiasm": 0,
        "effect_text": "Gain 1 HP and add 4 to your Focus.",
        "second_effect_text": "<Trigger> At the start of the round, add 4 to your Enthusiasm and resolve this Aura in your play.",
        "illustrator": "XIOLI",
        "picture_url": "https://kornan.dreamhosters.com/i1g1pma",
        "file_name": "",
        "card_type": [
            "6407bb289b4fb23f5ddab698"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6413a629b00a31a52c1b9b13"
    },
    {
        "name": "Feasting Claw!!",
        "card_class": "Staunch",
        "hero_id": "PM1",
        "series_name": "PantheraMan",
        "card_number": 1003,
        "enthusiasm": 0,
        "effect_text": "Deal 2 damage to a foe and gain 1 HP. If you are first to go this round or have the highest Enthusiasm, deal 2 additional damage and gain 1 HP.",
        "second_effect_text": "",
        "illustrator": "XIOLI",
        "picture_url": "https://kornan.dreamhosters.com/i1g1pmm",
        "file_name": "",
        "card_type": [
            "6407a3bbc503d0c6f5a33238"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6413a6a7b00a31a52c1b9b32"
    },
    {
        "name": "Black Claw Divide!!!",
        "card_class": "Staunch",
        "hero_id": "PM1",
        "series_name": "PantheraMan",
        "card_number": 1004,
        "enthusiasm": 17,
        "effect_text": "<Target> Foe who has yet to go this round. <1-5> Deal 1 damage. <6-11> Deal 3 piercing damage. <12+> Deal 4 piercing damage. The next player's Move(s) and Ending(s) gain damage minus 1 (damage dealt by those cards is reduced by 1 at the end of their resolutions).",
        "second_effect_text": "",
        "illustrator": "XIOLI",
        "picture_url": "https://kornan.dreamhosters.com/i1g1pme",
        "file_name": "",
        "card_type": [
            "640ce41c5f6730657ad8739f"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6413a730b00a31a52c1b9b47"
    },
    {
        "name": "Black Note",
        "card_class": "Canny",
        "hero_id": "BN1",
        "series_name": "Black Note",
        "card_number": 1049,
        "enthusiasm": 0,
        "effect_text": "All players and their Fighters take 1 damage. Add 3 to your Focus.",
        "second_effect_text": "<Trigger> At the start of the round or when this card is revealed, damage you and this card take is reduced by 1.\n\n\n",
        "illustrator": "ahtan_delmundo",
        "picture_url": "https://kornan.dreamhosters.com/i1p1bnf",
        "file_name": "",
        "card_type": [
            "64079ed6b2b376b6cd0454f5"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6",
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [
            "6407a068c503d0c6f5a33231",
            "6407a068c503d0c6f5a33231"
        ],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6413a82fb00a31a52c1b9b6e"
    },
    {
        "name": "Debilitating Sound!",
        "card_class": "Canny",
        "hero_id": "BN1",
        "series_name": "Black Note",
        "card_number": 1050,
        "enthusiasm": 0,
        "effect_text": "All players discard 1 Move from their play. If your play did not have a Move before the resolution of this card's effect, resolve 1 of the discarded Moves as this card's effect.",
        "second_effect_text": "",
        "illustrator": "ahtan_delmundo",
        "picture_url": "https://kornan.dreamhosters.com/i1p1bna",
        "file_name": "",
        "card_type": [
            "6407bb289b4fb23f5ddab698"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6413aa1bb00a31a52c1b9bb1"
    },
    {
        "name": "Super Sonic Riff!!",
        "card_class": "Canny",
        "hero_id": "BN1",
        "series_name": "Black Note",
        "card_number": 1051,
        "enthusiasm": 0,
        "effect_text": "Deal 3 damage to a random foe and you take 2 damage.",
        "second_effect_text": "<Trigger> At the start of the round, resolve this Move in your play, then discard it. ",
        "illustrator": "ahtan_delmundo",
        "picture_url": "https://kornan.dreamhosters.com/i1p1bnm",
        "file_name": "",
        "card_type": [
            "6407a3bbc503d0c6f5a33238"
        ],
        "extra_effects": [
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6413aa91b00a31a52c1b9bc8"
    },
    {
        "name": "Max Reverb!!!",
        "card_class": "Canny",
        "hero_id": "BN1",
        "series_name": "Black Note",
        "card_number": 1052,
        "enthusiasm": 5,
        "effect_text": "<Target> All foes. If you are at 8 HP or less, add 3 to your Focus. <1-5> Deal 2 piercing damage. Take 4 damage. <6-11> Deal 3 piercing damage. Take 3 damage. <12+> Deal 4 piercing damage and ignore the reaction(s) of defending Fighter(s). Take 2 damage.",
        "second_effect_text": "",
        "illustrator": "ahtan_delmundo",
        "picture_url": "https://kornan.dreamhosters.com/i1p1bne",
        "file_name": "",
        "card_type": [
            "640ce41c5f6730657ad8739f"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6413ab47b00a31a52c1b9be7"
    },
    {
        "name": "Gravity Enforcer",
        "card_class": "Canny",
        "hero_id": "GE1",
        "series_name": "Gravity Enforcer",
        "card_number": 1061,
        "enthusiasm": 0,
        "effect_text": "Foes with Enthusiasm lower than yours can not use reactions. Deal 2 damage to the foe with the lowest Enthusiasm.",
        "second_effect_text": "<Trigger> At the start of the round or when this card is revealed, lower the Enthusiasm of all foes by 4.",
        "illustrator": "betomirandaart2",
        "picture_url": "https://kornan.dreamhosters.com/i1p4gef",
        "file_name": "",
        "card_type": [
            "64079ed6b2b376b6cd0454f5"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [
            "64079f9fb2b376b6cd0454f8"
        ],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6413ac2fb00a31a52c1b9c06"
    },
    {
        "name": "Heavy Aura!",
        "card_class": "Canny",
        "hero_id": "GE1",
        "series_name": "Gravity Enforcer",
        "card_number": 1062,
        "enthusiasm": 0,
        "effect_text": "All foes with Enthusiasm lower than yours take 1 damage after resolving the effect of their Move(s).",
        "second_effect_text": "<Trigger> At the start of the round, lower the Enthusiasm of all foes by 4.",
        "illustrator": "betomirandaart2",
        "picture_url": "https://kornan.dreamhosters.com/i1p4gea",
        "file_name": "",
        "card_type": [
            "6407bb289b4fb23f5ddab698"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6413ad2bb00a31a52c1b9c3d"
    },
    {
        "name": "Heavy Radius!!",
        "card_class": "Canny",
        "hero_id": "GE1",
        "series_name": "Gravity Enforcer",
        "card_number": 1063,
        "enthusiasm": 0,
        "effect_text": "Trigger effects can not be used in response to this card. Deal 3 damage to a foe with Enthusiasm lower than yours. They can not use Items or trigger effects during the next player's turn. ",
        "second_effect_text": "",
        "illustrator": "betomirandaart2",
        "picture_url": "https://kornan.dreamhosters.com/i1p4gem",
        "file_name": "",
        "card_type": [
            "6407a3bbc503d0c6f5a33238"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6413adb6b00a31a52c1b9c58"
    },
    {
        "name": "Infinity Mass Press!!!",
        "card_class": "Canny",
        "hero_id": "GE1",
        "series_name": "Gravity Enforcer",
        "card_number": 1064,
        "enthusiasm": 14,
        "effect_text": "Reduce the Focus of all foes by 3.",
        "second_effect_text": "<Target> Foe with Enthusiasm lower than yours. <1-5> No effect. <6-11> Deal 3 damage. <12+> Deal damage equal to the difference (max of 6).",
        "illustrator": "betomirandaart2",
        "picture_url": "https://kornan.dreamhosters.com/i1p4gee",
        "file_name": "",
        "card_type": [
            "640ce41c5f6730657ad8739f"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6413b79db00a31a52c1b9c77"
    },
    {
        "name": "Super Panther Claw",
        "card_class": "",
        "hero_id": "PM1",
        "series_name": "PantheraMan",
        "card_number": 1067,
        "enthusiasm": 0,
        "effect_text": "<Limited> Gain 2 HP.",
        "second_effect_text": "Discard this item; deal 2 piercing damage to a foe who has yet to go this round.",
        "illustrator": "XIOLI",
        "picture_url": "https://kornan.dreamhosters.com/i1pl01pmi",
        "file_name": "",
        "card_type": [
            "64108dee159c81c7afebd104"
        ],
        "extra_effects": [
            "6407aaae5139f66679d6ac52"
        ],
        "reactions": [],
        "card_tags": [
            "64124686d762a869c0b2e12d"
        ],
        "id": "6413b968b00a31a52c1b9c96"
    },
    {
        "name": "A Hero’s Entrance",
        "card_class": "",
        "hero_id": "PM1",
        "series_name": "PantheraMan",
        "card_number": 1068,
        "enthusiasm": None,
        "effect_text": "Your Fighter(s) gains damage plus 1 if it deals damage to a defending Fighter (that card deals 1 additional damage at the end of its resolution).",
        "second_effect_text": "<C.Trigger> At the start of the round, you go first.",
        "illustrator": "XIOLI",
        "picture_url": "https://kornan.dreamhosters.com/i1pl01pme",
        "file_name": "",
        "card_type": [
            "640ce4bf5f6730657ad873be"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6",
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [],
        "card_tags": [
            "640ce5e85f6730657ad873cb"
        ],
        "id": "6413ba34b00a31a52c1b9cbf"
    },
    {
        "name": "Rallying Cry",
        "card_class": "",
        "hero_id": "PM1",
        "series_name": "PantheraMan",
        "card_number": 1107,
        "enthusiasm": None,
        "effect_text": "This Comeback counts as a Staunch card in your play (this does not count towards play size).",
        "second_effect_text": "<C.Trigger> At the start of the round or during a foe’s turn, add 8 to your Enthusiasm.",
        "illustrator": "XIOLI",
        "picture_url": "https://kornan.dreamhosters.com/i1cb1pm",
        "file_name": "",
        "card_type": [
            "64108db9159c81c7afebd103"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6",
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [],
        "card_tags": [
            "641292cf38b70f477bb72e6f"
        ],
        "id": "6413bac7b00a31a52c1b9ce6"
    },
    {
        "name": "Experimental Dual Mode Thruster",
        "card_class": "",
        "hero_id": "DW1",
        "series_name": "Project HERMES",
        "card_number": 1083,
        "enthusiasm": None,
        "effect_text": "<Trigger> At the start of the round, discard 1 card from your hand; resolve one of the following effects: <> Add 3 to your Focus this round. <> Add 3 to your Enthusiasm this round.",
        "second_effect_text": "Discard this Item after the third round of use.",
        "illustrator": "Undeadsushii",
        "picture_url": "https://kornan.dreamhosters.com/i1pl09dwi",
        "file_name": "",
        "card_type": [
            "64108dee159c81c7afebd104"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [],
        "card_tags": [
            "64124686d762a869c0b2e12d"
        ],
        "id": "6413bba6b00a31a52c1b9d09"
    },
    {
        "name": "Project HERMES",
        "card_class": "",
        "hero_id": "DW1",
        "series_name": "Project HERMES",
        "card_number": 1084,
        "enthusiasm": None,
        "effect_text": "Add 1 of the following from their respective discard piles to your hand/ownership: <>Up to 2 cards and 1 Pluck in the Project series except Project HERMES. <>2 Unity cards. <>1 MAX VARIABLE and 1 Item.",
        "second_effect_text": "",
        "illustrator": "Undeadsushii",
        "picture_url": "https://kornan.dreamhosters.com/i1pl09dwe",
        "file_name": "",
        "card_type": [
            "640ce4bf5f6730657ad873be"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "640ce5e85f6730657ad873cb"
        ],
        "id": "6413bc36b00a31a52c1b9d24"
    },
    {
        "name": "The Survey Crew",
        "card_class": "",
        "hero_id": "DW1",
        "series_name": "Project HERMES",
        "card_number": 1115,
        "enthusiasm": None,
        "effect_text": "This Comeback counts as a Unity card in your play (this does not count towards play size).",
        "second_effect_text": "<Critical> Return 1 card from the discard pile to the top of the Main deck.",
        "illustrator": "Undeadsushii",
        "picture_url": "https://kornan.dreamhosters.com/i1cb9dw",
        "file_name": "",
        "card_type": [
            "64108db9159c81c7afebd103"
        ],
        "extra_effects": [
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [],
        "card_tags": [
            "641292cf38b70f477bb72e6f"
        ],
        "id": "6413bcb1b00a31a52c1b9d3b"
    },
    {
        "name": "Earplugs",
        "card_class": "",
        "hero_id": "BN1",
        "series_name": "Black Note",
        "card_number": 1091,
        "enthusiasm": None,
        "effect_text": "<Limited> Add 3 to your Focus.",
        "second_effect_text": "Once per round, if you or your defending Fighter would take damage from a reaction or self inflicted damage, reduce that damage by 2.",
        "illustrator": "ahtan_delmundo",
        "picture_url": "https://kornan.dreamhosters.com/i1pl13bni",
        "file_name": "",
        "card_type": [
            "64108dee159c81c7afebd104"
        ],
        "extra_effects": [
            "6407aaae5139f66679d6ac52"
        ],
        "reactions": [],
        "card_tags": [
            "64124686d762a869c0b2e12d"
        ],
        "id": "6413bd2cb00a31a52c1b9d5a"
    },
    {
        "name": "“1..2..3..”",
        "card_class": "",
        "hero_id": "BN1",
        "series_name": "Black Note",
        "card_number": 1092,
        "enthusiasm": None,
        "effect_text": "All players discard cards from their plays until they have 3 or less cards, then deal 2 damage to all players that discarded card(s) from their play. ",
        "second_effect_text": "<Critical> All foes and their Fighters take 1 damage.",
        "illustrator": "ahtan_delmundo",
        "picture_url": "https://kornan.dreamhosters.com/i1pl13bne",
        "file_name": "",
        "card_type": [
            "640ce4bf5f6730657ad873be"
        ],
        "extra_effects": [
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [],
        "card_tags": [
            "640ce5e85f6730657ad873cb"
        ],
        "id": "6413bdabb00a31a52c1b9d79"
    },
    {
        "name": "Tuning",
        "card_class": "",
        "hero_id": "BN1",
        "series_name": "Black Note",
        "card_number": 1119,
        "enthusiasm": None,
        "effect_text": "This Comeback counts as a Canny card in your play (this does not count towards play size).",
        "second_effect_text": "<Critical> Add 3 to your Focus.",
        "illustrator": "ahtan_delmundo",
        "picture_url": "https://kornan.dreamhosters.com/i1cb13bn",
        "file_name": "",
        "card_type": [
            "64108db9159c81c7afebd103"
        ],
        "extra_effects": [
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [],
        "card_tags": [
            "641292cf38b70f477bb72e6f"
        ],
        "id": "6413be4fb00a31a52c1b9d98"
    },
    {
        "name": "Gravity Patrol Badge",
        "card_class": "",
        "hero_id": "GE1",
        "series_name": "Gravity Enforcer",
        "card_number": 1097,
        "enthusiasm": None,
        "effect_text": "<L.Trigger> During a foe's turn, card effects can not be resolved more than once this round.",
        "second_effect_text": "Lower the Enthusiasm of all foes by 2.",
        "illustrator": "betomirandaart2",
        "picture_url": "https://kornan.dreamhosters.com/i1pl16gei",
        "file_name": "",
        "card_type": [
            "64108dee159c81c7afebd104"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6",
            "6407aaae5139f66679d6ac52"
        ],
        "reactions": [],
        "card_tags": [
            "64124686d762a869c0b2e12d"
        ],
        "id": "6413bee1b00a31a52c1b9db7"
    },
    {
        "name": "Ground Collapse",
        "card_class": "",
        "hero_id": "GE1",
        "series_name": "Gravity Enforcer",
        "card_number": 1098,
        "enthusiasm": None,
        "effect_text": "All foes take 1 damage each time they resolve a trigger effect as long as they have Enthusiasm lower than yours.",
        "second_effect_text": "<Trigger> At the start of the round, lower the Enthusiasm of all foes by 2, then resolve this Event in your ownership.",
        "illustrator": "betomirandaart2",
        "picture_url": "https://kornan.dreamhosters.com/i1pl16gee",
        "file_name": "",
        "card_type": [
            "640ce4bf5f6730657ad873be"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [],
        "card_tags": [
            "640ce5e85f6730657ad873cb"
        ],
        "id": "6413bf79b00a31a52c1b9de4"
    },
    {
        "name": "New Equilibrium",
        "card_class": "",
        "hero_id": "GE1",
        "series_name": "Gravity Enforcer",
        "card_number": 1122,
        "enthusiasm": None,
        "effect_text": "<Trigger> At the start of the round or during a foe's turn, lower the Enthusiasm of all foes by 2.",
        "second_effect_text": "<Critical> Your Ending gains damage plus 1 if it deals damage to a foe with Enthusiasm lower than yours.",
        "illustrator": "betomirandaart2",
        "picture_url": "https://kornan.dreamhosters.com/i1cb16ge",
        "file_name": "",
        "card_type": [
            "64108db9159c81c7afebd103"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6",
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [],
        "card_tags": [
            "641292cf38b70f477bb72e6f"
        ],
        "id": "6413bffeb00a31a52c1b9e03"
    },
    {
        "name": "The Star-Cat Alliance",
        "card_class": "",
        "hero_id": "GEN",
        "series_name": "n/a",
        "card_number": 1123,
        "enthusiasm": None,
        "effect_text": "<Trigger> At the start of a round, gain 1 HP and add 2 to your Enthusiasm.",
        "second_effect_text": "<Critical> The foe with the lowest enthusiasm discards 2 cards from their hand.",
        "illustrator": "betomirandaart2",
        "picture_url": "https://kornan.dreamhosters.com/i1cb17g",
        "file_name": "",
        "card_type": [
            "64108db9159c81c7afebd103"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6",
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [],
        "card_tags": [
            "641292cf38b70f477bb72e6f"
        ],
        "id": "6413c0c4b00a31a52c1b9e32"
    },
    {
        "name": "Old Playbook",
        "card_class": "",
        "hero_id": "GEN",
        "series_name": "n/a",
        "card_number": 1106,
        "enthusiasm": None,
        "effect_text": "<Limited> This Item counts as a Canny card in your play this round (this does not count towards play size).",
        "second_effect_text": "",
        "illustrator": "prusin_senpai",
        "picture_url": "https://kornan.dreamhosters.com/i1plg8i",
        "file_name": "",
        "card_type": [
            "64108dee159c81c7afebd104"
        ],
        "extra_effects": [
            "6407aaae5139f66679d6ac52"
        ],
        "reactions": [],
        "card_tags": [
            "64124686d762a869c0b2e12d"
        ],
        "id": "6413c161b00a31a52c1b9e59"
    },
    {
        "name": "Off Duty",
        "card_class": "",
        "hero_id": "GEN",
        "series_name": "n/a",
        "card_number": 1102,
        "enthusiasm": None,
        "effect_text": "Players can not use the effects of Fighters or reactions. You can not resolve this Event if you defended with a Fighter, resolved the effects of a Fighter(s) or used a reaction(s) this round.",
        "second_effect_text": "",
        "illustrator": "betomirandaart2",
        "picture_url": "https://kornan.dreamhosters.com/i1plg4e",
        "file_name": "",
        "card_type": [
            "640ce4bf5f6730657ad873be"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "640ce5e85f6730657ad873cb"
        ],
        "id": "6413c1d3b00a31a52c1b9e74"
    },
    {
        "name": "Ceifeira Preta",
        "card_class": "Canny",
        "hero_id": "CP1",
        "series_name": "Ceifeira Preta",
        "card_number": 1057,
        "enthusiasm": None,
        "effect_text": "Resolve 1 of the following effects: <> Gain 1 Comeback and add 1 Fighter from the discard pile to your hand. <> Discard 2 Comebacks in your ownership; return 3 cards from the discard pile to the top of the Main deck in any order. ",
        "second_effect_text": "",
        "illustrator": "Hugo Roberto",
        "picture_url": "https://kornan.dreamhosters.com/i1p3cpf",
        "file_name": "",
        "card_type": [
            "64079ed6b2b376b6cd0454f5"
        ],
        "extra_effects": [],
        "reactions": [
            "6407ab1c5139f66679d6ac53"
        ],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6413c2dcb00a31a52c1b9e8b"
    },
    {
        "name": "Life Cleaving Presence!",
        "card_class": "Canny",
        "hero_id": "CP1",
        "series_name": "Ceifeira Preta",
        "card_number": 1058,
        "enthusiasm": None,
        "effect_text": "Gain 1 Comeback. Discard 1 card from your strongest or weakest foe's hand  for each Comeback in your ownership (max of 3), then they draw 1 card for each Comeback in their ownership plus 1 (max of 3).",
        "second_effect_text": "",
        "illustrator": "Hugo Roberto",
        "picture_url": "https://kornan.dreamhosters.com/i1p3cpa",
        "file_name": "",
        "card_type": [
            "6407bb289b4fb23f5ddab698"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6413c34cb00a31a52c1b9eaa"
    },
    {
        "name": "Reaping Dive!!",
        "card_class": "Canny",
        "hero_id": "CP1",
        "series_name": "Ceifeira Preta",
        "card_number": 1059,
        "enthusiasm": None,
        "effect_text": "Take 2 damage, then resolve 1 Comeback in your ownership one more time as if you were at critical HP.",
        "second_effect_text": "<Trigger> If a card(s) is discarded from your hand or play, gain 1 Comeback and resolve this Move in your play.",
        "illustrator": "Hugo Roberto",
        "picture_url": "https://kornan.dreamhosters.com/i1p3cpm",
        "file_name": "",
        "card_type": [
            "6407a3bbc503d0c6f5a33238"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "641419bfb00a31a52c1b9ec1"
    },
    {
        "name": "Psychopomp Chop!!!",
        "card_class": "Canny",
        "hero_id": "CP1",
        "series_name": "Ceifeira Preta",
        "card_number": 1060,
        "enthusiasm": 8,
        "effect_text": "<Target> Your strongest or weakest foe. <1-5> Deal 1 damage. <6-11> Deal 3 damage. Gain 1 Comeback. <12+> Deal 3 damage. Gain 2 Comebacks, then resolve 1 of your Comebacks as if you were at critical HP.",
        "second_effect_text": "",
        "illustrator": "Hugo Roberto",
        "picture_url": "https://kornan.dreamhosters.com/i1p3cpe",
        "file_name": "",
        "card_type": [
            "640ce41c5f6730657ad8739f"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "64141a6ab00a31a52c1b9ee0"
    },
    {
        "name": "Portal",
        "card_class": "Canny",
        "hero_id": "P01",
        "series_name": "Warp Family",
        "card_number": 1053,
        "enthusiasm": 0,
        "effect_text": "Portal                 \n\n\nDeal 2 bypassing damage to a foe. If you have a Unity card in your play, deal 1 bypassing damage to a random foe.\n\n\n",
        "second_effect_text": "",
        "illustrator": "Undeadsushii",
        "picture_url": "https://kornan.dreamhosters.com/i1p2pf",
        "file_name": "",
        "card_type": [
            "64079ed6b2b376b6cd0454f5"
        ],
        "extra_effects": [],
        "reactions": [
            "6407a068c503d0c6f5a33231",
            "6407ab1c5139f66679d6ac53"
        ],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "64141bb5b00a31a52c1b9eff"
    },
    {
        "name": "Teleporting Mastery!",
        "card_class": "Canny",
        "hero_id": "P01",
        "series_name": "Warp Family",
        "card_number": 1054,
        "enthusiasm": None,
        "effect_text": "Discard 1 Aura, Move or Ending in a foe's play, then that foe adds 1 random card matching the removed card's type or MAX VARIABLE from their hand to their play (the new card is revealed). ",
        "second_effect_text": "<Trigger> During a foe's turn, resolve this Aura in your play.",
        "illustrator": "Undeadsushii",
        "picture_url": "https://kornan.dreamhosters.com/i1p2pa",
        "file_name": "",
        "card_type": [
            "6407bb289b4fb23f5ddab698"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "64141c68b00a31a52c1b9f26"
    },
    {
        "name": "Distant Drop-off!!!",
        "card_class": "Canny",
        "hero_id": "P01",
        "series_name": "Warp Family",
        "card_number": 1056,
        "enthusiasm": 16,
        "effect_text": "<Target> Random foe. If you have a Unity card in your play, add 3 to your focus. <1-5> Deal 3 damage. <6-11> Deal 3 damage. Discard 1 card from their hand. <12+> Deal 3 damage. They discard 1 card from their play.",
        "second_effect_text": "",
        "illustrator": "Undeadsushii",
        "picture_url": "https://kornan.dreamhosters.com/i1p2pe",
        "file_name": "",
        "card_type": [
            "640ce41c5f6730657ad8739f"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "64141dadb00a31a52c1b9f55"
    },
    {
        "name": "Spatial Reversal!!",
        "card_class": "Canny",
        "hero_id": "P01",
        "series_name": "Warp Family",
        "card_number": 1055,
        "enthusiasm": None,
        "effect_text": "This card copies the text of a foe's Move on your left or right until the end of your turn (if their Move is face-down, reveal it).",
        "second_effect_text": "<Trigger> If you are targeted for damage, your Fighter gains Redirect 1 (that card is revealed).",
        "illustrator": "Undeadsushii",
        "picture_url": "https://kornan.dreamhosters.com/i1p2pm",
        "file_name": "",
        "card_type": [
            "6407a3bbc503d0c6f5a33238"
        ],
        "extra_effects": [
            "64079f10b2b376b6cd0454f6"
        ],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "64141e41b00a31a52c1b9f74"
    },
    {
        "name": "Spirit Channeling and Union!",
        "card_class": "Staunch",
        "hero_id": "BW1",
        "series_name": "Bone Whisperer",
        "card_number": 1010,
        "enthusiasm": None,
        "effect_text": "<Target> You. <1-5> Draw 1 Pluck, then discard 1 Pluck. <6-11> Draw 1 Pluck. <12+> Gain 1 Event and 2 HP.",
        "second_effect_text": "",
        "illustrator": "Ranbutam",
        "picture_url": "https://kornan.dreamhosters.com/i1g3bwa",
        "file_name": "",
        "card_type": [
            "6407bb289b4fb23f5ddab698"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6414200db00a31a52c1b9fc3"
    },
    {
        "name": "Umala - Heavy Trampling!!",
        "card_class": "Staunch",
        "hero_id": "BW1",
        "series_name": "Bone Whisperer",
        "card_number": 1011,
        "enthusiasm": None,
        "effect_text": "Draw 1 Pluck. Deal 1 piercing damage for each Event in your ownership (max of 4) to a random foe, then gain 2 HP.",
        "second_effect_text": "",
        "illustrator": "Ranbutam",
        "picture_url": "https://kornan.dreamhosters.com/i1g3bwm",
        "file_name": "",
        "card_type": [
            "6407a3bbc503d0c6f5a33238"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "641420a2b00a31a52c1b9fe2"
    },
    {
        "name": "Bone Whisperer",
        "card_class": "Staunch",
        "hero_id": "BW1",
        "series_name": "Bone Whisperer",
        "card_number": 1009,
        "enthusiasm": None,
        "effect_text": "Resolve 1 of the following effects: <> Discard up to 3 cards from your hand; gain 1 HP for each card discarded. <>Discard 3 cards from your hand; unfurl 3 Pluck (reveal 3 cards from the top of the Pluck deck). Add 2 Pluck to your ownership and discard the other unfurled Pluck.",
        "second_effect_text": "",
        "illustrator": "Ranbutam",
        "picture_url": "https://kornan.dreamhosters.com/i1g3bwf",
        "file_name": "",
        "card_type": [
            "64079ed6b2b376b6cd0454f5"
        ],
        "extra_effects": [],
        "reactions": [
            "64079f9fb2b376b6cd0454f8"
        ],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6414212cb00a31a52c1b9ff9"
    },
    {
        "name": "Pitch - Swift Rending!!!",
        "card_class": "Staunch",
        "hero_id": "BW1",
        "series_name": "Bone Whisperer",
        "card_number": 1012,
        "enthusiasm": 15,
        "effect_text": "<Target> Random foe. <1-5> No effect. <6-11> Deal 3 damage. Add 1 Event from the discard pile to your ownership. <12+> Deal 3 piercing damage. Add 1 card and 1 Event from their respective discard piles to your hand/ownership.",
        "second_effect_text": "",
        "illustrator": "Ranbutam",
        "picture_url": "https://kornan.dreamhosters.com/i1g3bwe",
        "file_name": "",
        "card_type": [
            "640ce41c5f6730657ad8739f"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "6414223fb00a31a52c1ba01e"
    },
    {
        "name": "Restorative Heat!!!",
        "card_class": "Staunch",
        "hero_id": "FB1",
        "series_name": "Flamebell",
        "card_number": 1016,
        "enthusiasm": 11,
        "effect_text": "<Target> Foe of your choice. All foes with a Power card(s) in their play take 1 damage. <1-5> Deal 2 damage. Gain 2 HP. <6-11> Deal 3 damage. Gain 2 HP. <12+> Deal 4 damage. Gain 2 HP and resolve your Aura one more time.",
        "second_effect_text": "",
        "illustrator": "XIOLI",
        "picture_url": "https://kornan.dreamhosters.com/i1g4fbe",
        "file_name": "",
        "card_type": [
            "640ce41c5f6730657ad8739f"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a29bc503d0c6f5a33234",
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "64142354b00a31a52c1ba03d"
    },
    {
        "name": "Warm Mending!",
        "card_class": "Staunch",
        "hero_id": "FB1",
        "series_name": "Flamebell",
        "card_number": 1014,
        "enthusiasm": None,
        "effect_text": "Add 1 card from the discard pile to your hand. If the card added was Staunch or Power, gain 2 HP and add 1 Aura from the discard pile to your hand.",
        "second_effect_text": "",
        "illustrator": "XIOLI",
        "picture_url": "https://kornan.dreamhosters.com/i1g4fba",
        "file_name": "",
        "card_type": [
            "6407bb289b4fb23f5ddab698"
        ],
        "extra_effects": [],
        "reactions": [],
        "card_tags": [
            "6407a27fc503d0c6f5a33233"
        ],
        "id": "641423bdb00a31a52c1ba05c"
    },
    {
        "name": "New Growth",
        "card_class": "",
        "hero_id": "BB1",
        "series_name": "Bolt Blossom",
        "card_number": 1118,
        "enthusiasm": None,
        "effect_text": "Add 2 to the Focus of the next card in your play. ",
        "second_effect_text": "<Critical> Add the top card of the Main deck to your play.",
        "illustrator": "Filippo Scalisi",
        "picture_url": "https://kornan.dreamhosters.com/i1cb12bb",
        "file_name": "",
        "card_type": [
            "64108db9159c81c7afebd103"
        ],
        "extra_effects": [
            "64079f5db2b376b6cd0454f7"
        ],
        "reactions": [],
        "card_tags": [
            "641292cf38b70f477bb72e6f"
        ],
        "id": "641425ffb00a31a52c1ba073"
    }
]



print(cardParse(cards))
