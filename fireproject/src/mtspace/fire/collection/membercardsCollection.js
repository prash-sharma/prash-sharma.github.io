// Code generated by mtribes. DO NOT EDIT.

/* eslint-disable */
import { Collection } from '@mtribes/client-browser';

import MembercardexpExperience from '../experience/membercardexpExperience';

export default class MembercardsCollection extends Collection {
	constructor(id, childIds, broker) {
		super(id, broker, {
			id: 'YPQ8ArM',
			t: 'c'
		});
		this.membercardexp = new MembercardexpExperience(childIds[0], id, broker);
	}
}