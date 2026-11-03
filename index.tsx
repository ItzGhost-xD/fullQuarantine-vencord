/*
 * Vencord user plugin
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import * as DataStore from "@api/DataStore";
import definePlugin from "@utils/types";
import { Menu } from "@webpack/common";

const KEY = "FullQuarantine.userIds";
const ids = new Set<string>();
const STYLE_ID = "vc-full-quarantine-style";

function updateStyle() {
    let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!style) {
        style = document.createElement("style");
        style.id = STYLE_ID;
        document.head.appendChild(style);
    }
    style.textContent = [...ids].map(id => `li[data-author-id="${CSS.escape(id)}"]{display:none!important}`).join("\n");
}

function addQuarantineItem(children: any[], userId?: string) {
    if (!userId) return;
    children.push(
        <Menu.MenuItem
            id="full-quarantine-toggle"
            label={ids.has(userId) ? "Remove from quarantine" : "Quarantine user"}
            action={async () => {
                if (ids.has(userId)) ids.delete(userId);
                else ids.add(userId);
                await DataStore.set(KEY, [...ids]);
                updateStyle();
            }}
        />
    );
}

export default definePlugin({
    name: "FullQuarantine",
    description: "Hide messages from chosen users on this client.",
    dependencies: ["ContextMenuAPI"],
    patches: [{
        find: "Message must not be a thread starter message",
        replacement: {
            match: /"aria-setsize":-1,(?=.{0,150}?#{intl::MESSAGE_A11Y_ROLE_DESCRIPTION})/,
            replace: "...$self.getQuarantineProps(arguments[0]),$&"
        }
    }],
    contextMenus: {
        "user-context": (children, { user }) => addQuarantineItem(children, user?.id),
        "message-user-context": (children, { user }) => addQuarantineItem(children, user?.id),
    },
    async start() {
        for (const id of (await DataStore.get<string[]>(KEY)) ?? []) ids.add(id);
        updateStyle();
    },
    stop() {
        document.getElementById(STYLE_ID)?.remove();
        ids.clear();
    },
    getQuarantineProps(props: { message?: { author?: { id?: string } } }) {
        return { "data-author-id": props.message?.author?.id };
    }
});
