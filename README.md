## Install FullQuarantine on Linux with Vencord desktop

These steps assume you already have the Vencord source checkout at `/home/ghost/Vencord-src` and the plugin file at `/home/ghost/Downloads/FullQuarantine.plugin.ts`.

1. **Quit Discord completely.**

2. **Copy the plugin into Vencord’s user plugin folder:**

```bash
mkdir -p /home/ghost/Vencord-src/src/userplugins/fullQuarantine
cp /home/ghost/Downloads/FullQuarantine.plugin.ts /home/ghost/Vencord-src/src/userplugins/fullQuarantine/index.tsx
```

If the downloaded file has a different name or location, change the first path to match.

3. **Open a terminal in the Vencord source folder and build:**

```bash
cd /home/ghost/Vencord-src
PATH=/home/ghost/.cache/codex-runtimes/bin:/home/ghost/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm build
```

Wait for it to finish. Continue only if it reports a successful build.

4. **Inject the build into Discord:**

```bash
PATH=/home/ghost/.cache/codex-runtimes/bin:/home/ghost/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm inject
```

In the installer, select your Discord installation and press **Enter** to confirm.

5. **Reopen Discord.** Go to **User Settings → Vencord → Plugins** and enable **FullQuarantine**.

6. **Right-click a user’s name or avatar** and select **Quarantine user**. To undo it, open their context menu again and select **Remove from quarantine**.

This installs it for **Vencord desktop on this laptop**. The regular Vencord Chrome extension cannot load this custom plugin file directly. Quarantine hides messages on your client only.
