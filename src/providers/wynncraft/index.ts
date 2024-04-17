export async function fetchData(id: string) {
	const res = await fetch(`https://api.wynncraft.com/v2/player/${id}/stats`);
	return await res.json<ApiStats>();
}

const charCardHeight = 84,
	charCardGap = 6,
	charCardWidth = 240,
	rootWidth = 660,
	rootMinHeight = 300,
	profsPerRow = 4;

const colors = {
	'dark_red': '#AA0000',
	'red': '#FF5555',
	'gold': '#FFAA00',
	'yellow': '#FFFF55',
	'dark_green': '#00AA00',
	'green': '#55FF55',
	'aqua': '#55FFFF',
	'dark_aqua': '#00AAAA',
	'dark_blue': '#0000AA',
	'blue': '#5555FF',
	'light_purple': '#FF55FF',
	'dark_purple': '#AA00AA',
	'white': '#FFFFFF',
	'gray': '#AAAAAA',
	'dark_gray': '#555555',
	'black': '#000000'
};

const ranks: Record<string, string> = {
	'game master': 'gamemaster',
	'vip+': 'vipplus'
};

// ranks based on CT (content team)
const ctRanks = ['cmd', 'qa', 'music', 'hybrid', 'gamemaster', 'builder', 'item', 'art'];

// WHY THE FUCK SO MANY RANKS!??!?!
const rankColors: Record<string, string> = {
	'vip': colors.dark_green,
	'vipplus': colors.dark_aqua,
	'hero': colors.dark_purple,
	'champion': colors.yellow,
	'media': colors.light_purple,
	'moderator': colors.gold,

	...Object.fromEntries(ctRanks.map(r => [r, colors.dark_aqua])),

	'webdev': colors.dark_red,
	'administrator': colors.dark_red
};

const badgeWidths: Record<string, number> = {
	'vip': 22,
	'vipplus': 29,
	'hero': 31,
	'champion': 53,
	'media': 35,
	'moderator': 61,
	'cmd': 26,
	'qa': 19,
	'music': 35,
	'hybrid': 40,
	'gamemaster': 20,
	'builder': 46,
	'item': 29,
	'webdev': 26,
	'administrator': 35
};

const gamemodes = ['hardcore', 'ironman', 'hunted', 'craftsman'];

const professions = [
	'mining', 'woodcutting', 'farming', 'fishing', 'armouring', 'tailoring', 'weaponsmithing', 'woodworking', 'jeweling', 'alchemism', 'scribing', 'cooking'
];

function renderChar(char: Character, row: number, col: number) {
	const charGamemodes = gamemodes.filter(m => char.gamemode[m]);
	const estIconSize = Math.floor(charCardHeight * 2 / 3);
	const offset = (charCardHeight - estIconSize) / 2;
	const profs = professions.map((name, i) => `
		<g xmlns='http://www.w3.org/2000/svg' transform='translate(${(i % profsPerRow) * 40}, ${Math.floor(i / profsPerRow) * 16})' font-size='small'>
			<image width='16' height='16' href='/wynncraft/professions/${name}.png'/>
			<text y='14' x='18'>${char.professions[name].level}</text>
		</g>
	`);
	const combatProf = char.professions['combat'];
	return `
		<g transform='translate(${col * (charCardWidth + charCardGap)}, ${row * (charCardHeight + charCardGap)})' xmlns='http://www.w3.org/2000/svg'>
			<rect height='${charCardHeight}' width='${charCardWidth}' fill='#C9B88B' rx='8' ry='8'/>
			<image x='${offset}' y='${offset - 8}' width='${estIconSize}' height='${estIconSize}' href='/wynncraft/resource/classes/icons/artboards/${char.type.toLowerCase()}.webp?width=${estIconSize * 2}'/>

			<g transform='translate(${offset}, ${charCardHeight - 12})' font-weight='bold'>
				<line x1='6' x2='${estIconSize - 6}' fill='red' stroke-width='12' stroke='#465B50' stroke-linecap='round'/>
				<line x1='6' x2='${(estIconSize - 6) * combatProf.xp / 100}' stroke-width='12' stroke='#8EC364' stroke-linecap='round'/>
				<text fill='white' x='${estIconSize / 2 - combatProf.level.toString().length - 6}' y='4' font-size='smaller'>${combatProf.level}</text>
			</g>

			<text y='${offset + 8}' x='${estIconSize + offset + 8}' font-weight='bold'>${char.name || char.type}</text>
			<g transform='translate(${charCardWidth - charGamemodes.length * 14 - 8}, ${offset - 4})'>
				${charGamemodes.map((m, i) => `
					<image xmlns='http://www.w3.org/2000/svg' width='12' height='12' x='${i * 14}' href='/wynncraft/resource/badges/${m}.svg?height=12'/>
				`).join('')}
			</g>
			<g transform='translate(${estIconSize + offset + 6}, ${offset + 14})'>
			${profs.join('')}
			</g>
		</g>`;
}

