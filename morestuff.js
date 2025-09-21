(function() {
    function showCustomModal(options) {
        const { title, message } = options;
        const modal = document.createElement('div');
        modal.id = 'customMessageModal';
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
                        <div id="closeCustomModalButton" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0">
                            <div class="styles__shadow___3GMdH-camelCase"></div>
                            <div class="styles__edge___3eWfq-camelCase" style="background-color: var(--accent);"></div>
                            <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: var(--accent);">Okay</div>
                        </div>
                    </div>
                </div>
                <input type="submit" style="opacity: 0; display: none;" />
            </form>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        modal.querySelector('#closeCustomModalButton').addEventListener('click', function() {
            modal.remove();
            document.body.style.overflow = 'auto';
        });
    }

    let breakOpening = false;

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'd') {
            breakOpening = true;
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

    function showBulkPackModal() {
        let packOptions = '';
        if (typeof blacket !== 'undefined' && blacket.packs) {
            for (const packName in blacket.packs) {
                if (!blacket.packs[packName].hidden) {
                    packOptions += `<option value="${packName}">${packName} (${blacket.packs[packName].price.toLocaleString()} Tokens)</option>`;
                }
            }
        } else {
            packOptions += `<option value="">No packs available</option>`;
        }
        const modal = document.createElement('div');
        modal.id = 'bulkPackModal';
        modal.className = 'arts__modal___VpEAD-camelCase';
        modal.innerHTML = `
            <form class="styles__container___1BPm9-camelCase">
                <div class="styles__text___KSL4--camelCase">
                    <div>
                        <h2 style="line-height:30px;">Open Multiple Packs</h2>
                        <p>Select a pack and the quantity you wish to open.</p>
                        <div style="margin-top: 15px;">
                            <label for="packSelect" style="display: block; margin-bottom: 5px; font-weight: bold;">Choose a Pack:</label>
                            <select id="packSelect" class="styles__select___4kC90-camelCase">
                                ${packOptions}
                            </select>
                        </div>
                        <div style="margin-top: 15px;">
                            <label for="packQuantity" style="display: block; margin-bottom: 5px; font-weight: bold;">Quantity (default):</label>
                            <input type="number" id="packQuantity" class="styles__numRow___xh98F-camelCase" value="1" min="1" style="border: 0.156vw solid rgba(0, 0, 0, 0.17);border-radius: 0.313vw;">
                        </div>
                        <div style="margin-top: 15px;">
                            <label for="tokensToUse" style="display: block; margin-bottom: 5px; font-weight: bold;">Number of Tokens to Use:</label>
                            <input type="number" id="tokensToUse" class="styles__input___2Yt1l-camelCase" min="0" placeholder="Enter tokens" style="border: 0.156vw solid rgba(0, 0, 0, 0.17);border-radius: 0.313vw;">
                        </div>
                        <div style="margin-top: 15px; display: flex; align-items: center;">
                            <input type="checkbox" id="useAllTokens" style="margin-right: 10px;">
                            <label for="useAllTokens" style="font-weight: bold;">Use All Available Tokens</label>
                        </div>
                        <p id="bulkOpenStatus" style="font-size: 15px; margin-top: 5px; font-weight: bold; color: #fff;">Click ctrl + alt + d to cancel</p>
                    </div>
                </div>
                <div class="styles__holder___3CEfN-camelCase">
                    <div class="styles__buttonContainer___2EaVD-camelCase">
                        <div id="openPacksButton" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0">
                            <div class="styles__shadow___3GMdH-camelCase"></div>
                            <div class="styles__edge___3eWfq-camelCase" style="background-color: var(--accent);"></div>
                            <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: var(--accent);">Open Packs</div>
                        </div>
                        <div id="cancelBulkOpenButton" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0">
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

        const packSelect = modal.querySelector('#packSelect');
        const packQuantity = modal.querySelector('#packQuantity');
        const tokensToUse = modal.querySelector('#tokensToUse');
        const useAllTokens = modal.querySelector('#useAllTokens');
        const openPacksButton = modal.querySelector('#openPacksButton');
        const cancelBulkOpenButton = modal.querySelector('#cancelBulkOpenButton');
        const bulkOpenStatus = modal.querySelector('#bulkOpenStatus');

        function updateInputStates() {
            if (useAllTokens.checked) {
                packQuantity.disabled = true;
                packQuantity.value = '';
                tokensToUse.disabled = true;
                tokensToUse.value = '';
            } else if (tokensToUse.value !== '') {
                packQuantity.disabled = true;
                packQuantity.value = '';
                useAllTokens.disabled = true;
                useAllTokens.checked = false;
            } else {
                packQuantity.disabled = false;
                tokensToUse.disabled = false;
                useAllTokens.disabled = false;
            }
        }
        useAllTokens.addEventListener('change', updateInputStates);
        tokensToUse.addEventListener('input', updateInputStates);
        packQuantity.addEventListener('input', updateInputStates);
        updateInputStates();

        openPacksButton.addEventListener('click', async function() {
            const selectedPack = packSelect.value;
            let quantity = 0;
            const packPrice = blacket.packs[selectedPack] ? blacket.packs[selectedPack].price : 0;
            breakOpening = false;

            if (useAllTokens.checked) {
                if (packPrice === 0) {
                    blacket.createToast({
                        title: "Error",
                        message: "Selected pack has no price, cannot use all tokens.",
                        icon: "/content/blooks/Error.webp",
                        time: 3000
                    });
                    return;
                }
                quantity = Math.floor(blacket.user.tokens / packPrice);
            } else if (tokensToUse.value !== '') {
                const tokensAmount = parseInt(tokensToUse.value, 10);
                if (isNaN(tokensAmount) || tokensAmount <= 0) {
                    blacket.createToast({
                        title: "Error",
                        message: "Please enter a valid number of tokens to use.",
                        icon: "/content/blooks/Error.webp",
                        time: 3000
                    });
                    return;
                }
                if (packPrice === 0) {
                    blacket.createToast({
                        title: "Error",
                        message: "Selected pack has no price, cannot use specified tokens.",
                        icon: "/content/blooks/Error.webp",
                        time: 3000
                    });
                    return;
                }
                quantity = Math.floor(tokensAmount / packPrice);
                if (quantity * packPrice > blacket.user.tokens) {
                    blacket.createToast({
                        title: "Error",
                        message: `You only have ${blacket.user.tokens.toLocaleString()} tokens. You cannot afford to open packs with ${tokensAmount.toLocaleString()} tokens.`,
                        icon: "/content/blooks/Error.webp",
                        time: 5000
                    });
                    return;
                }
            } else {
                quantity = parseInt(packQuantity.value, 10);
            }

            if (!selectedPack) {
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
                    title: "Input Received",
                    message: `Opening ${selectedPack} ${quantity} times!`,
                    icon: "/content/blooks/Success.webp",
                    time: 3000
                });
            }

            const blooksObtained = {};
            const originalOpenPack = blacket.openPack;

            blacket.openPack = (packName) => {
                return new Promise(resolve => {
                    blacket.startLoading();
                    blacket.requests.post("/worker3/open", { pack: packName }, (data) => {
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
                        blacket.user.tokens -= blacket.packs[packName].price;
                        const tokenBalanceDiv = document.querySelector("#tokenBalance > div:nth-child(2)");
                        if (tokenBalanceDiv) {
                            tokenBalanceDiv.innerHTML = blacket.user.tokens.toLocaleString();
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

            let extra_delay = 0;
            let openedCount = 0;
            for (let i = 0; i < quantity; i++) {
                if (breakOpening) {
                    blacket.createToast?.({
                        title: "Stopped",
                        message: `Opening stopped by user after ${openedCount} packs.`,
                        icon: "/content/blooks/Error.webp",
                        time: 3000
                    });
                    break;
                }
                if (blacket.user.tokens < packPrice) {
                    blacket.createToast({
                        title: "Warning",
                        message: `Not enough tokens to open more packs. Opened ${openedCount} of ${quantity}.`,
                        icon: "/content/blooks/Error.webp",
                        time: 5000
                    });
                    break;
                }
                const obtainedBlookName = await blacket.openPack(selectedPack);
                if (obtainedBlookName) {
                    blooksObtained[obtainedBlookName] = (blooksObtained[obtainedBlookName] || 0) + 1;
                    const rarity = blacket.blooks[obtainedBlookName]?.rarity;
                    const wait = blacket.rarities[rarity]?.wait ?? 0;
                    await new Promise(r => setTimeout(r, wait + extra_delay));
                }
                openedCount++;
            }

            blacket.openPack = originalOpenPack;

            let finalMessage = `Successfully opened ${openedCount} packs!`;
            if (Object.keys(blooksObtained).length > 0) {
                finalMessage += `<br><br><b>Blooks Obtained:</b><br>`;
                for (const blookName in blooksObtained) {
                    const blookInfo = blacket.blooks[blookName];
                    const blookImage = blookInfo ? blookInfo.image : '/content/blooks/Error.webp';
                    const blookRarity = blookInfo ? blookInfo.rarity : 'Unknown';
                    const rarityColor = blacket.rarities[blookRarity] ? blacket.rarities[blookRarity].color : '#333333';

                    finalMessage += `
                        <div style="display: flex; align-items: center; margin-bottom: 5px;">
                            <img src="${blookImage}" alt="${blookName}" style="width: 30px; height: 30px; margin-right: 10px; border-radius: 5px; object-fit: contain;">
                            <span>${blookName}: ${blooksObtained[blookName]} (<span style="color: ${rarityColor};">${blookRarity}</span>)</span>
                        </div>
                    `;
                }
            } else {
                finalMessage += `<br><br>No new blooks were obtained in this session (or all were duplicates).`;
            }

            showCustomModal({
                title: "Finished",
                message: finalMessage
            });

            openPacksButton.disabled = false;
            openPacksButton.querySelector('.styles__front___vcvuy-camelCase').textContent = 'Open Packs';
            cancelBulkOpenButton.disabled = false;
        });

        cancelBulkOpenButton.addEventListener('click', function() {
            modal.remove();
            document.body.style.overflow = 'auto';
        });
    }

    const triggerButtonColor = 'rgb(215, 128, 211)';

    const triggerButton = document.createElement('div');
    triggerButton.id = 'triggerBulkOpenModal';
    triggerButton.className = 'styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase';
    triggerButton.setAttribute('role', 'button');
    triggerButton.setAttribute('tabindex', '0');
    triggerButton.style.position = 'absolute';
    triggerButton.style.bottom = 'calc(-1.563vw - 1.042vw - 10px)';
    triggerButton.style.left = '50%';
    triggerButton.style.transform = 'translateX(-50%)';
    triggerButton.style.color = 'white';
    triggerButton.style.borderRadius = '0.260vw';
    triggerButton.style.fontSize = '0.625vw';
    triggerButton.style.height = '1.042vw';
    triggerButton.style.padding = '0 0.521vw';
    triggerButton.style.display = 'flex';
    triggerButton.style.flexDirection = 'row';
    triggerButton.style.alignItems = 'center';
    triggerButton.style.justifyContent = 'center';
    triggerButton.style.WebkitUserSelect = 'none';
    triggerButton.style.MozUserSelect = 'none';
    triggerButton.style.userSelect = 'none';
    triggerButton.style.outline = 'none';
    triggerButton.style.cursor = 'pointer';
    triggerButton.style.pointerEvents = 'all';
    triggerButton.style.backgroundColor = triggerButtonColor;
    triggerButton.style.zIndex = '10';
    triggerButton.textContent = 'Pack Opener';

    document.body.appendChild(triggerButton);

    triggerButton.addEventListener('click', showBulkPackModal);

    function checkBlacketReady() {
        if (typeof blacket !== 'undefined' && blacket.user) {
            // blacket ready
        } else {
            setTimeout(checkBlacketReady, 100);
        }
    }
    checkBlacketReady();

    // Insert after .styles__instantButton___2ezEk-camelCase if exists
    const instantButton = document.querySelector('.styles__instantButton___2ezEk-camelCase');
    if (instantButton) {
        if (instantButton.parentNode) {
            instantButton.parentNode.insertBefore(triggerButton, instantButton.nextSibling);
        }
    }
})();
