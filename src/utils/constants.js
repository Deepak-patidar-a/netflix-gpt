export const LOGO = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-01-09/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"

export const USER_AVATAR="https://assets.leetcode.com/users/dpk_ptdr/avatar_1750879819.png"

export const BACKGROUND_IMAGE_URL = "https://assets.nflxext.com/ffe/siteui/vlv3/bd9d04fe-4c30-4eee-8809-0b26a61c96a2/web/IN-en-20260112-TRIFECTA-perspective_cc7609b0-64b9-4cb7-9b0d-1c5ffac03861_small.jpg";

export const URL = 'https://imdb146.p.rapidapi.com/v1/video/?id=vi2557478681';
export const OPTIONS = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
		'x-rapidapi-host': 'imdb146.p.rapidapi.com'
	}
};

export const MOVIES_OPTIONS = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ad1239e518mshd7884167f75af45p116ca8jsn0b4579a7d86a',
		'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
	}
};

export const NEW_RELEASE_URL = 'https://moviesdatabase.p.rapidapi.com/titles?startYear=2025&endYear=2026&limit=10';

export const DRAMA_URL = 'https://moviesdatabase.p.rapidapi.com/titles?genre=Drama';

export const ACTION_URL = 'https://moviesdatabase.p.rapidapi.com/titles?genre=Action';

export const POPULAR_URL = 'https://moviesdatabase.p.rapidapi.com/titles?genre=History';