const format = new Intl.NumberFormat().format;

function renderGlobalStats(p: Player, vertical: boolean, offsetX: number, offsetY: number) {
	const stats = {
		'clock.gif': `${format(Math.round((p.meta.playtime / 12 + Number.EPSILON) * 100) / 100)} hrs`,
		'diamond_sword.png': `${format(p.global.mobsKilled)} mobs`,
		'dragon_breath.png': `${format(p.global.totalLevel.combined)} levels`
	};
	let curX = 0;
	return Object.entries(stats).map(([icon, value], i) => {
		const s = `
				<g transform='translate(${offsetX + (vertical ? 0 : curX)}, ${offsetY + (vertical ? i * 20 : 0)})' xmlns='http://www.w3.org/2000/svg'>
					<image y='-10' width='16' height='16' href='/wynncraft/${icon}'/>
					<text x='20' y='2'>${value}</text>
				</g>
	`;
		curX += value.length * 12;
		return s;
	}).join('');
}

export function render(stats: ApiStats) {
	const p = stats.data[0];
	let rank = (p.rank === 'Player' ? p.meta.tag?.value : p.rank)?.toLowerCase();
	rank = ranks[rank] || rank;
	const chars = Object.values(p.characters);
	const estHeight = Math.max(Math.ceil(chars.length / 2) * (charCardHeight + charCardGap) + 48, rootMinHeight);
	const alternativeStyle = chars.length > 4;
	p.meta.location.server ||= 'OFFLINE';
	return `
	<svg xmlns='http://www.w3.org/2000/svg'>
		<style>
			svg {
				font-family: Minecraft, sans-serif;
			}
		</style>
		<rect width='${rootWidth}' height='${estHeight}' rx='8' ry='8' fill='#BAAA80' stroke='#412624' stroke-width='4' stroke-linecap='round'/>
		<g transform='translate(12, 12)'>
			<image x='4' y='-2' height='18' width='${badgeWidths[rank] * 2}' href='/wynncraft/resource/badges/rank_${rank}.svg'/>
			<text x='${12 + badgeWidths[rank] * 2}' y='13' font-size='large' font-weight='bold' fill='${rankColors[rank]}' filter='drop-shadow(0.5px 0.5px 0px black)'>${p.username}</text>
			<g transform='translate(${rootWidth - (p.meta.location.server.length || 0) * 10 - 48}, 12)'>
				<text font-weight='bold' font-size='smaller' fill='${p.meta.location.online ? colors.green : colors.red}'>${p.meta.location.online ? p.meta.location.server : 'OFFLINE'}</text>
				<image x='${(p.meta.location.server.length || 0) * 10 + 4}' y='-12' width='15' height='15' href='/wynncraft/${p.meta.location.online ? 'online' : 'offline'}.png'/>
			</g>
		</g>
		<g transform='translate(12, 24)' font-size='small'>
			<g transform='translate(0, 24)'>
			<image href='/wynncraft/skin/${p.uuid}' width='128'/>
			${alternativeStyle ? renderGlobalStats(p, true, 12, 240) : ''}
			</g>
			${!alternativeStyle ? `
				<g transform='translate(144, 20)'>
					${renderGlobalStats(p, false, 0, 0)}
				</g>
			` : ''}
			<g transform='translate(144, ${alternativeStyle ? 16 : 32})'>
				${chars.map(((char, i) => renderChar(char, Math.floor(i / 2), i % 2))).join('')}
			</g>
		</g>
	</svg>
	`;
}
