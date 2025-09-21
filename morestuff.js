function() {
    function show(set) {
        const { title, message } = set;
        const modal = document.createElement('div');
        modal.id = 'message';
        modal.className = 'arts__modal___VpEAD-camelCase';
        modal.innerHTML = `
            <form class="styles__container___1BPm9-camelCase" style="width: 95%;">
                <div class="styles__text___KSL4--camelCase">
                    <div style="font-size: 0.911vw; line-height: 0.911vw;">
                        <h2>${title}</h2>
                        <br />
                        <p>${message}</p>
                    </div>
                </div>
                <div class="styles__holder___3CEfN-camelCase">
                    <div class="styles__buttonContainer___2EaVD-camelCase">
                        <div id="closeButton" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0">
                            <div class="styles__shadow___3GMdH-camelCase"></div>
                            <div class="styles__edge___3eWfq-camelCase" style="background-color: var(--accent);"></div>
                            <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: var(--accent);">Okay</div>
                        </div>
                    </div>
                </div>
                <input type="submit" style="opacity: 0; display: none;"/>
            </form>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        modal.querySelector('#closeButton').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = 'auto';
        });
    }
    let brOpen = false;
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'd') {
            brOpen = true;
            if (window.blacket && typeof blacket.createToast === 'function') {
                blacket.createToast?.({
                    title: "Opening Cancelled",
                    message: "Pack opening was cancelled.",
                    icon: "/content/blooks/Warn.webp",
                    time: 3000
                });
            }
        }
    });

    function showResults() {
        let packs = '';
        if (typeof blacket !== 'undefined' && blacket.packs) {
            for (const pack in blacket.packs) {
                if (!blacket.packs[pack].hidden) {
                    packs += `<option value="${pack}">${pack}</option>`;
                }
            }
        } else {
            packs += `<option value="">No packs available</option>`;
        }
        const modal = document.createElement('div');
        modal.id = 'openerModal';
        modal.className = 'arts__modal___VpEAD-camelCase';
        modal.innerHTML = `
            <form class="styles__container___1BPm9-camelCase">
                <div class="styles__text___KSL4--camelCase">
                    <div>
                        <div style="margin-top: 15px;">
                            <label for="selector" style="display: block; margin-bottom: 5px; font-weight: bold;">Choose a Pack:</label>
                            <select id="selector" class="styles__select___4kC90-camelCase">
                                ${packs}
                            </select>
                        </div>
                        <div style="margin-top: 15px;">
                            <label for="packq" style="display: block; margin-bottom: 5px; font-weight: bold;">Quantity (default):</label>
                            <input type="number" id="packq" class="styles__numRow___xh98F-camelCase" value="1" min="1" style="border: 0.156vw solid rgba(0, 0, 0, 0.17);border-radius: 0.313vw;">
                        </div>
                        <div style="margin-top: 15px;">
                            <label for="tokenAmt" style="display: block; margin-bottom: 5px; font-weight: bold;">Number of Tokens to Use:</label>
                            <input type="number" id="tokenAmt" class="styles__input___2Yt1l-camelCase" min="0" placeholder="Enter tokens" style="border: 0.156vw solid rgba(0, 0, 0, 0.17);border-radius: 0.313vw;">
                        </div>
                        <div style="margin-top: 15px; display: flex; align-items: center;">
                            <input type="checkbox" id="uAT" style="margin-right: 10px;">
                            <label for="uAT" style="font-weight: bold;">Use All Available Tokens</label>
                        </div>
                        <p id="status" style="font-size: 15px; margin-top: 5px; font-weight: bold; color: #fff;">Click ctrl + alt + d to cancel</p>
                    </div>
                </div>
                <div class="styles__holder___3CEfN-camelCase">
                    <div class="styles__buttonContainer___2EaVD-camelCase">
                        <div id="openerStarter" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0">
                            <div class="styles__shadow___3GMdH-camelCase"></div>
                            <div class="styles__edge___3eWfq-camelCase" style="background-color: var(--accent);"></div>
                            <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: var(--accent);">Open Packs</div>
                        </div>
                        <div id="cancel" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0">
                            <div class="styles__shadow___3GMdH-camelCase"></div>
                            <div class="styles__edge___3eWfq-camelCase" style="background-color: var(--accent);"></div>
                            <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: var(--accent);">Cancel</div>
                        </div>
                    </div>
                </div>
                <input type="submit" style="opacity: 0; display: none;"/>
            </form>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        const selector = modal.querySelector('#selector');
        const packq = modal.querySelector('#packq');
        const tokenAmt = modal.querySelector('#tokenAmt');
        const uAT = modal.querySelector('#uAT');
        const openerStarter = modal.querySelector('#openerStarter');
        const cancel = modal.querySelector('#cancel');
        const status = modal.querySelector('#status');

        function updateInputStates() {
            if (uAT.checked) {
                packq.disabled = true;
                packq.value = '';
                tokenAmt.disabled = true;
                tokenAmt.value = '';
            } else if (tokenAmt.value !== '') {
                packq.disabled = true;
                packq.value = '';
                uAT.disabled = true;
                uAT.checked = false;
            } else {
                packq.disabled = false;
                tokenAmt.disabled = false;
                uAT.disabled = false;
            }
        }
        uAT.addEventListener('change', updateInputStates);
        tokenAmt.addEventListener('input', updateInputStates);
        packq.addEventListener('input', updateInputStates);
        updateInputStates();
        openerStarter.addEventListener('click', async function() {
            const packSelect = selector.value;
            let quantity = 0;
            const cost = blacket.packs[packSelect] ? blacket.packs[packSelect].price : 0;
            brOpen = false;
            if (uAT.checked) {
                if (cost === 0) {
                    blacket.createToast({
                        title: "Error",
                        message: "This pack costs 0 toekens",
                        icon: "/content/blooks/Token.webp",
                        time: 3000
                    });
                    return;
                }
                quantity = Math.floor(blacket.user.tokens / cost);
            } else if (tokenAmt.value !== '') {
                const tokAmt = parseInt(tokenAmt.value, 10);
                if (isNaN(tokAmt) || tokAmt <= 0) {
                    blacket.createToast({
                        title: "Error",
                        message: "Set tokens",
                        icon: "/content/blooks/Error.webp",
                        time: 3000
                    });
                    return;
                }
                if (cost === 0) {
                    blacket.createToast({
                        title: "Error",
                        message: "Selected pack has no price, cannot use specified tokens.",
                        icon: "/content/blooks/Error.webp",
                        time: 3000
                    });
                    return;
                }
                quantity = Math.floor(tokAmt / cost);
                if (quantity * cost > blacket.user.tokens) {
                    blacket.createToast({
                        title: "Error",
                        message: "You are too broke to open that pack",
                        icon: "/content/blooks/Error.webp",
                        time: 5000
                    });
                    return;
                }
            } else {
                quantity = parseInt(packq.value, 10);
            }

            if (!packSelect) {
                blacket.createToast({
                    title: "Error",
                    message: "Please select a pack.",
                    icon: "/content/blooks/Error.webp",
                    time: 3000
                });
                return;
            }
            if (isNaN(quantity) || quantity <= 0) {
                blacket.createToast({
                    title: "Error",
                    message: "Please enter a valid quantity (must be 1 or more).",
                    icon: "/content/blooks/Error.webp",
                    time: 3000
                });
                return;
            }

            modal.remove();
            document.body.style.overflow = 'auto';

            if (typeof blacket !== 'undefined' && blacket.createToast) {
                blacket.createToast({
                    title: "Started",
                    message: `Opening ${packSelect} ${quantity} times!`,
                    icon: "/content/blooks/Success.webp",
                    time: 3000
                });
            }

            const obtained = {};
            const openedPack = blacket.openPack;

            blacket.openPack = (pack) => {
                return new Promise(resolve => {
                    blacket.startLoading();
                    blacket.requests.post("/worker3/open", { pack: pack }, (data) => {
                        blacket.stopLoading();
                        if (data.error) {
                            blacket.createToast({
                                title: "Error",
                                message: data.reason,
                                icon: "/content/blooks/Error.webp",
                                time: 5000
                            });
                            resolve(null);
                            return;
                        }
                        blacket.user.tokens -= blacket.packs[pack].price;
                        const balance = document.querySelector("#tokenBalance > div:nth-child(2)");
                        if (balance) {
                            balance.innerHTML = blacket.user.tokens.toLocaleString();
                        }
                        if (!blacket.user.blooks[data.blook]) {
                            blacket.user.blooks[data.blook] = 1;
                        } else {
                            blacket.user.blooks[data.blook]++;
                        }
                        resolve(data.blook);
                    });
                });
            };

            let extraDelay = 0;
            let count = 0;
            for (let i = 0; i < quantity; i++) {
                if (brOpen) {
                    blacket.createToast?.({
                        title: "",
                        message: `Opened ${count} packs`,
                        icon: "/content/blooks/Info.webp",
                        time: 3000
                    });
                    break;
                }
                if (blacket.user.tokens < cost) {
                    blacket.createToast({
                        title: "Warning",
                        message: `Opened ${count} of ${quantity}.`,
                        icon: "/content/blooks/Error.webp",
                        time: 5000
                    });
                    break;
                }
                const packedBlooks = await blacket.openPack(packSelect);
                if (packedBlooks) {
                    obtained[packedBlooks] = (obtained[packedBlooks] || 0) + 1;
                    const rarity = blacket.blooks[packedBlooks]?.rarity;
                    const wait = blacket.rarities[rarity]?.wait ?? 0;
                    await new Promise(r => setTimeout(r, wait + extraDelay));
                }
                count++;
            }

            blacket.openPack = openedPack;

            let end = `Opened ${count} packs!`;
            if (Object.keys(obtained).length > 0) {
                end += `<br><br><b>Blooks Obtained:</b><br>`;
                for (const blookName in obtained) {
                    const blookInfo = blacket.blooks[blookName];
                    const blookImage = blookInfo ? blookInfo.image : '/content/blooks/Default.webp';
                    const blookRarity = blookInfo ? blookInfo.rarity : 'Common';
                    const rarityColor = blacket.rarities[blookRarity] ? blacket.rarities[blookRarity].color : '#ffffff';

                    end += `
                        <div style="display: flex; align-items: center; margin-bottom: 5px;">
                            <img src="${blookImage}" alt="${blookName}" style="width: 30px; height: 30px; margin-right: 10px; border-radius: 5px; object-fit: contain;">
                            <span>${blookName}: ${obtained[blookName]} (<span style="color: ${rarityColor};">${blookRarity}</span>)</span>
                        </div>
                    `;
                }
            } else {
                end += `Nothing :I`;
            }

            show({
                title: "Finished",
                message: end
            });

            openerStarter.disabled = false;
            openerStarter.querySelector('.styles__front___vcvuy-camelCase').textContent = 'Open Packs';
            cancel.disabled = false;
        });

        cancel.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = 'auto';
        });
    }

    const startColor = 'rgb(215, 128, 211)';

    const start = document.createElement('div');
    start.id = 'startOpen';
    start.className = 'styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase';
    start.setAttribute('role', 'button');
    start.setAttribute('tabindex', '0');
    start.style.position = 'absolute';
    start.style.bottom = 'calc(-1.563vw - 1.042vw - 10px)';
    start.style.left = '50%';
    start.style.transform = 'translateX(-50%)';
    start.style.color = 'white';
    start.style.borderRadius = '0.260vw';
    start.style.fontSize = '0.625vw';
    start.style.height = '1.042vw';
    start.style.padding = '0 0.521vw';
    start.style.display = 'flex';
    start.style.flexDirection = 'row';
    start.style.alignItems = 'center';
    start.style.justifyContent = 'center';
    start.style.WebkitUserSelect = 'none';
    start.style.MozUserSelect = 'none';
    start.style.userSelect = 'none';
    start.style.outline = 'none';
    start.style.cursor = 'pointer';
    start.style.pointerEvents = 'all';
    start.style.backgroundColor = startColor;
    start.style.zIndex = '10';
    start.textContent = 'Pack Opener';

    document.body.appendChild(start);

    start.addEventListener('click', showResults);

    function checkBlacketReady() {
        if (typeof blacket !== 'undefined' && blacket.user) {
        } else {
            setTimeout(checkBlacketReady, 100);
        }
    }
    checkBlacketReady();

    const instantButton = document.querySelector('.styles__instantButton___2ezEk-camelCase');
    if (instantButton) {
        if (instantButton.parentNode) {
            instantButton.parentNode.insertBefore(start, instantButton.nextSibling);
        }
    }
})();
