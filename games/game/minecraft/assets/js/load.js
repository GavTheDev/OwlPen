window.eaglercraftOpts = {
						container: "game_frame",
						assetsURI: `assets.epk`,
						serverWorkerURI: "worker_bootstrap.js",
						worldsFolder: "MAIN",
						servers: [
              { serverName: "GavMC", serverAddress: "ws"+location.protocol.slice(4)+"//"+location.host+"/server", hideAddress: true },
              { serverName: "HartMC", serverAddress: "wss://private.gavsmcserver.ml/server/", hideAddress: true },
              { serverName: "A*spixel", serverAddress: "wss://web.asspixel.net/CAPixel/", hideAddress: true },
							{ serverName: "Ayunboom", serverAddress: "wss://sus.shhnowisnottheti.me", hideAddress: true }
						],
            relays: [
							{ addr: "wss://relay.shhnowisnottheti.me/", name: "Public Relay #3", relayId: "1" }
						],
						mainMenu: {
							splashes: [], eaglerLogo: false
						}
					};
					(function () {
						var q = window.location.search;
						if (typeof q === 'string' && q.startsWith("?")) {
							q = new URLSearchParams(q);
							var s = q.get("server");
							if (s) window.minecraftOpts.push(s);
						}
					})();
					main();