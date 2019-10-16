import { CSUser } from "@codestream/protocols/api";
import { createSelector } from "reselect";
import { mapFilter, toMapBy } from "../../utils";
import { ActionType } from "../common";
import * as actions from "./actions";
import { UsersState, UsersActionsType } from "./types";

type UsersActions = ActionType<typeof actions>;

const initialState: UsersState = {};

const updateUser = (payload: CSUser, users: UsersState) => {
	const user = users[payload.id] || {};
	return { ...user, ...payload };
};

export function reduceUsers(state = initialState, action: UsersActions) {
	switch (action.type) {
		case UsersActionsType.Bootstrap: {
			return toMapBy("id", action.payload);
		}
		case UsersActionsType.Update:
			return { ...state, [action.payload.id]: updateUser(action.payload, state) };
		case UsersActionsType.Add: {
			const updatedUsers = action.payload.map(user => updateUser(user, state));
			return { ...state, ...toMapBy("id", updatedUsers) };
		}
		case "RESET":
			return initialState;
		default:
			return state;
	}
}

const getUsername = (user: CSUser) => {
	if (!user.username && user.email) {
		return user.email.replace(/@.*/, "");
	}
	return user.username;
};

const getUsers = state => state.users;
const getTeam = state => state.teams[state.context.currentTeamId];
export const getTeamMembers = createSelector(
	getTeam,
	getUsers,
	(team, users) => {
		return mapFilter(team.memberIds, (id: string) => {
			const user: CSUser = users[id];
			return user && !user.deactivated ? user : undefined;
		});
	}
);

// return the team tags as an array, in sort order
export const getTeamTagsArray = createSelector(
	getTeam,
	team => {
		if (team.tags == null) {
			team.tags = Object.create(null);
		}

		return mapFilter(
			Object.keys(team.tags)
				.map(id => {
					return { id, ...team.tags[id] };
				})
				.sort((a, b) => a.sortOrder - b.sortOrder),
			tag => (tag.deactivated ? null : tag)
		);
	}
);

// return the team tags as an associative array (hash)
export const getTeamTagsHash = createSelector(
	getTeam,
	team => {
		if (team.tags == null) {
			team.tags = Object.create(null);
		}

		const keys = Object.keys(team.tags);
		const tags = {};
		keys.forEach(id => {
			if (!team.tags[id].deactivated) tags[id] = { id, ...team.tags[id] };
		});
		return tags;
	}
);

export const getAllUsers = createSelector(
	getUsers,
	(users: UsersState) => Object.values(users)
);
export const getUsernames = createSelector(
	getAllUsers,
	users => {
		return users.map(getUsername);
	}
);

export const getUsernamesById = createSelector(
	getAllUsers,
	users => {
		const map = {};
		users.forEach(user => {
			map[user.id] = getUsername(user);
		});
		return map;
	}
);

export const getNormalizedUsernames = createSelector(
	getUsernames,
	usernames => {
		return mapFilter(usernames, username => username && username.toLowerCase());
	}
);

export const getUserByCsId = createSelector(
	(state: UsersState) => state,
	(_: any, codestreamId: string) => codestreamId,
	(users: UsersState, codestreamId: string) => {
		for (let user of Object.values(users)) {
			if (user.codestreamId === codestreamId || user.id === codestreamId) return user;
		}
		return undefined;
	}
);

export const findMentionedUserIds = (members: CSUser[], text: string) => {
	const mentionedUserIds: string[] = [];
	if (text == null || text.length === 0) {
		return mentionedUserIds;
	}

	members.forEach(user => {
		const matcher = user.username.replace(/\+/g, "\\+").replace(/\./g, "\\.");
		if (text.match("@" + matcher + "\\b")) {
			mentionedUserIds.push(user.id);
		}
	});
	return mentionedUserIds;
};
