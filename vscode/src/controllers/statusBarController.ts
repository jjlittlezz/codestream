"use strict";
import { Disposable, StatusBarAlignment, StatusBarItem, window } from "vscode";
import {
	CodeStreamEnvironment,
	SessionStatus,
	SessionStatusChangedEvent,
	UnreadsChangedEvent
} from "../api/session";
import { Container } from "../container";

export class StatusBarController implements Disposable {
	private _disposable: Disposable;
	private _statusBarItem: StatusBarItem | undefined;

	constructor() {
		this._disposable = Disposable.from(
			Container.session.onDidChangeSessionStatus(this.onSessionStatusChanged, this),
			Container.session.onDidChangeUnreads(this.onUnreadsChanged, this)
		);

		this.updateStatusBar(Container.session.status);
	}

	dispose() {
		this.clear();

		this._statusBarItem && this._statusBarItem.dispose();

		this._disposable && this._disposable.dispose();
	}

	private onUnreadsChanged(e: UnreadsChangedEvent) {
		this.updateStatusBar(Container.session.status, e.getMentionCount());
	}

	private onSessionStatusChanged(e: SessionStatusChangedEvent) {
		this.updateStatusBar(e.getStatus());
	}

	async clear() {
		if (this._statusBarItem !== undefined) {
			this._statusBarItem.hide();
		}
	}

	private async updateStatusBar(status: SessionStatus, count: number = 0) {
		if (this._statusBarItem === undefined) {
			this._statusBarItem =
				this._statusBarItem || window.createStatusBarItem(StatusBarAlignment.Right, -99);
		}

		let env = "";
		switch (Container.session.environment) {
			case CodeStreamEnvironment.PD:
				env = "PD: ";
				break;
			case CodeStreamEnvironment.QA:
				env = "QA: ";
				break;
		}

		switch (status) {
			case SessionStatus.SignedOut:
				this._statusBarItem.text = ` $(comment-discussion) ${env}Sign in... `;
				this._statusBarItem.command = "codestream.signIn";
				this._statusBarItem.tooltip = "Sign in to CodeStream...";
				this._statusBarItem.color = undefined;
				break;

			case SessionStatus.SigningIn:
				this._statusBarItem.text = ` $(comment-discussion) ${env}Signing in... `;
				this._statusBarItem.command = undefined;
				this._statusBarItem.tooltip = "Signing in to CodeStream, please wait";
				this._statusBarItem.color = undefined;
				break;

			case SessionStatus.SignedIn:
				let label = Container.session.user.name;
				if (!(await Container.session.hasSingleTeam())) {
					label += ` - ${Container.session.team.name}`;
				}
				if (count > 0) {
					label += ` (${count})`;
				}

				this._statusBarItem.text = ` $(comment-discussion) ${env}${label} `;
				this._statusBarItem.command = "codestream.toggle";
				this._statusBarItem.tooltip = "Toggle CodeStream";
				break;
		}

		this._statusBarItem.show();
	}
}
