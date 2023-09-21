from models.decks import (
    DeckIn,
    DeckOut,
    DecksAll
    )

from queries.decks import DeckQueries
from fastapi import APIRouter, Depends, Response
from authenticator import authenticator

router = APIRouter(tags=["decks"])


@router.get("/api/decks/", response_model=DecksAll)
async def get_all_decks(queries: DeckQueries = Depends()):
    return DecksAll(decks=queries.get_all_decks())

@router.get("/api/decks/{deck_id}/", response_model=DeckOut)
async def get_deck(
    deck_id: str,
    response: Response,
    queries: DeckQueries = Depends(),
):
    deck = queries.get_deck(deck_id)
    if deck is None:
        response.status_code = 404
    else:
        return deck

@router.post("/api/decks/", response_model=DeckOut)
async def create_deck(
    deck_in: DeckIn,
    queries: DeckQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    deck = queries.create_deck(deck_in)
    return deck

@router.put("/api/decks/{deck_id}/", response_model=DeckOut | str)
async def update_deck(
    deck_id: str,
    deck_in: DeckIn,
    response: Response,
    queries: DeckQueries = Depends(),
):
    deck = queries.update_deck(deck_id, deck_in)
    if deck is None:
        response.status_code = 404
    else:
        return deck

@router.delete("/api/decks/{deck_id}/", response_model=bool | str)
async def delete_deck(
    deck_id: str,
    response: Response,
    queries: DeckQueries = Depends(),
):
    deck = queries.delete_deck(deck_id)
    if deck is None:
        response.status_code = 404
    else:
        return True

@router.put("/decks/{deck_id}/add_card/{card_number}", response_model=DeckOut)
async def add_card(
    deck_id: str,
    card_number: int,
    response: Response,
    queries: DeckQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    deck = queries.add_card(deck_id, card_number)
    if deck is None:
        response.status_code = 404
    else:
        return deck

@router.put("/decks/{deck_id}/remove_card/{card_number}", response_model=DeckOut)
async def remove_card(
    deck_id: str,
    card_number: int,
    response: Response,
    queries: DeckQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    deck = queries.remove_card(deck_id, card_number)
    if deck is None:
        response.status_code = 404
    else:
        return deck

@router.put("/decks/{deck_id}/clear/", response_model=DeckOut)
async def clear_deck(
    deck_id: str,
    response: Response,
    queries: DeckQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    deck = queries.clear_deck(deck_id)
    if deck is None:
        response.status_code = 404
    else:
        return deck

@router.get("/api/decks/{deck_id}/list/", response_model=list)
async def get_deck_list(
    deck_id: str,
    queries: DeckQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    deck_list = queries.get_deck_list(deck_id)
    return deck_list

@router.get("/api/decks/{deck_id}/counted_list/", response_model=list)
async def get_counted_deck_list(
    deck_id: str,
    queries: DeckQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    deck_list = queries.get_counted_deck_list(deck_id)
    return deck_list


@router.get("/get_popular_cards/", response_model=list)
async def get_popular_cards(queries: DeckQueries = Depends()):
    popular_cards = queries.get_popular_cards()
    return popular_cards


@router.get("/get_time_ago/{deck_id}/", response_model=dict)
async def get_times(
    deck_id: str,
    queries: DeckQueries = Depends(),
):
    times = queries.get_times(deck_id)
    return times


@router.get("/decks/{deck_id}/cover/", response_model=str)
async def get_cover_image(
    deck_id: str,
    response: Response,
    queries: DeckQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    deck = queries.get_cover_image(deck_id)
    if deck is None:
        response.status_code = 404
    else:
        return deck

@router.get("/api/full_decks/", response_model=dict)
async def get_all_full_decks(queries: DeckQueries = Depends()):
    full_deck_list = queries.get_all_full_decks()
    return {"decks": full_deck_list}


@router.get("/api/game_decks/", response_model=list)
async def get_all_game_decks(queries: DeckQueries = Depends()):
    return queries.get_all_game_decks()
