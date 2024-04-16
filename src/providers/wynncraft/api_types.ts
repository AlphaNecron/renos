interface ApiStats {
	timestamp: number;
	data: Player[];
}

interface Player {
	username: string;
	uuid: string;
	rank: string;
	meta: Meta;
	characters: Record<string, Character>;
	global: GlobalStats;
}

interface Meta {
	firstJoin: Date;
	lastJoin: Date;
	location: Location;
	playtime: number;
	tag: DonationRank;
	veteran: boolean;
}

interface DonationRank {
	display: boolean;
	value: string;
}

interface Location {
	online: boolean;
	server?: string;
}

interface GlobalStats {
	chestsFound: number;
	blocksWalked: number;
	itemsIdentified: number;
	mobsKilled: number;
	totalLevel: {
		combat: number;
		profession: number;
		combined: number;
	};
	logins: number;
	deaths: number;
}

interface Character {
	type: string;
	name: string;
	level: number;
	dungeons: Completable;
	raids: Completable;
	quests: Completable;
	gamemode: Record<string, boolean>;
	itemsIdentified: number;
	mobsKilled: number;
	chestsFound: number;
	blocksWalked: number;
	logins: number;
	deaths: number;
	playtime: number;
	skills: Skills;
	professions: Record<string, Profession>;
	discoveries: number;
}

interface Skills {
	strength: number;
	dexterity: number;
	intelligence: number;
	defense: number;
	agility: number;
}

interface Profession {
	level: number;
	xp: number;
}

interface Completable {
	completed: number;
}
